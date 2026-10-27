import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, ExternalLink, ShieldCheck, HeartHandshake, PhoneCall, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveSection } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: About AgriCare & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                AgriCare
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.footerAboutText}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 border border-stone-700 text-emerald-400 text-xs">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Second-Year Community Project</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('detection'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navDetection}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navAssessment} (30 Questions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navMarketplace}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navLibrary}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('chatbot'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navChatbot} (AgriCare Sahayak)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveSection('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navDashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Extension Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {t.footerAgriResources}
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li>
                <a
                  href="https://icar.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>{t.footerIcarLink}</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://kvk.icar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>{t.footerKvkLink}</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://agricoop.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>{t.footerGovtAgriLink}</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li className="pt-2 text-stone-500 text-[11px] leading-relaxed">
                Extension Advisory: Kisan Call Centre Toll-Free 1800-180-1551 (All India)
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Project Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact & Feedback
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>agricare.community@engg.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Student Engagement Cell: Pune, India</span>
              </div>
            </div>
            <div className="pt-3">
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Designed with local farmers in Maharashtra & rural India to make affordable crop care transparent and accessible in Devanagari.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible AI Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 text-xs text-stone-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-semibold text-white">{t.footerDisclaimerTitle}</h5>
            <p className="text-stone-400 leading-relaxed">{t.footerDisclaimerText}</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Engineering College Project Evaluation Mode</span>
            <span>·</span>
            <span>Demonstration Environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
