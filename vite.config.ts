import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  interface UploadSession {
    tmpPath: string;
    fd: number;
    received: Set<number>;
    totalChunks: number;
    fileSize: number;
  }
  const uploadSessions: Record<string, UploadSession> = {};

  return {
    name: 'video-upload-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url || '/', 'http://localhost:3000');
        const pathname = urlObj.pathname;

        // 1. Direct single-stream upload (for smaller files)
        if (pathname === '/api/upload-video' && req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const targetPath = path.resolve(__dirname, 'public/videos/mindtech-biotechnology.mp4');
              fs.mkdirSync(path.dirname(targetPath), { recursive: true });
              fs.writeFileSync(targetPath, buffer);

              const distPath = path.resolve(__dirname, 'dist/videos/mindtech-biotechnology.mp4');
              if (fs.existsSync(path.dirname(distPath))) {
                fs.writeFileSync(distPath, buffer);
              }

              console.log(`[Video Sync] Saved ${buffer.length} bytes directly to ${targetPath}`);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, size: buffer.length, path: '/videos/mindtech-biotechnology.mp4' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Upload failed' }));
            }
          });
          return;
        }

        // 2. High-performance chunked upload for large video files (bypasses Cloud Run 32MB limit & 0-RAM overhead)
        if (pathname === '/api/upload-video-chunk' && req.method === 'POST') {
          const sessionId = urlObj.searchParams.get('sessionId') || 'default';
          const chunkIndex = parseInt(urlObj.searchParams.get('index') || '0', 10);
          const totalChunks = parseInt(urlObj.searchParams.get('total') || '1', 10);
          const offset = parseInt(urlObj.searchParams.get('offset') || '0', 10);
          const fileSize = parseInt(urlObj.searchParams.get('fileSize') || '0', 10);

          if (!uploadSessions[sessionId]) {
            const tmpPath = path.resolve('/tmp', `video_${sessionId}_${Date.now()}.mp4`);
            const fd = fs.openSync(tmpPath, 'w+');
            uploadSessions[sessionId] = {
              tmpPath,
              fd,
              received: new Set<number>(),
              totalChunks,
              fileSize
            };
          }

          const session = uploadSessions[sessionId];
          const chunks: Buffer[] = [];
          req.on('data', (c: Buffer) => chunks.push(c));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              fs.writeSync(session.fd, buffer, 0, buffer.length, offset);
              session.received.add(chunkIndex);

              console.log(`[Chunk Upload] Chunk ${chunkIndex + 1}/${session.totalChunks} (${buffer.length} bytes, total received: ${session.received.size}/${session.totalChunks})`);

              if (session.received.size >= session.totalChunks) {
                fs.closeSync(session.fd);
                const targetPath = path.resolve(__dirname, 'public/videos/mindtech-biotechnology.mp4');
                fs.mkdirSync(path.dirname(targetPath), { recursive: true });
                fs.copyFileSync(session.tmpPath, targetPath);

                const distPath = path.resolve(__dirname, 'dist/videos/mindtech-biotechnology.mp4');
                if (fs.existsSync(path.dirname(distPath))) {
                  fs.copyFileSync(session.tmpPath, distPath);
                }

                try { fs.unlinkSync(session.tmpPath); } catch {}
                delete uploadSessions[sessionId];

                const stat = fs.statSync(targetPath);
                console.log(`[Chunk Upload] COMPLETE! Assembled and saved ${stat.size} bytes to ${targetPath}`);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, complete: true, size: stat.size, path: '/videos/mindtech-biotechnology.mp4' }));
              } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, complete: false, received: session.received.size, total: session.totalChunks }));
              }
            } catch (err: any) {
              console.error('[Chunk Upload Error]:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Chunk write failed' }));
            }
          });
          return;
        }

        if (pathname === '/api/video-status' && req.method === 'GET') {
          const targetPath = path.resolve(__dirname, 'public/videos/mindtech-biotechnology.mp4');
          if (fs.existsSync(targetPath)) {
            const stat = fs.statSync(targetPath);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ exists: true, size: stat.size, mtime: stat.mtime }));
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ exists: false }));
          return;
        }

        // 3. High-performance video streaming with full HTTP 206 Range Request support
        if (pathname.startsWith('/videos/') && (req.method === 'GET' || req.method === 'HEAD')) {
          const relativePath = pathname.replace(/^\//, '');
          let filePath = path.resolve(__dirname, 'public', relativePath);
          if (!fs.existsSync(filePath)) {
            filePath = path.resolve(__dirname, 'dist', relativePath);
          }

          if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            res.end('Video not found');
            return;
          }

          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (isNaN(start) || start < 0 || start >= fileSize || (parts[1] && (isNaN(end) || end < start || end >= fileSize))) {
              res.statusCode = 416;
              res.setHeader('Content-Range', `bytes */${fileSize}`);
              res.end();
              return;
            }

            const chunkSize = (end - start) + 1;
            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunkSize,
              'Content-Type': 'video/mp4',
              'Cache-Control': 'public, max-age=31536000, immutable',
            });

            if (req.method === 'HEAD') {
              res.end();
              return;
            }

            const stream = fs.createReadStream(filePath, { start, end });
            stream.pipe(res);
            req.on('close', () => {
              stream.destroy();
            });
            stream.on('error', (err) => {
              console.error('[Video Stream Error]:', err);
              if (!res.headersSent) {
                res.statusCode = 500;
              }
              res.end();
            });
            return;
          } else {
            res.writeHead(200, {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
              'Accept-Ranges': 'bytes',
              'Cache-Control': 'public, max-age=31536000, immutable',
            });

            if (req.method === 'HEAD') {
              res.end();
              return;
            }

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
            req.on('close', () => {
              stream.destroy();
            });
            stream.on('error', (err) => {
              console.error('[Video Stream Error]:', err);
              if (!res.headersSent) {
                res.statusCode = 500;
              }
              res.end();
            });
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    publicDir: 'public',
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      copyPublicDir: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
