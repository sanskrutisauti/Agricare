import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { CareKitPlan } from '../types';
import { MARKET_PRODUCTS } from '../data/marketProducts';
import {
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookmarkCheck,
  ShoppingCart,
  Printer,
  Edit2,
  DollarSign,
  Calendar,
  ShieldCheck,
  Info,
  Layers,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export const CropAssessment: React.FC = () => {
  const { t, language, saveKit, addToCart, setActiveSection } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    '1': 'MH-Pune',
    '2': 'small',
    '3': 'ipm_mixed',
    '4': language,
    '5': 'Tomato',
    '6': 'hybrid_commercial',
    '7': 'vegetative',
    '8': '1month_ago',
    '9': '1_acre',
    '10': 'black_cotton',
    '11': 'neutral',
    '12': 'drip',
    '13': 'daily_alternate',
    '14': 'none_good_drainage',
    '15': 'yes_active',
    '16': 'spots_lesions',
    '17': 'lower_older_leaves',
    '18': 'mild_5_to_15',
    '19': '1_to_2weeks',
    '20': 'occasional',
    '21': 'organic_fym_vermi',
    '22': 'neem_biocontrol',
    '23': 'sucking_pests',
    '24': 'legume_pulses',
    '25': 'moderate_500_1500',
    '26': 'ipm_balanced',
    '27': 'dung_neem_pump',
    '28': 'balanced_kit',
    '29': '',
    '30': 'Occasional cloudy weather in the evenings',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedKits, setGeneratedKits] = useState<CareKitPlan[] | null>(null);
  const [selectedKitIndex, setSelectedKitIndex] = useState<number>(1); // Default to Balanced Kit
  const [editingKitTitle, setEditingKitTitle] = useState<boolean>(false);
  const [currentKitTitle, setCurrentKitTitle] = useState<string>('');
  const [kitSavedStatus, setKitSavedStatus] = useState<boolean>(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length; // Exactly 30

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id.toString()]: value }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleGenerateKits = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/assessment-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, language }),
      });
      const data = await res.json();
      if (data.kits && data.kits.length > 0) {
        setGeneratedKits(data.kits);
        setCurrentKitTitle(data.kits[1].title);
      }
    } catch (err) {
      console.error('Error generating kit:', err);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeKit = generatedKits ? generatedKits[selectedKitIndex] : null;

  const handleSaveActiveKit = () => {
    if (!activeKit) return;
    const kitToSave = {
      ...activeKit,
      title: currentKitTitle || activeKit.title,
    };
    saveKit(kitToSave);
    setKitSavedStatus(true);
    setTimeout(() => setKitSavedStatus(false), 3000);
  };

  const handleAddAllProductsToCart = () => {
    if (!activeKit) return;
    activeKit.products.forEach((p) => {
      const matchingMarketProd =
        MARKET_PRODUCTS.find((m) => m.id === p.productId) ||
        MARKET_PRODUCTS.find((m) => m.name.includes(p.name.split(' ')[0])) ||
        MARKET_PRODUCTS[0];
      addToCart(matchingMarketProd);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold">
          <ClipboardList className="w-4 h-4 text-blue-700" />
          <span>Agricultural Needs Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.assessmentTitle}
        </h1>
        <p className="text-stone-700 text-xs sm:text-sm">
          {t.assessmentSubtitle}
        </p>
      </div>

      {!generatedKits ? (
        /* STEPPER: 30 Questions */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Progress Bar & Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-700">
              <span className="font-semibold text-emerald-800">
                {currentQuestion.categoryName[language] || currentQuestion.categoryName.en}
              </span>
              <span className="font-bold text-stone-900">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question Box */}
          <div className="py-4 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  Q{currentQuestion.id}
                </span>
                <span className="text-xs text-stone-600">
                  {currentQuestion.required ? t.requiredLabel : t.optionalLabel}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                {currentQuestion.question[language] || currentQuestion.question.en}
              </h2>
              {currentQuestion.description && (
                <p className="text-xs text-stone-600 mt-1">
                  {currentQuestion.description[language] || currentQuestion.description.en}
                </p>
              )}
            </div>

            {/* Answer Options */}
            {currentQuestion.type === 'select' && currentQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected =
                    answers[currentQuestion.id.toString()] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleOptionSelect(opt.value)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">
                        {opt.label[language] || opt.label.en}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-700 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text Input for Q30 */}
            {currentQuestion.type === 'text' && (
              <div>
                <textarea
                  rows={4}
                  value={answers[currentQuestion.id.toString()] || ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id.toString()]: e.target.value,
                    }))
                  }
                  placeholder={
                    currentQuestion.placeholder?.[language] ||
                    currentQuestion.placeholder?.en ||
                    'Type notes here...'
                  }
                  className="w-full p-3.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                />
              </div>
            )}

            {/* File Input for Q29 */}
            {currentQuestion.type === 'file' && (
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center bg-stone-50/50">
                <p className="text-xs text-stone-600 mb-2">
                  {currentQuestion.description?.[language] || currentQuestion.description?.en}
                </p>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id.toString()]: file.name,
                      }));
                    }
                  }}
                  className="text-xs text-stone-600"
                />
                {answers[currentQuestion.id.toString()] && (
                  <p className="text-xs font-semibold text-emerald-800 mt-2">
                    Selected file: {answers[currentQuestion.id.toString()]}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-stone-200">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btnPrevious}</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>{t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleGenerateKits}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <span>{t.generatingKit}</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.btnSubmitAssessment}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Quick Category Indicator Tracker */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2 text-[10px] text-stone-500">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((cat) => {
              const activeCat = currentQuestion.category === cat;
              return (
                <span
                  key={cat}
                  className={`px-2 py-0.5 rounded ${
                    activeCat
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  Cat {cat}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        /* RESULTS: 3 Personalised Care Kit Options */
        <div className="space-y-8 animate-fade-in">
          {/* Kit Tabs (Budget-Friendly, Balanced, Preventive) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {generatedKits.map((kit, index) => {
              const isSelected = selectedKitIndex === index;
              return (
                <button
                  key={kit.id}
                  onClick={() => {
                    setSelectedKitIndex(index);
                    setCurrentKitTitle(kit.title);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-white shadow-md'
                      : 'border-stone-200 bg-stone-50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {kit.tier === 'budget'
                        ? t.tierBudgetBadge
                        : kit.tier === 'balanced'
                        ? t.tierBalancedBadge
                        : t.tierPreventiveBadge}
                    </span>
                    <span className="text-sm font-black text-stone-900">
                      ₹{kit.costPerAcreINR}/acre
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900 mb-1">
                    {kit.tierName[language] || kit.tierName.en}
                  </h3>
                  <p className="text-[11px] text-stone-600 line-clamp-2">
                    {kit.tierDescription[language] || kit.tierDescription.en}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Kit Deep-Dive Card */}
          {activeKit && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Kit Title & Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-stone-200 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {editingKitTitle ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={currentKitTitle}
                          onChange={(e) => setCurrentKitTitle(e.target.value)}
                          className="border border-emerald-500 rounded px-2 py-1 text-sm font-bold text-stone-900"
                        />
                        <button
                          onClick={() => setEditingKitTitle(false)}
                          className="text-xs bg-emerald-700 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                          {currentKitTitle || activeKit.title}
                        </h2>
                        <button
                          onClick={() => setEditingKitTitle(true)}
                          className="text-stone-400 hover:text-stone-700"
                          title="Rename Kit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Crop: <strong>{activeKit.crop}</strong> · Area: <strong>{activeKit.areaAcre} Acre(s)</strong> · Stage: <strong>{activeKit.growthStage}</strong>
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-right shrink-0">
                  <span className="text-[11px] text-emerald-800 block">
                    {t.totalEstimatedCost}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-950">
                    ₹{activeKit.estimatedTotalCostINR}
                  </span>
                  <span className="text-[10px] text-emerald-700 block">
                    (₹{activeKit.costPerAcreINR} / acre)
                  </span>
                </div>
              </div>

              {/* Rationale & Key Concerns */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>{t.inclusionsRationale}:</span>
                </div>
                <p className="leading-relaxed">{activeKit.rationale}</p>
              </div>

              {/* Product Quantities & Calculated Items */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>{t.productsIncluded}</span>
                </h3>

                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                  {activeKit.products.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-stone-900">
                            {item.name}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.quantity}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {item.purpose}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          ₹{item.costINR}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monitoring & Application Schedule */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>{t.applicationSchedule}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeKit.schedule.map((sch, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-xs"
                    >
                      <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                        {sch.dayOrTiming}
                      </span>
                      <h4 className="font-bold text-stone-900 text-xs mt-1">
                        {sch.task}
                      </h4>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        {sch.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Precautions */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1 text-xs text-amber-950">
                <span className="font-bold block text-amber-900">
                  {t.safetyNotesTitle}:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-900/90">
                  {activeKit.safetyPrecautions.map((safe, idx) => (
                    <li key={idx}>{safe}</li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions: Save, Add Products to Cart, Print */}
              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveActiveKit}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{kitSavedStatus ? 'Kit Saved!' : t.btnSaveKit}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddAllProductsToCart}
                  className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-700" />
                  <span>{t.btnAddKitToCart}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.btnPrintPlan}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGeneratedKits(null);
                    setCurrentIndex(0);
                  }}
                  className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs ml-auto cursor-pointer"
                >
                  Restart Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
