import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, FarmerProfile } from '../types';
import { KisanIdCard } from './KisanIdCard';
import {
  Sprout,
  ShieldCheck,
  Globe2,
  Lock,
  Phone,
  User,
  MapPin,
  Landmark,
  Sparkles,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

const CROP_OPTIONS = [
  { id: 'Tomato', labelEn: 'Tomato', labelMr: 'टोमॅटो', labelHi: 'टमाटर', icon: '🍅' },
  { id: 'Onion', labelEn: 'Onion', labelMr: 'कांदा', labelHi: 'प्याज', icon: '🧅' },
  { id: 'Rice', labelEn: 'Rice / Paddy', labelMr: 'भात / धान', labelHi: 'धान / चावल', icon: '🌾' },
  { id: 'Cotton', labelEn: 'Cotton', labelMr: 'कापूस', labelHi: 'कपास', icon: '🌿' },
];

const MAHARASHTRA_DISTRICTS = [
  'Pune',
  'Nashik',
  'Ahmednagar',
  'Satara',
  'Solapur',
  'Kolhapur',
  'Sangli',
  'Chhatrapati Sambhajinagar',
  'Jalgaon',
  'Amravati',
  'Nagpur',
  'Nanded',
];

export const AuthPortal: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    login,
    signup,
    quickDemoLogin,
    guestAccess,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successData, setSuccessData] = useState<{
    profile: FarmerProfile;
    kisanId: string;
  } | null>(null);

  // Login form state
  const [loginPhone, setLoginPhone] = useState<string>('9876543210');
  const [loginPin, setLoginPin] = useState<string>('1234');
  const [showLoginPin, setShowLoginPin] = useState<boolean>(false);

  // Signup form state
  const [signupName, setSignupName] = useState<string>('');
  const [signupPhone, setSignupPhone] = useState<string>('');
  const [signupPin, setSignupPin] = useState<string>('1234');
  const [showSignupPin, setShowSignupPin] = useState<boolean>(false);
  const [signupState, setSignupState] = useState<string>('Maharashtra');
  const [signupDistrict, setSignupDistrict] = useState<string>('Pune');
  const [signupVillage, setSignupVillage] = useState<string>('');
  const [signupAcres, setSignupAcres] = useState<number>(2.5);
  const [signupCrops, setSignupCrops] = useState<string[]>(['Tomato', 'Onion']);
  const [signupLang, setSignupLang] = useState<Language>(language);

  // Temporary preview profile object for real-time live preview
  const livePreviewProfile: FarmerProfile = {
    name: signupName.trim() || (language === 'mr' ? 'शेतकरी मित्र' : language === 'hi' ? 'किसान मित्र' : 'Farmer Member'),
    phone: signupPhone.trim() || '98XXXXXXXX',
    state: signupState,
    district: signupDistrict,
    village: signupVillage.trim() || (language === 'mr' ? 'गाव / तालुका' : 'Village / Taluka'),
    farmSizeAcres: Number(signupAcres) || 1,
    primaryCrops: signupCrops.length > 0 ? signupCrops : ['Tomato'],
    preferredLanguage: signupLang,
    kisanId: `MH-${signupDistrict.substring(0, 3).toUpperCase()}-2026-****`,
  };

  const handleToggleCrop = (cropId: string) => {
    setSignupCrops((prev) =>
      prev.includes(cropId)
        ? prev.filter((c) => c !== cropId)
        : [...prev, cropId]
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginPhone.trim() || !loginPin.trim()) {
      setErrorMessage(t.fillRequiredFields);
      return;
    }

    const res = login(loginPhone.trim(), loginPin.trim());
    if (!res.success) {
      setErrorMessage(res.message || t.invalidCredentials);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signupName.trim() || !signupPhone.trim()) {
      setErrorMessage(t.fillRequiredFields);
      return;
    }

    if (signupPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage(
        language === 'mr'
          ? 'कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा.'
          : language === 'hi'
          ? 'कृपया १० अंकों का मान्य मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    if (signupCrops.length === 0) {
      setErrorMessage(t.selectAtLeastOneCrop);
      return;
    }

    const res = signup({
      name: signupName.trim(),
      phone: signupPhone.trim(),
      pin: signupPin.trim() || '1234',
      state: signupState,
      district: signupDistrict,
      village: signupVillage.trim() || undefined,
      farmSizeAcres: Number(signupAcres) || 1,
      primaryCrops: signupCrops,
      preferredLanguage: signupLang,
    });

    if (res.success) {
      setSuccessData({
        profile: {
          name: signupName.trim(),
          phone: signupPhone.trim(),
          state: signupState,
          district: signupDistrict,
          village: signupVillage.trim() || undefined,
          farmSizeAcres: Number(signupAcres) || 1,
          primaryCrops: signupCrops,
          preferredLanguage: signupLang,
          kisanId: res.kisanId,
        },
        kisanId: res.kisanId,
      });
    }
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between relative selection:bg-emerald-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand & Language Switcher */}
      <header className="relative z-20 border-b border-emerald-900/40 bg-stone-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/50">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                AgriCare
              </span>
              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-600/50">
                किसान डिजिटल गेटवे
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-stone-800/90 border border-stone-700 rounded-lg p-1">
          <div className="pl-1.5 pr-1 text-stone-400">
            <Globe2 className="w-3.5 h-3.5" />
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setSignupLang(lang.code);
              }}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                language === lang.code
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Modal / Card Container */}
        <div className="bg-stone-900/90 border border-stone-700/80 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Header Switcher Tabs */}
          <div className="grid grid-cols-2 border-b border-stone-800 bg-stone-950/60 p-2">
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t.signupTitle}</span>
            </button>

            <button
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-200" />
              <span>{t.loginTitle}</span>
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* TAB 1: SIGNUP & KISAN ID GENERATION */}
          {mode === 'signup' && (
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/30">
                  {t.authGatewayTag}
                </span>
                <h1 className="text-xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                  {t.signupTitle}
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  {t.signupSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Signup Form (Left 7 Cols) */}
                <form
                  onSubmit={handleSignupSubmit}
                  className="lg:col-span-7 space-y-4"
                >
                  {/* Farmer Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {t.nameLabel} <span className="text-emerald-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder={
                          language === 'mr'
                            ? 'उदा. ज्ञानेश्वर शेळके / Dnyaneshwar Shelke'
                            : language === 'hi'
                            ? 'उदा. ज्ञानेश्वर शेळके / Dnyaneshwar Shelke'
                            : 'e.g. Ramesh Patil'
                        }
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & 4-Digit PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        {t.phoneLabel} <span className="text-emerald-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="98XXXXXXXX"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        {t.pinLabel}
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showSignupPin ? 'text' : 'password'}
                          maxLength={6}
                          placeholder="1234"
                          value={signupPin}
                          onChange={(e) => setSignupPin(e.target.value)}
                          className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPin(!showSignupPin)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                        >
                          {showSignupPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* State, District & Village */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        {t.stateLabel}
                      </label>
                      <select
                        value={signupState}
                        onChange={(e) => setSignupState(e.target.value)}
                        className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                        <option value="Gujarat">Gujarat (गुजरात)</option>
                        <option value="Karnataka">Karnataka (कर्नाटक)</option>
                        <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                        <option value="Andhra Pradesh">Andhra Pradesh (आंध्र प्रदेश)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        {t.districtLabel}
                      </label>
                      <select
                        value={signupDistrict}
                        onChange={(e) => setSignupDistrict(e.target.value)}
                        className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        {MAHARASHTRA_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        {t.villageLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'mr' ? 'उदा. वाघोली / हवेली' : 'e.g. Haveli, Gat 142'}
                        value={signupVillage}
                        onChange={(e) => setSignupVillage(e.target.value)}
                        className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Farm Size */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {t.farmSizeLabel}
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Landmark className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="100"
                          value={signupAcres}
                          onChange={(e) => setSignupAcres(parseFloat(e.target.value) || 1)}
                          className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        {[1, 2.5, 5, 10].map((acre) => (
                          <button
                            key={acre}
                            type="button"
                            onClick={() => setSignupAcres(acre)}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                              signupAcres === acre
                                ? 'bg-emerald-700 border-emerald-500 text-white'
                                : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                            }`}
                          >
                            {acre} {language === 'mr' ? 'एकर' : 'Ac'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cultivated Crops Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {t.cropsLabel} <span className="text-emerald-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CROP_OPTIONS.map((crop) => {
                        const isSelected = signupCrops.includes(crop.id);
                        const label =
                          language === 'mr'
                            ? crop.labelMr
                            : language === 'hi'
                            ? crop.labelHi
                            : crop.labelEn;
                        return (
                          <button
                            key={crop.id}
                            type="button"
                            onClick={() => handleToggleCrop(crop.id)}
                            className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-xs'
                                : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white'
                            }`}
                          >
                            <span className="text-base">{crop.icon}</span>
                            <span className="truncate">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>{t.signupBtn}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </form>

                {/* Right Column (5 cols): Live Real-Time Kisan ID Card Preview */}
                <div className="lg:col-span-5 bg-stone-950/70 border border-stone-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Live Kisan Pass Preview</span>
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Auto-generating ID
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {language === 'mr'
                      ? 'आपण माहिती भरत असताना आपले डिजिटल शेतकरी ओळखपत्र (Kisan Smart Pass) तयार होत आहे:'
                      : language === 'hi'
                      ? 'विवरण दर्ज करते समय आपका डिजिटल किसान स्मार्ट पास तैयार हो रहा है:'
                      : 'Your official Kisan Smart Pass updates live as you enter your farm information:'}
                  </p>

                  <KisanIdCard farmer={livePreviewProfile} compact={false} />

                  {/* Quick Switch to Login */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setErrorMessage('');
                      }}
                      className="text-xs text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      {t.alreadyHaveAccount}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOGIN (EXISTING FARMER) */}
          {mode === 'login' && (
            <div className="p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/30">
                  {t.authGatewayTag}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.loginTitle}
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm">
                  {t.loginSubtitle}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.pinLabel}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showLoginPin ? 'text' : 'password'}
                      required
                      placeholder="1234"
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPin(!showLoginPin)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                    >
                      {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <UserCheck className="w-5 h-5 text-emerald-200" />
                  <span>{t.loginBtn}</span>
                </button>
              </form>

              {/* 1-Click Quick Demo Login Box */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <p className="text-xs font-semibold text-stone-300 text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.quickDemoLogin}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => quickDemoLogin('ramesh')}
                    className="p-3.5 rounded-xl bg-stone-800/80 hover:bg-emerald-950/60 border border-stone-700 hover:border-emerald-500 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-300">
                      <span>Ramesh Patil</span>
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/40">
                        2.5 Acres
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Haveli, Pune • Tomato & Onion
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-1">
                      ID: MH-PUN-2026-8291
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('sunita')}
                    className="p-3.5 rounded-xl bg-stone-800/80 hover:bg-emerald-950/60 border border-stone-700 hover:border-emerald-500 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-300">
                      <span>Sunita Deshmukh</span>
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/40">
                        4.0 Acres
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Baramati, Pune • Cotton & Rice
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-1">
                      ID: MH-BAR-2026-5124
                    </p>
                  </button>
                </div>
              </div>

              {/* Switch to Signup */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="text-xs text-stone-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.dontHaveAccount}
                </button>
              </div>
            </div>
          )}

          {/* Footer inside modal: Guest Exploration Option */}
          <div className="px-6 sm:px-8 py-3.5 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.digitalSeal}</span>
            </span>

            <button
              onClick={guestAccess}
              type="button"
              className="hover:text-emerald-300 underline font-medium transition-colors cursor-pointer"
            >
              {t.exploreGuest} &rarr;
            </button>
          </div>
        </div>
      </main>

      {/* Success Modal / Congratulations Card on Account Generation */}
      {successData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-900/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {t.accountCreatedSuccess}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                {language === 'mr'
                  ? `अभिनंदन! आपले शेतकरी खाते व डिजिटल किसान स्मार्ट पास यशस्वीरित्या तयार झाले आहे.`
                  : language === 'hi'
                  ? `बधाई हो! आपका किसान खाता व डिजिटल किसान स्मार्ट पास सफलतापूर्वक बन गया है।`
                  : `Congratulations! Your official farmer account and Kisan Smart Pass are active.`}
              </p>
            </div>

            {/* Generated Kisan Pass Card */}
            <KisanIdCard farmer={successData.profile} showPrintAction={false} />

            <div className="pt-2">
              <button
                onClick={() => {
                  setSuccessData(null);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.enterWebsiteBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Footer */}
      <footer className="relative z-10 py-3 text-center text-[11px] text-stone-400 border-t border-emerald-950/30">
        AgriCare © 2026 • Dedicated to Indian Farmers • ICAR & KVK Agronomic Guidelines
      </footer>
    </div>
  );
};
