import React, { useState } from 'react';
import { Calendar, Menu, X, ChevronRight, Home as HomeIcon, Package, MapPin, Building2, User, Phone } from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  cart, 
  openBookingWizard, 
  openSearchModal
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#FFFFFF' }}>
      
      {/* Navigation Header Bar */}
      <div style={{
        padding: '0.75rem 1.25rem',
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} style={{ display: 'flex', alignItems: 'center', marginLeft: '-4px' }}>
            <img src="/logo.webp" alt="Bharath Jan Sewa Labs" className="header-logo-img" style={{ height: '52px', objectFit: 'contain' }} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={() => handleNavClick('home')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: currentTab === 'home' ? '#EF4444' : '#0F172A',
                background: currentTab === 'home' ? '#FFF1F2' : 'transparent',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}
            >
              Home
            </button>

            <button 
              onClick={() => handleNavClick('about')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: currentTab === 'about' ? '#EF4444' : '#0F172A',
                background: currentTab === 'about' ? '#FFF1F2' : 'transparent',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}
            >
              About Us
            </button>

            <button 
              onClick={() => handleNavClick('packages')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: currentTab === 'packages' ? '#EF4444' : '#0F172A',
                background: currentTab === 'packages' ? '#FFF1F2' : 'transparent',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}
            >
              Health Checkup
            </button>

            <button 
              onClick={() => handleNavClick('franchise')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: currentTab === 'franchise' ? '#EF4444' : '#0F172A',
                background: currentTab === 'franchise' ? '#FFF1F2' : 'transparent',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}
            >
              Why Franchise
            </button>

            <button 
              onClick={() => handleNavClick('centres')}
              style={{
                fontSize: '0.875rem',
                fontWeight: 800,
                color: currentTab === 'centres' ? '#EF4444' : '#0F172A',
                background: currentTab === 'centres' ? '#FFF1F2' : 'transparent',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '99px',
                cursor: 'pointer'
              }}
            >
              Our Centres
            </button>

            {/* Desktop Animated Call Number Button (After Our Centres) */}
            <a 
              href="tel:+919805543143" 
              className="desktop-call-btn"
              title="Call BJSL: +91 98055 43143"
            >
              <Phone size={15} color="white" />
              <span>+91 98055 43143</span>
            </a>
          </nav>

          {/* Right Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Phone Call Quick Button (Mobile Only) */}
            <a 
              href="tel:+919805543143"
              className="mobile-only-header-icon"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FFF1F2',
                border: '1.5px solid #FECDD3',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Call BJSL: +91 98055 43143"
            >
              <Phone size={18} color="#EF4444" />
            </a>

            {/* WhatsApp Quick Button (Mobile Only) */}
            <a 
              href="https://wa.me/919805543143?text=Hi%20BJSL,%20I%20want%20to%20book%20a%20health%20test"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-only-header-icon"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#DCFCE7',
                border: '1.5px solid #BBF7D0',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.15)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="WhatsApp Chat with BJSL"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
              </svg>
            </a>

            {/* Black Pill "Book a Test" Button (Desktop/Mobile) */}
            <button 
              className="desktop-book-btn"
              onClick={openBookingWizard}
              style={{
                background: '#0F172A',
                color: 'white',
                padding: '8px 18px',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)'
              }}
            >
              <Calendar size={16} color="white" />
              <span>Book a Test</span>
            </button>

            {/* Red 3-Line Hamburger Icon Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X size={26} color="#EF4444" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '22px' }}>
                  <div style={{ height: '2.5px', background: '#EF4444', borderRadius: '4px', width: '100%' }} />
                  <div style={{ height: '2.5px', background: '#EF4444', borderRadius: '4px', width: '100%' }} />
                  <div style={{ height: '2.5px', background: '#EF4444', borderRadius: '4px', width: '100%' }} />
                </div>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '2px solid #E2E8F0',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)',
          animation: 'mobileSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => handleNavClick('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentTab === 'home' ? '#FFF1F2' : '#F8FAFC',
                color: currentTab === 'home' ? '#EF4444' : '#0F172A',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HomeIcon size={18} color="#EF4444" /> Home
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button 
              onClick={() => handleNavClick('packages')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentTab === 'packages' ? '#FFF1F2' : '#F8FAFC',
                color: currentTab === 'packages' ? '#EF4444' : '#0F172A',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={18} color="#0284C7" /> Health Checkup Packages
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button 
              onClick={() => handleNavClick('centres')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentTab === 'centres' ? '#FFF1F2' : '#F8FAFC',
                color: currentTab === 'centres' ? '#EF4444' : '#0F172A',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#059669" /> Our Diagnostic Centres (10)
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button 
              onClick={() => handleNavClick('franchise')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentTab === 'franchise' ? '#FFF1F2' : '#F8FAFC',
                color: currentTab === 'franchise' ? '#EF4444' : '#0F172A',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={18} color="#EF4444" /> Why Franchise with BJSL
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button 
              onClick={() => handleNavClick('about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentTab === 'about' ? '#FFF1F2' : '#F8FAFC',
                color: currentTab === 'about' ? '#EF4444' : '#0F172A',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={18} color="#6366F1" /> About Us & Mission
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
