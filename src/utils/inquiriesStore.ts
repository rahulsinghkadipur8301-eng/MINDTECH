import { InquiryFormData } from '../types';

export interface StoredInquiry extends InquiryFormData {
  id: string;
  submittedAt: string;
  sampleQuantity?: string;
  status: 'Pending Review' | 'Dispatched' | 'Contacted';
}

const INQUIRIES_STORAGE_KEY = 'mindtech_inquiries_log';

export const getStoredInquiries = (): StoredInquiry[] => {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse inquiries:', e);
    return [];
  }
};

export const saveInquiry = (inquiry: InquiryFormData & { sampleQuantity?: string }): StoredInquiry => {
  const existing = getStoredInquiries();
  const newEntry: StoredInquiry = {
    ...inquiry,
    id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    submittedAt: new Date().toISOString(),
    status: 'Pending Review'
  };
  
  const updated = [newEntry, ...existing];
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save inquiry to storage:', e);
  }
  return newEntry;
};

export const clearInquiries = () => {
  localStorage.removeItem(INQUIRIES_STORAGE_KEY);
};

export const exportInquiriesToCSV = () => {
  const inquiries = getStoredInquiries();
  if (inquiries.length === 0) return;

  const headers = ['Inquiry ID', 'Date & Time', 'Name', 'Company', 'Email', 'Phone', 'Type', 'Category', 'Quantity', 'Message'];
  const rows = inquiries.map(inq => [
    `"${inq.id}"`,
    `"${new Date(inq.submittedAt).toLocaleString()}"`,
    `"${(inq.name || '').replace(/"/g, '""')}"`,
    `"${(inq.company || '').replace(/"/g, '""')}"`,
    `"${(inq.email || '').replace(/"/g, '""')}"`,
    `"${(inq.phone || '').replace(/"/g, '""')}"`,
    `"${(inq.inquiryType || '').replace(/"/g, '""')}"`,
    `"${(inq.selectedCategory || '').replace(/"/g, '""')}"`,
    `"${(inq.sampleQuantity || 'Standard Lab Pack').replace(/"/g, '""')}"`,
    `"${(inq.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Mindtech_Inquiries_Log_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
