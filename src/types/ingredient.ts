export type PartnerId = 'greentech' | 'sns-silcos' | 'vvf' | 'fine-organics' | 'general-range';

export type ProductType = 
  | 'bioactive' 
  | 'botanical-extract' 
  | 'pure-oil' 
  | 'plant-butter' 
  | 'oily-active' 
  | 'formulation-functional' 
  | 'range';

export interface SourceRef {
  file: string;
  pages: number[];
  editionYear?: number;
  note?: string;
}

export interface ClaimItem {
  text: string;
  studyType?: 'in-vivo' | 'in-vitro' | 'ex-vivo' | 'clinical' | 'sensory';
  context?: string;
  sourcePage: number;
}

export interface CertificationItem {
  name: string;
  evidencePage: number;
  appliesToVariantId?: string;
  verifiedAsOf?: string;
}

export interface MasterIngredient {
  id: string;
  slug: string;
  name: string;
  partner: PartnerId;
  productFamily?: string;
  productType: ProductType;
  parentFamilyId?: string;
  variantId?: string;
  supplierCode?: string;
  applications: string[];
  benefitTags: string[];
  shortBenefit?: string;
  description?: string;
  origin?: string;
  botanicalName?: string;
  plantPart?: string;
  extractionMethod?: string;
  grade?: string;
  originCountries?: string[];
  sensoryTouch?: string;
  fattyAcidProfile?: string;
  technologies?: string[];
  inci: string;
  useLevel?: string;
  physicalForm?: string;
  solubility?: string;
  mechanism?: string;
  cosmeticUses?: string[];
  studySummary?: string;
  claims?: ClaimItem[];
  certifications?: CertificationItem[];
  image?: string;
  datasheetUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
  sourceRefs: SourceRef[];
  reconciliationNotes?: string[];
  verificationStatus: 'verified' | 'needs-review' | 'draft';
  publicApproved: boolean;
  updatedAt?: string;
}

export interface ConcernCategory {
  id: string;
  label: string;
  iconName: string;
  count?: number;
  description?: string;
}
