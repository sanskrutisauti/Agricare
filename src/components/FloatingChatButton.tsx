import React from 'react';
import { useApp } from '../context/AppContext';
import { BotMessageSquare, X } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const FloatingChatButton: React.FC = () => {
  const { isChatOpen, setIsChatOpen, activeSection } = useApp();

  // If user is already on the dedicated chatbot page, don't show the duplicate floating modal
  if (activeSection === 'chatbot') return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Dialog if Open */}
      {isChatOpen && (
        <div className="fixed sm:absolute bottom-20 right-0 sm:right-0 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-slide-up">
          <div className="bg-emerald-800 text-white p-3 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <BotMessageSquare className="w-4 h-4 text-emerald-300" />
              AgriCare Sahayak (AI)
            </span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 hover:bg-emerald-700 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot isEmbeddedFloating={true} />
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Open AI Agricultural Assistant"
        className="w-13 h-13 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <BotMessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
          </>
        )}
        <span className="sr-only">Toggle AgriCare Sahayak Chat</span>
      </button>
    </div>
  );
};
