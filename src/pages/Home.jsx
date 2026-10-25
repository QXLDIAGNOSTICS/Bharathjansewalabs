import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Star, 
  Award, 
  Heart, 
  Zap, 
  Dna, 
  FileText, 
  Clock, 
  Check, 
  Plus, 
  MapPin, 
  Phone, 
  Navigation, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Building2,
  MessageSquare,
  Upload,
  X
} from 'lucide-react';
import { 
  HEALTH_PACKAGES, 
  INDIVIDUAL_TESTS, 
  CENTRES, 
  FAQS, 
  COMPANY_INFO 
} from '../data/mockData';

export default function Home({ 
  setCurrentTab, 
  cart = [], 
  onBookTest, 
  openSearchModal,
  openBookingWizard,
  openFranchiseModal
}) {
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedOrganFilter, setSelectedOrganFilter] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [patientPhone, setPatientPhone] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const checkupsScrollRef = useRef(null);
  const testsScrollRef = useRef(null);
  const conditionsScrollRef = useRef(null);
  const desktopSliderRef = useRef(null);

  const scrollCarousel = (ref, distance) => {
    if (ref.current) {
      ref.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleToggleCartItem = (item) => {
    onBookTest(item);
  };

  // Health Conditions (Full Width Left-to-Right Slider)
  const conditionsList = [
    { 
      id: 'hair-fall', 
      name: 'Hair Fall', 
      tag: 'Trichology',
      icon: '💇',
      testsText: 'Ferritin, TSH, Iron, Biotin',
      price: '₹100',
      image: '/images/slides/hero_hairfall.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80', 
      testId: 'thyroid-profile' 
    },
    { 
      id: 'joint-pain', 
      name: 'Joint Pain', 
      tag: 'Orthopedics',
      icon: '🦴',
      testsText: 'Vit D, Calcium, RA, Uric Acid',
      price: '₹50',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/slides/hero-slide2.jpg',
      testId: 'vitamin-d-test' 
    },
    { 
      id: 'allergy', 
      name: 'Allergy', 
      tag: 'Immunity',
      icon: '🌿',
      testsText: 'Total IgE, Absolute Eosinophils',
      price: '₹100',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/slides/hero_lifestyle.jpg',
      testId: 'cbc-test' 
    },
    { 
      id: 'thyroid', 
      name: 'Thyroid', 
      tag: 'Hormonal Care',
      icon: '🦋',
      testsText: 'TSH, Total T3, Total T4',
      price: '₹100',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/packages/chirayu-master.webp',
      testId: 'thyroid-profile' 
    },
    { 
      id: 'diabetes', 
      name: 'Diabetes', 
      tag: 'Sugar Care',
      icon: '🩸',
      testsText: 'HbA1c, Fasting Sugar, Urine',
      price: '₹20',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/slides/hero-slide1.jpg',
      testId: 'hba1c-test' 
    },
    { 
      id: 'cardiac', 
      name: 'Heart Care', 
      tag: 'Lipid Profile',
      icon: '❤️',
      testsText: 'Cholesterol, HDL, LDL, Triglycerides',
      price: '₹120',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/packages/chirayu-prime.webp',
      testId: 'lipid-profile' 
    },
    { 
      id: 'fever', 
      name: 'Fever & Infection', 
      tag: 'Infection Care',
      icon: '🌡️',
      testsText: 'CBC, ESR, Dengue NS1, Malaria',
      price: '₹160',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/slides/hero_fever.jpg',
      testId: 'cbc-test' 
    },
    { 
      id: 'vitamins', 
      name: 'Vitamins & Minerals', 
      tag: 'Vital Nutrition',
      icon: '💊',
      testsText: 'Vitamin D3 & Vitamin B12, Calcium',
      price: '₹60',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/slides/hero-slide2.jpg',
      testId: 'vitamin-d-test' 
    },
    { 
      id: 'liver-kidney', 
      name: 'Liver & Kidney', 
      tag: 'Organ Function',
      icon: '🧪',
      testsText: 'SGOT, SGPT, Creatinine, Urea, Uric Acid',
      price: '₹50',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80', 
      fallbackImage: '/images/packages/chirayu-master.webp',
      testId: 'lft-test' 
    }
  ];

  // Vital Body Systems (Screenshot 4)
  const vitalOrgans = [
    { id: 'blood', name: 'Blood', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Blood.png' },
    { id: 'heart', name: 'Heart', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Heart.png' },
    { id: 'kidney', name: 'Kidney', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Kidney.png' },
    { id: 'liver', name: 'Liver', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Liver.png' },
    { id: 'thyroid', name: 'Thyroid', image: 'https://cdn-icons-png.flaticon.com/512/2864/2864273.png' },
    { id: 'hormonal', name: 'Hormonal', image: 'https://cdn-icons-png.flaticon.com/512/3209/3209074.png' },
    { id: 'nutrition', name: 'Nutrition', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050212.png' },
    { id: 'bone', name: 'Bone', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Bone.png' },
    { id: 'immunity', name: 'Immunity', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' },
    { id: 'aerobic', name: 'Aerobic', image: 'https://cdn-icons-png.flaticon.com/512/2864/2864277.png' },
    { id: 'genetics', name: 'Genetics', image: 'https://d1wi3p9y2i20go.cloudfront.net/patient-app/10x-expirence/3X3+Vital+Organs/Genetics.png' }
  ];

  // Fever Season Packages (Screenshot 5)
  const feverPackages = [
    {
      id: 'dengue-cbc',
      name: 'Dengue Profile - Rapid with CBC',
      parametersCount: 27,
      tat: '4-6 hours',
      mrp: 850,
      price: 499,
      discount: '41% Off'
    },
    {
      id: 'fever-comp',
      name: 'Fever Profile - Comprehensive',
      parametersCount: 69,
      tat: 'Same day',
      mrp: 3500,
      price: 1499,
      discount: '57% Off'
    },
    {
      id: 'monsoon-panel',
      name: 'Monsoon Fever Panel',
      parametersCount: 68,
      tat: 'Same day',
      mrp: 2900,
      price: 1199,
      discount: '58% Off'
    }
  ];

  // Most Booked Individual Tests
  const bookedTests = [
    {
      id: 'cbc-test',
      name: 'Complete Blood Count with ESR (CBC + ESR)',
      slug: 'cbc-esr-test',
      url: '/tests/cbc-esr-test/',
      parametersCount: 30,
      tat: '4-6 hours',
      mrp: 400,
      price: 160,
      discount: '60% Off'
    },
    {
      id: 'hba1c-test',
      name: 'Glycated Haemoglobin (HbA1c)',
      slug: 'hba1c-test',
      url: '/tests/hba1c-test/',
      parametersCount: 3,
      tat: '4-6 hours',
      mrp: 650,
      price: 260,
      discount: '60% Off'
    },
    {
      id: 'thyroid-profile',
      name: 'TFT - Thyroid Function Tests (T3, T4 & TSH)',
      slug: 'thyroid-function-test-total',
      url: '/tests/thyroid-function-test-total/',
      parametersCount: 3,
      tat: '4-6 hours',
      mrp: 550,
      price: 190,
      discount: '65% Off'
    },
    {
      id: 'vit-b12',
      name: 'Vitamin B12 (Cobalamin)',
      slug: 'vitamin-b12-test',
      url: '/tests/vitamin-b12-test/',
      parametersCount: 1,
      tat: 'Same day',
      mrp: 950,
      price: 440,
      discount: '54% Off'
    },
    {
      id: 'vitamin-d-test',
      name: 'Vitamin D, 25-Hydroxy',
      slug: 'vitamin-d-test',
      url: '/tests/vitamin-d-test/',
      parametersCount: 1,
      tat: 'Same day',
      mrp: 1400,
      price: 660,
      discount: '53% Off'
    },
    {
      id: 'lipid-profile',
      name: 'Lipid Profile (Cholesterol Panel)',
      slug: 'lipid-profile-test',
      url: '/tests/lipid-profile-test/',
      parametersCount: 8,
      tat: 'Same day',
      mrp: 750,
      price: 260,
      discount: '65% Off'
    },
    {
      id: 'lft-test',
      name: 'LFT - Liver Function Tests Panel',
      slug: 'liver-function-test',
      url: '/tests/liver-function-test/',
      parametersCount: 11,
      tat: 'Same day',
      mrp: 850,
      price: 360,
      discount: '58% Off'
    },
    {
      id: 'kft-test',
      name: 'Renal Profile (KFT - Urea, Creatinine, Electrolytes)',
      slug: 'renal-profile-test',
      url: '/tests/renal-profile-test/',
      parametersCount: 7,
      tat: 'Same day',
      mrp: 800,
      price: 320,
      discount: '60% Off'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* MOBILE-ONLY TOP PROMO & ACTION HUBS (Screenshot 1) */}
      <div className="mobile-top-experience">
        <div className="container">
          

          {/* 2 Primary Action Cards (Book Lab Tests / Book Checkups) */}
          <div className="mobile-action-cards-grid">
            <div 
              className="mobile-action-card"
              onClick={() => {
                const el = document.querySelector('#popular-tests');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (openSearchModal) openSearchModal();
              }}
              role="button"
              tabIndex={0}
            >
              <div className="mobile-action-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                <span style={{ fontSize: '24px' }}>🔬</span>
              </div>
              <div className="mobile-action-text">
                <span className="mobile-action-sub">Book</span>
                <span className="mobile-action-title">Lab Tests</span>
              </div>
            </div>

            <div 
              className="mobile-action-card"
              onClick={() => {
                const el = document.querySelector('#checkups');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (setCurrentTab) setCurrentTab('packages');
              }}
              role="button"
              tabIndex={0}
            >
              <div className="mobile-action-icon-box" style={{ background: '#FDF2F8', color: '#DB2777' }}>
                <span style={{ fontSize: '24px' }}>🧰</span>
              </div>
              <div className="mobile-action-text">
                <span className="mobile-action-sub">Book</span>
                <span className="mobile-action-title">Checkups</span>
              </div>
            </div>
          </div>

          {/* 4 Quick Circular Utility Buttons */}
          <div className="mobile-utility-icons-row">
            <a href="tel:919805543143" className="mobile-util-item">
              <div className="mobile-util-circle" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <Phone size={18} />
              </div>
              <span className="mobile-util-label">Call Us</span>
            </a>

            <a 
              href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20book%20a%20blood%20test."
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-util-item"
            >
              <div className="mobile-util-circle" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                <MessageSquare size={18} />
              </div>
              <span className="mobile-util-label">WhatsApp</span>
            </a>

            <div 
              className="mobile-util-item"
              onClick={() => setIsPrescriptionModalOpen(true)}
              role="button"
              tabIndex={0}
            >
              <div className="mobile-util-circle" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                <FileText size={18} />
              </div>
              <span className="mobile-util-label">Prescription</span>
            </div>

            <div 
              className="mobile-util-item"
              onClick={() => {
                const el = document.querySelector('#centres');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (setCurrentTab) setCurrentTab('centres');
              }}
              role="button"
              tabIndex={0}
            >
              <div className="mobile-util-circle" style={{ background: '#FFE4E6', color: '#E11D48' }}>
                <Building2 size={18} />
              </div>
              <span className="mobile-util-label">Centres</span>
            </div>
          </div>

          {/* Mobile Lifestyle Peeking Cards Slider (Screenshot 1) */}
          <div className="mobile-lifestyle-slider-wrapper">
            <div className="mobile-lifestyle-scroll-track">
              
              {/* Card 1: India's Most Comprehensive Checkup - ULTRA (Chirayu Master 109 Tests) */}
              <div 
                className="mobile-lifestyle-card lifestyle-card-ultra"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/hero_ultra.jpg" 
                  alt="India's Most Comprehensive Checkup ULTRA" 
                  className="mobile-lifestyle-bg-img"
                  style={{ objectPosition: 'center 15%' }}
                />
                <div className="mobile-lifestyle-scrim scrim-ultra" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-ultra">
                      India’s Most<br />Comprehensive<br />Checkup
                    </h3>
                    <div className="badge-ultra">
                      ULTRA
                    </div>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-ultra">
                    <span className="pill-title">Chirayu Master Checkup (109 Tests)</span>
                    <div className="pill-price-btn">
                      <span>₹ 1,566</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Lifestyle Impacts Health (Chirayu Prime 71 Tests) */}
              <div 
                className="mobile-lifestyle-card lifestyle-card-lifestyle"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/lifestyle_hero.jpg" 
                  alt="Your lifestyle impacts your health" 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-lifestyle" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-lifestyle">
                      Your lifestyle impacts<br />your health.
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-lifestyle">
                    <span className="pill-title">Chirayu Prime Checkup (71 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹796</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Hair Fall Checkup (Hair Fall & Thyroid) */}
              <div 
                className="mobile-lifestyle-card lifestyle-card-hairfall"
                onClick={() => {
                  const el = document.querySelector('#health-conditions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/hairfall_hero.jpg" 
                  alt="Stop treating the hair. Find the trigger." 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-hairfall" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-hairfall">
                      Stop treating the hair.<br />Find the trigger.
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-hairfall">
                    <span className="pill-title">Hair Fall & Thyroid Profile</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹190</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Vitamin Levels (Vitamin D & Minerals) */}
              <div 
                className="mobile-lifestyle-card lifestyle-card-vitamin"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/vitamin_hero.jpg" 
                  alt="Your vitamin levels directly affect energy, focus and mood" 
                  className="mobile-lifestyle-bg-img"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="mobile-lifestyle-scrim scrim-vitamin" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-vitamin">
                      Your vitamin levels<br />directly affect energy,<br />focus and mood
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-vitamin">
                    <span className="pill-title">Vitamin D & Mineral Screen</span>
                    <div className="pill-price-btn">
                      <span>At ₹660</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Senior Citizen Care */}
              <div 
                className="mobile-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/senior_hero.jpg" 
                  alt="Protect Your Elders & Family" 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-senior" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-senior">
                      Protect your elders<br />with dedicated care.
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-senior">
                    <span className="pill-title">Senior Citizen Health (110 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹1,999</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Cardiac & Lipid Health */}
              <div 
                className="mobile-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/cardiac_hero.jpg" 
                  alt="Cardiac & Cholesterol Health" 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-cardiac" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-cardiac">
                      Monitor cardiac safety<br />& vital cholesterol.
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-cardiac">
                    <span className="pill-title">Lipid Profile (14 Heart Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹260</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 7: Active Fever & Infection Assessment */}
              <div 
                className="mobile-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/banners/fever_season.jpg" 
                  alt="Fever & Infection Screening" 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-fever" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-fever">
                      Active fever or<br />seasonal infection?
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-fever">
                    <span className="pill-title">Complete Blood Count (CBC + ESR)</span>
                    <div className="pill-price-btn">
                      <span>At ₹160</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 8: Complete Family Care */}
              <div 
                className="mobile-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/fullbody_pair_hero.jpg" 
                  alt="Complete Preventive Health" 
                  className="mobile-lifestyle-bg-img"
                />
                <div className="mobile-lifestyle-scrim scrim-fullbody" />
                <div className="mobile-lifestyle-content">
                  <div className="mobile-lifestyle-header-zone">
                    <h3 className="mobile-lifestyle-headline headline-fullbody">
                      Full body shield for<br />couples & families.
                    </h3>
                  </div>
                  <div className="mobile-lifestyle-tag-pill bottom-pill-fullbody">
                    <span className="pill-title">Chirayu Advanced Checkup (88 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹1,366</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 1. DESKTOP HERO LIFESTYLE CAROUSEL (Replacing doctor banner with 4-card reference) */}
      <section className="desktop-lifestyle-hero-section">
        <div className="container">
          <div className="desktop-lifestyle-carousel-container">
            
            {/* Left Nav Arrow Button */}
            <button 
              type="button" 
              onClick={() => scrollCarousel(desktopSliderRef, -320)}
              className="desktop-lifestyle-nav-arrow nav-arrow-prev"
              aria-label="Previous checkup slide"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Scrollable Carousel Track */}
            <div className="desktop-lifestyle-carousel-track" ref={desktopSliderRef}>
              
              {/* Card 1: India's Most Comprehensive Checkup - ULTRA (Chirayu Master 109 Tests) */}
              <div 
                className="desktop-lifestyle-card lifestyle-card-ultra"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/hero_ultra.jpg" 
                  alt="India's Most Comprehensive Checkup ULTRA" 
                  className="desktop-lifestyle-bg-img"
                  style={{ objectPosition: 'center 15%' }}
                />
                <div className="desktop-lifestyle-scrim scrim-ultra" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-ultra">
                      India’s Most<br />Comprehensive<br />Checkup
                    </h3>
                    <div className="badge-ultra">
                      ULTRA
                    </div>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-ultra">
                    <span className="pill-title">Chirayu Master Checkup (109 Tests)</span>
                    <div className="pill-price-btn">
                      <span>₹ 1,566</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Lifestyle Impacts Health (Chirayu Prime 71 Tests) */}
              <div 
                className="desktop-lifestyle-card lifestyle-card-lifestyle"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/lifestyle_hero.jpg" 
                  alt="Your lifestyle impacts your health" 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-lifestyle" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-lifestyle">
                      Your lifestyle impacts<br />your health.
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-lifestyle">
                    <span className="pill-title">Chirayu Prime Checkup (71 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹796</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Hair Fall Checkup (Hair Fall & Thyroid Profile) */}
              <div 
                className="desktop-lifestyle-card lifestyle-card-hairfall"
                onClick={() => {
                  const el = document.querySelector('#health-conditions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/hairfall_hero.jpg" 
                  alt="Stop treating the hair. Find the trigger." 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-hairfall" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-hairfall">
                      Stop treating the hair.<br />Find the trigger.
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-hairfall">
                    <span className="pill-title">Hair Fall & Thyroid Profile</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹190</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Vitamin Levels (Vitamin D & Essential Minerals) */}
              <div 
                className="desktop-lifestyle-card lifestyle-card-vitamin"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/vitamin_hero.jpg" 
                  alt="Your vitamin levels directly affect energy, focus and mood" 
                  className="desktop-lifestyle-bg-img"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="desktop-lifestyle-scrim scrim-vitamin" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-vitamin">
                      Your vitamin levels<br />directly affect energy,<br />focus and mood
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-vitamin">
                    <span className="pill-title">Vitamin D & Mineral Screen</span>
                    <div className="pill-price-btn">
                      <span>At ₹660</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Senior Citizen Care (110 Tests) */}
              <div 
                className="desktop-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/senior_hero.jpg" 
                  alt="Protect Your Elders & Family" 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-senior" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-senior">
                      Protect your elders<br />with dedicated care.
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-senior">
                    <span className="pill-title">Senior Citizen Health (110 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹1,999</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Cardiac & Lipid Health */}
              <div 
                className="desktop-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/cardiac_hero.jpg" 
                  alt="Cardiac & Cholesterol Health" 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-cardiac" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-cardiac">
                      Monitor cardiac safety<br />& vital cholesterol.
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-cardiac">
                    <span className="pill-title">Lipid Profile (14 Heart Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹260</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 7: Active Fever & Infection Assessment */}
              <div 
                className="desktop-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/banners/fever_season.jpg" 
                  alt="Fever & Infection Screening" 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-fever" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-fever">
                      Active fever or<br />seasonal infection?
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-fever">
                    <span className="pill-title">Complete Blood Count (CBC + ESR)</span>
                    <div className="pill-price-btn">
                      <span>At ₹160</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 8: Complete Family Care */}
              <div 
                className="desktop-lifestyle-card"
                onClick={() => {
                  const el = document.querySelector('#checkups');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <img 
                  src="/images/slides/fullbody_pair_hero.jpg" 
                  alt="Complete Preventive Health" 
                  className="desktop-lifestyle-bg-img"
                />
                <div className="desktop-lifestyle-scrim scrim-fullbody" />
                <div className="desktop-lifestyle-content">
                  <div className="desktop-lifestyle-header-zone">
                    <h3 className="desktop-lifestyle-headline headline-fullbody">
                      Full body shield for<br />couples & families.
                    </h3>
                  </div>
                  <div className="desktop-lifestyle-bottom-pill bottom-pill-fullbody">
                    <span className="pill-title">Chirayu Advanced Checkup (88 Tests)</span>
                    <div className="pill-price-btn">
                      <span>Starts at ₹1,366</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Nav Arrow Button */}
            <button 
              type="button" 
              onClick={() => scrollCarousel(desktopSliderRef, 340)}
              className="desktop-lifestyle-nav-arrow nav-arrow-next"
              aria-label="Next checkup slide"
            >
              <ChevronRight size={22} />
            </button>

          </div>
        </div>
      </section>


      {/* 1.5 QUICK ACTION CARDS (Screenshot 2) */}
      <section className="quick-actions-section">
        <div className="container">
          <div className="quick-actions-grid">
            
            {/* 1. Upload Prescription */}
            <div 
              className="quick-action-card"
              onClick={() => setIsPrescriptionModalOpen(true)}
              role="button"
              tabIndex={0}
            >
              <div className="quick-action-icon-circle" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <FileText size={24} />
              </div>
              <div className="quick-action-text">
                <div className="quick-action-title">Upload Prescription</div>
                <div className="quick-action-subtitle">Quick order lookup</div>
              </div>
              <div className="quick-action-arrow-btn">
                <ChevronRight size={18} />
              </div>
            </div>

            {/* 2. Home Sample Collection */}
            <div 
              className="quick-action-card"
              onClick={() => openBookingWizard()}
              role="button"
              tabIndex={0}
            >
              <div className="quick-action-icon-circle" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
                <span style={{ fontSize: '26px' }}>🛵</span>
              </div>
              <div className="quick-action-text">
                <div className="quick-action-title">Home Sample Collection</div>
                <div className="quick-action-subtitle">Free sample pickup</div>
              </div>
              <div className="quick-action-arrow-btn" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
                <ChevronRight size={18} />
              </div>
            </div>

            {/* 3. Doctor Enquiry */}
            <a 
              href="https://wa.me/919805543143?text=Namaste%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20have%20a%20doctor%20enquiry%20regarding%20blood%20tests."
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-card"
            >
              <div className="quick-action-icon-circle" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                <MessageSquare size={24} />
              </div>
              <div className="quick-action-text">
                <div className="quick-action-title">Doctor Enquiry</div>
                <div className="quick-action-subtitle">Chat on WhatsApp</div>
              </div>
              <div className="quick-action-arrow-btn" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                <ChevronRight size={18} />
              </div>
            </a>

            {/* 4. Partner with us */}
            <div 
              className="quick-action-card"
              onClick={() => {
                if (openFranchiseModal) openFranchiseModal();
                else setCurrentTab('franchise');
              }}
              role="button"
              tabIndex={0}
            >
              <div className="quick-action-icon-circle" style={{ backgroundColor: '#FFF1F2', color: '#E11D48' }}>
                <Building2 size={24} />
              </div>
              <div className="quick-action-text">
                <div className="quick-action-title">Partner with us</div>
                <div className="quick-action-subtitle">Lab or franchise</div>
              </div>
              <div className="quick-action-arrow-btn" style={{ backgroundColor: '#FFF1F2', color: '#E11D48' }}>
                <ChevronRight size={18} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST CARD BANNER (Screenshot 1) */}
      <section className="trust-card-section">
        <div className="container">
          <div className="trust-card-banner">
            
            {/* 4.9 Rating */}
            <div className="trust-rating-col">
              <div className="trust-laurel-badge">
                <span style={{ fontSize: '30px', color: '#8c827a' }}>🌿</span>
                <span className="trust-rating-num">4.9</span>
                <span style={{ fontSize: '30px', color: '#8c827a', transform: 'scaleX(-1)' }}>🌿</span>
              </div>
              <div className="trust-rating-headline">
                Highest rated<br />diagnostics lab
              </div>
            </div>

            {/* 3 Trust Items */}
            <div className="trust-items-group">
              
              <div className="trust-stat-item">
                <div className="trust-stat-icon-wrapper" style={{ color: '#D97706' }}>
                  <Award size={24} />
                </div>
                <div className="trust-stat-text">
                  <span className="trust-stat-label">OWN LABS</span>
                  <span className="trust-stat-value">NABL, ICMR accredited</span>
                </div>
              </div>

              <div className="trust-stat-item">
                <div className="trust-stat-icon-wrapper" style={{ color: '#E11D48' }}>
                  <Heart size={24} fill="#E11D48" />
                </div>
                <div className="trust-stat-text">
                  <span className="trust-stat-label">LOVED BY</span>
                  <span className="trust-stat-value">200,000+ Bharatiyas</span>
                </div>
              </div>

              <div className="trust-stat-item">
                <div className="trust-stat-icon-wrapper" style={{ color: '#EF4444' }}>
                  <Zap size={24} fill="#EF4444" />
                </div>
                <div className="trust-stat-text">
                  <span className="trust-stat-label">COLLECTION IN MINUTES</span>
                  <span className="trust-stat-value">Instant Sample Collection</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FULL BODY CHECKUPS CAROUSEL (Screenshot 2) */}
      <section className="checkups-carousel-section" id="checkups">
        <div className="container">
          <h2 className="section-main-heading">Full Body Checkups</h2>

          <div className="carousel-outer-wrapper">
            <div className="horizontal-carousel" ref={checkupsScrollRef}>
              {HEALTH_PACKAGES.map((pkg) => {
                const inCart = isInCart(pkg.id);
                return (
                  <div key={pkg.id} className="checkup-product-card">
                    <div>
                      <h3 className="checkup-card-title">{pkg.name}</h3>

                      <div className="checkup-card-meta-row">
                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <Dna size={18} style={{ color: 'var(--brand-500)' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">INCLUDES</span>
                            <span className="meta-bold-val">{pkg.parametersCount || 71} Parameters</span>
                          </div>
                        </div>

                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <FileText size={18} style={{ color: '#78716c' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">REPORTS IN</span>
                            <span className="meta-bold-val">{pkg.tat || '6 hours'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkup-card-price-row">
                      <div className="price-left">
                        <div className="price-top-meta">
                          <span className="strikethrough-price">₹{pkg.mrp}</span>
                          <span className="discount-green-badge">
                            {Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% Off
                          </span>
                        </div>
                        <div className="main-price-val">₹{pkg.price}</div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => handleToggleCartItem(pkg)}
                        className={`btn-brand-pill-add ${inCart ? 'in-cart' : ''}`}
                        aria-label={`Add ${pkg.name} to cart`}
                      >
                        {inCart ? (
                          <>
                            <Check size={14} /> In cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Right Scroll Button */}
            <button 
              type="button" 
              onClick={() => scrollCarousel(checkupsScrollRef, 340)}
              className="carousel-nav-btn"
              aria-label="Scroll checkups right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* MOBILE CIRCULAR CHECKUP CATEGORIES & NABL BADGE (Screenshot 2) */}
      <section className="mobile-circular-categories-section">
        <div className="container">
          <h2 className="section-main-heading" style={{ marginBottom: '16px' }}>Checkup Categories</h2>
          
          <div className="mobile-circular-avatar-track">
            {[
              { id: 'full-body', name: 'Full Body', img: '/images/packages/cat_fullbody.jpg', tab: 'packages' },
              { id: 'men', name: 'Men', img: '/images/packages/cat_men.jpg', tab: 'packages' },
              { id: 'women', name: 'Women', img: '/images/packages/cat_women.jpg', tab: 'packages' },
              { id: 'seniors', name: 'Seniors', img: '/images/packages/cat_seniors.jpg', tab: 'packages' },
              { id: 'kids', name: 'Kids', img: '/images/packages/cat_kids.jpg', tab: 'packages' }
            ].map(cat => (
              <div 
                key={cat.id} 
                className="mobile-cat-avatar-item"
                onClick={() => {
                  if (setCurrentTab) setCurrentTab(cat.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <div className="mobile-cat-avatar-circle">
                  <img src={cat.img} alt={cat.name} className="mobile-cat-img" />
                </div>
                <span className="mobile-cat-name">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* NABL & EQAS Accredited Labs Banner Pill (Screenshot 2) */}
          <div 
            className="mobile-nabl-strip-pill" 
            onClick={() => {
              if (setCurrentTab) setCurrentTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            role="button"
            tabIndex={0}
          >
            <div className="mobile-nabl-strip-left">
              <span className="mobile-nabl-title">NABL & EQAS accredited labs</span>
              <span className="mobile-nabl-sub">
                6 advanced labs across 4 cities <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
              </span>
            </div>
            <div className="mobile-nabl-badge-icon">
              <ShieldCheck size={28} color="#D97706" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEALTH CONDITIONS - FULL WIDTH LEFT-TO-RIGHT SLIDER */}
      <section className="health-conditions-full-section" id="health-conditions">
        <div className="container">
          <div className="section-head-with-link" style={{ marginBottom: '22px' }}>
            <div>
              <span className="split-eyebrow">FOR YOUR</span>
              <h2 className="section-main-heading" style={{ marginBottom: '4px' }}>Health Conditions</h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                Specialized diagnostic tests tailored to your symptoms & wellness needs
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                type="button" 
                onClick={() => {
                  if (setCurrentTab) setCurrentTab('packages');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="section-view-all-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>View checkup categories</span>
                <ChevronRight size={16} />
              </button>

              <div className="conditions-nav-arrows">
                <button 
                  type="button" 
                  onClick={() => scrollCarousel(conditionsScrollRef, -300)}
                  className="cond-nav-btn prev-btn"
                  aria-label="Previous Health Conditions"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  type="button" 
                  onClick={() => scrollCarousel(conditionsScrollRef, 300)}
                  className="cond-nav-btn next-btn"
                  aria-label="Next Health Conditions"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="conditions-scroll-track full-width-slider" ref={conditionsScrollRef}>
            {conditionsList.map((cond) => (
              <div 
                key={cond.id} 
                className="condition-glass-card full-width-card"
                onClick={() => {
                  const found = INDIVIDUAL_TESTS.find(t => t.id === cond.testId) || INDIVIDUAL_TESTS[0];
                  handleToggleCartItem(found);
                }}
                role="button"
                tabIndex={0}
              >
                {/* Background Photo */}
                <img 
                  src={cond.image} 
                  alt={cond.name} 
                  className="cond-glass-bg-img" 
                  onError={(e) => { e.currentTarget.src = cond.fallbackImage; }}
                />

                {/* Gradient Scrim Overlay for 100% Text Readability */}
                <div className="cond-glass-scrim" />

                {/* Top Pill Badge */}
                <div className="cond-glass-top">
                  <span className="cond-tag-pill">
                    <span>{cond.icon}</span> {cond.tag}
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="cond-glass-bottom">
                  <h4 className="cond-glass-title">{cond.name}</h4>
                  <p className="cond-glass-tests">{cond.testsText}</p>
                  <div className="cond-glass-price-row">
                    <span className="cond-glass-price">From {cond.price}</span>
                    <div className="cond-glass-btn-circle">
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MOST BOOKED TESTS (Screenshot 4) */}
      <section className="most-booked-tests-section" id="popular-tests">
        <div className="container">
          <div className="section-head-with-link">
            <h2 className="section-main-heading" style={{ marginBottom: 0 }}>Most Booked Tests</h2>
            <a 
              href="/tests/" 
              className="section-view-all-link"
              style={{ textDecoration: 'none' }}
            >
              <span>View all 66 tests & price list</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="carousel-outer-wrapper">
            <div className="horizontal-carousel" ref={testsScrollRef}>
              {bookedTests.map((test) => {
                const inCart = isInCart(test.id);
                return (
                  <div key={test.id} className="checkup-product-card" style={{ width: '280px', minWidth: '280px' }}>
                    <div>
                      <h3 className="checkup-card-title" style={{ minHeight: '48px' }}>
                        <a href={test.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {test.name}
                        </a>
                      </h3>

                      <div className="checkup-card-meta-row">
                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <Dna size={18} style={{ color: 'var(--brand-500)' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">INCLUDES</span>
                            <span className="meta-bold-val">{test.parametersCount} Parameters</span>
                          </div>
                        </div>

                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <FileText size={18} style={{ color: '#78716c' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">REPORTS IN</span>
                            <span className="meta-bold-val">{test.tat}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkup-card-price-row">
                      <div className="price-left">
                        <div className="price-top-meta">
                          <span className="strikethrough-price">₹{test.mrp}</span>
                          <span className="discount-green-badge">{test.discount}</span>
                        </div>
                        <div className="main-price-val">₹{test.price}</div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => handleToggleCartItem(test)}
                        className={`btn-brand-pill-add ${inCart ? 'in-cart' : ''}`}
                        aria-label={`Add ${test.name} to cart`}
                      >
                        {inCart ? (
                          <>
                            <Check size={14} /> In cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              type="button" 
              onClick={() => scrollCarousel(testsScrollRef, 320)}
              className="carousel-nav-btn"
              aria-label="Scroll tests right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOR YOUR VITAL BODY SYSTEMS (Screenshot 4) */}
      <section className="vital-systems-section">
        <div className="container">
          <div className="split-column-head" style={{ marginBottom: '16px' }}>
            <span className="split-eyebrow">FOR YOUR</span>
            <h3 className="split-heading">Vital Body Systems</h3>
          </div>

          <div className="vital-systems-carousel">
            {vitalOrgans.map((organ) => (
              <div 
                key={organ.id} 
                className={`vital-organ-item ${selectedOrganFilter === organ.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedOrganFilter(selectedOrganFilter === organ.id ? null : organ.id);
                  const matched = INDIVIDUAL_TESTS.find(t => t.category?.toLowerCase() === organ.id) || INDIVIDUAL_TESTS[0];
                  handleToggleCartItem(matched);
                }}
              >
                <div className="vital-organ-icon-circle">
                  <img src={organ.image} alt={organ.name} className="vital-organ-img" />
                </div>
                <span className="vital-organ-label">{organ.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STAY AHEAD OF FEVER SEASON (Screenshot 4) */}
      <section className="fever-season-section">
        <div className="container">
          <div className="fever-season-card">
            
            {/* Left side: Heading & Patient photo */}
            <div className="fever-season-left">
              <img 
                src="/images/banners/fever_season.jpg" 
                alt="Stay Ahead of Fever Season Care" 
                className="fever-patient-img" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80"; }}
              />
              <div className="fever-season-text-col">
                <span className="fever-eyebrow">STAY AHEAD OF</span>
                <h3 className="fever-heading">Fever season</h3>
              </div>
            </div>

            {/* Right side: Fever Packages Carousel */}
            <div className="horizontal-carousel">
              {feverPackages.map((pkg) => {
                const inCart = isInCart(pkg.id);
                return (
                  <div key={pkg.id} className="checkup-product-card" style={{ width: '280px', minWidth: '280px' }}>
                    <div>
                      <h4 className="checkup-card-title">{pkg.name}</h4>

                      <div className="checkup-card-meta-row">
                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <Dna size={18} style={{ color: 'var(--brand-500)' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">INCLUDES</span>
                            <span className="meta-bold-val">{pkg.parametersCount} Parameters</span>
                          </div>
                        </div>

                        <div className="meta-col">
                          <div className="meta-icon-box">
                            <FileText size={18} style={{ color: '#78716c' }} />
                          </div>
                          <div className="meta-col-text">
                            <span className="meta-sub-label">REPORTS IN</span>
                            <span className="meta-bold-val">{pkg.tat}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkup-card-price-row">
                      <div className="price-left">
                        <div className="price-top-meta">
                          <span className="strikethrough-price">₹{pkg.mrp}</span>
                          <span className="discount-green-badge">
                            {Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% Off
                          </span>
                        </div>
                        <div className="main-price-val">₹{pkg.price}</div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => handleToggleCartItem(pkg)}
                        className={`btn-brand-pill-add ${inCart ? 'in-cart' : ''}`}
                        aria-label={`Add ${pkg.name} to cart`}
                      >
                        {inCart ? (
                          <>
                            <Check size={14} /> In cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Screenshot 4: Precision at every step banner */}
      <section className="precision-banner-section">
        <div className="container">
          <div 
            className="precision-banner-card"
            onClick={() => {
              const el = document.getElementById('why-bjsl');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            role="button"
            tabIndex={0}
          >
            <div className="precision-banner-left">
              <h3 className="precision-banner-title">Precision at every step</h3>
              <div className="precision-banner-sub-row">
                <span className="precision-banner-sub">from collection to reports</span>
                <span className="precision-arrow-btn">
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
            <div className="precision-banner-img-box">
              <img 
                src="/images/banners/precision_lab.jpg" 
                alt="Precision Laboratory Optics" 
                className="precision-banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot 4: Designed for Growing Kids banner */}
      <section className="growing-kids-banner-section">
        <div className="container">
          <div 
            className="growing-kids-banner-card"
            onClick={() => {
              const el = document.getElementById('checkups');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            role="button"
            tabIndex={0}
          >
            <div className="growing-kids-content">
              <span className="growing-kids-eyebrow">Designed for</span>
              <h3 className="growing-kids-heading">Growing Kids</h3>
            </div>
            <div className="growing-kids-img-box">
              <img 
                src="/images/banners/growing_kids.jpg" 
                alt="Designed for Growing Kids" 
                className="growing-kids-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WALK INTO ANY OF OUR COLLECTION CENTRES (Screenshot 5) */}
      <section className="centres-section" id="centres">
        <div className="container">
          <div className="centres-header-box">
            <div className="centres-pin-icon" style={{ color: 'var(--brand-500)' }}>
              <MapPin size={48} />
            </div>
            <h2 className="centres-main-title">Walk into any of our collection centres</h2>
            <div className="centres-present-text">Present across</div>
            <div className="centres-city-highlight">Bengaluru</div>
            <button 
              type="button" 
              onClick={() => {
                const el = document.getElementById('centres-grid-list');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-centres-nearest"
            >
              <span>Find the nearest collection centre</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Bengaluru Centre Lounges Grid */}
          <div className="centres-cards-grid" id="centres-grid-list">
            {CENTRES.slice(0, 6).map((centre) => (
              <div key={centre.id} className="centre-loung-card">
                <div>
                  <h4 className="centre-loung-title">{centre.name}</h4>
                  <p className="centre-loung-address">{centre.address}</p>
                  <div className="centre-loung-hours">
                    <Clock size={14} />
                    <span>{centre.timings || 'Mon - Sat: 7:00 AM - 8:00 PM'}</span>
                  </div>
                </div>

                <div className="centre-actions-row">
                  <a href={`tel:${centre.phone || '+919805543143'}`} className="btn-centre-action">
                    <Phone size={14} />
                    <span>Call Lounge</span>
                  </a>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(centre.name + ' ' + centre.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-centre-action"
                  >
                    <Navigation size={14} />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY INDIA TRUSTS BHARATH JAN SEWA LABS */}
      <section className="why-bjsl-section" id="why-bjsl">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="split-eyebrow">THE BHARATH JAN SEWA STANDARDS</span>
            <h2 className="section-main-heading">Why India Trusts Bharath Jan Sewa Labs</h2>
          </div>

          <div className="why-features-grid">
            <div className="feature-box">
              <div className="feature-icon-circle">
                <Award size={24} />
              </div>
              <h4 className="feature-title">100% In-house NABL Labs</h4>
              <p className="feature-text">
                Every blood sample is processed in automated, ISO & NABL accredited laboratories with multi-stage QC controls.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Zap size={24} />
              </div>
              <h4 className="feature-title">Free 60-Min Doorstep Phlebotomy</h4>
              <p className="feature-text">
                Certified, vaccinated eMedics arrive with sterile, single-use vacuum tubes across Bangalore within 60 minutes.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Clock size={24} />
              </div>
              <h4 className="feature-title">Fast 6-Hour Digital Reports</h4>
              <p className="feature-text">
                Verified pathology reports delivered straight to your WhatsApp and registered email in just 6 hours.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Heart size={24} />
              </div>
              <h4 className="feature-title">Affordable Direct Pricing</h4>
              <p className="feature-text">
                Non-profit public health model delivering authentic diagnostic screenings at 50% to 70% lower prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQS ACCORDION */}
      <section className="faqs-section" id="faqs">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="split-eyebrow">COMMON QUERIES</span>
            <h2 className="section-main-heading">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.slice(0, 6).map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'open' : ''}`}>
                <button 
                  type="button" 
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  className="faq-question-btn"
                >
                  <span style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', flex: 1, paddingRight: '1rem' }}>
                    {faq.question || faq.q}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className="faq-icon-chevron" 
                    style={{ 
                      color: activeFaq === idx ? '#0284C7' : '#64748B', 
                      flexShrink: 0 
                    }} 
                  />
                </button>
                <div 
                  className="faq-answer-panel"
                  style={{
                    color: '#475569',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    display: activeFaq === idx ? 'block' : 'none'
                  }}
                >
                  {faq.answer || faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SEO DIRECTORY LINKS: 66 INDIVIDUAL DIAGNOSTIC TESTS IN BENGALURU */}
      <section className="seo-tests-directory-section" aria-label="Affordable lab tests" style={{ background: '#F8FAFC', padding: '4rem 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <span className="split-eyebrow" style={{ color: '#0284C7' }}>OFFICIAL SEO DIRECTORY</span>
              <h2 className="section-main-heading" style={{ marginBottom: '6px' }}>
                Affordable Diagnostic Tests in Bengaluru
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '700px', margin: 0 }}>
                Every single test below is published under its canonical SEO page with transparent leaflet comparison rates, specimen guidance, preparation rules, and 16 medically verified patient FAQs.
              </p>
            </div>
            <a 
              href="/tests/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: '#0F172A',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(15,23,42,0.15)'
              }}
            >
              <span>Explore All 66 Test Prices Directory</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '10px'
          }}>
            {[
              { name: 'Complete Blood Count with ESR (CBC + ESR)', price: '₹160', url: '/tests/cbc-esr-test/' },
              { name: 'Blood Glucose (Fasting, PP or Random)', price: '₹20', url: '/tests/blood-sugar-test/' },
              { name: 'Glycated Haemoglobin (HbA1c)', price: '₹260', url: '/tests/hba1c-test/' },
              { name: 'Lipid Profile Panel', price: '₹260', url: '/tests/lipid-profile-test/' },
              { name: 'Liver Function Test (LFT)', price: '₹360', url: '/tests/liver-function-test/' },
              { name: 'Serum Creatinine', price: '₹50', url: '/tests/serum-creatinine-test/' },
              { name: 'Blood Urea / BUN', price: '₹50', url: '/tests/blood-urea-test/' },
              { name: 'Urine Routine & Microscopy', price: '₹50', url: '/tests/urine-routine-microscopy-test/' },
              { name: 'Thyroid-Stimulating Hormone (TSH)', price: '₹100', url: '/tests/tsh-test/' },
              { name: 'Thyroid Function Test (Total T3, T4 & TSH)', price: '₹190', url: '/tests/thyroid-function-test-total/' },
              { name: 'Serum Electrolytes (Na, K, Cl)', price: '₹190', url: '/tests/serum-electrolytes-test/' },
              { name: 'ABO Blood Group & Rh Typing', price: '₹90', url: '/tests/blood-group-rh-test/' },
              { name: 'Vitamin D 25-Hydroxy', price: '₹660', url: '/tests/vitamin-d-test/' },
              { name: 'Vitamin B12 (Cobalamin)', price: '₹440', url: '/tests/vitamin-b12-test/' },
              { name: 'Serum Ferritin', price: '₹460', url: '/tests/ferritin-test/' },
              { name: 'Iron Studies (Iron, TIBC, Saturation)', price: '₹250', url: '/tests/iron-studies-test/' },
              { name: 'C-Reactive Protein (CRP), Quantitative', price: '₹250', url: '/tests/crp-test/' },
              { name: 'Serum Uric Acid', price: '₹50', url: '/tests/uric-acid-test/' },
              { name: 'Serum Calcium, Total', price: '₹60', url: '/tests/serum-calcium-test/' },
              { name: 'Serum Phosphate', price: '₹90', url: '/tests/serum-phosphate-test/' },
              { name: 'Total Immunoglobulin E (IgE)', price: '₹630', url: '/tests/total-ige-test/' },
              { name: 'Hepatitis B Surface Antigen (HBsAg)', price: '₹250', url: '/tests/hbsag-test/' },
              { name: 'Hepatitis C Antibody (Anti-HCV)', price: '₹400', url: '/tests/anti-hcv-test/' },
              { name: 'HIV 1/2 Antigen-Antibody, 4th Gen', price: '₹250', url: '/tests/hiv-fourth-generation-test/' },
              { name: 'Dengue NS1 Antigen & IgM/IgG ELISA', price: '₹450', url: '/tests/dengue-ns1-igm-igg-test/' },
              { name: 'Malaria Rapid Antigen (HRP2/pLDH)', price: '₹200', url: '/tests/malaria-antigen-test/' },
              { name: 'Prothrombin Time / INR', price: '₹190', url: '/tests/pt-inr-test/' },
              { name: 'Activated Partial Thromboplastin Time (aPTT)', price: '₹260', url: '/tests/aptt-test/' },
              { name: 'D-Dimer', price: '₹660', url: '/tests/d-dimer-test/' },
              { name: 'Lactate Dehydrogenase (LDH)', price: '₹120', url: '/tests/ldh-test/' },
              { name: 'Serum Amylase', price: '₹160', url: '/tests/serum-amylase-test/' },
              { name: 'Serum Lipase', price: '₹250', url: '/tests/serum-lipase-test/' },
              { name: 'Creatine Phosphokinase (CK/CPK), Total', price: '₹260', url: '/tests/cpk-total-test/' },
              { name: 'Rheumatoid Factor (RF)', price: '₹200', url: '/tests/rheumatoid-factor-test/' },
              { name: 'Anti-Streptolysin O (ASO) Titre', price: '₹200', url: '/tests/aso-titre-test/' },
              { name: 'Serum Prolactin', price: '₹400', url: '/tests/prolactin-test/' },
              { name: 'Follicle-Stimulating Hormone (FSH)', price: '₹400', url: '/tests/fsh-test/' },
              { name: 'Luteinising Hormone (LH)', price: '₹400', url: '/tests/lh-test/' },
              { name: 'Total Testosterone', price: '₹460', url: '/tests/total-testosterone-test/' },
              { name: 'Beta hCG (Quantitative)', price: '₹460', url: '/tests/beta-hcg-test/' },
              { name: 'Carcinoembryonic Antigen (CEA)', price: '₹600', url: '/tests/cea-test/' },
              { name: 'Cancer Antigen 125 (CA-125)', price: '₹600', url: '/tests/ca-125-test/' },
              { name: 'Urine Albumin-Creatinine Ratio (ACR)', price: '₹360', url: '/tests/urine-acr-test/' },
              { name: 'Prostate-Specific Antigen (PSA), Total', price: '₹400', url: '/tests/total-psa-test/' },
              { name: 'Folic Acid (Serum Folate)', price: '₹560', url: '/tests/serum-folate-test/' },
              { name: 'VDRL Test', price: '₹220', url: '/tests/vdrl-test/' },
              { name: 'TyphiDot IgM/IgG', price: '₹550', url: '/tests/typhidot-test/' },
              { name: 'Thyroid Function Panel (Free T3, Free T4, TSH)', price: '₹330', url: '/tests/thyroid-function-test-free/' },
              { name: 'Platelet Count', price: '₹100', url: '/tests/platelet-count-test/' },
              { name: 'Haemoglobin (Hb)', price: '₹60', url: '/tests/haemoglobin-test/' },
              { name: 'Complete Haemogram (CBC, ESR & PS)', price: '₹230', url: '/tests/complete-haemogram-ps-test/' },
              { name: 'Absolute Eosinophil Count (AEC)', price: '₹100', url: '/tests/aec-test/' },
              { name: 'Bilirubin, Total & Direct', price: '₹120', url: '/tests/bilirubin-total-direct-test/' },
              { name: 'Serum Magnesium', price: '₹200', url: '/tests/serum-magnesium-test/' },
              { name: 'Serum Iron', price: '₹160', url: '/tests/serum-iron-test/' },
              { name: 'Alanine Aminotransferase (ALT / SGPT)', price: '₹60', url: '/tests/alt-sgpt-test/' },
              { name: 'Aspartate Aminotransferase (AST / SGOT)', price: '₹60', url: '/tests/ast-sgot-test/' },
              { name: 'Anti-Thyroid Peroxidase Antibodies (Anti-TPO)', price: '₹560', url: '/tests/anti-tpo-test/' },
              { name: 'Potassium (Serum / Plasma)', price: '₹80', url: '/tests/potassium-test/' },
              { name: 'Renal Profile (Urea, Creatinine, Uric, Lyts)', price: '₹320', url: '/tests/renal-profile-test/' },
              { name: 'LDL Cholesterol, Direct', price: '₹120', url: '/tests/direct-ldl-test/' },
              { name: 'Troponin I, Quantitative', price: '₹760', url: '/tests/troponin-i-test/' },
              { name: 'Serum Cortisol (AM / PM)', price: '₹500', url: '/tests/cortisol-test/' },
              { name: 'Gamma-Glutamyl Transferase (GGT)', price: '₹200', url: '/tests/ggt-test/' },
              { name: 'Serum Total Protein', price: '₹50', url: '/tests/total-protein-test/' },
              { name: 'Ionised Calcium', price: '₹260', url: '/tests/ionised-calcium-test/' }
            ].map(test => (
              <a 
                key={test.url}
                href={test.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  background: 'white',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  color: '#1E293B',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0284C7';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(2,132,199,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                  {test.name}
                </span>
                <span style={{ color: '#0284C7', fontWeight: 800, flexShrink: 0 }}>
                  {test.price}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRESCRIPTION UPLOAD MODAL */}
      {isPrescriptionModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsPrescriptionModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <h3 className="modal-title">Upload Doctor's Prescription</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsPrescriptionModalOpen(false)}
                className="circle-icon-btn"
                style={{ width: '32px', height: '32px' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-body">
              {uploadSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-950)', marginBottom: '8px' }}>
                    Prescription Received!
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--ink-600)', marginBottom: '24px' }}>
                    Our certified pathologist desk will review your prescription, prepare the test panel, and call your phone within 15 minutes.
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setUploadSuccess(false);
                      setIsPrescriptionModalOpen(false);
                    }}
                    className="btn-checkout"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-600)', marginBottom: '16px', lineHeight: '1.5' }}>
                    Attach your doctor's prescription photo or PDF. We will automatically select the prescribed tests at 50-70% subsidized rates and schedule your 60-min home sample collection.
                  </p>

                  {/* Dropzone */}
                  <label className="upload-dropzone" style={{ display: 'block' }}>
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPrescriptionFile(e.target.files[0]);
                        }
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Upload size={24} />
                      </div>
                      {prescriptionFile ? (
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-500)' }}>
                            📄 {prescriptionFile.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--ink-400)', marginTop: '2px' }}>
                            Click to change file
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-900)' }}>
                            Click to upload or drag & drop prescription
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--ink-400)', marginTop: '2px' }}>
                            Supported formats: JPG, PNG, PDF (Max 10MB)
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Phone input */}
                  <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink-800)', marginBottom: '6px' }}>
                      Your 10-Digit Mobile Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 98765 43210" 
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-medium)',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px' }}>
                    <button 
                      type="button" 
                      onClick={() => {
                        if (!patientPhone.trim()) {
                          alert('Please enter your mobile number so we can confirm your tests.');
                          return;
                        }
                        setUploadSuccess(true);
                      }}
                      className="btn-checkout"
                    >
                      <span>Submit Prescription for Test Verification</span>
                      <ArrowRight size={18} />
                    </button>

                    <a 
                      href={`https://wa.me/919805543143?text=Namaste%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20have%20attached%20my%20prescription%20for%20blood%20tests.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: '#25D366',
                        color: '#fff',
                        padding: '12px 18px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={18} />
                      <span>Or Send Directly on WhatsApp</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
