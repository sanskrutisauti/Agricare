import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA } from '../data/cropsData';
import { CropInfo, CropProblem } from '../types';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldAlert,
  Sprout,
  Sun,
  Droplet,
  Thermometer,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const CropLibrary: React.FC = () => {
  const { t, language, setActiveSection } = useApp();

  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [activeTab, setActiveTab] = useState<'cultivation' | 'diseases' | 'pests' | 'comparison'>('cultivation');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<CropProblem | null>(null);

  const activeCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];

  const filteredProblems = activeCrop.diseases.concat(activeCrop.pests).filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName =
      p.commonName[language]?.toLowerCase().includes(q) ||
      p.commonName.en.toLowerCase().includes(q) ||
      p.scientificName.toLowerCase().includes(q);
    const matchSymptoms =
      p.symptoms[language]?.toLowerCase().includes(q) ||
      p.symptoms.en.toLowerCase().includes(q);
    return matchName || matchSymptoms;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-teal-700" />
          <span>ICAR Agronomic Knowledge Hub</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.libraryTitle}
        </h1>
        <p className="text-stone-700 text-xs sm:text-sm">
          {t.librarySubtitle}
        </p>
      </div>

      {/* Crop Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {CROPS_DATA.map((crop) => {
          const isSelected = crop.id === selectedCropId;
          return (
            <button
              key={crop.id}
              onClick={() => {
                setSelectedCropId(crop.id);
                setSelectedProblem(null);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 border transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-700 text-white shadow-xs'
                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Sprout className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
              <span>{crop.commonName[language] || crop.commonName.en}</span>
            </button>
          );
        })}
      </div>

      {/* Active Crop Hero Overview Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {activeCrop.cropType[language] || activeCrop.cropType.en}
              </span>
              <span className="text-xs italic text-stone-500">
                {activeCrop.scientificName}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {activeCrop.commonName[language] || activeCrop.commonName.en}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {activeCrop.climate[language] || activeCrop.climate.en}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-700 block font-semibold">Temperature</span>
                <span className="font-bold text-stone-900">{activeCrop.temperature}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-700 block font-semibold">Soil pH Range</span>
                <span className="font-bold text-stone-900">{activeCrop.soilPHRange}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-700 block font-semibold">Duration</span>
                <span className="font-bold text-stone-900">{activeCrop.growthDurationDays}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-700 block font-semibold">Diseases Tracked</span>
                <span className="font-bold text-emerald-800">{activeCrop.diseases.length} Major</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="h-56 rounded-xl overflow-hidden shadow-xs border border-stone-200 relative group bg-stone-100">
              <img
                src={activeCrop.image}
                alt={activeCrop.commonName[language] || activeCrop.commonName.en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-stone-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
                Field Canopy View
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tabs: Cultivation Guide, Diseases, Pests, Comparison */}
        <div className="border-t border-stone-200 bg-stone-50/60 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('cultivation')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cultivation'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.tabCultivation}
          </button>
          <button
            onClick={() => setActiveTab('diseases')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'diseases'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.tabDiseases} ({activeCrop.diseases.length})
          </button>
          <button
            onClick={() => setActiveTab('pests')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'pests'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.tabPests} ({activeCrop.pests.length})
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.tabComparison}
          </button>
        </div>
      </div>

      {/* Tab 1: Cultivation Guide Details */}
      {activeTab === 'cultivation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Soil & Sowing */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Soil & Sowing Requirements</span>
            </h3>
            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">Soil Preferences:</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.soilPreferences[language] || activeCrop.soilPreferences.en}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">Sowing & Transplanting Seasons:</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.sowingTransplanting[language] || activeCrop.sowingTransplanting.en}
                </p>
              </div>
            </div>
          </div>

          {/* Irrigation & Nutrients */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>Irrigation & Nutrition</span>
            </h3>
            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">{t.waterRequirements}:</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.irrigation[language] || activeCrop.irrigation.en}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">{t.keyNutrients}:</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.nutrients[language] || activeCrop.nutrients.en}
                </p>
              </div>
            </div>
          </div>

          {/* Harvesting & General Prevention */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 md:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Harvesting & Field-Level Cultural Prevention</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">Harvesting Guidance:</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.harvesting[language] || activeCrop.harvesting.en}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block mb-0.5">Preventive Practices (ICAR Recommended):</span>
                <p className="leading-relaxed text-stone-600">
                  {activeCrop.generalPrevention[language] || activeCrop.generalPrevention.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 & 3: Diseases & Pests Grid */}
      {(activeTab === 'diseases' || activeTab === 'pests') && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'diseases' ? activeCrop.diseases : activeCrop.pests).map((prob) => (
              <div
                key={prob.id}
                onClick={() => setSelectedProblem(prob)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 bg-stone-100 overflow-hidden relative">
                    <img
                      src={prob.image}
                      alt={prob.commonName[language] || prob.commonName.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                      {prob.type}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {prob.commonName[language] || prob.commonName.en}
                    </h4>
                    <p className="text-[11px] italic text-stone-500">
                      {prob.scientificName}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {prob.symptoms[language] || prob.symptoms.en}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>Detailed Treatment →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Symptom Comparison Matrix */}
      {activeTab === 'comparison' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs p-6 space-y-4 animate-fade-in">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              {activeCrop.commonName[language] || activeCrop.commonName.en} — Symptom Comparison Matrix
            </h3>
            <p className="text-xs text-stone-500">
              How to differentiate lookalike symptoms and avoid misdiagnosing fungal vs viral vs nutrient issues.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-lg">
              <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">Condition / Problem</th>
                  <th className="p-3">Key Visible Cue</th>
                  <th className="p-3">How to Distinguish from Lookalikes</th>
                  <th className="p-3">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                {activeCrop.diseases.concat(activeCrop.pests).map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/50">
                    <td className="p-3 font-bold text-stone-900">
                      {p.commonName[language] || p.commonName.en}
                    </td>
                    <td className="p-3">
                      {p.symptoms[language] || p.symptoms.en}
                    </td>
                    <td className="p-3 italic text-emerald-950">
                      {p.distinguishFromLookalikes[language] || p.distinguishFromLookalikes.en}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedProblem(p)}
                        className="text-xs text-emerald-700 font-bold hover:underline"
                      >
                        View Guide
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Problem Deep-Dive Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedProblem(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-full sm:w-48 h-36 shrink-0 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs relative">
                <img
                  src={selectedProblem.image}
                  alt={selectedProblem.commonName[language] || selectedProblem.commonName.en}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-stone-900/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                  ICAR Ref Sample
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {selectedProblem.type} problem
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {selectedProblem.commonName[language] || selectedProblem.commonName.en}
                </h2>
                <p className="text-xs italic text-stone-500">
                  {selectedProblem.scientificName}
                </p>
                <p className="text-xs text-stone-600 pt-1">
                  Compare this reference visual against fresh field samples before applying sprays or interventions.
                </p>
              </div>
            </div>

            {/* Symptoms & Causes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Symptoms:</span>
                <p className="text-stone-600 leading-relaxed">
                  {selectedProblem.symptoms[language] || selectedProblem.symptoms.en}
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Causes & Conditions:</span>
                <p className="text-stone-600 leading-relaxed">
                  {selectedProblem.causes[language] || selectedProblem.causes.en}
                </p>
              </div>
            </div>

            {/* How to Distinguish */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block">How to Distinguish from Lookalikes:</span>
              <p className="leading-relaxed">
                {selectedProblem.distinguishFromLookalikes[language] || selectedProblem.distinguishFromLookalikes.en}
              </p>
            </div>

            {/* Cultural & Biological Control */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Cultural Prevention:</span>
                <p className="text-stone-600 leading-relaxed">
                  {selectedProblem.preventionAndCulture[language] || selectedProblem.preventionAndCulture.en}
                </p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Biological Control:</span>
                <p className="text-stone-600 leading-relaxed">
                  {selectedProblem.biologicalControl[language] || selectedProblem.biologicalControl.en}
                </p>
              </div>
            </div>

            {/* Treatment Approach & KVK Threshold */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
              <div>
                <span className="font-bold block text-amber-900">Treatment Approach (ICAR Package of Practices):</span>
                <p className="mt-0.5 leading-relaxed">
                  {selectedProblem.treatmentApproach[language] || selectedProblem.treatmentApproach.en}
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/60">
                <span className="font-bold block text-amber-900">When to Seek Expert Assistance:</span>
                <p className="mt-0.5 leading-relaxed">
                  {selectedProblem.expertAssistanceThreshold[language] || selectedProblem.expertAssistanceThreshold.en}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedProblem(null);
                  setActiveSection('detection');
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg"
              >
                Scan This Disease in My Crop
              </button>
              <button
                onClick={() => setSelectedProblem(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
