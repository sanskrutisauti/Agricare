import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MARKET_PRODUCTS } from '../data/marketProducts';
import { MarketProduct } from '../types';
import {
  Store,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  CheckCircle2,
  ShieldCheck,
  X,
  Star,
  MapPin,
  Building2,
  AlertTriangle,
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { t, language, addToCart } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'organic', label: t.catOrganic },
    { id: 'compost', label: t.catCompost },
    { id: 'biofertiliser', label: t.catBiofertiliser },
    { id: 'micronutrient', label: t.catMicronutrient },
    { id: 'soil_conditioner', label: t.catSoilConditioner },
    { id: 'crop_specific', label: t.catCropSpecific },
  ];

  const filteredProducts = useMemo(() => {
    return MARKET_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Crop filter
      if (selectedCrop !== 'all' && !prod.suitableCrops.includes(selectedCrop)) {
        return false;
      }
      // Price filter
      if (prod.priceINR > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        const matchDesc =
          prod.description[language]?.toLowerCase().includes(q) ||
          prod.description.en.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price_desc') return b.priceINR - a.priceINR;
      return b.rating - a.rating; // default relevance
    });
  }, [selectedCategory, selectedCrop, maxPrice, searchQuery, sortBy, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Store className="w-4 h-4 text-emerald-700" />
          <span>Affordable Agricultural Inputs</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.marketTitle}
        </h1>
        <p className="text-stone-700 text-xs sm:text-sm">
          {t.marketSubtitle}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchProducts}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {/* Crop Selector */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              {t.filterCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-lg bg-white"
            >
              <option value="all">All Crops (सर्व पिके)</option>
              <option value="Tomato">Tomato (टोमॅटो)</option>
              <option value="Rice">Rice (भात)</option>
              <option value="Onion">Onion (कांदा)</option>
              <option value="Cotton">Cotton (कापूस)</option>
              <option value="Chilli">Chilli (मिरची)</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 mb-1">
              <span>{t.filterPrice}</span>
              <span className="text-emerald-800">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={150}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              {t.sortLabel}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-lg bg-white"
            >
              <option value="relevance">{t.sortRelevance}</option>
              <option value="price_asc">{t.sortPriceLowHigh}</option>
              <option value="price_desc">{t.sortPriceHighLow}</option>
            </select>
          </div>

          {/* Active Results Count */}
          <div className="flex items-end pb-1">
            <span className="text-xs text-stone-500">
              Showing <strong>{filteredProducts.length}</strong> verified products
            </span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
          <p className="font-semibold text-stone-800">No products match your filter criteria.</p>
          <p className="text-xs">Try increasing the price range or changing category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCrop('all');
              setMaxPrice(1000);
              setSearchQuery('');
            }}
            className="text-xs text-emerald-700 font-bold underline mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              {/* Product Image & Badges */}
              <div className="relative h-48 bg-stone-100 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-emerald-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {prod.packSize}
                </div>
                {prod.isVerifiedGovtCoop && (
                  <div className="absolute top-2 right-2 bg-white/95 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>KVK Verified</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate">{prod.brand}</span>
                    <span className="font-semibold text-emerald-700 shrink-0">
                      {prod.pricePerUnit}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {prod.description[language] || prod.description.en}
                  </p>
                </div>

                {/* Seller & Suitable Crops */}
                <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{prod.sellerLocation}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap text-[10px]">
                    <span className="font-semibold text-stone-600">Crops:</span>
                    {prod.suitableCrops.slice(0, 3).map((c) => (
                      <span key={c} className="bg-stone-100 text-stone-700 px-1 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-stone-400 block leading-none">Price</span>
                    <span className="text-lg font-black text-emerald-950 font-sans">
                      ₹{prod.priceINR}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(prod)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
                    >
                      {t.viewDetails}
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(prod)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{t.addToCartBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selectedProduct.brand}
                </span>
                <h3 className="text-xl font-bold text-stone-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <span>Pack: <strong>{selectedProduct.packSize}</strong></span>
                  <span>·</span>
                  <span>Rate: <strong>{selectedProduct.pricePerUnit}</strong></span>
                </div>
                <div className="text-2xl font-black text-emerald-950 pt-1">
                  ₹{selectedProduct.priceINR}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 text-xs text-stone-700">
              <span className="font-bold text-stone-900">Description:</span>
              <p className="leading-relaxed">
                {selectedProduct.description[language] || selectedProduct.description.en}
              </p>
            </div>

            {/* Intended Use & Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Intended Purpose:</span>
                <p className="text-stone-600">
                  {selectedProduct.intendedUse[language] || selectedProduct.intendedUse.en}
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Verified Usage:</span>
                <p className="text-stone-600">
                  {selectedProduct.usageInstructions[language] || selectedProduct.usageInstructions.en}
                </p>
              </div>
            </div>

            {/* Precautions */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-amber-900">Safety & Precautions:</span>
                <p>{selectedProduct.precautions[language] || selectedProduct.precautions.en}</p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                Seller: <strong>{selectedProduct.seller}</strong> ({selectedProduct.sellerLocation})
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.addToCartBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
