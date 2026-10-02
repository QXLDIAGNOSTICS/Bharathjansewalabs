import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Phone,
  Clock,
  Heart,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Mail,
  Award,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  Bot,
  Play,
  Pause,
  X,
  Droplet,
  Globe
} from 'lucide-react';
import PackageCard from '../components/PackageCard';
import TestCard from '../components/TestCard';
import { 
  HEALTH_PACKAGES, 
  INDIVIDUAL_TESTS, 
  CENTRES,
  GOOGLE_REVIEWS,
  FAQS
} from '../data/mockData';

export default function Home({ 
  setCurrentTab, 
  onSelectTest, 
  onBookTest, 
  openSearchModal,
  openBookingWizard,
  openFranchiseModal,
  comparedPackages,
  onToggleCompare
}) {
  const [activeFaq, setActiveFaq] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [homepageSearch, setHomepageSearch] = useState('');

  // Gallery WhatsApp Images
  const galleryImages = [
    { src: '/images/gallery/gallery-1.jpg', title: 'BJSL NABL Automated Blood Analyzer Desk' },
    { src: '/images/gallery/gallery-2.jpg', title: 'Phlebotomist Sample Collection Training Camp' },
    { src: '/images/gallery/gallery-3.jpg', title: 'Community Health Checkup & Blood Screening' },
    { src: '/images/gallery/gallery-4.jpg', title: 'High Precision Centrifuge & Temperature Cold Chain' },
    { src: '/images/gallery/gallery-5.jpg', title: 'BJSL Mobile Diagnostic Van Outreach Hub' },
    { src: '/images/gallery/gallery-6.jpg', title: 'NABL Certified Reference Laboratory Facilities' },
    { src: '/images/gallery/gallery-7.jpg', title: 'Free Doorstep Sample Collection Phlebotomy Unit' },
    { src: '/images/gallery/gallery-8.jpg', title: 'Senior Citizen Health Screening Camp' },
    { src: '/images/gallery/gallery-9.jpg', title: 'HPLC Automated Diabetes & HbA1c Analyzer' },
    { src: '/images/gallery/gallery-10.jpg', title: 'BJSL Sanjaynagar Central Collection Centre' },
    { src: '/images/gallery/gallery-11.jpg', title: 'Patient Diagnostics with Dignity Service Desk' },
    { src: '/images/gallery/gallery-12.jpg', title: 'Free Blood Grouping & Health Awareness Drive' }
  ];

  // Hero Slider Images
  const heroSlides = [
    {
      id: 1,
      image: '/images/slides/hero-slide3.jpg',
      badge: 'DIAGNOSTICS WITH DIGNITY',
      title: 'Reaching Every Bharatiya with Affordable Healthcare',
      subtitle: 'Over 200,000 patients served across Karnataka with affordable, accessible, and dignified diagnostic care.'
    },
    {
      id: 2,
      image: '/images/slides/hero-slide1.jpg',
      badge: 'NABL ACCREDITED DIAGNOSTICS',
      title: 'Advanced Diagnostic Intelligence & Precision Testing',
      subtitle: 'State-of-the-art automated systems delivering NABL-certified diagnostic accuracy at 50–70% lower rates.'
    },
    {
      id: 3,
      image: '/images/gallery/gallery-1.jpg',
      badge: 'REAL BJSL LAB FACILITIES',
      title: 'NABL Certified Automated Sample Analyzers',
      subtitle: 'High precision robotics and cold-chain sample preservation ensuring 100% reliable test results.'
    },
    {
      id: 4,
      image: '/images/slides/hero-slide2.jpg',
      badge: 'FREE DOORSTEP SAMPLE COLLECTION',
      title: 'Free Home Sample Collection Across Bangalore',
      subtitle: 'Book certified phlebotomist sample collection right at your doorstep with fast same-day digital reports.'
    },
    {
      id: 5,
      image: '/images/gallery/gallery-3.jpg',
      badge: 'COMMUNITY HEALTH CAMPS',
      title: 'Free Health Screening & Outreach Drives',
      subtitle: 'Organizing blood donation, diabetes screening, and diagnostic awareness camps for all sections of society.'
    },
    {
      id: 6,
      image: '/images/gallery/gallery-5.jpg',
      badge: 'MOBILE DIAGNOSTIC VANS',
      title: 'Mobile Healthcare Vans & Doorstep Phlebotomy',
      subtitle: 'Bringing specialized laboratory testing to rural districts, remote villages, and underserved outskirts.'
    },
    {
      id: 7,
      image: '/images/banners/main-banner.webp',
      badge: 'CHIRAYU FULL BODY PACKAGES',
      title: 'Comprehensive Health Screening from ₹796',
      subtitle: 'Screen up to 154 vital parameters covering heart, liver, kidneys, thyroid, and full vitamin profiles.'
    },
    {
      id: 8,
      image: '/images/gallery/gallery-7.jpg',
      badge: 'DOORSTEP PHLEBOTOMY HUB',
      title: 'Sterile Single-Use Vacutainer Blood Collection',
      subtitle: 'Equipped with DMLT-certified phlebotomists trained for gentle and hygienic pediatric and geriatric sampling.'
    }
  ];

  // Auto rotate hero slides
  useEffect(() => {
    if (!isSlideAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSlideAutoPlaying, heroSlides.length]);

  // Auto rotate Google Reviews slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Form State for "Book Your Health Test" Banner
  const [formPackage, setFormPackage] = useState('Chirayu Full Body Check (PRIME)');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState('Sanjaynagar');
  const [formDate, setFormDate] = useState('2026-09-28');
  const [formTime, setFormTime] = useState('08:00 AM');
  const [formAgree, setFormAgree] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert('Please enter your Name and Phone Number.');
      return;
    }
    const selectedPkg = HEALTH_PACKAGES.find(p => p.name.includes(formPackage)) || HEALTH_PACKAGES[0];
    onBookTest(selectedPkg);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  };

  const visibleReviews = [
    GOOGLE_REVIEWS[currentReviewIndex % GOOGLE_REVIEWS.length],
    GOOGLE_REVIEWS[(currentReviewIndex + 1) % GOOGLE_REVIEWS.length],
    GOOGLE_REVIEWS[(currentReviewIndex + 2) % GOOGLE_REVIEWS.length]
  ];

  return (
    <div>

      {/* SECTION 1: FULL-WIDTH APOLLO HERO SLIDER CAROUSEL WITH DYNAMIC SLIDES & CONTROLS */}
      <section className="hero-slider-wrapper">
        
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlideIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-slide-overlay" />
            
            {/* Slide Content */}
            <div className="hero-slide-content" style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: '900px', padding: '0 1.5rem', marginTop: '-70px' }}>
              <div className="hero-slide-badge" style={{
                background: 'rgba(239, 68, 68, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
                padding: '6px 22px',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.25rem',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
              }}>
                <Sparkles size={16} color="white" /> {slide.badge}
              </div>

              <h1 style={{ fontSize: '3.3rem', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
                {slide.title}
              </h1>

              <p style={{ fontSize: '1.2rem', color: '#E2E8F0', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.6)', maxWidth: '780px', margin: '0 auto 2rem' }}>
                {slide.subtitle}
              </p>

              <div className="hero-action-btns" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button 
                  onClick={openBookingWizard}
                  className="btn-red-solid"
                  style={{ padding: '0.9rem 2.2rem', fontSize: '1rem', borderRadius: '99px' }}
                >
                  Book Free Home Collection <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => setCurrentTab('packages')}
                  className="liquid-glass-btn"
                  style={{ padding: '0.9rem 2.2rem', fontSize: '1rem', borderRadius: '99px', background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  Explore Packages
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Slider Controls (Left/Right Arrows, Indicators, Play/Pause) */}
        <button 
          onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="hero-arrow-btn hero-arrow-left"
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '2rem', 
            transform: 'translateY(-50%)', 
            zIndex: 12,
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: 'rgba(15, 23, 42, 0.65)', 
            backdropFilter: 'blur(12px)', 
            border: '1px solid rgba(255,255,255,0.3)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)' 
          }}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
          className="hero-arrow-btn hero-arrow-right"
          style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '2rem', 
            transform: 'translateY(-50%)', 
            zIndex: 12,
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: 'rgba(15, 23, 42, 0.65)', 
            backdropFilter: 'blur(12px)', 
            border: '1px solid rgba(255,255,255,0.3)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)' 
          }}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Bottom Slide Indicators */}
        <div className="hero-dots-container" style={{ position: 'absolute', bottom: '160px', left: '50%', transform: 'translateX(-50%)', zIndex: 12, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: currentSlideIndex === idx ? '32px' : '10px',
                height: '10px',
                borderRadius: '99px',
                background: currentSlideIndex === idx ? '#EF4444' : 'rgba(255,255,255,0.4)',
                border: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            />
          ))}
          <button
            onClick={() => setIsSlideAutoPlaying(!isSlideAutoPlaying)}
            style={{ background: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '6px', cursor: 'pointer' }}
            title={isSlideAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isSlideAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>

        {/* FLOATING DARK LIQUID GLASS INLINE SEARCH BAR */}
        <div 
          className="hero-liquid-search"
          style={{ cursor: 'text', padding: '6px 10px 6px 20px', display: 'flex', alignItems: 'center' }}
        >
          <input 
            type="text"
            placeholder="Search For Doctors, Specialities And Health Check Packages..."
            value={homepageSearch}
            onChange={(e) => setHomepageSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: 700,
              fontFamily: 'inherit'
            }}
          />
          {homepageSearch && (
            <button 
              onClick={() => setHomepageSearch('')}
              style={{ color: '#94A3B8', border: 'none', background: 'transparent', padding: '0 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Clear Search"
            >
              <X size={18} color="#CBD5E1" />
            </button>
          )}
          <div style={{
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            color: 'white',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
            flexShrink: 0
          }}>
            <Search size={20} color="white" />
          </div>
        </div>

        {/* FLOATING WHITE LIQUID GLASS PILL TABS BAR */}
        <div className="hero-floating-tabs">
          <div 
            className="hero-tab-pill"
            onClick={openBookingWizard}
          >
            <span>Book Appointment</span>
            <div className="hero-tab-arrow">➔</div>
          </div>

          <div 
            className="hero-tab-pill"
            onClick={() => setCurrentTab('centres')}
          >
            <span>Find Centre</span>
            <div className="hero-tab-arrow">➔</div>
          </div>

          <div 
            className="hero-tab-pill"
            onClick={() => setCurrentTab('packages')}
          >
            <span>Book Health Checkup</span>
            <div className="hero-tab-arrow">➔</div>
          </div>

          <div 
            className="hero-tab-pill"
            onClick={() => setCurrentTab('doctors')}
          >
            <span>Get Expert Opinion</span>
            <div className="hero-tab-arrow">➔</div>
          </div>
        </div>

      </section>

      {/* LIVE HOMEPAGE SEARCH RESULTS PANEL */}
      {homepageSearch.trim() && (() => {
        const query = homepageSearch.toLowerCase().trim();
        const filteredPkgs = HEALTH_PACKAGES.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description?.toLowerCase().includes(query) || 
          p.parameters?.some(param => param.toLowerCase().includes(query))
        );
        const filteredTsts = INDIVIDUAL_TESTS.filter(t => 
          t.name.toLowerCase().includes(query) || 
          t.category?.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
        );

        return (
          <section id="homepage-search-results" style={{ padding: '3.5rem 0', background: '#FFFFFF', borderBottom: '2px solid #F1F5F9' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A' }}>
                    Search Results for "{homepageSearch}"
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
                    Found {filteredPkgs.length} Health Packages & {filteredTsts.length} Blood Tests
                  </p>
                </div>
                <button 
                  onClick={() => setHomepageSearch('')}
                  style={{ background: '#FFF1F2', color: '#EF4444', border: '1.5px solid #FECDD3', padding: '8px 20px', borderRadius: '99px', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  Clear Search ✕
                </button>
              </div>

              {filteredPkgs.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#EF4444', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} /> Matching Health Packages ({filteredPkgs.length})
                  </h3>
                  <div className="card-grid">
                    {filteredPkgs.map(pkg => (
                      <PackageCard 
                        key={pkg.id}
                        pkg={pkg}
                        onSelect={(p) => onSelectTest(p)}
                        onBook={(p) => onBookTest(p)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredTsts.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284C7', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={18} /> Matching Blood Tests ({filteredTsts.length})
                  </h3>
                  <div className="card-grid">
                    {filteredTsts.map(test => (
                      <TestCard 
                        key={test.id}
                        item={test}
                        onSelect={(t) => onSelectTest(t)}
                        onBook={(t) => onBookTest(t)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredPkgs.length === 0 && filteredTsts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#F8FAFC', borderRadius: '24px', border: '1.5px dashed #CBD5E1' }}>
                  <p style={{ fontSize: '1.2rem', color: '#0F172A', fontWeight: 800, marginBottom: '6px' }}>No direct matches found for "{homepageSearch}"</p>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '500px', margin: '0 auto 1.5rem' }}>Try typing "Chirayu", "Glucose", "Thyroid", "Lipid", "CBC", "Liver", or "Vitamin".</p>
                  <button 
                    onClick={() => setHomepageSearch('Chirayu')}
                    style={{ background: '#EF4444', color: 'white', padding: '8px 20px', borderRadius: '99px', fontWeight: 800, fontSize: '0.85rem' }}
                  >
                    View Popular Full Body Checks
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* SECTION 2: ORGAN & HEALTH SPECIALITIES BADGES CAROUSEL */}
      <section style={{ padding: '4.5rem 0 3.5rem', background: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
              Explore Health Checkups by Speciality
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B' }}>
              Targeted diagnostic screenings formulated by medical specialists
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', justifyContent: 'items-center' }}>
            
            <div className="organ-badge-item" onClick={() => setHomepageSearch('Lipid')}>
              <div className="organ-badge-circle">🫀</div>
              <span className="organ-badge-label">Heart & Lipid</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Diabetes')}>
              <div className="organ-badge-circle">🧬</div>
              <span className="organ-badge-label">Diabetes HbA1c</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Liver')}>
              <div className="organ-badge-circle">🧪</div>
              <span className="organ-badge-label">Liver (LFT)</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Renal')}>
              <div className="organ-badge-circle">🩸</div>
              <span className="organ-badge-label">Renal (KFT)</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Thyroid')}>
              <div className="organ-badge-circle">🫁</div>
              <span className="organ-badge-label">Thyroid Profile</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Women')}>
              <div className="organ-badge-circle">👩</div>
              <span className="organ-badge-label">Women Care</span>
            </div>

            <div className="organ-badge-item" onClick={() => setHomepageSearch('Senior')}>
              <div className="organ-badge-circle">👴</div>
              <span className="organ-badge-label">Senior Citizen</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: BRIDGING THE DIAGNOSTIC DIVIDE (ABOUT / MISSION SECTION) */}
      <section style={{ padding: '5rem 0', background: '#FFF5F5' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
              Bridging the Diagnostic Divide
            </h2>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EF4444' }}>
              The Mission of Bharath Jan Seva Labs
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            
            {/* Left Photo */}
            <div className="white-liquid-card" style={{ padding: '10px' }}>
              <img 
                src="/images/banners/bridging-divide.webp" 
                alt="Bridging the Diagnostic Divide" 
                style={{ width: '100%', borderRadius: '20px', objectFit: 'cover' }}
              />
            </div>

            {/* Right Story & Feature Badges */}
            <div>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                India is home to world-class hospitals and advanced medical technology – yet <strong>millions still struggle to access even basic diagnostic tests</strong>.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                For families in rural districts, remote villages, and low-income urban outskirts, a simple blood test can mean long travel, high cost, and delayed results. And <em>delayed diagnosis often costs lives</em>.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#0F172A', fontWeight: 800, marginBottom: '2rem' }}>
                Bharath Jan Seva Labs (BJSL) steps in as more than just a diagnostic centre – it is a movement for health equity, committed to ensuring:
              </p>

              {/* 3 Circle Liquid Feature Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div className="white-liquid-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(254, 242, 242, 0.9)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)' }}>
                    <Heart size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Affordable testing</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748B' }}>for every household</div>
                  </div>
                </div>

                <div className="white-liquid-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(240, 249, 255, 0.9)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Accessible services</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748B' }}>across underserved regions</div>
                  </div>
                </div>

                <div className="white-liquid-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(236, 253, 245, 0.9)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Timely, reliable diagnostics</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748B' }}>without financial burden</div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '1rem', color: '#0F172A', fontWeight: 700 }}>
                BJSL is transforming the way India experiences healthcare – bringing dignity, trust, and accessibility to every Indian who needs it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: POPULAR HEALTH CHECK-UPS CONTAINER WITH ACTUAL PACKAGE IMAGES */}
      <section style={{ padding: '4rem 0 5rem', background: '#F8FAFC' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem' }}>
              Popular Health Check-ups
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.7 }}>
              All our tests are conducted at <strong>NABL-accredited laboratories</strong> using fully automated systems to ensure accuracy and reliability. We follow international standard methods to maintain high-quality results while keeping costs affordable for every section of society. With advanced technology and strict quality control, we provide trustworthy diagnostic services at <strong>50–70% lower than market prices</strong>.
            </p>
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {HEALTH_PACKAGES.slice(0, 6).map(pkg => (
              <PackageCard 
                key={pkg.id}
                pkg={pkg}
                onSelect={onSelectTest}
                onBook={onBookTest}
                isCompared={comparedPackages.some(p => p.id === pkg.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>

          {/* Full Width Red CTA Banner */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: 'white',
              borderRadius: '20px',
              marginTop: '3.5rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              cursor: 'pointer',
              padding: '1.75rem 2rem',
              boxShadow: '0 15px 35px rgba(239, 68, 68, 0.35)'
            }} 
            onClick={() => setCurrentTab('packages')}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>
              Want to Explore All Our Healthcare & Checkup packages? Click here
            </span>
            <ArrowRight size={24} color="white" />
          </div>

        </div>
      </section>

      {/* SECTION 5: TRUST STATS BAR & DOCTORS TRUST BANNER */}
      <section style={{ padding: '4rem 0', background: '#FFFFFF' }}>
        <div className="container">
          
          {/* Top 3 Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div className="white-liquid-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#EF4444' }}>200k</div>
              <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600, lineHeight: 1.4 }}>Patients served by us in BJSL Laboratories</div>
            </div>

            <div className="white-liquid-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#EF4444' }}>100%</div>
              <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600, lineHeight: 1.4 }}>Client Satisfaction achieved by BJSL</div>
            </div>

            <div className="white-liquid-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#EF4444' }}>100+</div>
              <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600, lineHeight: 1.4 }}>Kinds of diagnostic tests available in laboratory</div>
            </div>
          </div>

          {/* Large Red Doctors & Clinics Banner with Background Image */}
          <div style={{
            background: `linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.98) 100%), url('/images/banners/doctors.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            borderRadius: '28px',
            padding: '3.5rem 3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(239, 68, 68, 0.3), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)'
          }}>
            <div style={{ maxWidth: '680px', position: 'relative', zIndex: 5 }}>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
                Thousands of Renowned Doctors & Clinics trusted Us
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#FFE4E6', lineHeight: 1.6, marginBottom: '2rem' }}>
                Dedicated professionals committed to providing you with accurate and reliable diagnostic services. Get BJSL services today from the best lab experts & make a visit to our laboratory.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setCurrentTab('doctors')}
                  style={{
                    background: 'white',
                    color: '#EF4444',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '0.9rem 2.2rem',
                    borderRadius: '99px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Get BJSL Services
                </button>
                <button 
                  onClick={openBookingWizard}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '0.9rem 2.2rem',
                    borderRadius: '99px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    cursor: 'pointer'
                  }}
                >
                  Book a Test
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: SALIENT FEATURES OF BHARATH JAN SEWA LABS (EXACT SCREENSHOT 5) */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
              Salient Features of Bharath Jan Seva Labs (BJSL)
            </h2>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#EF4444' }}>
              Diagnostics with Dignity – For Every Bharatiya
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Feature 1 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                borderLeft: '5px solid #EF4444',
                borderTop: '1px solid #E2E8F0',
                borderRight: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                gap: '1.25rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF1F2', color: '#EF4444', border: '1.5px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Mission-Driven & Patient-First
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                  Every patient is treated with dignity, and every community gets access to essential diagnostics without barriers.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                borderLeft: '5px solid #EF4444',
                borderTop: '1px solid #E2E8F0',
                borderRight: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                gap: '1.25rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF1F2', color: '#EF4444', border: '1.5px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Globe size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Widespread Access Across India
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                  Local collection centers and mobile diagnostic vans extend services to rural, remote, and underserved regions.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                borderLeft: '5px solid #EF4444',
                borderTop: '1px solid #E2E8F0',
                borderRight: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                gap: '1.25rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF1F2', color: '#EF4444', border: '1.5px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Affordable, Transparent Pricing
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                  We follow a clear flat-rate packages priced 50–70% lower than market rates, with clear, honest pricing and no hidden charges.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                borderLeft: '5px solid #EF4444',
                borderTop: '1px solid #E2E8F0',
                borderRight: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                gap: '1.25rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF1F2', color: '#EF4444', border: '1.5px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  NABL-Accredited Accuracy & Reliability
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                  All tests are processed at centralized NABL-accredited laboratories, ensuring precision, reliability, and fast turnaround times.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: OUR ACCREDITATIONS BANNER (EXACT SCREENSHOT 4) */}
      <section style={{ padding: '2rem 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            color: 'white',
            borderRadius: '24px',
            padding: '2.5rem 3rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            boxShadow: '0 20px 50px rgba(239, 68, 68, 0.35)'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              Our Accreditations
            </h2>
            <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: 800, maxWidth: '480px', textAlign: 'left', lineHeight: 1.3 }}>
              ( Bharath Jan Sewa Labs send tests to NABL-accredited labs )
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: OUR PREMIUM TESTS GRID (EXACT SCREENSHOT 3) */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>
              Our Premium Tests
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6 }}>
              Our mission is to provide the highest standard of clinical laboratory service to physicians, clinics, hospitals, and our beloved people.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              'General Diagnostic Testing',
              'Allergy & Sensitivity Testing',
              'Specialized Genetic Testing',
              'Hormone Insights Testing',
              'Complete Health Checkup',
              'Clinical Microbiology Tests',
              'Clinical Biochemistry Tests',
              'Clinical Histopatology Tests'
            ].map((testTitle, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '99px',
                  padding: '1.15rem 1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentTab('tests')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#EF4444';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(15, 23, 42, 0.04)';
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
                  <CheckCircle2 size={22} />
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                  {testTitle}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: GOOGLE REVIEWS RED SLIDER (EXACT SCREENSHOT 2) */}
      <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            borderRadius: '28px',
            padding: '3.5rem 3rem',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(239, 68, 68, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white' }}>Google Reviews</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={prevReview} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid white', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextReview} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid white', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', padding: '0.5rem 0' }}>
              {GOOGLE_REVIEWS.slice(0, 6).map((rev) => (
                <div 
                  key={rev.id} 
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '24px', 
                    padding: '1.75rem', 
                    color: '#0F172A', 
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>{rev.author}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>📍 {rev.centre}</div>
                    </div>
                    <div style={{ color: '#F59E0B', fontWeight: 900, fontSize: '1rem' }}>★★★★★</div>
                  </div>
                  <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.6 }}>
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: BOOK YOUR HEALTH TEST FORM BANNER WITH DOCTOR PHOTO (EXACT SCREENSHOT 1) */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
            color: 'white',
            borderRadius: '28px',
            padding: '3.5rem 3rem',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(239, 68, 68, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              
              {/* Left Side: Masked Doctor Photo */}
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <img 
                  src="/images/banners/doctors.webp" 
                  alt="BJSL Doctor holding blood sample" 
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.4)' }}
                />
              </div>

              {/* Right Side: Form */}
              <div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginBottom: '2rem' }}>
                  Book Your Health Test
                </h2>

                <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Select Package*</label>
                    <select value={formPackage} onChange={(e) => setFormPackage(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                      <option value="Chirayu Full Body Check (PRIME)">Chirayu Full Body Check (PRIME) - ₹796</option>
                      <option value="Chirayu Full Body Check (MASTER)">Chirayu Full Body Check (MASTER) - ₹1566</option>
                      <option value="Chirayu Full Body Check (ADVANCED)">Chirayu Full Body Check (ADVANCED) - ₹1366</option>
                      <option value="Chirayu Full Body Check (MEN)">Chirayu Full Body Check (MEN) - ₹2199</option>
                      <option value="Chirayu Full Body Check (WOMEN)">Chirayu Full Body Check (WOMEN) - ₹2166</option>
                      <option value="Chirayu Senior Citizen MALE">Chirayu Senior Citizen MALE - ₹1999</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Full Name*</label>
                    <input type="text" required placeholder="Afi Kumar" value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Email Address*</label>
                    <input type="email" required placeholder="contact@example.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Phone No*</label>
                    <input type="tel" required placeholder="9805543143" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Select Location*</label>
                    <select value={formLocation} onChange={(e) => setFormLocation(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                      <option value="Sanjaynagar">Sanjaynagar Hub</option>
                      <option value="Peenya">Peenya 2nd Stage</option>
                      <option value="Kengeri">Kengeri BDA Complex</option>
                      <option value="Ittamadu">Ittamadu / Banashankari</option>
                      <option value="Subramanyapura">Subramanyapura Hub</option>
                      <option value="Jaraganahalli">Jaraganahalli Hub</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Preferred Date</label>
                    <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Appointment Time*</label>
                    <select value={formTime} onChange={(e) => setFormTime(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                      <option value="07:00 AM">07:00 AM - 09:00 AM</option>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 05:00 PM</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={formAgree} onChange={(e) => setFormAgree(e.target.checked)} style={{ accentColor: '#0F172A', width: '16px', height: '16px' }} />
                      I agree to the Terms of Use and Privacy Policy
                    </label>
                    <br />
                    <button type="submit" style={{ background: 'white', color: '#EF4444', fontWeight: 900, fontSize: '1.05rem', padding: '1rem 3rem', borderRadius: '99px', boxShadow: '0 12px 30px rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer' }}>
                      Make Appointment
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 11: WHATSAPP LABORATORY & OUTREACH GALLERY SLIDER */}
      <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem' }}>
            <div style={{
              background: '#FFF1F2',
              color: '#EF4444',
              padding: '6px 18px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: 900,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '1rem'
            }}>
              <Sparkles size={16} /> REAL LAB ACTIVITIES & OUTREACH
            </div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
              BJSL Diagnostic Facility Gallery
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B' }}>
              Explore our NABL reference laboratories, automated sample processors, phlebotomy training hubs, and community health camps across Bangalore.
            </p>
          </div>

          <div className="gallery-marquee-container" style={{ padding: '0.5rem 0' }}>
            <div className="gallery-marquee-track">
              {[...galleryImages, ...galleryImages].map((img, idx) => (
                <div 
                  key={idx}
                  className="white-liquid-card"
                  style={{ 
                    width: '320px', 
                    flexShrink: 0, 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    padding: 0 
                  }}
                  onClick={() => setLightboxImage(img.src)}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.85) 100%)' }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', color: 'white', fontSize: '0.875rem', fontWeight: 800 }}>
                      {img.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 12: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
              Frequently Asked Questions (FAQs)
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B' }}>
              Everything you need to know about BJSL blood tests, NABL processing, and free doorstep sample collection.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="white-liquid-card"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: '#0F172A'
                  }}
                >
                  <span>{faq.question}</span>
                  {activeFaq === idx ? <ChevronUp size={20} color="#EF4444" /> : <ChevronDown size={20} color="#64748B" />}
                </button>

                {activeFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.95rem', color: '#475569', lineHeight: 1.65, borderTop: '1px solid rgba(226, 232, 240, 0.8)', paddingTop: '1rem' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALLERY IMAGES */}
      {lightboxImage && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '900px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage} alt="BJSL Gallery Preview" style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: '20px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} />
            <button 
              onClick={() => setLightboxImage(null)}
              style={{ position: 'absolute', top: '-18px', right: '-18px', background: '#EF4444', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
