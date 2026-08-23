import React, { useState } from 'react';
import { generateAndDownloadCatalogPdf } from '../utils/generateCatalogPdf';
import { 
  FileDown, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Send,
  BookOpen
} from 'lucide-react';

interface CatalogDownloadSectionProps {
  onOpenInquiry: () => void;
}

export const CatalogDownloadSection: React.FC<CatalogDownloadSectionProps> = ({ onOpenInquiry }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateAndDownloadCatalogPdf();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <section id="catalog-download" className="py-16 md:py-20 bg-white relative border-t border-gray-100">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Modern Yasham-style CTA Card */}
        <div className="relative rounded-3xl bg-[#072414] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-emerald-800/60">
          
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,124,65,0.35),transparent_60%)] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Documentation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Download Official Mindtech Product Catalog (PDF)
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
                Access our complete 2026 Raw Material & Ingredient Catalog as a convenient, printable PDF document — including comprehensive technical data sheets, INCI nomenclature, formulation guidelines, and regulatory standards.
              </p>

              {/* Quick checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Silicones & Silicone Specialties',
                  'Skin Lightening & Anti-Ageing Actives',
                  'Mild & Sulfate-Free Surfactants',
                  'Conditioning & Rheology Modifiers',
                  'Sunscreens & Preservatives',
                  'Greentech Bio-Actives & Botanicals'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400 text-[#072414] flex items-center justify-center shadow-lg">
                <FileDown className="w-7 h-7" />
              </div>

              <div>
                <div className="text-base font-bold text-white">2026 Edition Catalog</div>
                <div className="text-xs text-emerald-200">Official Format • PDF Document</div>
              </div>

              {/* Instant 1-Click Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                id="catalog-section-download-btn"
                className="w-full inline-flex items-center justify-center space-x-2 text-sm font-bold text-[#072414] bg-emerald-400 hover:bg-emerald-300 py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 cursor-pointer active:scale-95 group"
              >
                <Download className={`w-4 h-4 text-[#072414] group-hover:-translate-y-0.5 transition-transform ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{isDownloading ? 'Downloading Catalog...' : 'Download PDF Catalog'}</span>
              </button>

              <button
                onClick={onOpenInquiry}
                className="text-xs font-semibold text-emerald-200 hover:text-white transition-colors underline pt-1"
              >
                Need physical samples or formulation advice?
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
