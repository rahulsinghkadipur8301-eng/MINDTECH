import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface DirectoryItem {
  id: string;
  number: string;
  label: string;
  href: string;
  description: string;
  image: string;
  tag: string;
}

const DIRECTORY_ITEMS: DirectoryItem[] = [
  {
    id: 'hero',
    number: '01',
    label: 'Home',
    href: '#hero',
    description: 'Connecting Global Science with Cosmetic Innovation and Nature.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    tag: 'Welcome & Overview'
  },
  {
    id: 'about',
    number: '02',
    label: 'About Us',
    href: '#about',
    description: 'Premier importer & distributor of high-performance personal care raw materials.',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1000&q=80',
    tag: 'Corporate & MSME'
  },
  {
    id: 'industries',
    number: '03',
    label: 'Industries & Applications',
    href: '#industries',
    description: 'Skin Care, Hair Therapy, Sun Photoprotection, Color Makeup & Bio-Actives.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    tag: '6 Core Sectors'
  },
  {
    id: 'partners',
    number: '04',
    label: 'Global Partners',
    href: '#partners',
    description: 'Direct partnerships with Fine Organics, VVF Limited, SNS Silcos & Greentech.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1000&q=80',
    tag: 'Tier-1 Principals'
  },
  {
    id: 'why-us',
    number: '05',
    label: 'Why Choose Us',
    href: '#why-us',
    description: 'The 6 Strategic Pillars of Mindtech: Sourcing, Quality, COA & Technical Support.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    tag: 'The Mindtech Edge'
  },
  {
    id: 'contact',
    number: '06',
    label: 'Contact',
    href: '#contact',
    description: 'Central Warehouse Hub in Bawana, Delhi, Hotlines & Bench Sample Request Desk.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    tag: 'Bawana Hub & Desk'
  }
];

export const DirectoryIndex: React.FC = () => {
  const [activeItem, setActiveItem] = useState<DirectoryItem>(DIRECTORY_ITEMS[0]);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleScrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="directory-index" 
      className="py-14 sm:py-20 bg-white relative border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Quick Navigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#072414] tracking-tight">
              Explore Mindtech Portfolio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
            Quick jump to any section or hover to preview key formulation and corporate highlights.
          </p>
        </div>

        {/* 2-Column Minimalist Interactive Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Minimalist Animated Link List matching uploaded screenshot */}
          <div className="lg:col-span-7 divide-y divide-gray-100/90 text-left">
            {DIRECTORY_ITEMS.map((item, index) => {
              const isSelected = activeItem.id === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <button
                    onClick={() => handleScrollTo(item.href)}
                    onMouseEnter={() => {
                      setActiveItem(item);
                      setIsHovering(true);
                    }}
                    onFocus={() => {
                      setActiveItem(item);
                      setIsHovering(true);
                    }}
                    className={`w-full py-4.5 sm:py-5.5 px-3 sm:px-4 rounded-2xl flex items-center justify-between transition-all duration-300 group cursor-pointer text-left ${
                      isSelected && isHovering
                        ? 'bg-emerald-50/70 text-emerald-950 shadow-2xs'
                        : 'hover:bg-gray-50/80 text-gray-900'
                    }`}
                  >
                    {/* Item Name with optional index pill */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className={`text-xs font-mono font-semibold transition-colors ${
                        isSelected && isHovering ? 'text-emerald-700 font-bold' : 'text-gray-400'
                      }`}>
                        {item.number}
                      </span>
                      <span className={`text-lg sm:text-2xl font-bold tracking-tight transition-all duration-200 ${
                        isSelected && isHovering 
                          ? 'text-emerald-950 translate-x-1 font-extrabold' 
                          : 'text-gray-900 group-hover:text-emerald-900 group-hover:translate-x-0.5'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Right Minimal Chevron > with Smooth Slide Animation (Matching Screenshot) */}
                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:inline-block text-xs font-medium text-emerald-800/80 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.tag}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSelected && isHovering
                          ? 'bg-emerald-700 text-white translate-x-1 shadow-sm'
                          : 'text-gray-400 group-hover:text-emerald-800 group-hover:translate-x-1 group-hover:bg-white'
                      }`}>
                        <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Visual Preview with High-Res Image & Description */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden bg-[#072414] shadow-xl border border-emerald-900/40 aspect-[4/3.2] p-6 flex flex-col justify-between text-left group">
              
              {/* Dynamic Image with Smooth Fade & Zoom on Active Change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072414] via-[#072414]/60 to-black/30" />
                </motion.div>
              </AnimatePresence>

              {/* Top Floating Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-950 uppercase tracking-wider shadow-sm flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{activeItem.tag}</span>
                </span>
                <span className="text-xs font-mono font-bold text-white/80 bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                  {activeItem.number} / 06
                </span>
              </div>

              {/* Bottom Info Card */}
              <div className="relative z-10 space-y-2 pt-12">
                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {activeItem.label}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                  {activeItem.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleScrollTo(activeItem.href)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer group/link"
                  >
                    <span>Jump directly to section</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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
