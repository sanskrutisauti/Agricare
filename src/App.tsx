import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { DiseaseDetector } from './components/DiseaseDetector';
import { CropAssessment } from './components/CropAssessment';
import { Marketplace } from './components/Marketplace';
import { CropLibrary } from './components/CropLibrary';
import { Chatbot } from './components/Chatbot';
import { FarmerDashboard } from './components/FarmerDashboard';
import { CartDrawer } from './components/CartDrawer';
import { FloatingChatButton } from './components/FloatingChatButton';
import { AuthPortal } from './components/AuthPortal';

const AppContent: React.FC = () => {
  const { activeSection, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <AuthPortal />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <div className="flex-1">
        <main className="min-h-[calc(100vh-140px)]">
          {activeSection === 'home' && <Home />}
          {activeSection === 'detection' && <DiseaseDetector />}
          {activeSection === 'assessment' && <CropAssessment />}
          {activeSection === 'marketplace' && <Marketplace />}
          {activeSection === 'library' && <CropLibrary />}
          {activeSection === 'chatbot' && <Chatbot />}
          {activeSection === 'dashboard' && <FarmerDashboard />}
        </main>
      </div>
      <Footer />
      <CartDrawer />
      <FloatingChatButton />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
