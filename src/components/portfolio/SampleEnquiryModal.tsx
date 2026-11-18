import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Package, Receipt, Mail } from 'lucide-react';

interface SampleEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productCode?: string;
  productInci?: string;
  dosage?: string;
  supplierName?: string;
  initialMode?: 'sample' | 'quotation';
  onOpenEmailDesk?: (customMessage: string) => void;
}

export const SampleEnquiryModal: React.FC<SampleEnquiryModalProps> = ({
  isOpen,
  onClose,
  productName = '',
  productCode = '',
  productInci = '',
  dosage = '',
  supplierName = 'Greentech Biotechnologies',
  initialMode = 'sample',
  onOpenEmailDesk,
}) => {
  const isGreentechSupplier = /greentech/i.test(supplierName || '');
  const packSizeOptions = useMemo(
    () =>
      isGreentechSupplier
        ? ['1 kg Pack Size', '5 kg Pack Size']
        : ['50 kg Pack Size', '190 kg Pack Size'],
    [isGreentechSupplier]
  );

  const samplePackOptions = useMemo(
    () => [
      '100g Certified Bench Sample',
      '50g Bench Sample',
      '250g Pilot Evaluation Pack',
    ],
    []
  );

  const [mode, setMode] = useState<'sample' | 'quotation'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    sampleSize: '100g Certified Bench Sample',
    commercialQty: packSizeOptions[0],
    notes: '',
  });

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData((prev) => ({
        ...prev,
        commercialQty: packSizeOptions.includes(prev.commercialQty)
          ? prev.commercialQty
          : packSizeOptions[0],
      }));
    }
  }, [isOpen, initialMode, packSizeOptions]);

  if (!isOpen) return null;

  const isQuote = mode === 'quotation';
  const activePack = isQuote ? formData.commercialQty : formData.sampleSize;
  const resolvedProductTitle = productName || `${supplierName} Portfolio`;

  const buildCustomWhatsAppMessage = () => {
    const headerTitle = isQuote
      ? '*MINDTECH BIOTECHNOLOGY - PRICE QUOTATION REQUEST*'
      : '*MINDTECH BIOTECHNOLOGY - CERTIFIED SAMPLE (100g) REQUISITION*';

    const lines = [
      headerTitle,
      '',
      `Product: *${resolvedProductTitle}*${productCode ? ` (${productCode})` : ''}`,
      productInci ? `INCI: ${productInci}` : null,
      `Principal: ${supplierName}`,
      isQuote ? `Pack Size: ${activePack}` : `Sample Pack Size: ${activePack}`,
      '',
      `Chemist / Contact: ${formData.name.trim() || 'Formulator'}`,
      `Company / Brand: ${formData.company.trim() || 'Not specified'}`,
      `WhatsApp / Phone: ${formData.phone.trim() || 'Not specified'}`,
      `Delivery City, PIN Code & Notes: ${formData.notes.trim() || 'Please share official confirmation'}`,
      '',
      isQuote
        ? 'Please share GST commercial quotation, Pack Size pricing, lead time, COA & TDS.'
        : 'Please dispatch certified sample with verified batch COA & TDS.',
    ].filter((line): line is string => line !== null);

    return lines.join('\n');
  };

  const buildDeskSummary = () => {
    const prefix = isQuote
      ? `Quotation Request (${activePack})`
      : `Certified Sample (${activePack}) Request`;

    const parts = [
      `${prefix}: ${resolvedProductTitle}${productCode ? ` (${productCode})` : ''}`,
      productInci ? `INCI: ${productInci}` : '',
      `Principal: ${supplierName}`,
      formData.name.trim() ? `Contact: ${formData.name.trim()}` : '',
      formData.company.trim() ? `Company: ${formData.company.trim()}` : '',
      formData.phone.trim() ? `Phone: ${formData.phone.trim()}` : '',
      formData.notes.trim() ? `Delivery / Notes: ${formData.notes.trim()}` : '',
    ].filter(Boolean);

    return parts.join(' | ');
  };

  const whatsAppUrl = `https://wa.me/918368947579?text=${encodeURIComponent(
    buildCustomWhatsAppMessage()
  )}`;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = whatsAppUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleRedirectToEmailDesk = () => {
    const customSummary = buildDeskSummary();
    onClose();
    if (onOpenEmailDesk) {
      onOpenEmailDesk(customSummary);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 text-left"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1 pr-8">
            <span className="text-xs font-mono font-bold text-[#70a83b] uppercase tracking-wider block">
              {isQuote ? 'Commercial Quotation Desk' : 'Official Formulation Requisition'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#072414] font-['Outfit']">
              {isQuote
                ? 'Request Commercial Quotation & COA'
                : 'Request Certified Sample (100g) & COA'}
            </h3>
            <p className="text-xs text-gray-600">
              Directly handled via the Central Bawana Hub with complete batch traceability and GST documentation.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-gray-100 border border-gray-200 text-xs">
            <button
              type="button"
              onClick={() => setMode('sample')}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                !isQuote
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Request Certified Sample (100g)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('quotation')}
              className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                isQuote
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Request Quotation</span>
            </button>
          </div>

          {/* Product / Principal Context Card */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <div className="font-bold text-[#072414] flex items-center justify-between gap-2">
              <span>{resolvedProductTitle}</span>
              {productCode && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white text-emerald-900 border border-emerald-200 shrink-0">
                  {productCode}
                </span>
              )}
            </div>
            {productInci && (
              <div className="text-gray-600 font-mono text-[11px] truncate">
                INCI: {productInci}
              </div>
            )}
            <div className="text-emerald-800 font-semibold text-[11px]">
              Principal: {supplierName}
              {dosage ? ` · Dosage: ${dosage}` : ''} · Includes verified batch COA &amp; TDS.
            </div>
          </div>

          {/* Interactive Requisition & WhatsApp Redirect Form */}
          <form onSubmit={handleSubmitWhatsApp} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Company / Brand *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lotus Herbals / Formulations Lab"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  {isQuote ? 'Pack Size' : 'Sample Pack Size'}
                </label>
                {isQuote ? (
                  <select
                    value={formData.commercialQty}
                    onChange={(e) =>
                      setFormData({ ...formData, commercialQty: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                  >
                    {packSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={formData.sampleSize}
                    onChange={(e) =>
                      setFormData({ ...formData, sampleSize: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                  >
                    {samplePackOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Delivery City, PIN Code &amp; Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Baddi (HP) - 173205 or Mumbai - 400001"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>
                  {isQuote
                    ? 'Send Quotation on WhatsApp'
                    : 'Send Sample (100g) on WhatsApp'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleRedirectToEmailDesk}
                className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>Email / Desk Form</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
