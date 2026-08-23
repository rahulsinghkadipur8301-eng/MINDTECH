export interface IndustrySegment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  keyProductsSummary: string[];
}

export interface GlobalPartner {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  image?: string;
  logoUrl?: string;
  categories: string[];
  keyStrengths: string[];
}

export interface WhyUsPillar {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

export interface InquiryFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: 'Sample Request' | 'Price Quotation' | 'Technical / Formulation Support' | 'Catalog Request' | 'General Inquiry';
  selectedCategory?: string;
  message: string;
}
