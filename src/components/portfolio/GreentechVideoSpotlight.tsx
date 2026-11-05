import React, { useState } from 'react';
import { Play, X, ExternalLink, Sparkles, FileText, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MasterIngredient } from '../../types/ingredient';

interface GreentechVideoSpotlightProps {
  onSelectIngredient?: (ingredient: MasterIngredient) => void;
  onRequestSample?: (ingredient: MasterIngredient) => void;
  hairilineIngredient?: MasterIngredient | null;
}

export const GreentechVideoSpotlight: React.FC<GreentechVideoSpotlightProps> = ({
  onSelectIngredient,
  onRequestSample,
  hairilineIngredient
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState('/videos/greentech-hairiline-thumb-16x9.jpg');
  const videoId = '3aa3iMw0ahU';
  const youtubeUrl = 'https://youtube.com/watch?v=3aa3iMw0ahU&feature=shared';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#041c10] via-[#072c18] to-[#03150c] text-white p-5 sm:p-7 lg:p-8 shadow-xl border border-emerald-500/25">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Video Description & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4 text-left order-2 lg:order-1">
          {/* Badge Ribbon */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Scientific Innovation Video</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono border border-white/20">
              Greentech France R&amp;D
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              HAIRILINE<span className="text-emerald-400">®</span>
            </h3>
            <p className="text-emerald-300 text-sm sm:text-base font-bold">
              Anti-Hair Loss &amp; Scalp Microbiota Modulator
            </p>
          </div>

          {/* Summary / Key takeaways */}
          <p className="text-xs sm:text-[13.5px] text-emerald-100/90 leading-relaxed font-normal">
            Discover Greentech’s breakthrough active derived from <em>Lindera strychnifolia</em> roots. 
            This official scientific video demonstrates how HAIRILINE® restores scalp microbiota balance, 
            prolongs the anagen growth phase, and activates Wnt/β-catenin signalling in dermal papilla cells.
          </p>

          {/* Key Bullet Highlights */}
          <div className="space-y-1.5 pt-1 text-xs text-emerald-100">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Clinical Proof: <strong>+34% Anagen/Telogen ratio</strong> &amp; <strong>-41% daily shed hair</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Dual Action: Microbiome rebalancing + Follicular stem cell activation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Recommended Dosage: <strong>0.5% - 1.0%</strong> (Water-soluble active)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            {hairilineIngredient && onSelectIngredient && (
              <button
                type="button"
                onClick={() => onSelectIngredient(hairilineIngredient)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View HAIRILINE® Dossier</span>
              </button>
            )}

            {hairilineIngredient && onRequestSample && (
              <button
                type="button"
                onClick={() => onRequestSample(hairilineIngredient)}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-emerald-300" />
                <span>Request Sample</span>
              </button>
            )}

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-white text-xs font-mono transition-all border border-white/10"
              title="Watch directly on YouTube"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Ready-to-Play Video Frame (7 cols) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-black group">
            
            {isPlaying ? (
              <div className="relative w-full h-full">
                <iframe
                  src={embedUrl}
                  title="GREENTECH - HAIRILINE®, Anti-hair loss & scalp microbiota modulator"
                  className="w-full h-full border-0 rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Close/Stop video button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-2.5 right-2.5 z-20 p-2 rounded-full bg-black/80 hover:bg-black text-white/90 hover:text-white transition-all shadow-lg cursor-pointer flex items-center space-x-1 text-xs font-mono"
                  title="Close Video"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            ) : (
              /* Thumbnail Preview with Glowing Ready-To-Play Button */
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
                aria-label="Play GREENTECH HAIRILINE Scientific Video"
              >
                {/* High-res Video Thumbnail Image with Robust Fallbacks */}
                <img
                  src={thumbSrc}
                  alt="GREENTECH HAIRILINE Anti-hair loss & scalp microbiota modulator Video Thumbnail"
                  className="w-full h-full object-cover object-center transform group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  onError={() => {
                    if (thumbSrc.includes('img.youtube.com')) {
                      setThumbSrc('/greentech-hairiline-youtube-thumb.jpg');
                    } else if (thumbSrc.includes('youtube-thumb.jpg')) {
                      setThumbSrc('/videos/greentech-hairiline-video-cover.jpg');
                    } else if (thumbSrc.includes('/videos/')) {
                      setThumbSrc('/greentech-hairiline-video-cover.jpg');
                    }
                  }}
                />

                {/* Gradient Overlays for contrast & elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 group-hover/thumb:from-black/75 transition-colors duration-300" />

                {/* Top Ribbons */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Official Greentech Video</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/20">
                    HD · Ready to Play
                  </span>
                </div>

                {/* Central Ready to Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing glow ring */}
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
                    
                    {/* Glowing button circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 shadow-[0_0_35px_rgba(16,185,129,0.7)] flex items-center justify-center transform group-hover/thumb:scale-115 active:scale-95 transition-all duration-300 border-2 border-white/60">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#052312] fill-current ml-1" />
                    </div>
                  </div>

                  <span className="mt-3 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-extrabold text-xs uppercase tracking-wider border border-white/20 group-hover/thumb:bg-emerald-500 group-hover/thumb:text-emerald-950 transition-colors">
                    Click to Play Video
                  </span>
                </div>

                {/* Bottom Video Meta Bar */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white/90">
                  <span className="font-semibold truncate pr-2">
                    HAIRILINE® Scalp Microbiota Modulator
                  </span>
                  <span className="text-emerald-300 font-mono text-[11px] shrink-0">
                    Watch in Page
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
