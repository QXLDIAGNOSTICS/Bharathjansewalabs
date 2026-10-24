import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, ShoppingCart, User, Zap, X, Building2, Check } from 'lucide-react';
import { CENTRES } from '../data/mockData';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  cart = [], 
  openBookingWizard, 
  openSearchModal,
  openPortal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('bjsl_user_location') || 'Bangalore (All Hubs)';
  });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const s = localStorage.getItem('bjsl_patient_session');
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  });

  const getHeaderInitials = (name) => {
    if (!name) return 'PT';
    const clean = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'PT';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const typewriterWords = ['tests', 'checkups', 'cbc', 'hba1c', 'thyroid', 'chirayu prime'];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const s = localStorage.getItem('bjsl_patient_session');
        setLoggedInUser(s ? JSON.parse(s) : null);
      } catch (e) {
        setLoggedInUser(null);
      }
    };
    window.addEventListener('bjsl_auth_change', checkAuth);
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('bjsl_auth_change', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % typewriterWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [typewriterWords.length]);

  const handleNav = (tab, hash) => {
    setCurrentTab(tab);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const allOperationalLocations = [
    {
      id: 'blr-all',
      name: 'Bengaluru (All Areas)',
      area: 'Entire Bengaluru Urban',
      pincode: 'All Pincodes',
      address: 'Citywide 60-Minute Doorstep Blood & Urine Sample Collection Dispatch',
      coverage: 'Hebbal, Whitefield, Indiranagar, Jayanagar, Koramangala, Yelahanka, Electronic City & all Bengaluru zones',
      tag: '⚡ 60-min Live',
      displayName: 'Bangalore (All Hubs)'
    },
    ...CENTRES.map((c) => ({
      id: c.id,
      name: c.name.replace('BJSL Centre – ', ''),
      area: c.area,
      pincode: c.pincode,
      address: c.address,
      coverage: c.homeCollectionCoverage ? c.homeCollectionCoverage.join(', ') : '',
      tag: '⚡ 60-min Live Hub',
      displayName: `${c.area}, Bangalore`
    }))
  ];

  const filteredLocations = allOperationalLocations.filter((loc) => {
    if (!locationSearchQuery.trim()) return true;
    const q = locationSearchQuery.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.area.toLowerCase().includes(q) ||
      loc.pincode.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      (loc.coverage && loc.coverage.toLowerCase().includes(q))
    );
  });

  return (
    <>
      {/* Sticky Header on Scroll (Screenshot 2) */}
      <header className={`site-header-sticky ${isScrolled ? 'is-visible' : ''}`} role="banner">
        <div className="container sticky-header-wrapper">
          <div className="sticky-left">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNav('home'); }} 
              className="sticky-logo-circle"
              title="Bharath Jan Sewa Labs"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img 
                src="/logo.webp" 
                alt="Bharath Jan Sewa Labs" 
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
            </a>

            <button 
              type="button" 
              onClick={() => setIsCityModalOpen(true)}
              className="location-pill-btn"
            >
              <span className="location-lightning-icon">
                <Zap size={18} fill="#0284C7" stroke="#0284C7" />
              </span>
              <div className="location-pill-text">
                <span className="location-pill-city">{selectedCity}</span>
                <span className="location-pill-change">
                  Change location <ChevronDown size={12} />
                </span>
              </div>
            </button>
          </div>

          <div 
            className="sticky-search-bar" 
            onClick={openSearchModal}
            role="button"
            tabIndex={0}
          >
            <span style={{ fontSize: '14px', color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Search for <span style={{ color: 'var(--brand-500)', fontWeight: 700 }}>{typewriterWords[typewriterIndex]}</span>
            </span>
            <Search size={18} style={{ color: 'var(--ink-800)' }} />
          </div>

          <nav className="sticky-nav-links">
            <button 
              type="button"
              onClick={() => handleNav('home', '#popular-tests')} 
              className="sticky-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Tests
            </button>
            <button 
              type="button"
              onClick={() => handleNav('home', '#checkups')} 
              className="sticky-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Checkups
            </button>
            <button 
              type="button"
              onClick={() => handleNav('home', '#centres')} 
              className="sticky-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Centres
            </button>
            <button 
              type="button"
              onClick={() => handleNav('franchise')} 
              className="sticky-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Franchise
            </button>
          </nav>

          <div className="header-right-group">
            <button 
              type="button" 
              onClick={openBookingWizard}
              className="circle-icon-btn btn-open-cart" 
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="cart-counter-badge">{cart.length}</span>
              )}
            </button>
            <button 
              type="button" 
              onClick={openPortal}
              className="circle-icon-btn btn-open-profile" 
              aria-label={loggedInUser ? `Patient Account: ${loggedInUser.name}` : "Patient Sign In"}
              title={loggedInUser ? `Logged in: ${loggedInUser.name} (${loggedInUser.phone})` : "Patient Sign In / Lab Portal"}
              style={loggedInUser ? { background: '#E0F2FE', borderColor: '#38BDF8', color: '#0284C7', fontWeight: 900 } : {}}
            >
              {loggedInUser ? (
                <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.02em' }}>
                  {getHeaderInitials(loggedInUser.name)}
                </span>
              ) : (
                <User size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Unpinned Top Header (Screenshot 1) */}
      <header className="site-header-unpinned">
        <div className="container">
          <div className="header-top-row">
            
            {/* Brand Logo & Location Pill */}
            <div className="header-left-group">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNav('home'); }} 
                className="logo-link" 
                aria-label="Bharath Jan Sewa Labs"
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <img 
                  src="/logo.webp" 
                  alt="Bharath Jan Sewa Labs" 
                  style={{ height: '58px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    // Fallback to stylized text badge if image fails
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#E11D48',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '18px'
                  }}>
                    BJ
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: 'var(--ink-950)' }}>
                    Bharath<span style={{ color: 'var(--brand-500)' }}>JanSewa</span><span style={{ color: 'var(--green-500)' }}>Labs</span>
                  </span>
                </div>
              </a>

              <button 
                type="button" 
                onClick={() => setIsCityModalOpen(true)}
                className="location-pill-btn"
                id="header-location-btn"
              >
                <span className="location-lightning-icon">
                  <Zap size={20} fill="#0284C7" stroke="#0284C7" />
                </span>
                <div className="location-pill-text">
                  <span className="location-pill-city">{selectedCity}</span>
                  <span className="location-pill-change">
                    Change location <ChevronDown size={12} />
                  </span>
                </div>
              </button>
            </div>

            {/* Right Side Cart & Profile */}
            <div className="header-right-group">
              <button 
                type="button" 
                onClick={openBookingWizard}
                className="circle-icon-btn btn-open-cart" 
                aria-label="View Shopping Cart"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="cart-counter-badge">{cart.length}</span>
                )}
              </button>
              <button 
                type="button" 
                onClick={openPortal}
                className="circle-icon-btn btn-open-profile" 
                aria-label={loggedInUser ? `Patient Account: ${loggedInUser.name}` : "Patient Sign In"}
                title={loggedInUser ? `Logged in: ${loggedInUser.name} (${loggedInUser.phone})` : "Patient Sign In / Lab Portal"}
                style={loggedInUser ? { background: '#E0F2FE', borderColor: '#38BDF8', color: '#0284C7', fontWeight: 900 } : {}}
              >
                {loggedInUser ? (
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.02em' }}>
                    {getHeaderInitials(loggedInUser.name)}
                  </span>
                ) : (
                  <User size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Floating Rounded Search Capsule Shelf (Screenshot 1) */}
          <div className="search-capsule-shelf" role="search">
            
            {/* Search Input Pill with Typewriter */}
            <div 
              className="search-input-pill" 
              onClick={openSearchModal}
              role="button"
              tabIndex={0}
            >
              <div className="search-typewriter-box">
                <span>Search for</span>
                <span className="typewriter-word">{typewriterWords[typewriterIndex]}</span>
              </div>
              <span className="search-pill-icon">
                <Search size={18} />
              </span>
            </div>

            {/* Quick Pill: Tests */}
            <button 
              type="button" 
              onClick={() => handleNav('home', '#popular-tests')}
              className="quick-shelf-pill pill-tests"
            >
              <span className="pill-3d-icon">🔬</span>
              <span>Tests</span>
            </button>

            {/* Quick Pill: Checkups */}
            <button 
              type="button" 
              onClick={() => handleNav('home', '#checkups')}
              className="quick-shelf-pill pill-checkups"
            >
              <span className="pill-3d-icon">🧰</span>
              <span>Checkups</span>
            </button>
          </div>
        </div>
      </header>

      {/* Real Location & Centre Selector Modal */}
      {isCityModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCityModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '680px', width: '92%' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#E0F2FE',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="modal-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#071E33', margin: 0 }}>
                    Select Operational Location & Lab Hub
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                    10 Certified Diagnostic Centres & 60-min Doorstep Collection across Bengaluru
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsCityModalOpen(false)}
                className="circle-icon-btn"
                style={{ width: '32px', height: '32px' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.25rem 1.5rem', maxHeight: '72vh', overflowY: 'auto' }}>
              
              {/* Search input for area or pincode */}
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input 
                  type="text" 
                  placeholder="Search by area or pincode (e.g. Sanjaynagar, Kengeri, Peenya, 560094...)"
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A',
                    outline: 'none',
                    background: '#F8FAFC'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284C7'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>

              {/* Grid of Real Locations */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {filteredLocations.map((loc) => {
                  const isSelected = selectedCity === loc.displayName;
                  return (
                    <div 
                      key={loc.id} 
                      onClick={() => {
                        setSelectedCity(loc.displayName);
                        localStorage.setItem('bjsl_user_location', loc.displayName);
                        setIsCityModalOpen(false);
                      }}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #0284C7' : '1.5px solid #E2E8F0',
                        background: isSelected ? '#F0F9FF' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.98rem', color: isSelected ? '#0284C7' : '#0F172A' }}>
                            {loc.name}
                          </div>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#059669',
                            background: '#D1FAE5',
                            padding: '2px 8px',
                            borderRadius: '99px',
                            whiteSpace: 'nowrap'
                          }}>
                            {loc.tag}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.45, marginBottom: '6px' }}>
                          {loc.address}
                        </div>

                        {loc.coverage && (
                          <div style={{ fontSize: '0.75rem', color: '#0369A1', fontWeight: 600, background: '#E0F2FE', padding: '3px 8px', borderRadius: '6px', display: 'inline-block' }}>
                            📍 Serves: {loc.coverage}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F1F5F9', fontSize: '0.75rem', color: '#94A3B8' }}>
                        <span>Pincode: <strong style={{ color: '#475569' }}>{loc.pincode}</strong></span>
                        {isSelected && (
                          <span style={{ color: '#0284C7', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={14} /> Selected Location
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredLocations.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748B' }}>
                  <p style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontSize: '1rem' }}>No exact match found for "{locationSearchQuery}"</p>
                  <p style={{ fontSize: '0.875rem' }}>Our 60-min doorstep sample collection covers all Bengaluru pincodes.</p>
                  <button 
                    onClick={() => {
                      setSelectedCity('Bangalore (All Hubs)');
                      localStorage.setItem('bjsl_user_location', 'Bangalore (All Hubs)');
                      setIsCityModalOpen(false);
                    }}
                    className="btn-primary" 
                    style={{ marginTop: '14px', padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    Select Bangalore (All Localities)
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
