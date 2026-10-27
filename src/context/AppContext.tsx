import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  CropDiseaseResult,
  CareKitPlan,
  MarketProduct,
  CartItem,
  FarmerProfile,
  FarmerTask,
  OrderRecord,
} from '../types';
import { translations } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  t: (typeof translations)['en'];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: MarketProduct, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotalINR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Scans
  scans: CropDiseaseResult[];
  saveScan: (scan: CropDiseaseResult) => void;
  activeScanContext: CropDiseaseResult | null;
  setActiveScanContext: (scan: CropDiseaseResult | null) => void;
  
  // Care Kits
  savedKits: CareKitPlan[];
  saveKit: (kit: CareKitPlan) => void;
  deleteKit: (kitId: string) => void;
  renameKit: (kitId: string, newTitle: string) => void;
  
  // Tasks
  tasks: FarmerTask[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<FarmerTask, 'id' | 'completed'>) => void;
  
  // Orders
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  
  // Profile
  profile: FarmerProfile;
  updateProfile: (profile: FarmerProfile) => void;

  // Authentication & Farmer Accounts
  isAuthenticated: boolean;
  isGuest: boolean;
  registeredFarmers: FarmerProfile[];
  login: (phone: string, pin: string) => { success: boolean; message?: string };
  signup: (newProfile: Omit<FarmerProfile, 'id' | 'kisanId' | 'createdAt'> & { pin: string }) => { success: boolean; kisanId: string; message?: string };
  logout: () => void;
  quickDemoLogin: (farmerType: 'ramesh' | 'sunita') => void;
  guestAccess: () => void;
  
  // Floating Chat
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial realistic demo data for farmer engagement
const INITIAL_SCANS: CropDiseaseResult[] = [
  {
    id: 'scan-init-1',
    cropName: 'Tomato',
    identifiedCrop: 'Tomato (Solanum lycopersicum)',
    mostLikelyDisease: 'Early Blight (Alternaria Leaf Spot)',
    scientificName: 'Alternaria solani',
    visibleSymptoms: [
      'Concentric dark brown circular rings on lower leaves',
      'Yellow chlorotic halos around lesions',
    ],
    possibleCauses: ['Soil-borne fungal spores', 'Morning dew & dense foliage'],
    developmentAndSpread: 'Spreads via rain splash from soil to bottom leaves.',
    favouringConditions: 'Warm humid temperatures (24°C–29°C) with morning fog.',
    severity: 'Moderate',
    confidenceLevel: 'Moderate',
    confidenceNote: 'Concentric ring symptoms are typical of Alternaria, but laboratory culture recommended for certainty.',
    otherPossibleDiagnoses: [
      { disease: 'Septoria Leaf Spot', reason: 'Produces smaller circular spots with tiny dark pycnidia.' },
    ],
    immediateSteps: [
      'Prune infected leaves from bottom 6 inches',
      'Disinfect pruning tools with spirit',
    ],
    culturalAndPreventivePractices: [
      'Apply mulch to prevent soil splash',
      'Use drip irrigation instead of flood watering',
    ],
    sanitationAndCropManagement: ['Remove infected leaf debris from plot'],
    biologicalOrIPMOptions: ['Spray Trichoderma viride (5g/L) during evening hours'],
    indicatedProducts: [
      {
        name: 'Trichoderma viride 1.5% WP',
        type: 'Bio-Fungicide',
        purpose: 'Foliar shield against fungal pathogens',
        approximatePriceINR: 195,
        safeUsage: '5g/L in clean water',
      },
    ],
    estimatedTreatmentCostRangeINR: '₹350 – ₹550 per acre',
    whenToSeekExpert: 'If lesions spread to green fruit or stems within 3 days.',
    ppeAndSafety: 'Wear face mask during spraying.',
    isDemonstration: true,
    isValidCropImage: true,
    timestamp: '2026-10-24T10:15:00.000Z',
    imageUrl: '/images/crops/tomato_early_blight.jpg',
    plantPart: 'leaf',
  },
  {
    id: 'scan-init-2',
    cropName: 'Onion',
    identifiedCrop: 'Onion (Allium cepa)',
    mostLikelyDisease: 'Onion Thrips Damage & Early Purple Blotch',
    scientificName: 'Thrips tabaci / Alternaria porri',
    visibleSymptoms: [
      'Whitish silvery streaks on onion foliage',
      'Leaf tips drying and bending downwards',
    ],
    possibleCauses: ['Sap sucking by minute thrips in leaf whorls'],
    developmentAndSpread: 'Dry spells accelerate thrips breeding and leaf scarring.',
    favouringConditions: 'Dry warm spells followed by morning dew.',
    severity: 'Low',
    confidenceLevel: 'High',
    confidenceNote: 'Silvery feeding scars on waxy leaves are characteristic of thrips scraping.',
    otherPossibleDiagnoses: [
      { disease: 'Stemphylium Leaf Blight', reason: 'Causes elongated yellow-brown blighting.' },
    ],
    immediateSteps: ['Install blue sticky traps (20/acre) across the field'],
    culturalAndPreventivePractices: ['Sprinkler wash during morning hours dislodges thrips'],
    sanitationAndCropManagement: ['Keep bunds free of weed hosts'],
    biologicalOrIPMOptions: ['Beauveria bassiana (5g/L) + Neem oil (3ml/L)'],
    indicatedProducts: [
      {
        name: 'IPM Dual Sticky Traps (Blue)',
        type: 'IPM Tool',
        purpose: 'Mass trapping of thrips',
        approximatePriceINR: 290,
        safeUsage: 'Place at canopy height',
      },
    ],
    estimatedTreatmentCostRangeINR: '₹290 – ₹450 per acre',
    whenToSeekExpert: 'If more than 30 thrips per plant persist after treatment.',
    ppeAndSafety: 'Wash hands after handling traps.',
    isDemonstration: true,
    isValidCropImage: true,
    timestamp: '2026-10-21T08:30:00.000Z',
    imageUrl: '/images/crops/onion_purple_blotch.jpg',
    plantPart: 'leaf',
  },
];

const INITIAL_TASKS: FarmerTask[] = [
  {
    id: 'task-1',
    title: {
      en: 'Inspect lower tomato leaves for early blight target spots',
      mr: 'टोमॅटोच्या खालच्या पानांवरील करप्याच्या डागांची पाहणी करा',
      hi: 'टमाटर की निचली पत्तियों पर अगेती झुलसा के धब्बों की जांच करें',
    },
    crop: 'Tomato',
    dueDate: '2026-10-27',
    priority: 'High',
    completed: false,
    category: 'Disease Monitoring',
  },
  {
    id: 'task-2',
    title: {
      en: 'Hang 10 blue sticky traps in onion field to monitor thrips',
      mr: 'कांद्याच्या शेतात फुलकिडे (थ्रिप्स) पकडण्यासाठी १० निळे सापळे लावा',
      hi: 'प्याज के खेत में थ्रिप्स पकड़ने हेतु १० नीले चिपचिपे कार्ड लगाएं',
    },
    crop: 'Onion',
    dueDate: '2026-10-28',
    priority: 'Medium',
    completed: false,
    category: 'IPM Control',
  },
  {
    id: 'task-3',
    title: {
      en: 'Apply enriched vermicompost basal dressing along root furrows',
      mr: 'वरंब्यांवर गांडूळ खताचा डोस देऊन मातीची भर लावा',
      hi: 'केंचुआ खाद की खुराक देकर पौधों की जड़ों में मिट्टी चढ़ाएं',
    },
    crop: 'Tomato',
    dueDate: '2026-10-30',
    priority: 'Low',
    completed: true,
    category: 'Soil Nutrition',
  },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-DEMO-8291',
    items: [
      {
        productId: 'prod-trichoderma-viride-1kg',
        productName: 'Trichoderma viride 1.5% WP Bio-Fungicide (1 kg)',
        quantity: 2,
        unitPrice: 195,
      },
      {
        productId: 'prod-sticky-traps-combo-20pk',
        productName: 'AgriCare IPM Dual Sticky Traps Combo (20 Pk)',
        quantity: 1,
        unitPrice: 290,
      },
    ],
    totalAmount: 680,
    orderDate: '2026-10-22',
    paymentStatus: 'Demo Paid (Cash on Delivery / UPI Verified)',
    dispatchStatus: 'Dispatched',
    deliveryAddress: 'Farm Gat No. 142, Haveli Taluka, Pune District, Maharashtra - 412207',
    contactNumber: '9876543210',
    isDemonstration: true,
  },
];

const INITIAL_DEMO_FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-demo-1',
    kisanId: 'MH-PUN-2026-8291',
    name: 'Ramesh Patil (रमेश पाटील)',
    phone: '9876543210',
    pin: '1234',
    state: 'Maharashtra',
    district: 'Pune (Haveli)',
    village: 'Wagholi, Gat 142',
    farmSizeAcres: 2.5,
    primaryCrops: ['Tomato', 'Onion'],
    preferredLanguage: 'mr',
    createdAt: '2026-03-15T09:00:00.000Z',
  },
  {
    id: 'farmer-demo-2',
    kisanId: 'MH-BAR-2026-5124',
    name: 'Sunita Deshmukh (सुनीता देशमुख)',
    phone: '9822114455',
    pin: '1234',
    state: 'Maharashtra',
    district: 'Pune (Baramati)',
    village: 'Malegaon Budruk',
    farmSizeAcres: 4.0,
    primaryCrops: ['Cotton', 'Rice'],
    preferredLanguage: 'mr',
    createdAt: '2026-04-10T11:30:00.000Z',
  },
];

const INITIAL_PROFILE: FarmerProfile = INITIAL_DEMO_FARMERS[0];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('agricare_lang');
    return (saved as Language) || 'mr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agricare_lang', lang);
  };

  // Active section
  const [activeSection, setActiveSection] = useState<string>('home');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('agricare_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('agricare_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: MarketProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalINR = cart.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );

  // Scans history with automatic image migration for legacy demo scans
  const [scans, setScans] = useState<CropDiseaseResult[]>(() => {
    const saved = localStorage.getItem('agricare_scans');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((scan: CropDiseaseResult) => {
            // Fix tomato early blight image if pointing to outdated unsplash URL
            if (
              (scan.cropName === 'Tomato' || scan.mostLikelyDisease?.includes('Early Blight') || scan.id === 'scan-init-1') &&
              (!scan.imageUrl || scan.imageUrl.includes('unsplash') || scan.imageUrl.includes('photo-1597848212624'))
            ) {
              return { ...scan, imageUrl: '/images/crops/tomato_early_blight.jpg' };
            }
            if (
              scan.id === 'scan-init-2' &&
              (!scan.imageUrl || scan.imageUrl.includes('unsplash'))
            ) {
              return { ...scan, imageUrl: '/images/crops/onion_purple_blotch.jpg' };
            }
            return scan;
          });
        }
        return INITIAL_SCANS;
      } catch (e) {
        return INITIAL_SCANS;
      }
    }
    return INITIAL_SCANS;
  });

  const [activeScanContext, setActiveScanContext] = useState<CropDiseaseResult | null>(null);

  const saveScan = (scan: CropDiseaseResult) => {
    setScans((prev) => [scan, ...prev]);
    localStorage.setItem('agricare_scans', JSON.stringify([scan, ...scans]));
  };

  // Saved kits
  const [savedKits, setSavedKits] = useState<CareKitPlan[]>(() => {
    const saved = localStorage.getItem('agricare_kits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const saveKit = (kit: CareKitPlan) => {
    setSavedKits((prev) => {
      const exists = prev.some((k) => k.id === kit.id);
      const updated = exists ? prev.map((k) => (k.id === kit.id ? kit : k)) : [kit, ...prev];
      localStorage.setItem('agricare_kits', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteKit = (kitId: string) => {
    setSavedKits((prev) => {
      const updated = prev.filter((k) => k.id !== kitId);
      localStorage.setItem('agricare_kits', JSON.stringify(updated));
      return updated;
    });
  };

  const renameKit = (kitId: string, newTitle: string) => {
    setSavedKits((prev) => {
      const updated = prev.map((k) => (k.id === kitId ? { ...k, title: newTitle } : k));
      localStorage.setItem('agricare_kits', JSON.stringify(updated));
      return updated;
    });
  };

  // Tasks
  const [tasks, setTasks] = useState<FarmerTask[]>(() => {
    const saved = localStorage.getItem('agricare_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  const toggleTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      localStorage.setItem('agricare_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  const addTask = (newTask: Omit<FarmerTask, 'id' | 'completed'>) => {
    const task: FarmerTask = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => {
      const updated = [task, ...prev];
      localStorage.setItem('agricare_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('agricare_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem('agricare_orders', JSON.stringify(updated));
      return updated;
    });
  };

  // Profile
  const [profile, setProfileState] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('agricare_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROFILE;
      }
    }
    return INITIAL_PROFILE;
  });

  const updateProfile = (updatedProfile: FarmerProfile) => {
    setProfileState(updatedProfile);
    localStorage.setItem('agricare_profile', JSON.stringify(updatedProfile));
  };

  // Registered Farmers
  const [registeredFarmers, setRegisteredFarmers] = useState<FarmerProfile[]>(() => {
    const saved = localStorage.getItem('agricare_farmers_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        return INITIAL_DEMO_FARMERS;
      }
    }
    return INITIAL_DEMO_FARMERS;
  });

  // Authentication State: defaults to false unless previously active
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('agricare_auth_session') === 'active';
  });

  const [isGuest, setIsGuest] = useState<boolean>(false);

  // Login handler
  const login = (phone: string, pin: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanPin = pin.trim();

    const matched = registeredFarmers.find((f) => {
      const fPhone = f.phone.replace(/\D/g, '');
      const fPin = f.pin || '1234';
      return (
        (fPhone === cleanPhone ||
          (cleanPhone.length >= 10 && fPhone.slice(-10) === cleanPhone.slice(-10))) &&
        fPin === cleanPin
      );
    });

    if (matched) {
      setProfileState(matched);
      localStorage.setItem('agricare_profile', JSON.stringify(matched));
      if (matched.preferredLanguage) {
        setLanguageState(matched.preferredLanguage);
        localStorage.setItem('agricare_lang', matched.preferredLanguage);
      }
      setIsAuthenticated(true);
      setIsGuest(false);
      localStorage.setItem('agricare_auth_session', 'active');
      return { success: true };
    }

    return {
      success: false,
      message: t.invalidCredentials,
    };
  };

  // Signup / Create Farmer Account
  const signup = (newProfile: Omit<FarmerProfile, 'id' | 'kisanId' | 'createdAt'> & { pin: string }) => {
    const statePrefix = 'MH';
    const distCode = (newProfile.district || 'PUN').substring(0, 3).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedKisanId = `${statePrefix}-${distCode}-2026-${randomSuffix}`;

    const createdFarmer: FarmerProfile = {
      ...newProfile,
      id: `farmer-${Date.now()}`,
      kisanId: generatedKisanId,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [createdFarmer, ...registeredFarmers];
    setRegisteredFarmers(updatedList);
    localStorage.setItem('agricare_farmers_db', JSON.stringify(updatedList));

    setProfileState(createdFarmer);
    localStorage.setItem('agricare_profile', JSON.stringify(createdFarmer));

    if (newProfile.preferredLanguage) {
      setLanguageState(newProfile.preferredLanguage);
      localStorage.setItem('agricare_lang', newProfile.preferredLanguage);
    }

    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('agricare_auth_session', 'active');

    return { success: true, kisanId: generatedKisanId };
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    localStorage.removeItem('agricare_auth_session');
  };

  // Quick Demo Login
  const quickDemoLogin = (farmerType: 'ramesh' | 'sunita') => {
    const target = farmerType === 'sunita' ? INITIAL_DEMO_FARMERS[1] : INITIAL_DEMO_FARMERS[0];
    setProfileState(target);
    localStorage.setItem('agricare_profile', JSON.stringify(target));
    if (target.preferredLanguage) {
      setLanguageState(target.preferredLanguage);
      localStorage.setItem('agricare_lang', target.preferredLanguage);
    }
    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('agricare_auth_session', 'active');
  };

  // Guest Access
  const guestAccess = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    localStorage.setItem('agricare_auth_session', 'active');
  };

  // Chat floating
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeSection,
        setActiveSection,
        t,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotalINR,
        isCartOpen,
        setIsCartOpen,
        scans,
        saveScan,
        activeScanContext,
        setActiveScanContext,
        savedKits,
        saveKit,
        deleteKit,
        renameKit,
        tasks,
        toggleTask,
        addTask,
        orders,
        addOrder,
        profile,
        updateProfile,
        isAuthenticated,
        isGuest,
        registeredFarmers,
        login,
        signup,
        logout,
        quickDemoLogin,
        guestAccess,
        isChatOpen,
        setIsChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
