import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Mic, 
  MicOff
} from 'lucide-react';
import { 
  saveVideoToIndexedDB,
  getVideoFromIndexedDB 
} from '../utils/videoStorage';

interface HeroVideoPlayerProps {
  onZoom?: () => void;
}

const DEFAULT_VIDEO_URL = '/videos/mindtech-biotechnology.mp4';
const TOTAL_DURATION = 25;

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

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = () => {
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO_URL);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState(true);
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false);
  const [isCustomVideo, setIsCustomVideo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechUttRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load custom user video from persistent IndexedDB on mount
  useEffect(() => {
    let active = true;
    getVideoFromIndexedDB().then((blob) => {
      if (blob && active) {
        const objUrl = URL.createObjectURL(blob);
        setVideoSrc(objUrl);
        setIsCustomVideo(true);
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
        }
      } else if (active) {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
        }
      }
    }).catch(() => {
      if (videoRef.current && active) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Handle video upload - saves permanently, autoplays immediately without asking
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    try {
      setUploading(true);
      const objUrl = URL.createObjectURL(file);
      setVideoSrc(objUrl);
      setIsCustomVideo(true);
      setIsPlaying(true);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);

      // Save to IndexedDB so it permanently plays on every reload and never asks again
      await saveVideoToIndexedDB(file);

      // Immediately play the uploaded video
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
      }

      // Also persist to server disk asynchronously
      fetch('/api/upload-video', {
        method: 'POST',
        body: file,
      }).catch(() => {});
    } catch (err) {
      console.error('Video upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // Play narration via Web Speech API when voiceOver is active
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

  // Sync narration voiceover with scene transitions when voiceover is enabled (for default video)
  const lastSpokenSceneRef = useRef<number>(-1);
  useEffect(() => {
    if (!voiceOverEnabled) return;
    const sceneIndex = SCENES.findIndex(s => currentTime >= s.start && currentTime < s.end);
    if (sceneIndex >= 0 && sceneIndex !== lastSpokenSceneRef.current) {
      lastSpokenSceneRef.current = sceneIndex;
      speakTranscript(SCENES[sceneIndex].transcript);
    }
  }, [currentTime, voiceOverEnabled]);

  // Restart video seamlessly from start when it ends
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
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('video/')) {
          handleFileUpload(file);
        }
      }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-video w-full max-h-[75vh] bg-black border border-emerald-500/30 shadow-2xl group flex flex-col justify-between select-none"
    >
      {/* Hidden file input for uploading the video file */}
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

      {/* 1. NATIVE VIDEO ELEMENT - object-contain ensures video fits in the screen perfectly without cropping */}
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

      {/* 2. TOP BAR: Clean Minimal Controls */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-end gap-2 bg-gradient-to-b from-black/60 to-transparent">
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

      {/* 4. BOTTOM PROGRESS BAR & CLEAN CONTROLS - NO TEXT OVERLAYS BLOCKING THE VIDEO */}
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

    </div>
  );
};
