import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MasterIngredient } from '../../types/ingredient';
import { 
  X, 
  FlaskConical, 
  CheckCircle2, 
  FileCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Droplets, 
  ArrowRight,
  AlertTriangle,
  Award,
  Play
} from 'lucide-react';

interface MasterIngredientDetailModalProps {
  ingredient: MasterIngredient | null;
  onClose: () => void;
  onRequestSample: (ingredient: MasterIngredient) => void;
  onSelectRelated?: (ingredient: MasterIngredient) => void;
  allIngredients?: MasterIngredient[];
}

export const MasterIngredientDetailModal: React.FC<MasterIngredientDetailModalProps> = ({
  ingredient,
  onClose,
  onRequestSample,
  onSelectRelated,
  allIngredients = []
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'formulation' | 'evidence' | 'specs'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!ingredient) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#ingredient/${ingredient.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find related ingredients based on overlapping benefit tags
  const relatedIngredients = allIngredients
    .filter(item => item.id !== ingredient.id && item.benefitTags.some(tag => ingredient.benefitTags.includes(tag)))
    .slice(0, 3);

  const isOilOrButter = ingredient.productType === 'pure-oil' || ingredient.productType === 'plant-butter';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-left z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="relative bg-gradient-to-r from-[#072414] via-[#0c4024] to-emerald-950 text-white p-5 sm:p-7 flex items-start justify-between">
            <div className="space-y-2 max-w-[85%]">
              
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-300/80 font-mono">
                <span>PORTFOLIO</span>
                <span>/</span>
                <span className="text-white font-bold">GREENTECH</span>
                <span>/</span>
                <span className="uppercase text-emerald-200">{ingredient.benefitTags[0] || 'ACTIVE'}</span>
                <span>/</span>
                <span className="text-white font-bold">{ingredient.name}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {ingredient.name}
              </h2>

              {/* INCI Specification */}
              <p className="text-xs sm:text-sm font-mono text-emerald-200 line-clamp-1 italic">
                INCI: {ingredient.inci}
              </p>

              {/* Partner Attribution */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-400/30">
                  Manufactured by Greentech France
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono border border-white/20">
                  Exclusively Distributed by Mindtech India
                </span>
                {ingredient.verificationStatus === 'needs-review' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-400/40">
                    <AlertTriangle className="w-3 h-3 text-amber-300" />
                    <span>Regulatory Clearance Pending</span>
                  </span>
                )}
              </div>
            </div>

            {/* Actions: Close & Share */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy share link"
                aria-label="Copy direct share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close detail modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Technical Fact Panel Strip */}
          <div className="bg-emerald-50/70 border-b border-emerald-100 p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
              {isOilOrButter ? (
                <>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Botanical Latin</span>
                    <span className="font-bold text-[#072414] truncate block italic">
                      {ingredient.botanicalName || 'Plant Botanical'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Plant Part</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.plantPart || 'Seeds / Kernels'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Sensory Touch</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.sensoryTouch || 'Dry velvety touch'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Historical Origin</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.originCountries?.join(', ') || 'France'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Recommended Dose</span>
                    <span className="font-bold text-emerald-900 truncate block">
                      {ingredient.useLevel || '1–2%'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Physical Form</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.physicalForm || 'Liquid'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Solubility</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.solubility || 'Water-soluble'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/60">
                    <span className="text-gray-500 block font-mono text-[11px] uppercase">Natural Origin</span>
                    <span className="font-bold text-[#072414] truncate block">
                      {ingredient.originCountries?.join(', ') || 'France'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 px-5 sm:px-7 bg-white">
            {[
              { id: 'overview', label: 'Overview & Science' },
              { id: 'formulation', label: 'Formulation Applications' },
              { id: 'evidence', label: 'Clinical & In-Vitro Evidence' },
              { id: 'specs', label: 'Source Traceability & Specs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-800 text-emerald-950 font-extrabold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Modal Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-gray-700">
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    What It Does
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-800">
                    {ingredient.description}
                  </p>
                </div>

                {ingredient.origin && (
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      Origin &amp; Sustainable Technology
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {ingredient.origin}
                    </p>
                  </div>
                )}

                {ingredient.mechanism && (
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Mechanism &amp; Scientific Rationale</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                      {ingredient.mechanism}
                    </p>
                  </div>
                )}

                {isOilOrButter && ingredient.fattyAcidProfile && (
                  <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200/80">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-900 mb-1">
                      Fatty Acid &amp; Lipid Composition
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-teal-950 leading-relaxed">
                      {ingredient.fattyAcidProfile}
                    </p>
                  </div>
                )}

                {/* Official Scientific Video Presentation (if available) */}
                {ingredient.videoUrl && (
                  <div className="bg-gradient-to-br from-[#041c10] to-[#072c18] p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Official Scientific Video Presentation</span>
                      </div>
                      <a
                        href={ingredient.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-emerald-300 hover:text-white flex items-center space-x-1 transition-colors"
                      >
                        <span>Open YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-emerald-500/20">
                      {isVideoPlaying ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src="https://www.youtube-nocookie.com/embed/3aa3iMw0ahU?autoplay=1&rel=0&modestbranding=1"
                            title={ingredient.videoTitle || `${ingredient.name} Scientific Video`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          <button
                            type="button"
                            onClick={() => setIsVideoPlaying(false)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-mono flex items-center space-x-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Close</span>
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => setIsVideoPlaying(true)}
                          className="relative w-full h-full cursor-pointer group/modalvideo"
                          role="button"
                          tabIndex={0}
                        >
                          <img
                            src="/videos/greentech-hairiline-video-cover.jpg"
                            alt={ingredient.name}
                            className="w-full h-full object-cover group-hover/modalvideo:scale-105 transition-transform duration-500"
                            loading="eager"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              if (!target.src.includes('sddefault.jpg')) {
                                target.src = 'https://img.youtube.com/vi/3aa3iMw0ahU/sddefault.jpg';
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover/modalvideo:bg-black/25 transition-colors flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center shadow-lg group-hover/modalvideo:scale-110 transition-transform">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white drop-shadow-md">
                            <span className="font-bold">Greentech France R&amp;D Scientific Presentation</span>
                            <span className="text-emerald-300 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded">Ready to Play</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'formulation' && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    Target Cosmetic Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.cosmeticUses && ingredient.cosmeticUses.length > 0 ? (
                      ingredient.cosmeticUses.map((use, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
                          {use}
                        </span>
                      ))
                    ) : (
                      ingredient.applications.map((app, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
                          {app}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    Formulator Guidelines
                  </h4>
                  <ul className="text-xs sm:text-sm space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Recommended Concentration:</strong> {ingredient.useLevel || 'Refer to formulation guide'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Incorporation Phase:</strong> {ingredient.solubility === 'Water-soluble' ? 'Aqueous phase or cool-down below 40°C' : 'Lipid/oil phase'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Physical State:</strong> {ingredient.physicalForm || 'Standard cosmetic grade'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="space-y-4">
                {ingredient.studySummary && (
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 mb-1">
                      Clinical Study Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                      {ingredient.studySummary}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    Source-Backed Claims &amp; In-Vitro Findings
                  </h4>
                  <div className="space-y-2.5">
                    {ingredient.claims && ingredient.claims.length > 0 ? (
                      ingredient.claims.map((claim, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-start space-x-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="text-xs space-y-1">
                            <span className="font-semibold text-gray-900 block">{claim.text}</span>
                            {claim.context && (
                              <span className="text-gray-500 block">{claim.context}</span>
                            )}
                            <span className="text-[11px] font-mono text-emerald-700 block font-bold">
                              Verified in Brochure Page {claim.sourcePage}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic">
                        Detailed in-vitro &amp; ex-vivo trial protocols available upon request in official Greentech Technical Dossier.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-5">
                {/* 5-PDF Source Traceability Box */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Client Source PDF Reference Mapping</span>
                  </h4>
                  <div className="space-y-2">
                    {ingredient.sourceRefs.map((ref, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white border border-gray-200 text-xs flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-gray-800 block">{ref.file}</span>
                          {ref.note && <span className="text-gray-500 block text-[11px]">{ref.note}</span>}
                        </div>
                        <span className="font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold shrink-0">
                          Page(s) {ref.pages.join(', ')} ({ref.editionYear || '2023'})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory & Certification Tags */}
                {ingredient.certifications && ingredient.certifications.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Documented Compliance &amp; Certifications</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.certifications.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-xs font-bold">
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reconciliation Notes */}
                {ingredient.reconciliationNotes && ingredient.reconciliationNotes.length > 0 && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                    <span className="font-bold block uppercase font-mono">Edition Reconciliation Note:</span>
                    {ingredient.reconciliationNotes.map((note, idx) => (
                      <p key={idx}>{note}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* "You may also explore" related ingredients */}
            {relatedIngredients.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold block mb-3">
                  You May Also Explore
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedIngredients.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated && onSelectRelated(rel)}
                      className="p-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-300 transition-all cursor-pointer text-left"
                    >
                      <span className="text-[11px] font-mono text-emerald-800 font-bold block uppercase">
                        {rel.productType.replace('-', ' ')}
                      </span>
                      <h5 className="text-sm font-bold text-[#072414] truncate">
                        {rel.name}
                      </h5>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {rel.shortBenefit || rel.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-500 text-center sm:text-left">
              <span>Ready for bench evaluation? Standard 50g-100g B2B lab samples dispatched via Bawana Hub.</span>
            </div>

            <div className="flex items-center space-x-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestSample(ingredient);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-emerald-300" />
                <span>Request Sample &amp; TDS</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
