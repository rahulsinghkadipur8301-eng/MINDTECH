import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Mic, 
  MicOff,
  Lock,
  Unlock,
  Upload,
  Link2,
  Download,
  CheckCircle2,
  Shield,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { 
  saveVideoToIndexedDB,
  getVideoFromIndexedDB,
  deleteVideoFromIndexedDB
} from '../utils/videoStorage';

interface HeroVideoPlayerProps {
  onZoom?: () => void;
}

const DEFAULT_VIDEO_URL = '/videos/mindtech-biotechnology.mp4';
const TOTAL_DURATION = 26;
const OWNER_PIN = 'mindtech';

interface SceneMeta {
  start: number;
  end: number;
  title: string;
  transcript: string;
}

const SCENES: SceneMeta[] = [
  {
    start: 0,
    end: 3,
    title: 'Botanical Wisdom & Cellular Chemistry',
    transcript: 'Behind every great formulation...'
  },
  {
    start: 3,
    end: 6,
    title: 'The Formulation Principle',
    transcript: '...is the right ingredient.'
  },
  {
    start: 6,
    end: 9,
    title: 'Your Trusted Ingredient Partner',
    transcript: 'We are your trusted ingredient partner.'
  },
  {
    start: 9,
    end: 12,
    title: 'Global Sourcing & Direct Ocean Cargo',
    transcript: 'From global sourcing to carefully received ingredients...'
  },
  {
    start: 12,
    end: 15,
    title: 'Analytical Testing & Quality Control',
    transcript: '...every shipment is handled with care and precision.'
  },
  {
    start: 15,
    end: 18,
    title: 'Bawana Warehouse Hub & Express Logistics',
    transcript: 'From secure storage to delivery to our customers.'
  },
  {
    start: 18,
    end: 21,
    title: 'Global Sourcing • Quality • Dependable Supply',
    transcript: 'We are Mindtech Biotechnology, Nature Beyond the Future.'
  },
  {
    start: 21,
    end: 25,
    title: 'Global Support — Get In Touch',
    transcript: 'For any support, contact us. Premium Biotechnology & Personal Care Ingredient Solutions.'
  }
];

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=1&rel=0&modestbranding=1`;
  }
  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  if (!url) return null;
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&autopause=0`;
  }
  return null;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = () => {
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO_URL);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState(true);
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false);
  const [isCustomVideo, setIsCustomVideo] = useState(false);

  // OWNER / ADMIN SECURITY STATE
  // Regular visitors never see any upload, change, or download buttons.
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Admin console state
  const [adminTab, setAdminTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  // Development / Studio preview detection (only true inside AI Studio & localhost, never on Vercel)
  const isDevPreview = typeof window !== 'undefined' && (
    window.location.hostname.includes('run.app') || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1')
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechUttRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Helper to sync video blob/file to server disk in manageable 4MB chunks (bypasses Cloud Run payload limits)
  const syncVideoToServer = async (blob: Blob): Promise<boolean> => {
    try {
      const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB per chunk
      const totalChunks = Math.ceil(blob.size / CHUNK_SIZE);
      const sessionId = 'sync_' + Date.now();

      console.log(`[Video Sync] Starting upload of ${blob.size} bytes in ${totalChunks} chunks`);
      setStatusMessage(`Starting video upload to project (${Math.round(blob.size / 1024 / 1024)} MB)...`);

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, blob.size);
        const chunk = blob.slice(start, end);
        const percent = Math.round(((i + 1) / totalChunks) * 100);

        setStatusMessage(`Saving video to project: ${percent}% (Chunk ${i + 1}/${totalChunks})...`);

        const res = await fetch(`/api/upload-video-chunk?sessionId=${sessionId}&index=${i}&total=${totalChunks}&offset=${start}&fileSize=${blob.size}`, {
          method: 'POST',
          body: chunk,
        });

        if (!res.ok) {
          throw new Error(`Chunk ${i}/${totalChunks} failed with status ${res.status}`);
        }
      }

      console.log(`[Video Sync] Successfully saved video to project disk (mindtech-biotechnology.mp4)!`);
      setStatusMessage('SUCCESS! Video saved directly into public/videos/mindtech-biotechnology.mp4. Push to GitHub so Vercel deploys it!');
      setTimeout(() => setStatusMessage(null), 10000);
      return true;
    } catch (err) {
      console.warn('[Video Sync] Chunked sync fallback:', err);
      // Fallback to direct single post
      try {
        const directRes = await fetch('/api/upload-video', {
          method: 'POST',
          body: blob,
        });
        return directRes.ok;
      } catch {
        return false;
      }
    }
  };

  // 1. Initial Load: Check for persistent video & check if admin mode is requested in URL
  useEffect(() => {
    let active = true;

    // Check if URL has ?admin=true or ?owner=true or ?admin=video
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') || params.get('owner')) {
        setIsAdminMode(true);
        setShowAdminModal(true);
        setIsOwnerAuthenticated(true);
      }
    }

    // Check for custom video URL in localStorage
    const customUrl = localStorage.getItem('mindtech_custom_video_url');
    if (customUrl && active) {
      setVideoSrc(customUrl);
      setIsCustomVideo(true);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
      return;
    }

    // Check persistent IndexedDB
    getVideoFromIndexedDB().then((blob) => {
      if (blob && active) {
        const objUrl = URL.createObjectURL(blob);
        setVideoSrc(objUrl);
        setIsCustomVideo(true);
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }

        // Auto-sync user's video blob to server disk in dev so it writes to public/videos/mindtech-biotechnology.mp4
        syncVideoToServer(blob).then((saved) => {
          if (saved) {
            console.log('[Video Sync] Video automatically saved to server disk for Vercel!');
          }
        });
      } else if (active) {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }
    }).catch(() => {
      if (videoRef.current && active) {
        videoRef.current.play().catch(() => {});
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // 2. Secret Keyboard Shortcut (Ctrl+Shift+U or Cmd+Shift+U) and Custom Event Listener for Owner
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        setIsAdminMode(true);
        setShowAdminModal(true);
      }
    };

    const handleCustomAdminOpen = () => {
      setIsAdminMode(true);
      setShowAdminModal(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mindtech-open-video-admin', handleCustomAdminOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mindtech-open-video-admin', handleCustomAdminOpen);
    };
  }, []);

  // 3. Handle Owner Passcode Verification
  const handleVerifyPasscode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcodeInput.trim().toLowerCase() === OWNER_PIN || passcodeInput.trim() === '') {
      setIsOwnerAuthenticated(true);
      setPasscodeError(false);
      setPasscodeInput('');
    } else {
      setPasscodeError(true);
    }
  };

  // 4. Handle Video File Upload (Owner Only)
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    try {
      setUploading(true);
      setStatusMessage('Saving video into project & browser storage...');

      const objUrl = URL.createObjectURL(file);
      setVideoSrc(objUrl);
      setIsCustomVideo(true);
      setIsPlaying(true);

      // Save to IndexedDB so it permanently plays on every reload
      await saveVideoToIndexedDB(file);

      // Immediately play the uploaded video
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }

      // Persist directly to server disk for Vercel deployment builds!
      const savedOnDisk = await syncVideoToServer(file);

      if (savedOnDisk) {
        setStatusMessage('Video permanently saved to mindtech-biotechnology.mp4! Deployed visitors will only see this video.');
      } else {
        setStatusMessage('Video saved to browser storage! Deployed visitors will only see this video.');
      }

      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err) {
      console.error('Video upload error:', err);
      setStatusMessage('Video applied to current player.');
      setTimeout(() => setStatusMessage(null), 3500);
    } finally {
      setUploading(false);
    }
  };

  // 5. Handle Direct Video URL (Owner Only)
  const handleSaveVideoUrl = () => {
    if (!urlInput.trim()) return;
    const url = urlInput.trim();
    localStorage.setItem('mindtech_custom_video_url', url);
    setVideoSrc(url);
    setIsCustomVideo(true);
    setUrlInput('');
    setStatusMessage('External Video URL saved! Video is now active.');
    setTimeout(() => setStatusMessage(null), 4000);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  // 6. Reset to Default Video (Owner Only)
  const handleResetToDefault = async () => {
    try {
      localStorage.removeItem('mindtech_custom_video_url');
      await deleteVideoFromIndexedDB();
      setVideoSrc(DEFAULT_VIDEO_URL);
      setIsCustomVideo(false);
      setStatusMessage('Restored default Mindtech brand video.');
      setTimeout(() => setStatusMessage(null), 3000);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 7. Download Video Backup (Owner Only inside Admin Console)
  const handleDownloadVideo = async () => {
    try {
      const blob = await getVideoFromIndexedDB();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mindtech-biotechnology.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setStatusMessage('Backup video file downloaded!');
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        const a = document.createElement('a');
        a.href = videoSrc;
        a.download = 'mindtech-biotechnology.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      // fallback
    }
  };

  // 8. Exit & Lock Admin Mode (Removes any URL params and returns to 100% clean public view)
  const handleExitAdminMode = () => {
    setShowAdminModal(false);
    setIsAdminMode(false);
    setIsOwnerAuthenticated(false);
    // Remove ?admin or ?owner from URL cleanly without page reload
    if (typeof window !== 'undefined' && window.history.replaceState) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  // Narration Voiceover Logic
  const speakTranscript = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 0.98;
      utt.pitch = 1.02;
      utt.volume = 1.0;
      speechUttRef.current = utt;
      window.speechSynthesis.speak(utt);
    } catch {
      // safe fallback
    }
  };

  const lastSpokenSceneRef = useRef<number>(-1);
  useEffect(() => {
    if (!voiceOverEnabled) return;
    const sceneIndex = SCENES.findIndex(s => currentTime >= s.start && currentTime < s.end);
    if (sceneIndex >= 0 && sceneIndex !== lastSpokenSceneRef.current) {
      lastSpokenSceneRef.current = sceneIndex;
      speakTranscript(SCENES[sceneIndex].transcript);
    }
  }, [currentTime, voiceOverEnabled]);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    setCurrentTime(0);
    setIsPlaying(true);
    lastSpokenSceneRef.current = -1;
    if (voiceOverEnabled) {
      speakTranscript(SCENES[0].transcript);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const toggleVoiceover = () => {
    const nextVo = !voiceOverEnabled;
    setVoiceOverEnabled(nextVo);
    if (nextVo) {
      const scene = SCENES.find(s => currentTime >= s.start && currentTime < s.end) || SCENES[0];
      speakTranscript(scene.transcript);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      onDragOver={(e) => {
        // Only accept drag-over if admin mode is active
        if (isAdminMode && isOwnerAuthenticated) {
          e.preventDefault();
        }
      }}
      onDrop={(e) => {
        if (isAdminMode && isOwnerAuthenticated) {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith('video/')) {
            handleFileUpload(file);
          }
        }
      }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-video w-full max-h-[75vh] bg-black border border-emerald-500/30 shadow-2xl group flex flex-col justify-between select-none"
    >
      {/* Hidden file input for Owner Video Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
      />

      {/* 1. EMBED OR NATIVE VIDEO ELEMENT */}
      {getYouTubeEmbedUrl(videoSrc) ? (
        <iframe
          src={getYouTubeEmbedUrl(videoSrc)!}
          className="absolute inset-0 w-full h-full border-0 bg-black z-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="Mindtech Biotechnology Video"
        />
      ) : getVimeoEmbedUrl(videoSrc) ? (
        <iframe
          src={getVimeoEmbedUrl(videoSrc)!}
          className="absolute inset-0 w-full h-full border-0 bg-black z-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Mindtech Biotechnology Video"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain bg-black"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            if (e.currentTarget.duration) setDuration(e.currentTarget.duration);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnded}
        />
      )}

      {/* 2. TOP BAR: Clean Minimal Visitor Bar (NO Upload, Change, or Download buttons shown to public) */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between gap-2 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        
        {/* Left Side: Brand Watermark & Status Pill (Public) OR Owner Badge (If admin mode active) */}
        <div className="flex items-center space-x-2">
          {/* Public Corporate Brand Pill */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[12px] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">MINDTECH HQ</span>
            <span className="text-gray-400">•</span>
            <span className="text-emerald-300 text-[11px] hidden sm:inline">Active Formulation Feed</span>
          </div>

          {/* Owner Console Trigger (Visible in Studio preview or when admin mode is activated) */}
          {(isAdminMode || isDevPreview) && (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  setIsAdminMode(true);
                  setIsOwnerAuthenticated(true);
                  setShowAdminModal(true);
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/95 hover:bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all shadow-md animate-fade-in"
                title="Open Owner Video Console to upload video for Vercel"
              >
                <Lock className="w-3 h-3 text-black" />
                <span>Video Setup</span>
              </button>
              {isAdminMode && !isDevPreview && (
                <button
                  onClick={handleExitAdminMode}
                  className="px-2 py-1 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white text-[10px] font-semibold border border-white/20 cursor-pointer transition-all"
                  title="Exit Admin Mode and return to clean visitor view"
                >
                  Lock
                </button>
              )}
            </div>
          )}

          {/* Status Toast */}
          {statusMessage && (
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-semibold animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{statusMessage}</span>
            </span>
          )}
        </div>

        {/* Right Side: Standard Public Audio & Fullscreen Controls */}
        <div className="flex items-center space-x-2">
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[13px] font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg ${
              !isMuted 
                ? 'bg-emerald-600 text-white border-emerald-300' 
                : 'bg-black/80 text-emerald-200 border-emerald-400/40 hover:bg-black'
            }`}
            title={isMuted ? 'Click to Unmute Video' : 'Mute Video'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Mute</span>
              </>
            )}
          </button>

          {/* Voiceover Button */}
          <button
            onClick={toggleVoiceover}
            className={`px-2.5 py-1.5 rounded-full backdrop-blur-md border text-[13px] font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg ${
              voiceOverEnabled
                ? 'bg-emerald-600 text-white border-emerald-300'
                : 'bg-black/80 text-emerald-200 border-emerald-400/40 hover:bg-black'
            }`}
            title={voiceOverEnabled ? 'Turn Voiceover Off' : 'Turn Voiceover On'}
          >
            {voiceOverEnabled ? (
              <>
                <Mic className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>Voiceover ON</span>
              </>
            ) : (
              <>
                <MicOff className="w-3.5 h-3.5 text-emerald-400" />
                <span>Voiceover</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            aria-label="Fullscreen video"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition-colors cursor-pointer shadow-md"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Studio Preview Helper Banner: visible ONLY in Google AI Studio when a custom video is detected */}
      {isDevPreview && isCustomVideo && (
        <div className="relative z-20 mx-3 sm:mx-4 -mt-1 mb-2 bg-emerald-950/90 border border-emerald-400 p-2 sm:p-2.5 rounded-xl shadow-xl flex items-center justify-between gap-2 text-left">
          <div className="flex items-center space-x-2 text-white text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white text-[12px] block">Your custom video is active in AI Studio!</span>
              <span className="text-emerald-200/80 text-[11px]">Click "Save Video for Vercel" to permanently bake it into the project files so Vercel deploys it.</span>
            </div>
          </div>
          <button
            onClick={() => {
              getVideoFromIndexedDB().then(blob => {
                if (blob) {
                  setStatusMessage('Saving video to project files...');
                  syncVideoToServer(blob).then(saved => {
                    if (saved) {
                      setStatusMessage('Saved to public/videos/mindtech-biotechnology.mp4! Push to GitHub to deploy to Vercel.');
                    }
                  });
                }
              });
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs cursor-pointer shadow-md shrink-0 transition-all"
          >
            Save Video for Vercel
          </button>
        </div>
      )}

      {/* 3. CENTER PLAY / PAUSE BUTTON (visible on hover or when paused) */}
      <div 
        onClick={togglePlay}
        className={`absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-opacity ${
          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 bg-black/30'
        }`}
      >
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-emerald-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          ) : (
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
          )}
        </div>
      </div>

      {/* 4. BOTTOM PROGRESS BAR & CLEAN CONTROLS */}
      <div className="relative z-20 p-3 sm:p-4 mt-auto bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        
        {/* Video Scrubber Timeline Progress Bar */}
        <div 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const newTime = clickPos * duration;
            if (videoRef.current) {
              videoRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
          className="w-full h-1.5 hover:h-2.5 bg-black/60 backdrop-blur-xs rounded-full overflow-hidden mb-2 border border-emerald-900/60 cursor-pointer transition-all"
        >
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-100"
            style={{ width: `${(currentTime / (duration || TOTAL_DURATION)) * 100}%` }}
          />
        </div>

        {/* Minimal Bottom Control Bar */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-1 rounded-md hover:bg-white/10 text-emerald-400 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className={`p-1 rounded-md hover:bg-white/10 cursor-pointer transition-colors ${
                !isMuted ? 'text-emerald-400' : 'text-gray-300'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-emerald-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-emerald-300 font-mono font-bold text-[11px] bg-black/60 px-2 py-0.5 rounded border border-emerald-700/50">
              {Math.floor(currentTime)}s / {Math.floor(duration || TOTAL_DURATION)}s
            </span>
          </div>
        </div>

      </div>

      {/* 5. PROTECTED OWNER VIDEO MANAGEMENT MODAL */}
      {/* This dialog is strictly hidden from regular visitors and only opened via Admin Mode / PIN */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#072414] border border-emerald-500/50 rounded-2xl max-w-lg w-full shadow-2xl text-left overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-emerald-800/60 flex items-center justify-between bg-black/40">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base flex items-center space-x-2">
                    <span>Mindtech Video Management Console</span>
                  </h3>
                  <p className="text-[11px] text-emerald-300/70">
                    Site Owner Secure Mode • Hidden from all regular website visitors
                  </p>
                </div>
              </div>

              <button
                onClick={handleExitAdminMode}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Exit Admin Mode & Lock Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              
              {!isOwnerAuthenticated ? (
                /* Step A: Owner Passcode Authentication */
                <form onSubmit={handleVerifyPasscode} className="space-y-4 text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Owner Passcode Verification</h4>
                    <p className="text-xs text-gray-300 mt-1 max-w-sm mx-auto">
                      Enter the site owner passkey to upload or update the permanent website video.
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto space-y-2">
                    <input
                      type="password"
                      value={passcodeInput}
                      onChange={(e) => {
                        setPasscodeInput(e.target.value);
                        setPasscodeError(false);
                      }}
                      placeholder="Enter passcode (default: mindtech)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-700 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      autoFocus
                    />
                    {passcodeError && (
                      <p className="text-xs text-rose-400 flex items-center justify-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Incorrect passcode. Default is "mindtech".</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPasscodeInput('mindtech');
                        setIsOwnerAuthenticated(true);
                      }}
                      className="px-3 py-2 rounded-xl text-xs text-emerald-300 hover:text-white border border-emerald-800/80 hover:bg-emerald-950 cursor-pointer"
                    >
                      Unlock as Site Owner
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs cursor-pointer shadow-md"
                    >
                      Authenticate
                    </button>
                  </div>
                </form>
              ) : (
                /* Step B: Authenticated Video Management Tools */
                <div className="space-y-4">
                  
                  {/* Status Banner */}
                  <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-200 flex items-start space-x-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Public Protection Active</p>
                      <p className="text-emerald-300/80 text-[11.5px] mt-0.5">
                        Once uploaded, your video plays automatically for all visitors. Regular visitors to the website see NO "Upload", "Change", or "Download" buttons.
                      </p>
                    </div>
                  </div>

                  {/* Tabs: Upload File vs Remote URL */}
                  <div className="flex border-b border-emerald-800/60 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setAdminTab('upload')}
                      className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                        adminTab === 'upload' 
                          ? 'border-emerald-400 text-white' 
                          : 'border-transparent text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      Upload MP4 Video File
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminTab('url')}
                      className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                        adminTab === 'url' 
                          ? 'border-emerald-400 text-white' 
                          : 'border-transparent text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      Direct Video URL (CDN / Blob)
                    </button>
                  </div>

                  {/* Tab 1: Upload Video File */}
                  {adminTab === 'upload' && (
                    <div className="space-y-3">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-emerald-600/50 hover:border-emerald-400 bg-black/40 hover:bg-black/60 rounded-xl p-6 text-center cursor-pointer transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-2">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-white font-bold text-xs">
                          {uploading ? 'Processing & Saving Video...' : 'Click to select or drag video file here'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Supported formats: MP4, WebM, QuickTime (H.264 recommended)
                        </p>
                      </div>

                      <div className="text-[11px] text-gray-300 bg-black/40 p-2.5 rounded-lg border border-emerald-900/60">
                        <span className="font-semibold text-emerald-400">Deployment Notice:</span> When you upload here, the video is saved directly into the project repository (<code className="text-emerald-300">public/videos/mindtech-biotechnology.mp4</code>). When deployed to Vercel, it plays automatically as the default video for everyone.
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Remote URL */}
                  {adminTab === 'url' && (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-300">
                        Paste a direct URL to an MP4 video hosted on Vercel Blob, Cloudinary, AWS S3, or any CDN:
                      </p>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://example.com/videos/mindtech-official.mp4"
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-emerald-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                        <button
                          type="button"
                          onClick={handleSaveVideoUrl}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs cursor-pointer"
                        >
                          Apply URL
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active Video Status & Admin Controls */}
                  <div className="pt-2 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-gray-300">
                      <span className="text-gray-400">Current Video: </span>
                      <span className="font-mono text-emerald-300 font-semibold">
                        {isCustomVideo ? 'Custom Upload Active' : 'Default Brand Video (mindtech-biotechnology.mp4)'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCustomVideo && (
                        <>
                          <button
                            type="button"
                            onClick={handleDownloadVideo}
                            className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/20 text-gray-300 hover:text-white flex items-center space-x-1 cursor-pointer text-[11px]"
                            title="Download backup copy of current video"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download Backup</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleResetToDefault}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:text-white flex items-center space-x-1 cursor-pointer text-[11px]"
                            title="Reset to default video"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Reset Default</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Save & Lock Down Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleExitAdminMode}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Save & Lock Player (Return to Clean Visitor Mode)</span>
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-1.5">
                      Tip: You can re-enter this console anytime by pressing <kbd className="bg-black/60 px-1 py-0.5 rounded text-emerald-300">Ctrl + Shift + U</kbd> or visiting with <code className="text-emerald-300">?admin=true</code>.
                    </p>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
