import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { COMPANY_DETAILS } from '../data/companyData';
import { 
  Building2, 
  Globe2, 
  Boxes, 
  Award, 
  FlaskConical, 
  Truck, 
  Handshake,
  CheckCircle2,
  Maximize2,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Target,
  Compass,
  Quote,
  ShieldCheck
} from 'lucide-react';

interface AboutPillar {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  tags: string[];
  image: string;
  fallbackImage: string;
  imageCaption: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ABOUT_PILLARS: AboutPillar[] = [
  {
    number: '01',
    id: 'global-sourcing',
    title: 'Global Sourcing, Local Support',
    subtitle: 'Connecting Global Innovation with Domestic Technical Reach',
    description: 'We connect customers with quality ingredients sourced through trusted global supply channels, backed by responsive local support. Direct partnerships with international manufacturers allow Indian formulators to access global ingredient innovations with prompt domestic technical and logistics assistance.',
    keyPoints: [
      'Direct partnerships with leading international chemical manufacturers',
      'Prompt domestic technical and formulation assistance in India',
      'Streamlined customs clearance and regulatory import documentation'
    ],
    tags: ['Direct Factory Imports', 'Local Technical Desk', 'Pan-India Support'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Global supply channels & centralized Bawana distribution hub',
    icon: Globe2
  },
  {
    number: '02',
    id: 'diverse-portfolio',
    title: 'Premium & Diverse Ingredient Portfolio',
    subtitle: 'Comprehensive Raw Materials for Skincare, Haircare, Sun & Color',
    description: 'From specialty silicones and natural actives to conditioning ingredients, specialty esters and functional raw materials, our portfolio is curated for a wide range of personal care applications across skincare, haircare, color cosmetics, sun-care and bath & body formulations.',
    keyPoints: [
      'Specialty silicones, crosslinked elastomer gels & MQ resin film formers',
      'High-potency skin brighteners (Alpha Arbutin, Kojic Dipalmitate, EAA)',
      'Clinically validated bio-ferments, plant extracts & mild surfactants'
    ],
    tags: ['Specialty Silicones', 'Bio-Actives & Ferments', 'Specialty Esters'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Curated high-performance cosmetic ingredients & formulation actives',
    icon: Boxes
  },
  {
    number: '03',
    id: 'quality-compliance',
    title: 'Quality You Can Rely On',
    subtitle: 'Rigorous Verification, Certificate of Analysis & Batch Consistency',
    description: 'We place strong emphasis on ingredient quality, consistency and dependable supply to support smooth formulation and production processes. Every batch is verified with rigorous Certificate of Analysis (COA), Technical Data Sheets (TDS), and stringent quality verification protocols.',
    keyPoints: [
      '100% batch traceability with verified COA & Technical Data Sheets',
      'Strict quality screening and consistent specifications across lots',
      'MSME registered enterprise with standardized supply chain controls'
    ],
    tags: ['COA & TDS Verified', '100% Batch Traceable', 'Stringent Quality Standards'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Rigorous quality verification, purity testing & batch compliance',
    icon: Award
  },
  {
    number: '04',
    id: 'formulation-support',
    title: 'Application-Focused Approach',
    subtitle: 'Formulation Guidance, Sensory Tuning & Stability Troubleshooting',
    description: 'We understand that every formulation has different requirements. Our team works with customers to identify suitable ingredient solutions for their specific applications, assisting with sensory optimization, stability troubleshooting, compatibility testing, and dosage guidance.',
    keyPoints: [
      'Tailored ingredient selection matching target viscosity and skin-feel',
      'Troubleshooting emulsion stability, phase separation and pH balancing',
      'Practical starting formulation prototypes and dosage guidelines'
    ],
    tags: ['Formulation Guidance', 'Sensory Tuning', 'Dosage Matrix'],
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Application testing, sensory profiling & prototype evaluation',
    icon: FlaskConical
  },
  {
    number: '05',
    id: 'dependable-supply',
    title: 'Dependable Supply Partner',
    subtitle: 'Climate-Managed Warehousing & 24-48h Pan-India Dispatch',
    description: 'Our import and distribution capabilities are focused on maintaining reliable availability and ensuring a smooth supply experience for our customers. Strategically located warehousing in Bawana, Delhi with ready buffer stock helps prevent production bottlenecks.',
    keyPoints: [
      'Centralized warehouse infrastructure in Bawana Industrial Area, Delhi',
      'Buffer inventory management ensuring uninterrupted manufacturing supply',
      'Rapid 24 to 48 hour dispatch turnaround across major Indian cosmetics clusters'
    ],
    tags: ['Bawana Hub, Delhi', 'Buffer Stock', '24-48h Fast Dispatch'],
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Ready buffer inventory & temperature-managed storage in Delhi',
    icon: Truck
  },
  {
    number: '06',
    id: 'long-term-partnerships',
    title: 'Long-Term Partnerships',
    subtitle: 'Transparent Collaboration from Lab Bench to Commercial Scale',
    description: 'We believe in building lasting relationships through transparent communication, professional service and a commitment to customer satisfaction from initial bench-scale formulation to commercial batch manufacturing.',
    keyPoints: [
      'Collaborative support tailored to indie brands, formulators and large manufacturers',
      'Transparent lead times, proactive market updates and consistent pricing',
      'Dedicated commercial and technical representatives for every partner'
    ],
    tags: ['Transparent Service', 'Lab-to-Plant Scale', 'Dedicated Commercial Desk'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Enduring client relationships & collaborative cosmetic formulation',
    icon: Handshake
  }
];

export const AboutSection: React.FC<{ onOpenInquiry: (topic?: string) => void }> = ({ onOpenInquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePillar = ABOUT_PILLARS[activeIndex];
  const SLIDE_DURATION = 6000; // 6 seconds per pillar

  // Smooth automatic continuous background slideshow loop (0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % ABOUT_PILLARS.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      id="about" 
      className="py-6 sm:py-8 bg-gradient-to-b from-white/90 via-emerald-50/25 to-white/90 relative text-left overflow-hidden border-t border-gray-100"
    >
      {/* Fullscreen Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={ABOUT_PILLARS.map(p => ({ 
          src: p.image, 
          title: `${p.number}. ${p.title}`, 
          category: `Mindtech Biotechnology • Pillar ${p.number}`, 
          description: p.description 
        }))}
        initialIndex={activeIndex}
      />

      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header: Mindtech Corporate Identity & Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-[13px] sm:text-[14px] font-black uppercase tracking-wider border border-emerald-300/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
                <span>TRUSTED INGREDIENT SOURCING</span>
              </div>
            </div>
            <h2 className="text-[26px] sm:text-[42px] md:text-[46px] font-black text-[#072414] tracking-tight leading-tight">
              About Mindtech Biotechnology
            </h2>
            <p className="mt-1.5 text-[16px] sm:text-[18px] md:text-[19.5px] text-gray-700 max-w-4xl font-normal leading-relaxed">
              A trusted importer and distributor of specialty personal care raw materials, combining direct global manufacturing channels with responsive domestic technical and logistics support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start md:self-auto shrink-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[13px] sm:text-[14px] md:text-[15px] font-bold text-emerald-950 bg-emerald-50 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-emerald-200 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
              <span>MSME: {COMPANY_DETAILS.regulatory.msmeNo}</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-gray-700 bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
              <span>Bawana Hub, Delhi</span>
            </div>
          </div>
        </div>

        {/* Company Vision & Mission Section */}
        <div id="vision-mission" className="mb-6 sm:mb-8 pt-1 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            
            {/* 1. Corporate Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="relative bg-gradient-to-br from-[#042817] via-[#07361f] to-[#0b4d2c] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-500/30 overflow-hidden flex flex-col justify-between group"
            >
              {/* Subtle Ambient Background Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/15 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs sm:text-[13px] font-black uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-emerald-300" />
                    <span>OUR CORPORATE VISION</span>
                  </div>
                  <span className="text-[12px] font-mono text-emerald-300/80 uppercase tracking-widest hidden sm:inline-block">
                    The Future Horizon
                  </span>
                </div>

                {/* Vision Statement Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Pioneering Personal Care Sourcing
                  </h3>
                  <p className="text-emerald-300/90 text-sm font-semibold mt-1">
                    Connecting Global Innovation with Modern Domestic Chemistry
                  </p>
                </div>

                {/* Exact Vision Statement Quote Block */}
                <div className="relative bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-500/25">
                  <Quote className="w-5 h-5 text-emerald-400/60 absolute top-3.5 left-3.5 -scale-x-100" />
                  <p className="text-[15.5px] sm:text-[17px] text-emerald-50 font-medium leading-relaxed pl-6 italic">
                    "{COMPANY_DETAILS.vision}"
                  </p>
                </div>

                {/* Strategic Objectives */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                    Key Strategic Horizons:
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-[13.5px] text-emerald-100/90">
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Global Innovation Bridge:</strong> Direct access to Tier-1 international producers (Fine Organics, VVF Limited, SNS Silcos, Greentech France).</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Modern Formulation Excellence:</strong> Equipping Indian R&D labs with cutting-edge specialty silicones, bio-ferments, and skin-barrier actives.</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Sustainable Chemistry:</strong> Prioritizing eco-friendly, REACH-compliant, clean beauty ingredients for modern consumers.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-10 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-emerald-300/80 font-medium">Mindtech Biotechnology Vision</span>
                <button
                  onClick={() => onOpenInquiry('Inquiry - Vision & Formulation Partnership')}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold text-emerald-200 hover:text-white bg-white/10 hover:bg-emerald-600 px-3.5 py-1.5 rounded-full border border-emerald-400/30 transition-all cursor-pointer"
                >
                  <span>Partner With Our Vision</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* 2. Corporate Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="relative bg-gradient-to-br from-[#032422] via-[#053633] to-[#084b47] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-teal-500/30 overflow-hidden flex flex-col justify-between group"
            >
              {/* Subtle Ambient Background Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-400/15 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs sm:text-[13px] font-black uppercase tracking-wider">
                    <Target className="w-4 h-4 text-teal-300" />
                    <span>OUR CORPORATE MISSION</span>
                  </div>
                  <span className="text-[12px] font-mono text-teal-300/80 uppercase tracking-widest hidden sm:inline-block">
                    Everyday Execution
                  </span>
                </div>

                {/* Mission Statement Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Uncompromising Quality & Dependable Supply
                  </h3>
                  <p className="text-teal-300/90 text-sm font-semibold mt-1">
                    Serving Formulators with Responsive Technical Support
                  </p>
                </div>

                {/* Exact Mission Statement Quote Block */}
                <div className="relative bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-teal-500/25">
                  <Quote className="w-5 h-5 text-teal-400/60 absolute top-3.5 left-3.5 -scale-x-100" />
                  <p className="text-[15.5px] sm:text-[17px] text-teal-50 font-medium leading-relaxed pl-6 italic">
                    "{COMPANY_DETAILS.mission}"
                  </p>
                </div>

                {/* Action Commitments */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                    Our Everyday Commitments:
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-[13.5px] text-teal-100/90">
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span><strong>Analytical Quality Rigor:</strong> 100% CoA & TDS verified, HPLC assay screening, heavy metal compliance, and zero adulteration.</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span><strong>Buffer Stock & 24–48h Dispatch:</strong> Strategically managed NCR inventory in Bawana, preventing manufacturing bottlenecks.</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span><strong>Responsive Formulator Support:</strong> Dedicated cosmetic chemists offering solubility testing, HLB guidance, and free bench samples.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-10 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-teal-500/20 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-teal-300/80 font-medium">Mindtech Biotechnology Mission</span>
                <button
                  onClick={() => onOpenInquiry('Sample Request - Quality & Mission Support')}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold text-teal-200 hover:text-white bg-white/10 hover:bg-teal-600 px-3.5 py-1.5 rounded-full border border-teal-400/30 transition-all cursor-pointer"
                >
                  <span>Request Bench Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* Guiding Corporate Philosophy Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border border-emerald-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-4xl">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Our Guiding Philosophy & Operating Principle</span>
              </div>
              <p className="text-sm sm:text-[15px] font-medium text-emerald-950 leading-relaxed">
                "{COMPANY_DETAILS.philosophy}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-end">
              <button
                onClick={() => {
                  const pillarsEl = document.getElementById('about-pillars');
                  if (pillarsEl) pillarsEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>View 6 Operational Pillars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 6 Value Pillars Section Header */}
        <div className="flex items-center justify-between mb-3 pt-2">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">
              EXECUTION EXCELLENCE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#072414] tracking-tight">
              6 Core Operational Pillars of Mindtech
            </h3>
          </div>
        </div>

        {/* Major Showcase Box: Large Image (Left) + Active Card Narrative & Progress (Right) */}
        <div id="about-pillars" className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-200/80 shadow-lg p-4 sm:p-5 lg:p-6 mb-3 sm:mb-4 scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left: Large High-Resolution Visual Stage with Automated Animation (7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] w-full bg-[#072414] border border-emerald-950/20 shadow-xl group flex flex-col justify-between">
                
                <div className="absolute inset-0 w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar.id}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={activePillar.image}
                        fallbackSrc={activePillar.fallbackImage}
                        alt={activePillar.title}
                        className="w-full h-full object-cover object-center"
                        containerClassName="w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 pointer-events-none" />

                {/* Top Number & Tag Badge */}
                <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 text-xs sm:text-sm font-black font-mono shadow-md">
                      PILLAR {activePillar.number}
                    </span>
                    <span className="hidden sm:inline-block px-3.5 py-2 rounded-full bg-emerald-950/90 backdrop-blur-md text-white border border-emerald-600/40 text-xs font-bold shadow-md">
                      Mindtech Advantage
                    </span>
                  </div>

                  {/* Lightbox Zoom Trigger */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    aria-label="View fullscreen photo"
                    className="w-10 h-10 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center border border-white/30 hover:bg-emerald-600 hover:scale-105 transition-all cursor-pointer shadow-lg"
                    title="Click for full-screen inspection"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Bottom Image Caption & Tag */}
                <div className="relative z-10 p-5 sm:p-6 mt-auto">
                  <div className="bg-black/75 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                      Mindtech Core Capability • High Purity Standards
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed drop-shadow">
                      {activePillar.imageCaption}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Active Card Detailed Narrative & Progress Timeline (5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              
              {/* Pillar Number & Category Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                    {activePillar.number}
                  </span>
                  <div>
                    <span className="text-[12px] font-extrabold uppercase tracking-widest text-emerald-900 block">
                      Core Company Value
                    </span>
                    <span className="text-[13px] text-gray-500 font-medium">
                      Mindtech Core Capability
                    </span>
                  </div>
                </div>

                {/* Continuous Automated Progress Indicator Bar */}
                <div className="w-28 sm:w-36 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    key={`about-prog-${activeIndex}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500"
                  />
                </div>
              </div>

              {/* Pillar Title & Content with Smooth Animated Entry */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <h3 className="text-[25px] sm:text-[30px] font-black text-[#072414] leading-tight">
                    {activePillar.title}
                  </h3>

                  <p className="text-[15.5px] sm:text-[16.5px] font-semibold text-emerald-800">
                    {activePillar.subtitle}
                  </p>

                  <p className="text-[15.5px] sm:text-[17px] text-gray-700 leading-relaxed font-normal">
                    {activePillar.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-1">
                    {activePillar.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-[14px] sm:text-[15px] text-gray-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activePillar.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-950 text-[13.5px] font-bold border border-emerald-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Inquiry Action & Slide Controls */}
              <div className="pt-2.5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                <button
                  onClick={() => onOpenInquiry(`Inquiry: ${activePillar.title}`)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white text-[14px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <span>Inquire About {activePillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Slide Switcher Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveIndex((current) => (current - 1 + ABOUT_PILLARS.length) % ABOUT_PILLARS.length)}
                    className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 transition-colors cursor-pointer"
                    aria-label="Previous capability"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-1.5 px-1">
                    {ABOUT_PILLARS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeIndex === i ? 'w-6 bg-emerald-700' : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveIndex((current) => (current + 1) % ABOUT_PILLARS.length)}
                    className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 transition-colors cursor-pointer"
                    aria-label="Next capability"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
