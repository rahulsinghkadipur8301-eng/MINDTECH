import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { PillarVectorIconRenderer } from './PillarIcons';
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
    <section id="why-us" className="py-6 sm:py-8 bg-white relative text-left overflow-hidden border-t border-gray-100">
      
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-[13px] sm:text-[14.5px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Competitive Advantage</span>
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[46px] font-extrabold text-[#072414] tracking-tight">
              Why Choose Mindtech Biotechnology
            </h2>
            <p className="mt-1.5 text-[16px] sm:text-[17.5px] text-gray-600 max-w-3xl font-normal">
              Built on pharmaceutical-grade quality rigor, direct manufacturing alliances, and dependable NCR stockholding.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Mindtech Corporate Partnership')}
            className="inline-flex items-center space-x-2 text-[13px] sm:text-[14.5px] font-bold text-white bg-[#072414] hover:bg-[#0c4024] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all cursor-pointer self-start md:self-auto shadow-md hover:shadow-lg"
          >
            <span>Partner With Mindtech</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
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
                className="relative h-40 sm:h-44 overflow-hidden cursor-pointer bg-[#072414]"
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
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 text-[10.5px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    {card.badge}
                  </span>
                </div>

                {/* Custom Vector Icon Floating Medallion in Top-Right */}
                <div 
                  className="absolute top-3.5 right-3.5 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center p-1.5 group-hover:scale-110 group-hover:shadow-emerald-500/25 group-hover:shadow-lg transition-all duration-300"
                  title={`${card.title} - Pillar ${card.number}`}
                >
                  <PillarVectorIconRenderer pillarId={card.id} size={36} />
                </div>

                {/* Title & Stats */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left pointer-events-none">
                  <h3 className="text-[17px] sm:text-[19px] font-bold text-white leading-snug drop-shadow">
                    {card.title}
                  </h3>
                  <div className="text-[12px] text-emerald-300 font-semibold mt-0.5">
                    {card.stats}
                  </div>
                </div>
              </div>

              {/* Card Body with Prominent Custom Vector Icon Header */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 text-left bg-gradient-to-b from-white via-white to-emerald-50/20">
                {/* Pillar Header with Vector Icon */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/80 to-white border border-emerald-200/90 shadow-2xs flex items-center justify-center shrink-0 p-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-emerald-500/60 transition-all duration-300">
                    <PillarVectorIconRenderer pillarId={card.id} size={42} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        PILLAR {card.number}
                      </span>
                      <span className="text-[11px] text-gray-500 font-semibold truncate">
                        {card.tagline}
                      </span>
                    </div>
                    <h4 className="text-[16px] sm:text-[17.5px] font-extrabold text-[#072414] mt-0.5 leading-snug group-hover:text-emerald-900 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[13.5px] text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                <div className="flex items-center space-x-2 text-[13px] font-medium text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">{card.highlight}</span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[12px]">
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
