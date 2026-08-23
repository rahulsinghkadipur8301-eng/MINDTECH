import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { COMPANY_DETAILS, INDUSTRY_SEGMENTS, GLOBAL_PARTNERS } from '../data/companyData';
import { generateAndDownloadCatalogPdf } from '../utils/generateCatalogPdf';
import { PartnerLogoRenderer } from './PartnerLogos';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FileDown, 
  ChevronRight, 
  Sparkles,
  Globe2,
  Check,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenInquiry: (category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const footerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = footerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.2 + 1.2,
        color: i % 3 === 0 ? '#00f2fe' : i % 2 === 0 ? '#10b981' : '#34d399',
        alpha: Math.random() * 0.45 + 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - d / 135) * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      generateAndDownloadCatalogPdf();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <footer className="relative bg-[#072414] text-white border-t border-emerald-900/60 pt-16 pb-8 text-left overflow-hidden">
      
      {/* Dynamic Molecular Constellation Canvas in Footer */}
      <canvas ref={footerCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75" />

      {/* Radiant Glow Orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="inline-block py-1">
              <Logo height={58} variant="horizontal" />
            </a>
            
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              {COMPANY_DETAILS.overview}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-emerald-200/90 font-mono">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MSME Reg: <strong>{COMPANY_DETAILS.regulatory.msmeNo}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Policy No: <strong>{COMPANY_DETAILS.regulatory.policyNo}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#industries" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Industries</span>
                </a>
              </li>
              <li>
                <a href="#partners" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Global Partners</span>
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Why Choose Us</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact & Hub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Industry Sectors (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Application Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              {INDUSTRY_SEGMENTS.map((seg) => (
                <li key={seg.id}>
                  <button
                    onClick={() => onOpenInquiry(seg.title)}
                    className="text-emerald-100/80 hover:text-white transition-colors flex items-center space-x-1.5 text-left cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{seg.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Facility & 1-Click PDF Download (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Central Distribution Hub
            </h4>
            
            <div className="text-xs text-emerald-100/80 leading-relaxed space-y-1.5">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address.full}</span>
              </p>
              <p className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sales: {COMPANY_DETAILS.phones[0].number}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_DETAILS.emails[0].email}</span>
              </p>
            </div>

            {/* Instant PDF Catalog Download Button */}
            <div className="pt-2">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs font-bold text-[#072414] bg-emerald-400 hover:bg-emerald-300 py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {downloadSuccess ? (
                  <Check className="w-4 h-4 text-[#072414]" />
                ) : (
                  <FileDown className={`w-4 h-4 text-[#072414] ${isDownloading ? 'animate-bounce' : ''}`} />
                )}
                <span>{isDownloading ? 'Downloading PDF...' : downloadSuccess ? 'Catalog Downloaded!' : 'Download PDF Catalog (2026)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Global Manufacturing Principals Ribbon in Footer */}
        <div className="pt-8 mt-8 border-t border-emerald-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Direct Manufacturing Alliances & Authorized Principals:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              {GLOBAL_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => onOpenInquiry(`${partner.name} - Sourcing Portfolio`)}
                  className="bg-white/95 hover:bg-white rounded-xl px-3 py-1.5 shadow-2xs border border-white/20 transition-all flex items-center justify-center cursor-pointer group"
                  title={`Authorized distributor for ${partner.name}`}
                >
                  <PartnerLogoRenderer partnerId={partner.id} height={26} className="group-hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Regulatory Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>{COMPANY_DETAILS.tagline}</span>
            <span>•</span>
            <span>ISO 9001:2015 Compliant Supply Chain</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
