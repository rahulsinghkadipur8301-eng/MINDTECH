import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS, INDUSTRY_SEGMENTS } from '../data/companyData';
import { InquiryFormData } from '../types';
import { saveInquiry, getStoredInquiries, exportInquiriesToCSV, clearInquiries, StoredInquiry } from '../utils/inquiriesStore';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  FlaskConical, 
  Globe,
  Building2,
  MessageSquare,
  FileSpreadsheet,
  ExternalLink,
  Sparkles,
  Layers,
  Check,
  Copy,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface ContactSectionProps {
  initialSubject?: string;
}

const SAMPLE_QUICK_TAGS = [
  'Alpha Arbutin 99%',
  'Dimethiconol Silicone Blend',
  'Greentech Bio-Actives',
  'Ceramides NP/AP',
  'Ethylhexyl Triazone (UV Filter)',
  'Polyquaternium Conditioning',
  'Kojic Acid Dipalmitate',
  'Natural Esters & Emulsifiers'
];

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject }) => {
  const [formData, setFormData] = useState<InquiryFormData & { sampleQuantity: string; cityPin: string }>({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Sample Request',
    selectedCategory: initialSubject || 'Skin Care & Anti-Pigmentation',
    sampleQuantity: '100g Lab Bench Pack',
    cityPin: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastInquiry, setLastInquiry] = useState<StoredInquiry | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showInquiryLogModal, setShowInquiryLogModal] = useState(false);
  const [storedInquiries, setStoredInquiries] = useState<StoredInquiry[]>([]);

  useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({ ...prev, selectedCategory: initialSubject }));
    }
    setStoredInquiries(getStoredInquiries());
  }, [initialSubject]);

  const handleInquiryTypeSelect = (type: InquiryFormData['inquiryType']) => {
    setFormData(prev => ({ ...prev, inquiryType: type }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => {
      const current = prev.message;
      if (current.includes(tag)) {
        return prev;
      }
      const newMsg = current ? `${current}, ${tag}` : `Requested Materials: ${tag}`;
      return { ...prev, message: newMsg };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage inbox so owner/admin can review & export
    const saved = saveInquiry({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      inquiryType: formData.inquiryType,
      selectedCategory: formData.selectedCategory,
      sampleQuantity: formData.sampleQuantity,
      message: `${formData.message} | Location: ${formData.cityPin || 'Not Specified'}`
    });

    setLastInquiry(saved);
    setStoredInquiries(getStoredInquiries());
    setSubmitted(true);
  };

  const getMailtoUrl = () => {
    const recipient = 'Ajaypatel@mindtec.org.in';
    const cc = 'sales@mindtec.org.in,info@mindtec.org.in';
    const subject = encodeURIComponent(`[Mindtech Inquiry] ${formData.inquiryType} - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
`DEAR MINDTECH BIOTECHNOLOGY COMMERCIAL DESK,

Please process the following official inquiry:

--------------------------------------------------
INQUIRY DETAILS:
--------------------------------------------------
• Purpose: ${formData.inquiryType}
• Product / Category: ${formData.selectedCategory}
• Sample Pack Size: ${formData.sampleQuantity}
• Customer Name: ${formData.name}
• Company / Brand: ${formData.company}
• Email Address: ${formData.email}
• Phone / WhatsApp: ${formData.phone}
• Delivery City / PIN: ${formData.cityPin || 'N/A'}

• Requirements & Notes:
${formData.message || 'Standard COA, TDS and formulation guidance requested.'}
--------------------------------------------------

Sent via Mindtech Biotechnology Official Portal (https://www.mindtechbiotech.com)`
    );
    return `mailto:${recipient}?cc=${cc}&subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const rawNumber = '918368947579'; // Ajay Patel
    const text = encodeURIComponent(
`*MINDTECH BIOTECHNOLOGY - SAMPLE & INQUIRY DESK*

Hello Mr. Ajay Patel,

I would like to request *${formData.inquiryType}*:
• *Category*: ${formData.selectedCategory}
• *Pack Size*: ${formData.sampleQuantity}
• *Name*: ${formData.name}
• *Company*: ${formData.company}
• *Email*: ${formData.email}
• *Phone*: ${formData.phone}
• *City / PIN*: ${formData.cityPin || 'Delhi NCR / India'}
• *Details*: ${formData.message || 'Please share product specifications & COA.'}

Please confirm sample availability and dispatch timeline.`
    );
    return `https://wa.me/${rawNumber}?text=${text}`;
  };

  const handleCopySummary = () => {
    if (!lastInquiry) return;
    const summary = `Inquiry Ref: ${lastInquiry.id}\nClient: ${lastInquiry.name} (${lastInquiry.company})\nEmail: ${lastInquiry.email}\nPhone: ${lastInquiry.phone}\nType: ${lastInquiry.inquiryType}\nCategory: ${lastInquiry.selectedCategory}\nDetails: ${lastInquiry.message}`;
    navigator.clipboard.writeText(summary);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2500);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/90 relative border-t border-gray-200/80 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header with Symmetrical Hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 text-left">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border border-emerald-300/80 shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              <span>Direct Commercial & Formulation Support Desk</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#072414] tracking-tight leading-tight">
              Request Lab Samples & Formulation Support
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-normal leading-relaxed">
              Directly request bench-scale testing samples, technical dossiers (COA / TDS / SDS), or commercial contract pricing. All inquiries are delivered directly to Sales Head Ajay Patel at our central Bawana facility.
            </p>
          </div>

          {/* SLA & Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start lg:self-auto w-full sm:w-auto">
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Dispatch TAT: <strong>24-48 Hours</strong></span>
            </div>
            <button
              onClick={() => {
                setStoredInquiries(getStoredInquiries());
                setShowInquiryLogModal(true);
              }}
              className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Inquiries Log ({storedInquiries.length})</span>
            </button>
          </div>
        </div>

        {/* 2-Column Equal-Height Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Head Office, Owner Routing Transparency & Fast Lines (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6 text-left">
            
            {/* Owner & Sourcing Destination Card */}
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-md space-y-4 sm:space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 uppercase tracking-wider block mb-0.5">
                    Direct Commercial Channel
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#072414]">
                    Where Does Your Inquiry Go?
                  </h3>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-100/80 text-emerald-900 shrink-0">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Your request is directly routed to <strong>Mr. Ajay Patel (Sales Head)</strong> and our formulation chemists in Bawana, Delhi. We provide authentic laboratory samples with matching Certificate of Analysis (COA).
              </p>

              {/* Direct Hotlines Box */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block">
                  Direct Contacts:
                </span>
                
                {COMPANY_DETAILS.phones.map((phone, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-50/80 hover:bg-emerald-50/70 border border-gray-200/60 transition-colors gap-1.5 sm:gap-0">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="text-xs font-bold text-gray-800">{phone.label}</span>
                    </div>
                    <a 
                      href={`tel:${phone.raw}`} 
                      className="text-xs font-black text-emerald-950 hover:text-emerald-700 bg-white px-2.5 py-1 rounded-lg sm:rounded-xl border border-gray-200 shadow-2xs self-start sm:self-auto"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>

              {/* Direct Email Lines */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block">
                  Official Email Desks:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a 
                    href="mailto:Ajaypatel@mindtec.org.in" 
                    className="p-2.5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/60 flex items-center justify-between group"
                  >
                    <span className="font-semibold text-gray-800 truncate">Ajay Patel</span>
                    <span className="font-bold text-emerald-900 group-hover:underline ml-1 shrink-0">Email ↗</span>
                  </a>
                  <a 
                    href="mailto:sales@mindtec.org.in" 
                    className="p-2.5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/60 flex items-center justify-between group"
                  >
                    <span className="font-semibold text-gray-800 truncate">Sales Team</span>
                    <span className="font-bold text-emerald-900 group-hover:underline ml-1 shrink-0">Email ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Central Bawana Warehouse & Regulatory Details Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-md space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-800">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">Head Office & Central Warehouse</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500">Bawana Industrial City, New Delhi</p>
                </div>
              </div>

              <div className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-gray-200/70">
                <p className="font-bold text-gray-900">{COMPANY_DETAILS.name}</p>
                <p>{COMPANY_DETAILS.address.line1}</p>
                <p>{COMPANY_DETAILS.address.line2}</p>
                <p>{COMPANY_DETAILS.address.city} - {COMPANY_DETAILS.address.pin}, {COMPANY_DETAILS.address.country}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-semibold truncate">MSME: {COMPANY_DETAILS.regulatory.msmeNo}</span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-semibold truncate">Policy: {COMPANY_DETAILS.regulatory.policyNo}</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Quick Launch Strip */}
            <a
              href="https://wa.me/918368947579?text=Hello%20Ajay%20Patel,%20I%20am%20inquiring%20about%20Mindtech%20cosmetic%20raw%20materials%20and%20lab%20samples."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#0b4d2c] hover:bg-[#072414] text-white shadow-md transition-all group"
            >
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-400/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black">Direct WhatsApp to Sales Head</h4>
                  <p className="text-[10px] sm:text-[11px] text-emerald-200">+91 8368947579 (Ajay Patel) • Instant Chat</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

          </div>

          {/* RIGHT COLUMN: Interactive High-Precision Request Form (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-xl text-left flex-1 flex flex-col justify-between">
              
              {/* Form Title & Inquiry Type Switcher */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 uppercase tracking-wider block mb-0.5">
                    Official Formulation Requisition
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#072414]">
                    Submit Sample & Pricing Request
                  </h3>
                </div>

                {/* Inquiry Type Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1">
                  {[
                    { id: 'Sample Request', label: 'Lab Sample' },
                    { id: 'Price Quotation', label: 'Price Quote' },
                    { id: 'Technical / Formulation Support', label: 'Formulation' },
                    { id: 'Catalog Request', label: 'COA / Dossier' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleInquiryTypeSelect(tab.id as any)}
                      className={`px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
                        formData.inquiryType === tab.id
                          ? 'bg-[#072414] text-white shadow-xs ring-1 ring-emerald-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80 border border-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {submitted && lastInquiry ? (
                /* Post-Submission Success Panel with Direct WhatsApp & Mail Dispatch */
                <div className="py-8 px-6 rounded-3xl bg-emerald-50/90 border border-emerald-200 text-left space-y-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                        Requisition #{lastInquiry.id}
                      </span>
                      <h4 className="text-xl font-extrabold text-emerald-950">
                        Inquiry Successfully Recorded
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
                        Thank you, <strong>{lastInquiry.name}</strong> ({lastInquiry.company}). Your request has been cataloged in the Mindtech system.
                      </p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 text-xs space-y-2 text-gray-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Category:</span>
                        <span className="font-bold text-[#072414]">{lastInquiry.selectedCategory}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Pack Size:</span>
                        <span className="font-bold text-[#072414]">{lastInquiry.sampleQuantity}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">Assigned Sales Executive:</span>
                      <span className="font-bold text-[#072414]">Mr. Ajay Patel (+91 8368947579)</span>
                    </div>
                  </div>

                  {/* Immediate Action Buttons for User & Owner */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-emerald-950">
                      Send instantly to Ajay Patel's desk:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all text-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp ↗</span>
                      </a>

                      <a
                        href={getMailtoUrl()}
                        className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-[#072414] hover:bg-[#0c4024] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all text-center"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send Direct Email ↗</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={handleCopySummary}
                        className="text-xs text-gray-700 hover:text-emerald-900 font-bold flex items-center space-x-1.5 cursor-pointer"
                      >
                        {copiedTracking ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedTracking ? 'Summary Copied!' : 'Copy Inquiry Summary'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            company: '',
                            email: '',
                            phone: '',
                            inquiryType: 'Sample Request',
                            selectedCategory: 'Skin Care & Anti-Pigmentation',
                            sampleQuantity: '100g Lab Bench Pack',
                            cityPin: '',
                            message: ''
                          });
                        }}
                        className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
                      >
                        Submit Another Request →
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Input Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Quick Ingredient Tags */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Quick-Add Raw Material to Requisition:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_QUICK_TAGS.map((tag, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/80 transition-all cursor-pointer"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Full Name / Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Lotus Herbals / Formulations Lab"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 2-Column: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="chemist@brand.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 2-Column: Category & Sample Pack Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Application Category
                      </label>
                      <select
                        value={formData.selectedCategory}
                        onChange={(e) => setFormData({ ...formData, selectedCategory: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      >
                        {INDUSTRY_SEGMENTS.map((seg) => (
                          <option key={seg.id} value={seg.title}>{seg.title}</option>
                        ))}
                        <option value="Silicones & Silicone Specialties (SNS Silcos)">Silicones & Silicone Specialties</option>
                        <option value="Greentech Bio-Actives (France)">Greentech Bio-Actives</option>
                        <option value="Oleochemicals & Fatty Alcohols (VVF)">Oleochemicals & Fatty Alcohols</option>
                        <option value="Other Specialty Raw Materials">Other Specialty Raw Materials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Sample Pack / Batch Scale
                      </label>
                      <select
                        value={formData.sampleQuantity}
                        onChange={(e) => setFormData({ ...formData, sampleQuantity: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                      >
                        <option value="50g Bench Scale Pack">50g Bench Scale Lab Pack</option>
                        <option value="100g Lab Bench Pack">100g Standard Lab Pack (Recommended)</option>
                        <option value="250g Formulation Pilot Pack">250g Formulation Pilot Pack</option>
                        <option value="500g Trial Sample">500g Pilot Trial Sample</option>
                        <option value="1kg - 25kg Commercial Trial">1kg - 25kg Commercial Drum</option>
                        <option value="Full Commercial Batch (Drum / Pallet)">Full Commercial Batch (Pallet / FCL)</option>
                      </select>
                    </div>
                  </div>

                  {/* Delivery Location & Pin Code */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Delivery City & PIN Code (for Courier Dispatch)
                    </label>
                    <input
                      type="text"
                      value={formData.cityPin}
                      onChange={(e) => setFormData({ ...formData, cityPin: e.target.value })}
                      placeholder="e.g. Baddi (HP) - 173205 or Mumbai - 400001"
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Message & Specific INCI Requirements */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Material Specification & Target Formulation Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify required INCI names, active assay percentage, target dosage (%), viscosity requirements, or delivery deadline..."
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full inline-flex items-center justify-center space-x-2 text-sm sm:text-base font-extrabold text-white bg-[#072414] hover:bg-[#0c3c22] py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-emerald-300" />
                      <span>Submit Request to Formulation Desk</span>
                    </button>
                    
                    <p className="text-[11px] text-gray-500 text-center mt-2">
                      Inquiries directly delivered to Mr. Ajay Patel (Sales Head). All laboratory samples include certified batch COA & TDS.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Logs Modal (Accessible to Owner & Staff) */}
      {showInquiryLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#072414] text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Mindtech Commercial Admin</span>
                <h3 className="text-xl font-bold">Customer Requisition & Inquiries Log</h3>
              </div>
              <button
                onClick={() => setShowInquiryLogModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-200">
                <p className="text-xs text-gray-600">
                  Total recorded inquiries in this session: <strong>{storedInquiries.length}</strong>
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportInquiriesToCSV}
                    disabled={storedInquiries.length === 0}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Download CSV Export</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Clear all stored inquiries?')) {
                        clearInquiries();
                        setStoredInquiries([]);
                      }
                    }}
                    disabled={storedInquiries.length === 0}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-600 text-xs font-bold cursor-pointer"
                  >
                    Clear Log
                  </button>
                </div>
              </div>

              {storedInquiries.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <FlaskConical className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-medium">No inquiries recorded yet.</p>
                  <p className="text-xs text-gray-400">Fill out the sample request form to generate lead entries.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {storedInquiries.map((inq) => (
                    <div key={inq.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                          {inq.id}
                        </span>
                        <span className="text-gray-500 text-[11px]">
                          {new Date(inq.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-semibold text-gray-800">
                        <div>Client: <strong className="text-black">{inq.name}</strong></div>
                        <div>Company: <strong className="text-black">{inq.company}</strong></div>
                        <div>Phone: <a href={`tel:${inq.phone}`} className="text-emerald-800 hover:underline">{inq.phone}</a></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                        <div>Email: <a href={`mailto:${inq.email}`} className="text-emerald-800">{inq.email}</a></div>
                        <div>Category: <strong>{inq.selectedCategory}</strong> ({inq.sampleQuantity || 'Standard Pack'})</div>
                      </div>

                      {inq.message && (
                        <div className="p-2 bg-white rounded-xl border border-gray-200/70 text-gray-700">
                          {inq.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowInquiryLogModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-black cursor-pointer"
              >
                Close Log
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
