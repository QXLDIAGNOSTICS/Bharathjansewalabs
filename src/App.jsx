import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import TestsCatalogue from './pages/TestsCatalogue';
import PackagesCatalogue from './pages/PackagesCatalogue';
import CentresPage from './pages/CentresPage';
import DoctorsClinicsPage from './pages/DoctorsClinicsPage';
import FranchisePage from './pages/FranchisePage';
import BlogsPage from './pages/BlogsPage';
import PatientPortal from './pages/PatientPortal';

import TestDetailModal from './components/TestDetailModal';
import BookingWizardModal from './components/BookingWizardModal';
import SearchModal from './components/SearchModal';
import CompareModal from './components/CompareModal';
import FranchiseModal from './components/FranchiseModal';
import ReportViewerModal from './components/ReportViewerModal';
import AIChatBotModal from './components/AIChatBotModal';
import LegalModal from './components/LegalModal';

import { INDIVIDUAL_TESTS, HEALTH_PACKAGES } from './data/mockData';
import { Bot, MessageSquare, Phone, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  
  // Cart & Booking
  const [cart, setCart] = useState([HEALTH_PACKAGES[0]]); // Pre-load Chirayu Prime for demonstration
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Modals & Overlay States
  const [selectedTest, setSelectedTest] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);

  // Package Comparison Array
  const [comparedPackages, setComparedPackages] = useState([HEALTH_PACKAGES[0], HEALTH_PACKAGES[1]]);

  // Add item to cart and launch booking wizard
  const handleBookTest = (item) => {
    if (!cart.some(i => i.id === item.id)) {
      setCart([...cart, item]);
    }
    setIsBookingOpen(true);
  };

  const handleToggleCompare = (pkg) => {
    if (comparedPackages.some(p => p.id === pkg.id)) {
      setComparedPackages(comparedPackages.filter(p => p.id !== pkg.id));
    } else {
      if (comparedPackages.length >= 4) {
        alert('You can compare up to 4 packages at a time.');
        return;
      }
      setComparedPackages([...comparedPackages, pkg]);
    }
  };

  const handleRemoveCompareItem = (pkgId) => {
    setComparedPackages(comparedPackages.filter(p => p.id !== pkgId));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Dynamic Ambient Liquid Orbs Background */}
      <div className="liquid-bg-container">
        <div className="liquid-bg-orb liquid-orb-1" />
        <div className="liquid-bg-orb liquid-orb-2" />
        <div className="liquid-bg-orb liquid-orb-3" />
      </div>

      {/* Header Bar */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cart={cart}
        openBookingWizard={() => setIsBookingOpen(true)}
        openSearchModal={() => setIsSearchOpen(true)}
        openPortal={() => setCurrentTab('portal')}
      />

      {/* Main View Router */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {currentTab === 'home' && (
          <Home 
            setCurrentTab={setCurrentTab}
            onSelectTest={(item) => setSelectedTest(item)}
            onBookTest={handleBookTest}
            openSearchModal={() => setIsSearchOpen(true)}
            openBookingWizard={() => setIsBookingOpen(true)}
            openFranchiseModal={() => setIsFranchiseOpen(true)}
            comparedPackages={comparedPackages}
            onToggleCompare={handleToggleCompare}
            openCompareModal={() => setIsCompareOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage 
            setCurrentTab={setCurrentTab}
            openBookingWizard={() => setIsBookingOpen(true)}
          />
        )}

        {currentTab === 'tests' && (
          <TestsCatalogue 
            onSelectTest={(item) => setSelectedTest(item)}
            onBookTest={handleBookTest}
          />
        )}

        {currentTab === 'packages' && (
          <PackagesCatalogue 
            onSelectTest={(item) => setSelectedTest(item)}
            onBookTest={handleBookTest}
            comparedPackages={comparedPackages}
            onToggleCompare={handleToggleCompare}
            openCompareModal={() => setIsCompareOpen(true)}
          />
        )}

        {currentTab === 'centres' && (
          <CentresPage 
            openBookingWizard={() => setIsBookingOpen(true)}
          />
        )}

        {currentTab === 'doctors' && (
          <DoctorsClinicsPage />
        )}

        {currentTab === 'franchise' && (
          <FranchisePage 
            openFranchiseModal={() => setIsFranchiseOpen(true)}
          />
        )}

        {currentTab === 'blogs' && (
          <BlogsPage onBookTest={handleBookTest} />
        )}

        {currentTab === 'portal' && (
          <PatientPortal 
            onOpenReportViewer={(report) => setSelectedReport(report)}
            openBookingWizard={() => setIsBookingOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} openLegal={(type) => setLegalModalType(type)} />

      {/* Floating Action Buttons: AI Assistant & WhatsApp Chat (Bottom Right - Hidden on Mobile) */}
      <div className="desktop-floating-actions" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px' }}>
        
        {/* WhatsApp Direct Chat Button */}
        <a 
          href="https://wa.me/919805543143?text=Hi%20BJSL,%20I%20want%20to%20book%20a%20blood%20test"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(37, 211, 102, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: 'white',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 30px rgba(37, 211, 102, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            border: '1.5px solid rgba(255, 255, 255, 0.5)',
            textDecoration: 'none',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title="WhatsApp Chat with BJSL"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
          </svg>
        </a>

        {/* AI Health Assistant Floating Pill Button (Desktop View) */}
        <button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          title="BJSL AI Health Assistant"
          style={{
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: 'white',
            padding: '12px 22px',
            borderRadius: '99px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 35px rgba(239, 68, 68, 0.45), inset 0 1.5px 0 rgba(255, 255, 255, 0.6)',
            border: '1.5px solid rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 900,
            letterSpacing: '0.02em',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Sparkles size={22} color="white" />
          <span>Ask AI</span>
        </button>

      </div>

      {/* Mobile Sticky Navigation */}
      <MobileBottomNav 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openBookingWizard={() => setIsBookingOpen(true)}
        toggleAIChat={() => setIsAIChatOpen(!isAIChatOpen)}
        openPortal={() => setCurrentTab('portal')}
      />

      {/* Modals & Dialog Overlays */}
      {selectedTest && (
        <TestDetailModal 
          item={selectedTest}
          onClose={() => setSelectedTest(null)}
          onBook={handleBookTest}
        />
      )}

      {isBookingOpen && (
        <BookingWizardModal 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          cart={cart}
          setCart={setCart}
          onBookingSuccess={(booking) => {
            // Success handler
          }}
        />
      )}

      {isSearchOpen && (
        <SearchModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectTest={(item) => setSelectedTest(item)}
          onBookTest={handleBookTest}
        />
      )}

      {isCompareOpen && (
        <CompareModal 
          comparedPackages={comparedPackages}
          onClose={() => setIsCompareOpen(false)}
          onBookPackage={handleBookTest}
          onRemove={handleRemoveCompareItem}
        />
      )}

      {isFranchiseOpen && (
        <FranchiseModal 
          isOpen={isFranchiseOpen}
          onClose={() => setIsFranchiseOpen(false)}
        />
      )}

      {selectedReport && (
        <ReportViewerModal 
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {isAIChatOpen && (
        <AIChatBotModal 
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          onBookTest={handleBookTest}
        />
      )}

      {legalModalType && (
        <LegalModal 
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}

    </div>
  );
}
