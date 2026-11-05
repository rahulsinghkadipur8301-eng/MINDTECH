import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  MessageSquare, 
  ArrowUpRight, 
  ExternalLink,
  Award,
  FileText,
  Truck
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject }) => {
  const [selectedTopic] = useState<string>(
    initialSubject || 'General Formulation & Raw Material Inquiry'
  );

  const getWhatsAppUrl = (topicText?: string) => {
    const rawNumber = '918368947579'; // Ajay Patel
    const topic = topicText || selectedTopic;
    const text = encodeURIComponent(
      `*MINDTECH BIOTECHNOLOGY - COMMERCIAL DESK*\n\nHello Mr. Ajay Patel,\n\nI am contacting Mindtech regarding *${topic}*.\n\nPlease share availability, certified batch COA, and pricing details.`
    );
    return `https://wa.me/${rawNumber}?text=${text}`;
  };

  const getMailtoUrl = (topicText?: string) => {
    const recipient = 'Ajaypatel@mindtec.org.in';
    const cc = 'sales@mindtec.org.in';
    const topic = topicText || selectedTopic;
    const subject = encodeURIComponent(`[Mindtech Technical Inquiry] ${topic}`);
    const body = encodeURIComponent(
      `DEAR MR. AJAY PATEL,\nMINDTECH BIOTECHNOLOGY COMMERCIAL DESK,\n\nI am writing to inquire about the following requirement:\n\n• Topic / Product Line: ${topic}\n• Required Documentation: Certificate of Analysis (COA) & Technical Data Sheet (TDS)\n• Sample Request / Quantity: Standard Bench Test Pack\n\nPlease let us know product availability and delivery timelines.\n\nBest regards,\n[Your Name & Company Name]\n[Contact Number]`
    );
    return `mailto:${recipient}?cc=${cc}&subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50/90 via-white to-gray-50/90 relative border-t border-gray-200/90 overflow-hidden text-left">
      
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-gray-200/80">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-300">
              <Building2 className="w-3.5 h-3.5 text-emerald-800" />
              <span>Direct Commercial &amp; Facility Headquarters</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072414] tracking-tight leading-tight font-['Outfit']">
              Commercial Headquarters &amp; Central Facility Hub
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              Directly connect with <strong>Sales Head Ajay Patel</strong> and our technical team at the Bawana Industrial Area facility for sample requisitions, commercial orders, and confidential formulation advisory.
            </p>
          </div>

          {/* Quick SLA Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-auto">
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-xs">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Logistics: <strong>Bawana Central Stock</strong></span>
            </div>
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Certified COA &amp; TDS</span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN BALANCED FACILITY & COMMERCIAL SUITE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* COLUMN 1: DIRECT LEADERSHIP & SALES DESK (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-gray-200/90 shadow-md p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  EXECUTIVE SALES DESK
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                  Direct Line
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#072414] font-['Outfit']">
                  Mr. Ajay Patel
                </h3>
                <p className="text-sm sm:text-base font-semibold text-emerald-700 mt-0.5">
                  Head of Sales &amp; Business Development
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Direct commercial point of contact for raw material sample dispatch, price negotiations, import timelines, and technical documentation.
                </p>
              </div>

              {/* Direct Calling Numbers */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Direct Calling Numbers:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMPANY_DETAILS.phones.map((phone, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/70 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-xl bg-white text-emerald-800 shadow-2xs">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{phone.label}</span>
                      </div>
                      <a 
                        href={`tel:${phone.raw}`}
                        className="text-xs font-black text-emerald-950 hover:text-emerald-700 bg-white px-2.5 py-1 rounded-xl border border-gray-200 shadow-2xs"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Email Desks */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Official Email Lines:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <a 
                    href={getMailtoUrl('Ajay Patel Sales Desk')}
                    className="p-3 rounded-2xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/70 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-semibold text-gray-800 truncate">Ajaypatel@mindtec.org.in</span>
                    </div>
                    <span className="font-bold text-emerald-900 group-hover:underline shrink-0 ml-1">Email ↗</span>
                  </a>

                  <a 
                    href={getMailtoUrl('General Sales & Technical Desk')}
                    className="p-3 rounded-2xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/70 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-semibold text-gray-800 truncate">sales@mindtec.org.in</span>
                    </div>
                    <span className="font-bold text-emerald-900 group-hover:underline shrink-0 ml-1">Email ↗</span>
                  </a>
                </div>
              </div>

              {/* Regulatory & Enterprise Verification */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs uppercase tracking-wider font-mono">Government &amp; Enterprise Governance</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between">
                    <span className="text-gray-500 font-bold">Govt. MSME Reg:</span>
                    <span className="font-bold text-[#072414]">{COMPANY_DETAILS.regulatory.msmeNo}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between">
                    <span className="text-gray-500 font-bold">Commercial Policy:</span>
                    <span className="font-bold text-[#072414]">{COMPANY_DETAILS.regulatory.policyNo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Instant WhatsApp & Direct Email */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-[#0b4d2c] hover:bg-[#072414] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Ajay Patel</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={getMailtoUrl()}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-emerald-200" />
                  <span>Direct Inquiry Email</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: CENTRAL BAWANA WAREHOUSE & STOCK HUB (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-gray-200/90 shadow-md p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  CENTRAL STOCK &amp; LOGISTICS
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-900 text-[11px] font-bold">
                  Bawana Hub
                </span>
              </div>

              {/* Authentic Warehouse Photograph */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs group">
                <img
                  src="/facilities/mindtech-warehouse-hub.webp"
                  alt="Mindtech Central Warehouse & Stock Hub in Bawana, Delhi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
                  <span className="font-mono font-bold text-xs">Bawana Industrial City · Central Stock</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-[11px] font-extrabold text-emerald-950">
                    Pan-India Logistics
                  </span>
                </div>
              </div>

              {/* Verified Physical Address */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs text-gray-700">
                <div className="flex items-center justify-between pb-1.5 border-b border-gray-200/60">
                  <span className="font-extrabold text-gray-900 text-sm">Head Office &amp; Central Hub</span>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100/70 px-2 py-0.5 rounded">
                    HQ DESK
                  </span>
                </div>
                <p className="font-bold text-[#072414] text-xs sm:text-sm">{COMPANY_DETAILS.name}</p>
                <p className="text-gray-600">{COMPANY_DETAILS.address.line1}</p>
                <p className="text-gray-600">{COMPANY_DETAILS.address.line2}</p>
                <p className="text-gray-800 font-semibold">
                  {COMPANY_DETAILS.address.city} - {COMPANY_DETAILS.address.pin}, {COMPANY_DETAILS.address.country}
                </p>
              </div>

              {/* Operational Capabilities Checklist */}
              <div className="space-y-2 text-xs text-gray-700 pt-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Climate-managed buffer inventory for 250+ active SKUs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>UN-certified spill-proof chemical drums &amp; tamper seals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Working Hours: Mon – Sat (9:30 AM – 6:30 PM IST)</span>
                </div>
              </div>
            </div>

            {/* Google Maps / Directions Action */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Bawana+Industrial+Area+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold border border-gray-200 transition-all shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>View Facility on Google Maps</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
