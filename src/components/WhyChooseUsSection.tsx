import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { 
  Globe, 
  Boxes, 
  FlaskConical, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Building2,
  Award
} from 'lucide-react';

interface AdvantageCard {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  highlight: string;
  stats: string;
}

const ADVANTAGE_CARDS: AdvantageCard[] = [
  {
    id: 'global-sourcing',
    number: '01',
    title: 'Global Direct Sourcing',
    tagline: 'Tier-1 International Partnerships',
    description: 'Direct manufacturer alliances with Fine Organics, VVF Limited, SNS Silcos, and Greentech France for unadulterated cosmetic ingredients.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    badge: 'Direct Sourcing',
    highlight: 'No intermediaries, direct factory supply',
    stats: '100% Factory Direct'
  },
  {
    id: 'quality-assurance',
    number: '02',
    title: 'Rigorous Analytical Quality',
    tagline: 'Batch Testing & Purity Verification',
    description: 'Every consignment undergoes stringent physicochemical parameter verification, HPLC active assaying, heavy metal analysis, and COA compliance.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    badge: 'QC Standard',
    highlight: 'CoA & TDS provided with each delivery',
    stats: 'Zero Defect Policy'
  },
  {
    id: 'bawana-inventory',
    number: '03',
    title: 'Central Logistics & Stock Hub',
    tagline: 'Climate-Managed Delhi Warehouse',
    description: 'Modern central warehousing facility in Bawana Industrial Area, Delhi, maintaining deep buffer inventory for continuous, uninterrupted supply.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Buffer Stock',
    highlight: 'Ready inventory in NCR for urgent demands',
    stats: '24-48 Hr Dispatch'
  },
  {
    id: 'formulation-support',
    number: '04',
    title: 'Technical R&D & Formulation',
    tagline: 'Bench Sampling & Solubility Guidance',
    description: 'Our cosmetic chemists assist clients with optimum phase incorporation, HLB balancing, preservative synergies, and sample trial prototypes.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    badge: 'Lab Formulation',
    highlight: 'Free bench sample kit availability',
    stats: 'Active Chemist Support'
  },
  {
    id: 'regulatory-msme',
    number: '05',
    title: 'Regulatory & MSME Credibility',
    tagline: 'Full Compliance & Documentation',
    description: 'Registered MSME enterprise offering GST invoicing, REACH statements, Cruelty-Free certifications, and transparent compliance paperwork.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    badge: 'Certified Enterprise',
    highlight: 'Transparent compliance and tax invoicing',
    stats: 'Govt Registered MSME'
  },
  {
    id: 'nationwide-reach',
    number: '06',
    title: 'Agile Nationwide Delivery',
    tagline: 'Safe Multi-Modal Freight Network',
    description: 'Reliable multi-carrier logistics guaranteeing leak-proof, climate-safe transit of liquid silicones, actives, and solid surfactants across India.',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Pan-India Freight',
    highlight: 'Spill-proof UN-certified packaging',
    stats: 'Pan-India Reach'
  }
];

export const WhyChooseUsSection: React.FC<{ onOpenInquiry: (topic?: string) => void }> = ({ onOpenInquiry }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="why-us" className="py-14 sm:py-20 bg-white relative text-left overflow-hidden border-t border-gray-100">
      
      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={ADVANTAGE_CARDS.map(c => ({
          src: c.image,
          title: c.title,
          category: c.badge,
          description: c.description
        }))}
        initialIndex={lightboxIndex}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Competitive Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072414] tracking-tight">
              Why Choose Mindtech Biotechnology
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-3xl font-normal">
              Built on pharmaceutical-grade quality rigor, direct manufacturing alliances, and dependable NCR stockholding.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Mindtech Corporate Partnership')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-white bg-[#072414] hover:bg-[#0c4024] px-6 py-3 rounded-full transition-all cursor-pointer self-start md:self-auto shadow-md hover:shadow-lg"
          >
            <span>Partner With Mindtech</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ADVANTAGE_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image & Number Badge */}
              <div 
                onClick={() => handleOpenLightbox(index)}
                className="relative h-44 sm:h-48 overflow-hidden cursor-pointer bg-[#072414]"
                title="Click to view full-screen high-res image"
              >
                <ImageWithFallback
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Number Watermark Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-xl bg-white/90 backdrop-blur-md text-[#072414] text-xs font-mono font-black flex items-center justify-center shadow-xs">
                    {card.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    {card.badge}
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Title & Stats */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left pointer-events-none">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow">
                    {card.title}
                  </h3>
                  <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                    {card.stats}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 text-left">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                <div className="flex items-center space-x-2 text-xs font-medium text-emerald-900 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">{card.highlight}</span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 font-mono">Pillar {card.number}/06</span>
                  <button
                    onClick={() => onOpenInquiry(`Inquiry - ${card.title}`)}
                    className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Explore Spec</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
