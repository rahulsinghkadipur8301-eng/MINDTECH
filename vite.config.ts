import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  const uploadSessions: Record<string, Buffer[]> = {};

  return {
    name: 'video-upload-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url || '/', 'http://localhost:3000');
        const pathname = urlObj.pathname;

        // 1. Direct single-stream upload
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

        // 2. Chunked upload for large video files (bypasses Cloud Run 32MB limit)
        if (pathname === '/api/upload-video-chunk' && req.method === 'POST') {
          const sessionId = urlObj.searchParams.get('sessionId') || 'default';
          const chunkIndex = parseInt(urlObj.searchParams.get('index') || '0', 10);
          const totalChunks = parseInt(urlObj.searchParams.get('total') || '1', 10);

          if (!uploadSessions[sessionId]) {
            uploadSessions[sessionId] = new Array(totalChunks);
          }

          const chunks: Buffer[] = [];
          req.on('data', (c: Buffer) => chunks.push(c));
          req.on('end', () => {
            try {
              uploadSessions[sessionId][chunkIndex] = Buffer.concat(chunks);

              // Check if all chunks received
              const allReceived = uploadSessions[sessionId].every(c => c && c.length > 0);
              if (allReceived) {
                const completeBuffer = Buffer.concat(uploadSessions[sessionId]);
                delete uploadSessions[sessionId];

                const targetPath = path.resolve(__dirname, 'public/videos/mindtech-biotechnology.mp4');
                fs.mkdirSync(path.dirname(targetPath), { recursive: true });
                fs.writeFileSync(targetPath, completeBuffer);

                const distPath = path.resolve(__dirname, 'dist/videos/mindtech-biotechnology.mp4');
                if (fs.existsSync(path.dirname(distPath))) {
                  fs.writeFileSync(distPath, completeBuffer);
                }

                console.log(`[Chunked Video Sync] All ${totalChunks} chunks assembled. Saved ${completeBuffer.length} bytes to ${targetPath}`);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, complete: true, size: completeBuffer.length }));
              } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, complete: false, chunkIndex, totalChunks }));
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err?.message || 'Chunk upload failed' }));
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

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
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
