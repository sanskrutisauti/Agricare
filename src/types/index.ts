export type Language = 'en' | 'mr' | 'hi';

export interface CropDiseaseResult {
  id: string;
  cropName: string;
  identifiedCrop: string;
  mostLikelyDisease: string;
  scientificName: string;
  visibleSymptoms: string[];
  possibleCauses: string[];
  developmentAndSpread: string;
  favouringConditions: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Unable to determine';
  confidenceLevel: 'Low' | 'Moderate' | 'High';
  confidenceNote: string;
  otherPossibleDiagnoses: { disease: string; reason: string }[];
  immediateSteps: string[];
  culturalAndPreventivePractices: string[];
  sanitationAndCropManagement: string[];
  biologicalOrIPMOptions: string[];
  fertilizerNutrientCorrection?: string;
  indicatedProducts: {
    name: string;
    type: string;
    purpose: string;
    approximatePriceINR: number;
    safeUsage: string;
  }[];
  estimatedTreatmentCostRangeINR: string;
  whenToSeekExpert: string;
  ppeAndSafety: string;
  isDemonstration: boolean;
  isValidCropImage: boolean;
  rejectionReason?: string;
  timestamp: string;
  imageUrl?: string;
  plantPart?: string;
}

export interface AssessmentQuestion {
  id: number;
  category: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  categoryName: Record<Language, string>;
  question: Record<Language, string>;
  description?: Record<Language, string>;
  type: 'select' | 'text' | 'file';
  options?: {
    value: string;
    label: Record<Language, string>;
  }[];
  required: boolean;
  placeholder?: Record<Language, string>;
}

export interface CareKitPlan {
  id: string;
  title: string;
  crop: string;
  variety?: string;
  growthStage: string;
  areaAcre: number;
  tier: 'budget' | 'balanced' | 'preventive';
  tierName: Record<Language, string>;
  tierDescription: Record<Language, string>;
  estimatedTotalCostINR: number;
  costPerAcreINR: number;
  healthConcerns: string[];
  immediateActions: string[];
  preventivePractices: string[];
  biologicalOptions: string[];
  fertilizersIndicated: string[];
  protectionProducts: string[];
  products: {
    id: string;
    name: string;
    quantity: string;
    costINR: number;
    purpose: string;
    inStock: boolean;
    productId?: string;
  }[];
  schedule: {
    dayOrTiming: string;
    task: string;
    instructions: string;
  }[];
  safetyPrecautions: string[];
  rationale: string;
  dateCreated: string;
}

export interface MarketProduct {
  id: string;
  name: string;
  brand: string;
  category: 'organic' | 'compost' | 'biofertiliser' | 'micronutrient' | 'soil_conditioner' | 'crop_specific';
  categoryLabel: Record<Language, string>;
  packSize: string;
  priceINR: number;
  pricePerUnit: string;
  availability: 'in_stock' | 'limited_stock' | 'out_of_stock';
  seller: string;
  sellerLocation: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: Record<Language, string>;
  suitableCrops: string[];
  intendedUse: Record<Language, string>;
  usageInstructions: Record<Language, string>;
  precautions: Record<Language, string>;
  isVerifiedGovtCoop: boolean;
  isDemonstration: boolean;
}

export interface CartItem {
  product: MarketProduct;
  quantity: number;
}

export interface FarmerProfile {
  id?: string;
  kisanId?: string;
  name: string;
  phone: string;
  pin?: string;
  state: string;
  district: string;
  village?: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  preferredLanguage: Language;
  createdAt?: string;
}

export interface FarmerTask {
  id: string;
  title: Record<Language, string>;
  crop: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category: string;
}

export interface OrderRecord {
  id: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  orderDate: string;
  paymentStatus: string;
  dispatchStatus: 'Processing' | 'Dispatched' | 'Delivered';
  deliveryAddress: string;
  contactNumber: string;
  isDemonstration: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  referencedScanId?: string;
}

export interface CropInfo {
  id: string;
  commonName: Record<Language, string>;
  scientificName: string;
  cropType: Record<Language, string>;
  image: string;
  climate: Record<Language, string>;
  temperature: string;
  soilPreferences: Record<Language, string>;
  soilPHRange: string;
  sowingTransplanting: Record<Language, string>;
  growthDurationDays: string;
  irrigation: Record<Language, string>;
  nutrients: Record<Language, string>;
  harvesting: Record<Language, string>;
  generalPrevention: Record<Language, string>;
  diseases: CropProblem[];
  pests: CropProblem[];
}

export interface CropProblem {
  id: string;
  commonName: Record<Language, string>;
  scientificName: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'deficiency';
  image: string;
  causes: Record<Language, string>;
  symptoms: Record<Language, string>;
  favouringConditions: Record<Language, string>;
  howItSpreads: Record<Language, string>;
  distinguishFromLookalikes: Record<Language, string>;
  preventionAndCulture: Record<Language, string>;
  biologicalControl: Record<Language, string>;
  treatmentApproach: Record<Language, string>;
  safetyPrecautions: Record<Language, string>;
  expertAssistanceThreshold: Record<Language, string>;
}
