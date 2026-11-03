import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  FlaskConical, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Package,
  Clock
} from 'lucide-react';

interface SampleEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productCode?: string;
  supplierName?: string;
}

export const SampleEnquiryModal: React.FC<SampleEnquiryModalProps> = ({
  isOpen,
  onClose,
  productName = '',
  productCode = '',
  supplierName = 'Greentech Biotechnologies'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    city: '',
    application: 'Skin Care & Anti-Ageing',
    sampleSize: '50g Standard Bench Sample',
    message: '',
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `MND-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 text-left">
        <div className="fixed inset-0" onClick={handleResetAndClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#072414] via-[#0c4024] to-emerald-950 text-white p-5 sm:p-6 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                B2B SAMPLE &amp; TDS REQUEST DISPATCH
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Technical Sample Enquiry
              </h3>
              {productName && (
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-200 pt-0.5">
                  <span className="font-bold">{productName}</span>
                  {productCode && <span>({productCode})</span>}
                  <span>· {supplierName}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-7">
            {submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-[#072414]">
                    Sample Request Registered
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                    Your technical sample ticket has been assigned to our Central Bawana Warehouse team in Delhi.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-mono text-emerald-950 space-y-1 inline-block">
                  <span className="text-gray-500 block text-[11px]">DISPATCH REFERENCE NUMBER</span>
                  <span className="text-lg font-black text-emerald-900 tracking-wider block">{ticketId}</span>
                  <span className="text-emerald-700 block text-[11px]">Item: {productName || 'Specialty Cosmetic Active'}</span>
                </div>

                <div className="text-xs text-gray-500 flex items-center justify-center space-x-1.5 pt-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Expected dispatch confirmation within 24 to 48 hours.</span>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="w-full mt-4 px-5 py-3 rounded-full bg-[#072414] hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Catalogue
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Priya Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      Corporate / Lab Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      Company / Cosmetic Brand *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aura Naturals Lab"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      City &amp; State (India)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-xs">
                      Target Application
                    </label>
                    <select
                      value={formData.application}
                      onChange={e => setFormData({ ...formData, application: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs bg-white"
                    >
                      <option value="Skin Care & Anti-Ageing">Skin Care &amp; Anti-Ageing</option>
                      <option value="Hair Care & Scalp Treatments">Hair Care &amp; Scalp Treatments</option>
                      <option value="Sun Care & Photoprotection">Sun Care &amp; Photoprotection</option>
                      <option value="Mild Cleansing & Baby Care">Mild Cleansing &amp; Baby Care</option>
                      <option value="Oral Care Formulations">Oral Care Formulations</option>
                      <option value="Commercial Pilot Batch">Commercial Pilot Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-xs">
                    Formulation Notes &amp; Technical Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about your target base (serum, emulsion, shampoo), batch scale, or specific TDS / CoA requests..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-xs"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 accent-emerald-700 rounded text-emerald-700 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[11px] text-gray-600 leading-tight cursor-pointer">
                    I authorize Mindtech Biotechnology to contact me regarding this B2B technical sample and formulation documentation.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Submit Sample &amp; TDS Request</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
