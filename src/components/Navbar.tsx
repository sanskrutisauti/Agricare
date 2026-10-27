import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Sprout,
  ShieldAlert,
  ClipboardList,
  Store,
  BookOpen,
  BotMessageSquare,
  LayoutDashboard,
  ShoppingCart,
  Globe2,
  Menu,
  X,
  UserCheck,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    activeSection,
    setActiveSection,
    t,
    cartTotalCount,
    setIsCartOpen,
    profile,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Sprout },
    { id: 'detection', label: t.navDetection, icon: ShieldAlert },
    { id: 'assessment', label: t.navAssessment, icon: ClipboardList },
    { id: 'marketplace', label: t.navMarketplace, icon: Store },
    { id: 'library', label: t.navLibrary, icon: BookOpen },
    { id: 'chatbot', label: t.navChatbot, icon: BotMessageSquare },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm shadow-emerald-800/20 group-hover:bg-emerald-800 transition-colors">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 font-sans">
                  AgriCare
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  किसान मित्र
                </span>
              </div>
              <p className="text-[10px] text-stone-700 hidden sm:block leading-none">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Language, Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
              <div className="pl-1.5 pr-1 text-stone-500">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Farmer Profile quick tag & Logout */}
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => handleNavClick('dashboard')}
                title="Open Farmer Dashboard & Kisan Pass"
                className="flex items-center gap-1.5 pl-2 pr-3 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="truncate max-w-[110px]">{profile.name.split(' ')[0]}</span>
                {profile.kisanId && (
                  <span className="text-[10px] text-emerald-700/80 font-mono hidden xl:inline">
                    ({profile.kisanId.slice(-4)})
                  </span>
                )}
              </button>

              <button
                onClick={logout}
                title={t.logoutBtn}
                className="p-1.5 text-stone-500 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Navigation Menu"
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="mb-3 pb-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1.5 truncate">
              <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="font-semibold text-emerald-900 truncate">{profile.name}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors font-medium shrink-0 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
