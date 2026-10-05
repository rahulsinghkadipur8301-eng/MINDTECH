import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe2, 
  Ship, 
  Plane, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Boxes, 
  Truck,
  ExternalLink
} from 'lucide-react';

interface SourcingNode {
  id: string;
  country: string;
  region: string;
  partnerOrHub: string;
  category: string;
  items: string[];
  transitTime: string;
  documentation: string[];
  coordinates: { xPercent: number; yPercent: number };
  badge: string;
}

const SOURCING_NODES: SourcingNode[] = [
  {
    id: 'france',
    country: 'France',
    region: 'Saint-Beauzire / Brittany Coast',
    partnerOrHub: 'Greentech France S.A.',
    category: 'Biotechnology & Marine Actives',
    items: ['HEBÉLYS®', 'REVERSKIN®', 'Cryo-extracted Plant Ferments', 'Marine Polysaccharides'],
    transitTime: 'Ocean Freight: 18-22 Days | Air Priority: 48h',
    documentation: ['Certificate of Analysis (COA)', 'ECOCERT / COSMOS Approval', 'Clinical Efficacy Dossiers'],
    coordinates: { xPercent: 47, yPercent: 32 },
    badge: 'Bio-Ferments & Actives'
  },
  {
    id: 'southeast-asia',
    country: 'Malaysia & SEA',
    region: 'Straits Industrial Cluster',
    partnerOrHub: 'Fine Organics & VVF Limited',
    category: 'Specialty Esters & Oleochemicals',
    items: ['Sustainable Emollients', 'Fatty Alcohols', 'Sulfate-Free Surfactants', 'Glyceryl Esters'],
    transitTime: 'Direct Maritime: 8-10 Days',
    documentation: ['RSPO Certified Mass Balance', 'Batch HPLC Assay', 'ISO 9001:2015 Spec Sheet'],
    coordinates: { xPercent: 78, yPercent: 58 },
    badge: 'Oleochemicals & Esters'
  },
  {
    id: 'east-asia',
    country: 'Japan & East Asia',
    region: 'Yokohama / Specialty Silicone Park',
    partnerOrHub: 'SNS Silcos Global',
    category: 'Specialty Silicones & Sensory Elastomers',
    items: ['Dimethicone Crosspolymers', 'Silicone Resins (MQ)', 'Volatile Cyclics Alternatives', 'Sensory Gels'],
    transitTime: 'Container Transit: 14-16 Days',
    documentation: ['High Purity ICP-MS Testing', 'REACH Compliance', 'Full INCI Dossier'],
    coordinates: { xPercent: 86, yPercent: 37 },
    badge: 'Specialty Silicones'
  },
  {
    id: 'usa-europe',
    country: 'USA & Europe',
    region: 'Global Chemical Corridors',
    partnerOrHub: 'Global Principals',
    category: 'Photoprotection & Functional Additives',
    items: ['Avobenzone & Octocrylene', 'Ethyl Ascorbic Acid (EAA)', 'Alpha Arbutin', 'Bio-Peptides'],
    transitTime: 'Direct Air & Ocean Alliances',
    documentation: ['US FDA / EU Cosmetics Reg Compliant', 'Heavy Metals < 5ppm Certificate'],
    coordinates: { xPercent: 24, yPercent: 35 },
    badge: 'UV Filters & Actives'
  }
];

export const GlobalSourcingMap: React.FC<{ onOpenInquiry: (topic?: string) => void }> = ({ onOpenInquiry }) => {
  const [selectedNode, setSelectedNode] = useState<SourcingNode>(SOURCING_NODES[0]);

  return (
    <section className="py-16 sm:py-24 bg-white text-gray-900 relative overflow-hidden border-b border-gray-200">
      
      {/* Background Soft Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Global Supply Chains (Video Scene 00:10)</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight font-['Outfit']">
              Direct Global Sourcing, <br />
              <span className="text-emerald-700">Responsive Local Support.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl font-normal leading-relaxed">
              We connect Indian cosmetic formulators with verified international ingredient manufacturers. Every shipment arrives directly at our centralized Bawana hub in New Delhi with complete batch documentation.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-3 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">Central Hub</span>
              <span className="text-xs sm:text-sm font-black text-[#072414]">Bawana, New Delhi - 110039</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MAP CONTAINER & DETAILS CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive World Map with Route Arcs (7 cols) */}
          <div className="lg:col-span-7 bg-[#072414] rounded-3xl p-6 sm:p-8 border border-emerald-950 text-white shadow-xl relative overflow-hidden">
            
            {/* Map Header */}
            <div className="flex items-center justify-between mb-4 border-b border-emerald-800/40 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                  Live Global Supply Ingress Lanes
                </span>
              </div>
              <span className="text-[11px] text-emerald-200/70 font-mono">
                Click any origin node
              </span>
            </div>

            {/* SVG Visual Map Canvas */}
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-[#04160d] border border-emerald-900/80">
              
              {/* Stylized Vector World Map Background */}
              <svg 
                viewBox="0 0 1000 600" 
                className="w-full h-full object-cover opacity-35"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Simplified Continents Silhouette */}
                <path
                  d="M150,120 Q180,100 240,110 T320,180 T260,260 T180,240 Z 
                     M220,310 Q260,340 280,420 T240,510 T180,450 T190,340 Z
                     M430,110 Q510,80 570,120 T620,200 T530,220 T440,170 Z
                     M450,240 Q520,260 560,340 T520,480 T460,450 T440,320 Z
                     M640,100 Q780,80 860,140 T920,260 T800,280 T680,200 Z
                     M780,360 Q860,380 900,450 T820,530 T750,460 Z"
                  fill="#104f2c"
                />
              </svg>

              {/* Central Destination Pin: INDIA / NEW DELHI BAWANA HUB */}
              <div 
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: '68%', top: '44%' }}
                title="Mindtech Central Distribution Hub - New Delhi"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-400 animate-ping absolute -inset-1 opacity-75" />
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-emerald-950 font-black shadow-2xl">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-emerald-400 whitespace-nowrap shadow-xl">
                  ★ BAWANA HUB (DELHI)
                </div>
              </div>

              {/* Dynamic Connecting Arcs to India Hub */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {SOURCING_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const destX = 68;
                  const destY = 44;
                  const midX = (node.coordinates.xPercent + destX) / 2;
                  const midY = Math.min(node.coordinates.yPercent, destY) - 14;

                  return (
                    <g key={`arc-${node.id}`}>
                      {/* Base curve line */}
                      <path
                        d={`M ${node.coordinates.xPercent} ${node.coordinates.yPercent} Q ${midX} ${midY} ${destX} ${destY}`}
                        fill="none"
                        stroke={isSelected ? '#34d399' : '#059669'}
                        strokeWidth={isSelected ? '0.8' : '0.4'}
                        strokeDasharray={isSelected ? 'none' : '2 2'}
                        opacity={isSelected ? 1 : 0.45}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Sourcing Origin Nodes Pins */}
              {SOURCING_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.coordinates.xPercent}%`, top: `${node.coordinates.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-400 text-emerald-950 ring-4 ring-emerald-400/40 scale-125' 
                        : 'bg-emerald-900 text-emerald-200 border border-emerald-500/60 hover:bg-emerald-700 hover:scale-110'
                    }`}
                    title={`${node.country} - ${node.category}`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-emerald-950">
                      •
                    </div>
                  </button>
                );
              })}

              {/* Node Label Badges on Map */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-emerald-800/40">
                <span>Active Route: {selectedNode.country} ➔ New Delhi Bawana Hub</span>
                <span className="text-emerald-400 font-bold">{selectedNode.transitTime}</span>
              </div>

            </div>

            {/* Quick Sourcing Selector Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {SOURCING_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      isSelected 
                        ? 'bg-emerald-500 text-emerald-950 border-emerald-400 shadow-md' 
                        : 'bg-emerald-950/70 text-emerald-200 border-emerald-800/50 hover:bg-emerald-900'
                    }`}
                  >
                    <span className="block text-[10px] font-mono uppercase opacity-75">{node.country}</span>
                    <span className="truncate block">{node.partnerOrHub}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right: Selected Node Details & Verification Guarantee (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-md text-left space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold uppercase">
                {selectedNode.badge}
              </span>
              <span className="text-xs font-mono text-gray-500">
                Direct Principal Alliance
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#072414] font-['Outfit']">
                {selectedNode.partnerOrHub}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-0.5">
                {selectedNode.region} • {selectedNode.country}
              </p>
            </div>

            {/* Key Products Sourced */}
            <div>
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider font-bold mb-2">
                Specialty Ingredients Sourced:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedNode.items.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-gray-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation & Transit Protocol */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-1">
                  Documentation & Quality Release:
                </span>
                <div className="space-y-1">
                  {selectedNode.documentation.map((doc, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-gray-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                <span className="font-bold text-gray-800 block">Warehouse Arrival Standard:</span>
                <p className="text-gray-600 mt-0.5">
                  Climate-managed customs clearance, quarantined lot sampling, assay re-check, and tamper-proof drum resealing.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onOpenInquiry(`Inquiry for ${selectedNode.partnerOrHub} Ingredients`)}
              className="w-full py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Inquire About {selectedNode.country} Product Lines</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
