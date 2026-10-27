import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CropDiseaseResult } from '../types';
import { MARKET_PRODUCTS } from '../data/marketProducts';
import {
  UploadCloud,
  Image as ImageIcon,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  X,
  RefreshCw,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  BookmarkCheck,
  Stethoscope,
  Info,
  DollarSign,
  AlertOctagon,
  ArrowRight,
  Camera,
  Check,
} from 'lucide-react';

export const DiseaseDetector: React.FC = () => {
  const {
    t,
    language,
    saveScan,
    setActiveScanContext,
    setActiveSection,
    addToCart,
    setIsChatOpen,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [selectedCrop, setSelectedCrop] = useState<string>('auto');
  const [plantPart, setPlantPart] = useState<string>('leaf');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<CropDiseaseResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Pre-configured test sample images covering all 4 dataset crops
  const sampleImages = [
    {
      label: t.sampleTomatoBlight || 'Tomato Early Blight',
      crop: 'Tomato',
      part: 'leaf',
      url: '/images/crops/tomato_early_blight.jpg',
      description: 'Tomato leaf with concentric brown target-board spots',
    },
    {
      label: t.sampleRiceBlast || 'Rice Leaf Blast',
      crop: 'Rice',
      part: 'leaf',
      url: '/images/crops/rice_leaf_blast.jpg',
      description: 'Rice leaf with diamond/spindle-shaped lesions',
    },
    {
      label: t.sampleOnionBlotch || 'Onion Purple Blotch',
      crop: 'Onion',
      part: 'leaf',
      url: '/images/crops/onion_purple_blotch.jpg',
      description: 'Onion foliage with sunken purple-brown lesions',
    },
    {
      label: language === 'mr' ? 'कापूस करपा' : language === 'hi' ? 'कपास झुलसा' : 'Cotton Angular Blight',
      crop: 'Cotton',
      part: 'leaf',
      url: '/images/crops/cotton_angular_blight.jpg',
      description: 'Cotton leaf with angular water-soaked lesions',
    },
    {
      label: t.sampleNonPlant || 'Non-Plant Test',
      crop: 'non_plant_test',
      part: 'whole',
      url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
      description: 'Vehicle / non-crop image to test strict rejection',
    },
  ];

  // High-performance image compression and canvas normalization
  const processImageFile = async (file: File) => {
    setIsProcessingImage(true);
    setValidationError(null);
    setAnalysisResult(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawDataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1400;
          let w = img.width;
          let h = img.height;

          if (w > h) {
            if (w > MAX_DIM) {
              h = Math.round((h * MAX_DIM) / w);
              w = MAX_DIM;
            }
          } else {
            if (h > MAX_DIM) {
              w = Math.round((w * MAX_DIM) / h);
              h = MAX_DIM;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.88);
            setImagePreview(compressed);
            setImageMimeType('image/jpeg');
          } else {
            setImagePreview(rawDataUrl);
            setImageMimeType(file.type || 'image/jpeg');
          }
          setIsProcessingImage(false);
        };
        img.onerror = () => {
          setImagePreview(rawDataUrl);
          setImageMimeType(file.type || 'image/jpeg');
          setIsProcessingImage(false);
        };
        img.src = rawDataUrl;
      };
      reader.onerror = () => {
        setValidationError(
          language === 'mr'
            ? 'फोटो लोड करताना त्रुटी आली. कृपया दुसरा फोटो निवडा.'
            : language === 'hi'
            ? 'तस्वीर लोड करने में समस्या आई। कृपया पुनः प्रयास करें।'
            : 'Error loading photo. Please try another image.'
        );
        setIsProcessingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing image:', err);
      setIsProcessingImage(false);
    }
  };

  // Clipboard paste support for fast testing
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [language]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageFile(file);
  };

  const handleSelectSample = (sample: (typeof sampleImages)[0]) => {
    setImagePreview(sample.url);
    setImageMimeType('image/jpeg');
    setSelectedCrop(sample.crop);
    setPlantPart(sample.part);
    setValidationError(null);
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    setValidationError(null);
    setAnalysisResult(null);
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: imageMimeType,
          cropType: selectedCrop,
          plantPart: plantPart,
          language: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Diagnostic server error');
      }

      // Check strict validation result: reject only non-plants
      if (!data.isValidCropImage) {
        setValidationError(data.rejectionReason || t.invalidImageNotice);
        setIsAnalyzing(false);
        return;
      }

      // For valid plant crops, always present the diagnosis!
      setAnalysisResult(data);
      setActiveScanContext(data);
    } catch (err: any) {
      console.error('Scan error:', err);
      setValidationError(
        language === 'mr'
          ? 'फोटोचे विश्लेषण करताना त्रुटी आली. कृपया इंटरनेट तपासा आणि पुन्हा प्रयत्न करा.'
          : language === 'hi'
          ? 'विश्लेषण में त्रुटि आई। कृपया पुनः प्रयास करें।'
          : 'Unable to analyze image. Please ensure connection and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (!analysisResult) return;
    saveScan({
      ...analysisResult,
      imageUrl: imagePreview || undefined,
      plantPart: plantPart,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddProductToCart = () => {
    if (!analysisResult) return;
    // Find matching product in catalog
    const match =
      MARKET_PRODUCTS.find((p) =>
        p.suitableCrops.includes(analysisResult.cropName)
      ) || MARKET_PRODUCTS[2]; // Default to Trichoderma
    addToCart(match);
  };

  const handleAskSahayak = () => {
    if (analysisResult) {
      setActiveScanContext(analysisResult);
    }
    setActiveSection('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCareKit = () => {
    setActiveSection('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 text-emerald-700" />
          <span>Responsible Agricultural Vision AI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.detectTitle}
        </h1>
        <p className="text-stone-700 text-xs sm:text-sm">
          {t.detectSubtitle}
        </p>
      </div>

      {/* Main Upload Box & Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Supported Dataset Crops Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {language === 'mr'
                  ? 'ज्ञान ग्रंथालयातील समर्थित पिके'
                  : language === 'hi'
                  ? 'ज्ञान पुस्तकालय में समर्थित फसलें'
                  : 'Supported Crops in AgriCare Knowledge Base'}
              </span>
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
              ICAR Verified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'auto', label: '✨ Auto-Detect', icon: '🔍' },
              { id: 'Tomato', label: '🍅 Tomato (टोमॅटो)', icon: '🍅' },
              { id: 'Rice', label: '🌾 Rice / Paddy (भात)', icon: '🌾' },
              { id: 'Onion', label: '🧅 Onion (कांदा)', icon: '🧅' },
              { id: 'Cotton', label: '🌿 Cotton (कापूस)', icon: '🌿' },
            ].map((crop) => {
              const isSelected = selectedCrop === crop.id;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-600/30'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span>{crop.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step A: Upload Box with Drag & Drop + Camera */}
        {!imagePreview ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) processImageFile(file);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
              isDragging
                ? 'border-emerald-600 bg-emerald-50/70 scale-[1.01]'
                : 'border-stone-300 hover:border-emerald-500 bg-stone-50/60 hover:bg-emerald-50/20'
            }`}
          >
            {/* Hidden File and Camera Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-105">
              <UploadCloud className="w-8 h-8 text-emerald-700" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1">
              {t.uploadAreaTitle}
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
              {language === 'mr'
                ? 'पिकाच्या पानाचा, फळाचा किंवा खोडाचा स्पष्ट फोटो निवडा. कॅमेऱ्याने थेट फोटो काढा किंवा फाईल ड्रॅग करा.'
                : language === 'hi'
                ? 'फसल की पत्ती, फल या तने की स्पष्ट तस्वीर चुनें। कैमरे से लाइव फोटो लें या फाइल ड्रैग करें।'
                : 'Upload a clear photo of crop leaf, stem, or fruit. Drag & drop, paste from clipboard, or capture live with your camera.'}
            </p>

            {/* Dual Action Buttons: Gallery & Camera */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{t.browseFiles}</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'mr'
                    ? 'थेट कॅमेऱ्याने फोटो काढा'
                    : language === 'hi'
                    ? 'कैमरे से फोटो लें'
                    : 'Take Live Photo'}
                </span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 mt-4">
              {language === 'mr'
                ? 'JPG, PNG, WEBP किंवा थेट फोन कॅमेरा (स्वयंचलित कॉम्प्रेशन)'
                : language === 'hi'
                ? 'JPG, PNG, WEBP या फोन कैमरा (ऑटोमैटिक कंप्रेशन)'
                : 'Supports JPG, PNG, WEBP, or phone cameras (automatically compressed for fast scan)'}
            </p>

            {isProcessingImage && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-semibold animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>
                  {language === 'mr'
                    ? 'फोटो प्रक्रिया व ऑप्टिमाइझ करत आहे...'
                    : language === 'hi'
                    ? 'फोटो प्रोसेस व ऑप्टिमाइज़ हो रही है...'
                    : 'Optimizing photo for fast diagnostic scan...'}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Image Preview & Controls */
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-950 aspect-video sm:aspect-[21/9] max-h-80 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Uploaded crop preview"
                className="max-h-80 w-auto object-contain mx-auto"
              />
              <button
                onClick={handleClear}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ready for Diagnosis</span>
              </div>
            </div>

            {/* Form Selection Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Crop Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.cropTypeLabel}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  <option value="auto">✨ {t.autoDetectCrop}</option>
                  <optgroup label="AgriCare ICAR Dataset Crops">
                    <option value="Tomato">🍅 Tomato (टोमॅटो / टमाटर)</option>
                    <option value="Rice">🌾 Rice / Paddy (भात / धान)</option>
                    <option value="Onion">🧅 Onion (कांदा / प्याज)</option>
                    <option value="Cotton">🌿 Cotton (कापूस / कपास)</option>
                  </optgroup>
                  <optgroup label="Other Crops">
                    <option value="Chilli">Chilli (मिरची / मिर्च)</option>
                    <option value="Wheat">Wheat (गहू / गेहूं)</option>
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                  </optgroup>
                </select>
              </div>

              {/* Plant Part */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.plantPartLabel}
                </label>
                <select
                  value={plantPart}
                  onChange={(e) => setPlantPart(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  <option value="leaf">{t.partLeaf}</option>
                  <option value="stem">{t.partStem}</option>
                  <option value="fruit">{t.partFruit}</option>
                  <option value="root">{t.partRoot}</option>
                  <option value="whole">{t.partWhole}</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
              >
                {t.clearForm}
              </button>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleStartAnalysis}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>{t.startAnalysis}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STRICT IMAGE VALIDATION REJECTION ALERT */}
        {validationError && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-amber-900">Validation Notice</p>
              <p className="leading-relaxed">{validationError}</p>
            </div>
          </div>
        )}

        {/* Quick Sample Test Images */}
        <div className="pt-4 border-t border-stone-200">
          <p className="text-xs font-semibold text-stone-700 mb-2.5">
            {t.sampleImagesTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleImages.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step C: AI Diagnosis Results Card */}
      {analysisResult && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-md p-6 sm:p-8 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {analysisResult.identifiedCrop}
                </span>
                {analysisResult.isDemonstration && (
                  <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                    Demonstration Mode
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {analysisResult.mostLikelyDisease}
              </h2>
              {analysisResult.scientificName && (
                <p className="text-xs sm:text-sm italic text-stone-700">
                  {analysisResult.scientificName}
                </p>
              )}
            </div>

            {/* Severity & Confidence Badges */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-stone-700">{t.severityLabel}:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    analysisResult.severity === 'High'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : analysisResult.severity === 'Moderate'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {analysisResult.severity}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-700">
                <span>{t.confidenceLabel}:</span>
                <span className="font-semibold text-emerald-800">
                  {analysisResult.confidenceLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Model Confidence Calibration Note */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Confidence Calibration:</strong> {analysisResult.confidenceNote}
            </p>
          </div>

          {/* Two-Column Information Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visible Symptoms */}
            <div className="bg-stone-50/60 rounded-xl p-5 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{t.visibleSymptomsLabel}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {analysisResult.visibleSymptoms?.map((sym, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Causes & Favouring Conditions */}
            <div className="bg-stone-50/60 rounded-xl p-5 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>{t.possibleCausesLabel}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {analysisResult.possibleCauses?.map((cause, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
              {analysisResult.favouringConditions && (
                <div className="pt-2 text-xs text-stone-700 border-t border-stone-200">
                  <span className="font-semibold text-stone-900">Conditions: </span>
                  <span>{analysisResult.favouringConditions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Treatment & Affordable IPM Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-700" />
              <span>Affordable & Integrated Treatment Recommendations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Immediate Steps */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  {t.immediateActionsLabel}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {analysisResult.immediateSteps?.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biological / Cultural Options */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  {t.biologicalOptionsLabel}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {analysisResult.biologicalOrIPMOptions?.map((bio, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{bio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural & Preventive Practices */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  {t.culturalPracticesLabel}
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {analysisResult.culturalAndPreventivePractices?.map((cul, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{cul}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Indicated Registered Agricultural Products */}
            {analysisResult.indicatedProducts && analysisResult.indicatedProducts.length > 0 && (
              <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-700" />
                    <span>{t.chemicalProductsLabel}</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
                    {t.costEstimateLabel}: {analysisResult.estimatedTreatmentCostRangeINR}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.indicatedProducts.map((prod, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 rounded-lg border border-emerald-200/80 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">{prod.name}</span>
                        <span className="text-xs font-bold text-emerald-800">
                          ~₹{prod.approximatePriceINR}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600">{prod.purpose}</p>
                      <p className="text-[10px] text-emerald-800 italic">{prod.safeUsage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PPE & When to Consult KVK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">
                  {t.ppeNoticeLabel}
                </span>
                <p>{analysisResult.ppeAndSafety}</p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">
                  {t.expertThresholdLabel}
                </span>
                <p>{analysisResult.whenToSeekExpert}</p>
              </div>
            </div>
          </div>

          {/* Section Actions: Save, Add to Cart, Generate Kit, Ask Sahayak */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveToDashboard}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{saveSuccess ? t.savedToDashboard : t.saveToDashboard}</span>
            </button>

            <button
              onClick={handleAddProductToCart}
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-700" />
              <span>{t.addToCart}</span>
            </button>

            <button
              onClick={handleGenerateCareKit}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.generateKitFromScan}</span>
            </button>

            <button
              onClick={handleAskSahayak}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-stone-600" />
              <span>{t.askSahayakAboutScan}</span>
            </button>

            <button
              onClick={handleClear}
              className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs font-medium ml-auto cursor-pointer"
            >
              {t.uploadAnother}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-stone-100 rounded-lg text-[11px] text-stone-600 leading-relaxed border border-stone-200">
            {t.disclaimerText}
          </div>
        </div>
      )}
    </div>
  );
};
