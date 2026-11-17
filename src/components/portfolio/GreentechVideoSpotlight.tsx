import React, { useState } from 'react';
import { Play, X, ExternalLink, Sparkles, FileText, Send, Film } from 'lucide-react';
import { MasterIngredient } from '../../types/ingredient';
import { GREENTECH_VIDEOS, GreentechVideoItem } from '../../utils/youtube';

interface GreentechVideoSpotlightProps {
  onSelectIngredient?: (ingredient: MasterIngredient) => void;
  onRequestSample?: (ingredient: MasterIngredient) => void;
  hairilineIngredient?: MasterIngredient | null;
  onSelectIngredientById?: (ingredientId: string) => void;
  onRequestSampleById?: (ingredientId: string) => void;
}

export const GreentechVideoSpotlight: React.FC<GreentechVideoSpotlightProps> = ({
  onSelectIngredient,
  onRequestSample,
  hairilineIngredient,
  onSelectIngredientById,
  onRequestSampleById,
}) => {
  const [activeVideo, setActiveVideo] = useState<GreentechVideoItem>(GREENTECH_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});

  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  const handleSelectVideo = (video: GreentechVideoItem) => {
    if (video.id === activeVideo.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setActiveVideo(video);
      setIsPlaying(true);
    }
  };

  const getThumbSrc = (video: GreentechVideoItem) =>
    failedThumbIds[video.id] ? video.fallbackThumbnail : video.thumbnail;

  const handleThumbError = (video: GreentechVideoItem) => {
    setFailedThumbIds((prev) => (prev[video.id] ? prev : { ...prev, [video.id]: true }));
  };

  const handleOpenDossier = () => {
    if (onSelectIngredientById) {
      onSelectIngredientById(activeVideo.ingredientId);
    } else if (activeVideo.ingredientId === 'hairiline' && hairilineIngredient && onSelectIngredient) {
      onSelectIngredient(hairilineIngredient);
    }
  };

  const handleOpenSample = () => {
    if (onRequestSampleById) {
      onRequestSampleById(activeVideo.ingredientId);
    } else if (activeVideo.ingredientId === 'hairiline' && hairilineIngredient && onRequestSample) {
      onRequestSample(hairilineIngredient);
    }
  };

  const canOpenDossier = Boolean(
    onSelectIngredientById || (activeVideo.ingredientId === 'hairiline' && hairilineIngredient && onSelectIngredient)
  );
  const canRequestSample = Boolean(
    onRequestSampleById || (activeVideo.ingredientId === 'hairiline' && hairilineIngredient && onRequestSample)
  );

  return (
    <section
      aria-label="Greentech Scientific Innovation Video Library"
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#041c10] via-[#072c18] to-[#03150c] text-white p-3.5 sm:p-4 lg:p-5 shadow-lg border border-emerald-500/25"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Compact Single-Row Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Greentech R&amp;D Briefings</span>
            </span>
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
              Active Innovation Film Library
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 border border-white/15">
              <Film className="w-3 h-3 text-emerald-400" />
              <span>{GREENTECH_VIDEOS.length} Official Videos</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/25">
              Now Selected: {activeVideo.title}
            </span>
          </div>
        </div>

        {/* Compact Split Stage: Active Theater (Left) + 2-Col Filmstrip Switcher (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* Left: Compact Active Theater Player (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 min-w-0">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-emerald-500/35 bg-black group">
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    key={activeVideo.videoId}
                    src={embedUrl}
                    title={`GREENTECH - ${activeVideo.title}, ${activeVideo.subtitle}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/80 hover:bg-black text-white/90 hover:text-white transition-all shadow-md cursor-pointer flex items-center space-x-1 text-[11px] font-mono"
                    title="Stop Video"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline pr-0.5">Close</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer overflow-hidden group/thumb"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsPlaying(true);
                    }
                  }}
                  aria-label={`Play ${activeVideo.title} Scientific Video`}
                >
                  <img
                    src={getThumbSrc(activeVideo)}
                    alt={`${activeVideo.title} — ${activeVideo.subtitle}`}
                    className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                    onError={() => handleThumbError(activeVideo)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/25 group-hover/thumb:from-black/75 transition-colors" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-emerald-300 border border-emerald-400/30 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Greentech France</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white/90 border border-white/20">
                      Dosage {activeVideo.dosage}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 shadow-[0_0_25px_rgba(16,185,129,0.65)] flex items-center justify-center transform group-hover/thumb:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/70">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#052312] fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-black text-white leading-tight truncate">
                        {activeVideo.title}
                      </div>
                      <div className="text-[11px] text-emerald-200/95 font-medium truncate">
                        {activeVideo.subtitle}
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono text-emerald-300 bg-black/65 px-2 py-0.5 rounded border border-white/15">
                      Watch
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Compact Info & Action Strip Below Player */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] text-emerald-100 font-medium truncate">
                  {activeVideo.claim}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {canOpenDossier && (
                  <button
                    type="button"
                    onClick={handleOpenDossier}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-[11px] transition-colors cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Dossier</span>
                  </button>
                )}
                {canRequestSample && (
                  <button
                    type="button"
                    onClick={handleOpenSample}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] border border-white/20 transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-emerald-300" />
                    <span>Sample</span>
                  </button>
                )}
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-emerald-300 hover:text-white text-[11px] font-mono transition-colors border border-white/10"
                  title="Watch directly on YouTube"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Compact 2-Column Selector Filmstrip Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
            {GREENTECH_VIDEOS.map((video, index) => {
              const isSelected = video.id === activeVideo.id;
              const isLastOdd = index === GREENTECH_VIDEOS.length - 1 && GREENTECH_VIDEOS.length % 2 === 1;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelectVideo(video)}
                  className={`group flex items-center gap-2.5 p-1.5 rounded-xl border text-left transition-all cursor-pointer min-w-0 ${
                    isLastOdd ? 'sm:col-span-2' : ''
                  } ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/70 shadow-[0_0_16px_rgba(16,185,129,0.2)]'
                      : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-emerald-400/40'
                  }`}
                >
                  {/* Crisp 16:9 Mini Thumbnail */}
                  <div className="relative w-24 sm:w-28 shrink-0 aspect-video rounded-lg overflow-hidden bg-black border border-white/15">
                    <img
                      src={getThumbSrc(video)}
                      alt={video.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={() => handleThumbError(video)}
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isSelected
                            ? 'bg-emerald-400 text-emerald-950 shadow-sm'
                            : 'bg-black/70 text-white border border-white/40'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Compact Meta */}
                  <div className="min-w-0 flex-1 pr-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs sm:text-[13px] font-extrabold text-white truncate">
                        {video.title}
                      </span>
                      <span
                        className={`shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                          isSelected
                            ? 'bg-emerald-400 text-emerald-950'
                            : 'bg-white/10 text-emerald-200'
                        }`}
                      >
                        {isSelected ? (isPlaying ? 'Playing' : 'Selected') : video.dosage}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-200/90 truncate">
                      {video.subtitle}
                    </p>
                    <p className="text-[10px] text-emerald-100/70 truncate">
                      {video.claim}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
