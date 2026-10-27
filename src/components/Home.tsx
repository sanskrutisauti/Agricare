import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/cropsData';
import {
  ShieldAlert,
  Sparkles,
  ClipboardList,
  Store,
  BookOpen,
  BotMessageSquare,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Coins,
  Languages,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { t, setActiveSection, language } = useApp();

  const featureCards = [
    {
      id: 'detection',
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: ShieldAlert,
      badge: 'Vision AI',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'assessment',
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: Sparkles,
      badge: '3-Tier Plans',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'assessment',
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: ClipboardList,
      badge: '30 Questions',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'marketplace',
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: Store,
      badge: 'Verified Inputs',
      color: 'bg-stone-50 text-stone-800 border-stone-200',
    },
    {
      id: 'library',
      title: t.feature5Title,
      desc: t.feature5Desc,
      icon: BookOpen,
      badge: 'ICAR Guidelines',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      id: 'chatbot',
      title: t.feature6Title,
      desc: t.feature6Desc,
      icon: BotMessageSquare,
      badge: 'EN · MR · HI',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'dashboard',
      title: t.feature7Title,
      desc: t.feature7Desc,
      icon: LayoutDashboard,
      badge: 'Farm Records',
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
  ];

  const whyChooseItems = [
    {
      title: t.whyChoose1Title,
      desc: t.whyChoose1Desc,
      icon: Coins,
    },
    {
      title: t.whyChoose2Title,
      desc: t.whyChoose2Desc,
      icon: CheckCircle2,
    },
    {
      title: t.whyChoose3Title,
      desc: t.whyChoose3Desc,
      icon: Languages,
    },
    {
      title: t.whyChoose4Title,
      desc: t.whyChoose4Desc,
      icon: Leaf,
    },
    {
      title: t.whyChoose5Title,
      desc: t.whyChoose5Desc,
      icon: Stethoscope,
    },
    {
      title: t.whyChoose6Title,
      desc: t.whyChoose6Desc,
      icon: ShieldCheck,
    },
  ];

  const steps = [
    {
      number: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      action: () => setActiveSection('detection'),
    },
    {
      number: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      action: () => setActiveSection('detection'),
    },
    {
      number: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      action: () => setActiveSection('assessment'),
    },
    {
      number: '04',
      title: t.step4Title,
      desc: t.step4Desc,
      action: () => setActiveSection('dashboard'),
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Value Prop, CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-medium">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>{t.subTagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroSubheading}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => { setActiveSection('detection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <ShieldAlert className="w-5 h-5 text-emerald-950" />
                  <span>{t.heroPrimaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setActiveSection('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                  <span>{t.heroTertiaryCta}</span>
                </button>

                <button
                  onClick={() => { setActiveSection('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full sm:w-auto px-4 py-3 text-emerald-200 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{t.heroSecondaryCta}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Farmer Trust badges */}
              <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-emerald-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>मराठी · हिन्दी · English</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Non-Chemical IPM First</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Commercial Bias</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Agricultural Image Banner */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-600/40 aspect-[4/3] sm:aspect-[4/3] bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80"
                    alt="Indian farmer inspecting healthy agricultural field"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Micro Diagnostic Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 text-stone-900 shadow-lg border border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-950">Tomato Leaf Analysis</p>
                        <p className="text-[11px] text-stone-700">Early Blight detected · Non-chemical cure available</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      ₹350/acre
                    </span>
                  </div>
                </div>

                {/* Secondary badge */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-amber-500 text-stone-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-md items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Free for All Small Farmers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Seven Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Comprehensive Platform
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            Everything A Farmer Needs in One Place
          </h2>
          <p className="text-stone-700 text-sm sm:text-base mt-3">
            Designed specifically for small and constrained Indian farmers with practical tools, Devanagari clarity, and verified agronomic support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => { setActiveSection(feat.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white rounded-xl p-6 border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-700">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Four Simple Steps — How AgriCare Works */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Simple 4-Step Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {t.howItWorksTitle}
            </h2>
            <p className="text-stone-700 text-sm mt-2">
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.number}
                onClick={st.action}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer relative"
              >
                <div className="text-3xl font-black text-emerald-700 mb-3 font-mono">
                  {st.number}
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed mb-4">
                  {st.desc}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  <span>Start Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Crops Preview (Tomato, Rice, Onion, Cotton) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Verified Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Featured Crops Supported
            </h2>
            <p className="text-stone-700 text-sm mt-1">
              Comprehensive ICAR-aligned cultivation, diseases, and pest management guides.
            </p>
          </div>
          <button
            onClick={() => { setActiveSection('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Crops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CROPS_DATA.map((crop) => (
            <div
              key={crop.id}
              onClick={() => { setActiveSection('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group"
            >
              <div className="h-44 overflow-hidden relative bg-stone-100">
                <img
                  src={crop.image}
                  alt={crop.commonName[language] || crop.commonName.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-emerald-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {crop.growthDurationDays}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {crop.commonName[language] || crop.commonName.en}
                  </h3>
                  <span className="text-[11px] text-stone-700 font-mono">
                    pH {crop.soilPHRange}
                  </span>
                </div>
                <p className="text-[11px] italic text-stone-700">
                  {crop.scientificName}
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-700">
                  <span>{crop.diseases.length} Major Diseases</span>
                  <span className="text-emerald-800 font-semibold group-hover:underline">
                    View Guide →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose AgriCare */}
      <section className="bg-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Responsible & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {t.whyChooseTitle}
            </h2>
            <p className="text-emerald-200 text-sm mt-2">
              Built with ethical technology: no fake confidence scores, no aggressive chemical promotions, and 100% farmer-first guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-emerald-900/40 border border-emerald-800/80 rounded-xl p-5 hover:bg-emerald-900/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Quick Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-semibold">
              Ready for Your Harvest?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Begin Your First Crop Scan in 30 Seconds
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Upload a photo from your smartphone, receive instant responsible analysis, and explore low-cost biological care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => { setActiveSection('detection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2 text-sm sm:text-base"
            >
              <ShieldAlert className="w-5 h-5 text-emerald-800" />
              <span>{t.heroPrimaryCta}</span>
            </button>
            <button
              onClick={() => { setActiveSection('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 bg-emerald-900/50 hover:bg-emerald-900 text-white font-semibold rounded-xl border border-emerald-600 transition-colors cursor-pointer text-sm sm:text-base"
            >
              <span>{t.heroTertiaryCta}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
