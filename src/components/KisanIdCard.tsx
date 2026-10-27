import React from 'react';
import { FarmerProfile } from '../types';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  QrCode,
  Sprout,
  MapPin,
  Phone,
  Landmark,
  Calendar,
  CheckCircle,
  Download,
} from 'lucide-react';

interface KisanIdCardProps {
  farmer: FarmerProfile;
  showPrintAction?: boolean;
  compact?: boolean;
}

export const KisanIdCard: React.FC<KisanIdCardProps> = ({
  farmer,
  showPrintAction = false,
  compact = false,
}) => {
  const { t } = useApp();

  const kisanId =
    farmer.kisanId ||
    `MH-${(farmer.district || 'PUN').substring(0, 3).toUpperCase()}-2026-8291`;

  const crops = farmer.primaryCrops && farmer.primaryCrops.length > 0
    ? farmer.primaryCrops
    : ['Tomato', 'Onion'];

  const getCropIcon = (crop: string) => {
    switch (crop.toLowerCase()) {
      case 'tomato':
        return '🍅';
      case 'onion':
        return '🧅';
      case 'rice':
        return '🌾';
      case 'cotton':
        return '🌿';
      case 'maize':
      case 'corn':
        return '🌽';
      case 'potato':
        return '🥔';
      case 'soybean':
        return '🫘';
      case 'grapes':
        return '🍇';
      default:
        return '🌱';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full max-w-md mx-auto ${compact ? 'text-xs' : ''}`}>
      {/* Smart Pass Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white shadow-xl border border-emerald-500/30">
        {/* Subtle Decorative Background Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        
        {/* Holographic Top Banner */}
        <div className="relative px-5 py-3.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 border-b border-emerald-600/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Sprout className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-200 leading-none">
                AgriCare Digital Kisan Pass
              </p>
              <p className="text-xs font-bold text-white leading-tight">
                शेतकरी डिजिटल ओळखपत्र
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-[10px] font-semibold text-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>ICAR Verified</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4 relative z-10">
          {/* Header row: Chip + Kisan ID */}
          <div className="flex items-center justify-between">
            {/* Golden Smart Chip Graphic */}
            <div className="w-10 h-7 rounded bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-600 shadow-xs flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-[1px] bg-amber-700/60 absolute top-1/2 -translate-y-1/2" />
              <div className="h-full w-[1px] bg-amber-700/60 absolute left-1/3" />
              <div className="h-full w-[1px] bg-amber-700/60 absolute right-1/3" />
              <div className="w-3 h-3 rounded-full border border-amber-800/50 bg-amber-300/40" />
            </div>

            {/* Kisan ID Badge */}
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold block">
                KISAN ID / ओळख क्र.
              </span>
              <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-emerald-100 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-600/40 inline-block">
                {kisanId}
              </span>
            </div>
          </div>

          {/* Farmer Details Grid */}
          <div className="flex items-start gap-4">
            {/* Farmer Avatar/Initial Shield */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-stone-900 rounded-[10px] flex flex-col items-center justify-center text-white">
                <span className="text-lg font-extrabold text-emerald-300">
                  {farmer.name ? farmer.name.charAt(0).toUpperCase() : 'K'}
                </span>
                <span className="text-[8px] text-stone-400 uppercase font-semibold">
                  Kisan
                </span>
              </div>
            </div>

            {/* Name and Basic Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white truncate tracking-tight">
                {farmer.name || 'शेतकरी मित्र (Farmer Member)'}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-emerald-200/90 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">
                  {farmer.village ? `${farmer.village}, ` : ''}
                  {farmer.district || 'Pune'}, {farmer.state || 'Maharashtra'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-stone-300 mt-1">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-amber-400" />
                  <strong>{farmer.farmSizeAcres || 2.5}</strong> {t.farmSizeLabel ? 'Acres' : 'एकर'}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-400" />
                  +91 {farmer.phone ? `${farmer.phone.slice(0, 5)}-${farmer.phone.slice(5)}` : '98765-XXXXX'}
                </span>
              </div>
            </div>
          </div>

          {/* Cultivated Crops Badges */}
          <div className="pt-2 border-t border-emerald-800/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-1.5">
              नोंदणीकृत मुख्य पिके (Cultivated Crops)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {crops.map((crop) => (
                <span
                  key={crop}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-medium text-emerald-100"
                >
                  <span>{getCropIcon(crop)}</span>
                  <span>{crop}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card Footer: Issue date, Validity, and QR / Barcode representation */}
          <div className="pt-2 border-t border-emerald-800/40 flex items-center justify-between text-[10px] text-stone-300">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-emerald-300">
                <Calendar className="w-3 h-3" />
                <span>Valid: 2026 – 2031 (5 Years)</span>
              </div>
              <div className="flex items-center gap-1 text-stone-400">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Status: Active Kisan Account</span>
              </div>
            </div>

            {/* QR Code graphic */}
            <div className="bg-white p-1 rounded-md text-stone-900 flex items-center justify-center">
              <QrCode className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Bottom Security Holographic Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-400" />
      </div>

      {/* Optional Print / Download Button */}
      {showPrintAction && (
        <div className="mt-3 text-center">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.downloadPass || 'Download / Print Kisan Pass'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
