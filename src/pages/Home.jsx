import React, { useState, useRef, useEffect } from 'react';
import { SHOW_REFERENCE_PRICES } from '../config/pricing';
import TestPriceSlider from '../components/TestPriceSlider';
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
  X,
  Sparkles,
  Tag
} from 'lucide-react';
import { 
  HEALTH_PACKAGES, 
  INDIVIDUAL_TESTS, 
  CENTRES, 
  FAQS, 
  COMPANY_INFO,
  LOCALITIES,
  BLOG_POSTS
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
  const [selectedLocalityRegion, setSelectedLocalityRegion] = useState('All');
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [patientPhone, setPatientPhone] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const checkupsScrollRef = useRef(null);
  const testsScrollRef = useRef(null);
  const conditionsScrollRef = useRef(null);
  const desktopSliderRef = useRef(null);
  const homeCollectionSliderRef = useRef(null);
  const highlightsSliderRef = useRef(null);
  const assuranceSliderRef = useRef(null);

  const scrollCarousel = (ref, distance) => {
    if (ref.current) {
      ref.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const scrollHomeCollectionSlider = (direction) => {
    if (homeCollectionSliderRef.current) {
      homeCollectionSliderRef.current.scrollBy({ left: direction * 360, behavior: 'smooth' });
    }
  };

  const scrollHighlightsSlider = (direction) => {
    if (highlightsSliderRef.current) {
      highlightsSliderRef.current.scrollBy({ left: direction * 350, behavior: 'smooth' });
    }
  };

  const scrollAssuranceSlider = (direction) => {
    if (assuranceSliderRef.current) {
      assuranceSliderRef.current.scrollBy({ left: direction * 360, behavior: 'smooth' });
    }
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleToggleCartItem = (item) => {
    onBookTest(item);
  };

  // Health Conditions (Full Width Left-to-Right Slider)
  const conditionsList = [
    { 
      id: 'joint-pain', 
      name: 'Joint Pain', 
      tag: 'Orthopedics',
      icon: '🦴',
      testsText: 'Vit D, Calcium, RA, Uric Acid',
      price: '₹50',
      image: '/images/conditions/joint_pain.jpg', 
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
      image: '/images/conditions/allergy.jpg', 
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
      image: '/images/conditions/thyroid.jpg', 
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
      image: '/images/conditions/diabetes.jpg', 
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
      image: '/images/conditions/heart_care.jpg', 
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
      image: '/images/conditions/fever_infection.jpg', 
      fallbackImage: '/images/slides/hero-slide1.jpg',
      testId: 'cbc-test' 
    },
    { 
      id: 'vitamins', 
      name: 'Vitamins & Minerals', 
      tag: 'Vital Nutrition',
      icon: '💊',
      testsText: 'Vitamin D3 & Vitamin B12, Calcium',
      price: '₹60',
      image: '/images/conditions/vitamins_minerals.jpg', 
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
      image: '/images/conditions/liver_kidney.jpg', 
      fallbackImage: '/images/packages/chirayu-master.webp',
      testId: 'lft-test' 
    },
    { 
      id: 'hair-fall', 
      name: 'Hair Fall', 
      tag: 'Trichology',
      icon: '💇',
      testsText: 'Ferritin, TSH, Iron, Biotin',
      price: '₹100',
      image: '/images/conditions/hair_fall.jpg',
      fallbackImage: '/images/slides/hero_hairfall.jpg', 
      testId: 'thyroid-profile' 
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

  // Home Sample Collection Slides (Top of Bengaluru Localities)
  const homeCollectionSlides = [
    {
      id: 'slide-morning-fasting',
      badge: '⚡ Early Morning 6:30 AM – 11:30 AM',
      badgeColor: '#EA580C',
      badgeBg: '#FFF7ED',
      title: 'Fasting Blood Tests at Your Doorstep',
      desc: 'Certified phlebotomists arrive with sterile vacutainer tubes and temperature-controlled cold chain box. Avoid the morning traffic and complete your fasting tests peacefully at home before breakfast.',
      points: ['Fasting Sugar (FBS) at ₹20', 'Complete Lipid Profile at ₹260', 'Sterile Single-Use Vacutainers'],
      ctaText: 'Book Morning Slot',
      ctaLink: 'https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20want%20to%20book%20an%20early%20morning%20fasting%20blood%20test%20at%20home'
    },
    {
      id: 'slide-citywide-coverage',
      badge: '📍 15+ Bengaluru Hubs Covered',
      badgeColor: '#143B70',
      badgeBg: '#EFF6FF',
      title: 'Citywide Doorstep Phlebotomy Routes',
      desc: 'Active daily phlebotomy teams across Sanjaynagar, Banashankari, BTM Layout, Jayanagar, JP Nagar, HSR Layout, Kengeri, Rajajinagar, Vijayanagar, and more.',
      points: ['No Long Travel or Queues', 'Local Phlebotomists Nearby', 'Transparent Fixed Tariffs'],
      ctaText: 'Check Area On WhatsApp',
      ctaLink: 'https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20is%20home%20sample%20collection%20available%20in%20my%20Bengaluru%20area%3F'
    },
    {
      id: 'slide-same-day-reports',
      badge: '⚡ 4 to 8 Hour Turnaround',
      badgeColor: '#16A34A',
      badgeBg: '#F0FDF4',
      title: 'Same-Day Verified Reports on WhatsApp',
      desc: 'Samples processed through partner diagnostic laboratories using calibrated automated diagnostic systems. Digital PDF reports sent directly to WhatsApp.',
      points: ['Same-Day WhatsApp Delivery', 'Email PDF Backup Included', 'Partner Lab Processing'],
      ctaText: 'Inquire Report Delivery',
      ctaLink: 'https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20have%20a%20query%20about%20test%20reporting%20times'
    },
    {
      id: 'slide-elderly-parents',
      badge: '👵 Senior Citizen Comfort Care',
      badgeColor: '#9333EA',
      badgeBg: '#FAF5FF',
      title: 'Safe Diagnostics for Elderly Parents',
      desc: 'Trained, gentle phlebotomists experienced with delicate veins. Complete comfort of home for elderly parents & grandparents without the fatigue of clinical waiting rooms.',
      points: ['Gentle Blood Collection', 'Zero Waiting Fatigue', 'Full Body Screening from ₹796'],
      ctaText: 'Book for Parents',
      ctaLink: 'https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20want%20to%20book%20a%20home%20sample%20collection%20for%20my%20parents'
    }
  ];

  // 1. Diagnostic Highlights Slides (Positioned immediately above "Affordable Diagnostic Tests in Bengaluru")
  const diagnosticHighlightSlides = [
    {
      id: 'cbc-esr-highlight',
      badge: '🩸 Most Prescribed',
      badgeColor: '#DC2626',
      badgeBg: '#FEF2F2',
      tag: 'Haematology Panel',
      name: 'Complete Blood Count with ESR (CBC + ESR)',
      desc: 'Detects infections, anemia, viral fevers, platelet changes, and inflammatory markers with precision automated cell counters.',
      price: 160,
      mrp: 450,
      discount: '64% Off',
      parameters: 24,
      tat: 'Same Day',
      tests: ['Hemoglobin & RBC Indices', 'Total & Differential WBC', 'Platelet Count', 'ESR Westergren'],
      url: '/tests/cbc-esr-test/',
      whatsappMsg: 'Namaste BJSL, I would like to book Complete Blood Count with ESR (CBC + ESR) at ₹160.'
    },
    {
      id: 'diabetes-hba1c-highlight',
      badge: '🩺 Sugar Care',
      badgeColor: '#2563EB',
      badgeBg: '#EFF6FF',
      tag: 'Glycemic Control',
      name: 'HbA1c & Fasting Glucose Screening',
      desc: 'Gold-standard 3-month glycemic evaluation paired with instant blood glucose for precise diabetes diagnosis and monitoring.',
      price: 260,
      mrp: 650,
      discount: '60% Off',
      parameters: 3,
      tat: 'Same Day',
      tests: ['Glycated Hemoglobin (HbA1c)', 'Estimated Average Glucose', 'Fasting Blood Sugar (FBS)'],
      url: '/tests/hba1c-test/',
      whatsappMsg: 'Namaste BJSL, I would like to book HbA1c & Fasting Glucose Screening at ₹260.'
    },
    {
      id: 'lipid-profile-highlight',
      badge: '❤️ Heart Health',
      badgeColor: '#E11D48',
      badgeBg: '#FFF1F2',
      tag: 'Cardiovascular Panel',
      name: 'Complete Lipid Profile (Cholesterol Panel)',
      desc: 'Assesses cardiovascular risk, arterial plaque buildup, and lipid balance with full enzymatic cholesterol fraction profiling.',
      price: 260,
      mrp: 750,
      discount: '65% Off',
      parameters: 8,
      tat: 'Same Day',
      tests: ['Total Cholesterol', 'HDL (Good) & LDL (Bad)', 'Triglycerides', 'VLDL & TC/HDL Ratio'],
      url: '/tests/lipid-profile-test/',
      whatsappMsg: 'Namaste BJSL, I would like to book Complete Lipid Profile at ₹260.'
    },
    {
      id: 'thyroid-profile-highlight',
      badge: '🦋 Hormonal Balance',
      badgeColor: '#0D9488',
      badgeBg: '#F0FDFA',
      tag: 'Endocrine Panel',
      name: 'Thyroid Function Test (Total T3, T4 & TSH)',
      desc: 'Evaluates thyroid gland activity to diagnose hypo/hyperthyroidism, fatigue, metabolic changes, and unexplained weight changes.',
      price: 190,
      mrp: 600,
      discount: '68% Off',
      parameters: 3,
      tat: 'Same Day',
      tests: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Ultrasensitive TSH (CLIA)'],
      url: '/tests/thyroid-function-test-total/',
      whatsappMsg: 'Namaste BJSL, I would like to book Thyroid Function Test (Total T3, T4, TSH) at ₹190.'
    },
    {
      id: 'lft-kft-highlight',
      badge: '🧪 Vital Organs',
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      tag: 'Liver & Kidney Panel',
      name: 'Liver & Renal Function Screen (LFT + KFT)',
      desc: 'Complete metabolic workup monitoring liver enzymes, bilirubin, kidney filtration rate, creatinine, and urea balance.',
      price: 360,
      mrp: 950,
      discount: '62% Off',
      parameters: 18,
      tat: 'Same Day',
      tests: ['SGOT, SGPT & Bilirubin', 'Serum Creatinine & Blood Urea', 'Uric Acid & Serum Protein', 'Albumin-Globulin Ratio'],
      url: '/tests/liver-function-test/',
      whatsappMsg: 'Namaste BJSL, I would like to book Liver & Renal Function Screen at ₹360.'
    },
    {
      id: 'vitamin-d3-b12-highlight',
      badge: '💊 Vital Nutrition',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      tag: 'Energy & Immunity',
      name: 'Vitamin D3 & Vitamin B12 Vital Screen',
      desc: 'Crucial for bone density, nerve conduction, energy levels, hair health, and immune system strength.',
      price: 660,
      mrp: 1800,
      discount: '63% Off',
      parameters: 2,
      tat: '24 Hours',
      tests: ['25-OH Vitamin D Total', 'Vitamin B12 (Cobalamin)', 'Chemiluminescence Assay'],
      url: '/tests/vitamin-d-test/',
      whatsappMsg: 'Namaste BJSL, I would like to book Vitamin D3 & Vitamin B12 Screen at ₹660.'
    }
  ];

  // 2. Diagnostic Assurance Slides (Positioned immediately above "Latest Health Insights & Diagnostic Guides")
  const diagnosticAssuranceSlides = [
    {
      id: 'slide-nabl-precision',
      badge: '🔬 Lab Quality Standards',
      badgeColor: '#0284C7',
      badgeBg: '#F0F9FF',
      title: 'Precision at Every Step: From Collection to Reports',
      desc: 'All blood and urine specimens are collected using vacuum BD vacutainers, cold-chain preserved in temperature-monitored boxes, and analyzed on calibrated automated clinical chemistry analyzers at our partner diagnostic laboratories.',
      points: [
        'Sterile single-use vacuum vacutainers with barcode tracking',
        'Daily internal quality controls & multi-tier calibration',
        'Doctor-signed clinical diagnostic PDF reports'
      ],
      ctaText: 'Learn About Lab Quality',
      ctaLink: '/about/'
    },
    {
      id: 'slide-family-comfort',
      badge: '👨‍👩‍👧‍👦 Pediatric & Geriatric Care',
      badgeColor: '#16A34A',
      badgeBg: '#F0FDF4',
      title: 'Designed for Growing Kids & Senior Citizens',
      desc: 'Our experienced phlebotomists are specially trained in gentle, low-pain blood draws using ultra-fine butterfly needles. Perfect for young children, toddlers, and elderly parents who find clinical visits stressful or exhausting.',
      points: [
        'Painless blood draws using micro-gauge butterfly needles',
        'Zero waiting queues or hospital exposure for vulnerable elders',
        'Home collection available 7 days a week from 6:30 AM'
      ],
      ctaText: 'Book Gentle Home Collection',
      ctaLink: 'https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20book%20a%20home%20collection%20for%20my%20child%20/%20elderly%20parents.'
    },
    {
      id: 'slide-transparent-pricing',
      badge: '🏷️ 100% Transparent Tariffs',
      badgeColor: '#D97706',
      badgeBg: '#FFFBEB',
      title: 'Transparent Pricing with Zero Hidden Charges',
      desc: 'Unlike traditional labs that hide test costs until you visit, BJSL publishes all 66 test prices openly online and on leaflets. Transparent rates from ₹20 with no hidden registration fees or unexpected charges.',
      points: [
        'Fasting Blood Sugar at ₹20, Urine Routine at ₹50',
        'CBC + ESR at ₹160, HbA1c at ₹260, Lipid Profile at ₹260',
        'Transparent, published prices on routine tests'
      ],
      ctaText: 'View All 66 Test Rates',
      ctaLink: '/tests/'
    },
    {
      id: 'slide-fast-delivery',
      badge: '⚡ Same-Day Digital Delivery',
      badgeColor: '#9333EA',
      badgeBg: '#FAF5FF',
      title: '4 to 8 Hour Turnaround Delivered to WhatsApp',
      desc: 'Morning home samples are processed immediately to provide same-day verified digital reports. Access, download, and forward doctor-ready PDF reports directly to your family physician from WhatsApp.',
      points: [
        'Same-day reporting for over 90% of routine investigations',
        'Verified QR code on every report for instant medical authentication',
        'Permanent cloud record access for long-term health tracking'
      ],
      ctaText: 'Enquire Delivery on WhatsApp',
      ctaLink: 'https://wa.me/919805543143?text=Namaste%20BJSL,%20how%20soon%20can%20I%20receive%20my%20test%20reports?'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* MOBILE-ONLY TOP PROMO & ACTION HUBS */}
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
                  src="/images/slides/fever_hero.jpg" 
                  alt="Fever & Infection Screening" 
                  className="mobile-lifestyle-bg-img"
                  style={{ objectPosition: 'center 15%' }}
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
                  src="/images/slides/fever_hero.jpg" 
                  alt="Fever & Infection Screening" 
                  className="desktop-lifestyle-bg-img"
                  style={{ objectPosition: 'center 15%' }}
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
                  <span className="trust-stat-label">PARTNER LABS</span>
                  <span className="trust-stat-value">Automated testing</span>
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
                            <span className="meta-bold-val">{pkg.tat || 'Varies by test'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkup-card-price-row">
                      <div className="price-left">
                        <div className="price-top-meta">
                          {SHOW_REFERENCE_PRICES && (<>
                          <span className="strikethrough-price">₹{pkg.mrp}</span>
                          <span className="discount-green-badge">
                            {Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% Off
                          </span>
                          </>)}
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

      {/* MOBILE CIRCULAR CHECKUP CATEGORIES & QUALITY BADGE (Screenshot 2) */}
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

          {/* Quality partner labs banner pill (Screenshot 2) */}
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
              <span className="mobile-nabl-title">Testing through NABL-accredited laboratory partners</span>
              <span className="mobile-nabl-sub">
                See our quality standards <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
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
                          {SHOW_REFERENCE_PRICES && (<>
                          <span className="strikethrough-price">₹{test.mrp}</span>
                          <span className="discount-green-badge">{test.discount}</span>
                          </>)}
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

      {/* 8.4 DOORSTEP PHLEBOTOMY & HOME SAMPLE COLLECTION SLIDES (Top of Bengaluru Localities) */}
      <section className="home-collection-slider-section" id="home-collection-slides">
        <div className="container">
          <div className="home-collection-slider-header">
            <div className="home-collection-title-box">
              <span className="home-collection-eyebrow">
                <Sparkles size={14} color="#EA580C" /> DOORSTEP SAMPLE COLLECTION
              </span>
              <h3 className="home-collection-heading">
                Safe &amp; Convenient Home Diagnostics in Bengaluru
              </h3>
            </div>
            <div className="home-collection-nav-arrows">
              <button 
                type="button"
                className="home-collection-arrow-btn"
                onClick={() => scrollHomeCollectionSlider(-1)}
                aria-label="Previous home collection slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button"
                className="home-collection-arrow-btn"
                onClick={() => scrollHomeCollectionSlider(1)}
                aria-label="Next home collection slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="home-collection-track" ref={homeCollectionSliderRef}>
            {homeCollectionSlides.map((slide) => (
              <div key={slide.id} className="home-collection-slide-card">
                <div>
                  <span 
                    className="home-collection-card-badge" 
                    style={{ color: slide.badgeColor, backgroundColor: slide.badgeBg, border: `1px solid ${slide.badgeColor}25` }}
                  >
                    {slide.badge}
                  </span>
                  <h4 className="home-collection-card-title">{slide.title}</h4>
                  <p className="home-collection-card-desc">{slide.desc}</p>
                </div>
                
                <div>
                  <div className="home-collection-points-list">
                    {slide.points.map((pt, idx) => (
                      <div key={idx} className="home-collection-point-item">
                        <span className="home-collection-point-icon">✓</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={slide.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-collection-card-cta"
                  >
                    <MessageSquare size={16} />
                    <span>{slide.ctaText}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 HYPERLOCAL BENGALURU COVERAGE & DOORSTEP PHLEBOTOMY (15 LOCALITIES) */}
      <section className="localities-section" id="localities" style={{ padding: '60px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
            <span className="split-eyebrow" style={{ color: '#143b70', fontWeight: 800 }}>HYPERLOCAL HEALTHCARE ACCESS</span>
            <h2 className="section-main-heading" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#143b70', margin: '8px 0 12px' }}>
              Bengaluru Localities &amp; Home Sample Collection
            </h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6 }}>
              Find verified collection centres and certified doorstep phlebotomy across 15 key Bengaluru neighbourhoods. Standardised, transparent test prices across South, West, Southeast, Central, and North zones.
            </p>

            {/* Region Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {['All', 'South', 'West', 'Southeast', 'Central'].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedLocalityRegion(reg)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: selectedLocalityRegion === reg ? '#143b70' : '#cbd5e1',
                    background: selectedLocalityRegion === reg ? '#143b70' : '#ffffff',
                    color: selectedLocalityRegion === reg ? '#ffffff' : '#334155',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {reg === 'All' ? 'All 15 Localities' : `${reg} Bengaluru`}
                </button>
              ))}
            </div>
          </div>

          {/* Localities Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {LOCALITIES
              .filter(loc => selectedLocalityRegion === 'All' || loc.region === selectedLocalityRegion)
              .map((loc) => (
                <div 
                  key={loc.id} 
                  style={{
                    background: '#ffffff',
                    border: '1px solid #dbeafe',
                    borderRadius: '14px',
                    padding: '20px',
                    boxShadow: '0 4px 14px rgba(20,59,112,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#1d4ed8', background: '#dbeafe', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {loc.region} Bengaluru
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                        PIN: {loc.pincodes.join(', ')}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '4px 0 8px' }}>
                      {loc.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 12px' }}>
                      <strong style={{ color: '#334155' }}>Hub:</strong> {loc.nearestHub}<br />
                      <strong style={{ color: '#334155' }}>Coverage:</strong> {loc.landmarks}
                    </p>
                    <div style={{ fontSize: '12px', color: '#166534', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', fontWeight: 600, marginBottom: '14px' }}>
                      ✓ Doorstep Collection: {loc.turnaround} TAT
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                    <a
                      href={`/locations/${loc.slug}/`}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#143b70',
                        border: '1px solid #cbd5e1',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        background: '#f8fafc'
                      }}
                    >
                      Area Details &rarr;
                    </a>
                    <a
                      href={`https://wa.me/919805543143?text=${encodeURIComponent(`Hello Bharath Jan Sewa Labs, I want to book a blood test in ${loc.name} (PIN: ${loc.pincodes[0]}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#ffffff',
                        background: '#15803d',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <a 
              href="/locations/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '14px',
                color: '#143b70',
                textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '8px'
              }}
            >
              <span>Explore Complete 15 Bengaluru Localities Directory</span>
              <ArrowRight size={16} />
            </a>
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
              <h4 className="feature-title">Partner Laboratory Testing</h4>
              <p className="feature-text">
                Samples collected across our network are processed through our partner diagnostic laboratories, using automated systems and calibrated multi-stage controls.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Zap size={24} />
              </div>
              <h4 className="feature-title">Doorstep Sample Collection</h4>
              <p className="feature-text">
                Trained phlebotomists arrive with sterile, single-use vacuum tubes at a confirmed time slot, in serviceable Bengaluru areas.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Clock size={24} />
              </div>
              <h4 className="feature-title">Digital Reports</h4>
              <p className="feature-text">
                Doctor-authorised reports delivered to your WhatsApp and registered email. Most routine tests are reported the same day; timing varies by test.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Heart size={24} />
              </div>
              <h4 className="feature-title">Affordable Direct Pricing</h4>
              <p className="feature-text">
                Transparent, published prices for essential diagnostic tests, starting at ₹20.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AFFORDABLE BLOOD TESTS & HEALTH CHECKUPS BANNER (Added Under Why India Trusts) */}
      <section className="bjsl-hero-top-seo" style={{
        margin: '0 auto 3.5rem',
        maxWidth: '1240px',
        padding: '0 1.25rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          padding: '3rem 2.25rem',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '99px', background: 'rgba(2, 132, 199, 0.25)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38BDF8', fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <Sparkles size={14} /> Affordable Blood Tests &amp; Diagnostics in Bengaluru
          </div>
          
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 900, lineHeight: 1.2, color: '#FFFFFF', margin: '0 0 1rem', letterSpacing: '-0.02em', maxWidth: '850px' }}>
            Affordable Blood Tests &amp; Health Checkups in Bengaluru
          </h2>
          
          <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: '#CBD5E1', maxWidth: '780px', lineHeight: 1.6, margin: '0 0 1.75rem' }}>
            Affordable Diagnostic Services. Testing Through NABL-Accredited Laboratory Partners.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> Glucose ₹20
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> Urine Routine ₹50
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> CBC with ESR ₹160
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> Thyroid TFT ₹190
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> HbA1c ₹260
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>
              <Check size={16} color="#10B981" /> Chirayu Prime ₹796 (71 Tests)
            </span>
          </div>

          {/* Action Buttons with Direct WhatsApp & Call */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => openSearchModal ? openSearchModal() : (document.querySelector('#popular-tests')?.scrollIntoView({ behavior: 'smooth' }))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 22px',
                borderRadius: '12px',
                background: '#EF4444',
                color: 'white',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
              }}
            >
              <Search size={18} /> Find Tests &amp; Prices
            </button>

            <button 
              onClick={() => {
                const el = document.querySelector('#centres');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (setCurrentTab) setCurrentTab('centres');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 20px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              <MapPin size={18} color="#38BDF8" /> Nearest Centre
            </button>

            <a 
              href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20book%20a%20blood%20test%20in%20Bengaluru."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 20px',
                borderRadius: '12px',
                background: '#25D366',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
              </svg>
              WhatsApp: +91 98055 43143
            </a>

            <a 
              href="tel:919805543143"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 20px',
                borderRadius: '12px',
                background: '#059669',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              <Phone size={18} /> Call to Book
            </a>
          </div>
        </div>
      </section>

      {/* COMPASSIONATE ACCESS: JAN SEWA DIAGNOSTIC ASSISTANCE */}
      <section className="diagnostic-assistance-section" style={{
        margin: '0 auto 3rem',
        maxWidth: '1240px',
        padding: '0 1.25rem'
      }}>
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #BBF7D0',
          borderRadius: '20px',
          padding: '2rem 2.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 4px 20px rgba(22, 101, 52, 0.05)'
        }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              <Heart size={16} color="#16A34A" /> Jan Sewa Diagnostic Assistance Programme
            </div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 800, color: '#14532D', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              Compassionate Care: Diagnostic Support for Every Family
            </h3>
            <p style={{ color: '#15803D', fontSize: '0.975rem', lineHeight: 1.6, margin: 0 }}>
              If cost is preventing you from obtaining a medically appropriate essential test, contact BJSL to ask about the lowest available approved price and any currently available assistance. We believe no patient should be denied an essential blood investigation due to financial hardship.
            </p>
          </div>
          <div>
            <a
              href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20enquire%20about%20the%20Jan%20Sewa%20Diagnostic%20Assistance%20programme."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '12px',
                background: '#16A34A',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              Enquire for Assistance
            </a>
          </div>
        </div>
      </section>

      {/* 10. POPULAR DIAGNOSTIC SCREENINGS SLIDE (Slide immediately above "Affordable Diagnostic Tests in Bengaluru") */}
      <section className="diagnostic-highlights-slider-section" id="diagnostic-highlights-slides">
        <div className="container">
          <div className="highlights-slider-header">
            <div className="highlights-title-box">
              <span className="highlights-eyebrow">
                <Sparkles size={14} color="#0284C7" /> POPULAR SCREENINGS &amp; PROFILES
              </span>
              <h3 className="highlights-heading">
                Essential Diagnostic Panels &amp; Health Screenings
              </h3>
              <p className="highlights-subtitle">
                Doctor-recommended comprehensive routine panels for diabetes, heart, organ wellness, and infection screening across Bengaluru.
              </p>
            </div>
            <div className="highlights-nav-arrows">
              <button 
                type="button"
                className="highlights-arrow-btn"
                onClick={() => scrollHighlightsSlider(-1)}
                aria-label="Previous screening slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button"
                className="highlights-arrow-btn"
                onClick={() => scrollHighlightsSlider(1)}
                aria-label="Next screening slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="highlights-slider-track" ref={highlightsSliderRef}>
            {diagnosticHighlightSlides.map((slide) => (
              <div key={slide.id} className="highlights-slide-card">
                <div>
                  <div className="highlights-card-top-row">
                    <span 
                      className="highlights-card-badge" 
                      style={{ color: slide.badgeColor, backgroundColor: slide.badgeBg, border: `1px solid ${slide.badgeColor}25` }}
                    >
                      {slide.badge}
                    </span>
                    <span className="highlights-card-tat">
                      <Clock size={12} /> {slide.tat}
                    </span>
                  </div>

                  <h4 className="highlights-card-title">{slide.name}</h4>
                  <p className="highlights-card-desc">{slide.desc}</p>

                  <div className="highlights-card-price-box">
                    <span className="highlights-card-price">₹{slide.price}</span>
                    {SHOW_REFERENCE_PRICES && (<>
                    <span className="highlights-card-mrp">₹{slide.mrp}</span>
                    <span className="highlights-card-discount">{slide.discount}</span>
                    </>)}
                  </div>

                  <div className="highlights-card-tests-list">
                    {slide.tests.map((t, idx) => (
                      <div key={idx} className="highlights-card-test-item">
                        <span className="highlights-card-test-icon">✓</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="highlights-card-actions">
                  <button
                    type="button"
                    onClick={() => {
                      if (onBookTest) {
                        onBookTest({
                          id: slide.id,
                          name: slide.name,
                          price: slide.price,
                          parameters: slide.parameters,
                          tat: slide.tat
                        });
                      }
                    }}
                    className="highlights-card-btn-book"
                  >
                    <span>{isInCart(slide.id) ? 'Added to Cart ✓' : `Book Test at ₹${slide.price}`}</span>
                    <ArrowRight size={14} />
                  </button>

                  <a 
                    href={`https://wa.me/919805543143?text=${encodeURIComponent(slide.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="highlights-card-btn-wa"
                    aria-label={`Book ${slide.name} on WhatsApp`}
                    title="Book on WhatsApp"
                  >
                    <MessageSquare size={17} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. AFFORDABLE TEST PRICES — price-band slider linking to test pages and dedicated price pages */}
      <TestPriceSlider />

      {/* 12. DIAGNOSTIC ASSURANCE & PATIENT TRUST SLIDES (Slide immediately above "Latest Health Insights & Diagnostic Guides") */}
      <section className="patient-assurance-slider-section" id="assurance-slides">
        <div className="container">
          <div className="assurance-slider-header">
            <div className="assurance-title-box">
              <span className="assurance-eyebrow">
                <ShieldCheck size={14} color="#16A34A" /> DIAGNOSTIC EXCELLENCE &amp; TRUST
              </span>
              <h3 className="assurance-heading">
                Why Bengaluru Families Choose Bharath Jan Sewa Labs
              </h3>
              <p className="assurance-subtitle">
                Clinical precision, partner lab testing, zero hidden markups, and gentle doorstep phlebotomy across 15+ Bengaluru hubs.
              </p>
            </div>
            <div className="assurance-nav-arrows">
              <button 
                type="button"
                className="assurance-arrow-btn"
                onClick={() => scrollAssuranceSlider(-1)}
                aria-label="Previous assurance slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button"
                className="assurance-arrow-btn"
                onClick={() => scrollAssuranceSlider(1)}
                aria-label="Next assurance slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="assurance-slider-track" ref={assuranceSliderRef}>
            {diagnosticAssuranceSlides.map((slide) => (
              <div key={slide.id} className="assurance-slide-card">
                <div>
                  <span 
                    className="assurance-card-badge" 
                    style={{ color: slide.badgeColor, backgroundColor: slide.badgeBg, border: `1px solid ${slide.badgeColor}25` }}
                  >
                    {slide.badge}
                  </span>
                  <h4 className="assurance-card-title">{slide.title}</h4>
                  <p className="assurance-card-desc">{slide.desc}</p>
                </div>
                
                <div>
                  <div className="assurance-points-list">
                    {slide.points.map((pt, idx) => (
                      <div key={idx} className="assurance-point-item">
                        <span className="assurance-point-icon">✓</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={slide.ctaLink}
                    target={slide.ctaLink.startsWith('http') ? '_blank' : '_self'}
                    rel={slide.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="assurance-card-cta"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FEATURED HEALTH INSIGHTS & MEDICAL BLOGS */}
      <section className="featured-blogs-section" style={{ background: '#FFFFFF', padding: '4rem 0', borderTop: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="split-eyebrow" style={{ color: '#EF4444' }}>CLINICAL KNOWLEDGE &amp; PATIENT ADVISORIES</span>
              <h2 className="section-main-heading" style={{ marginBottom: '6px' }}>
                Latest Health Insights &amp; Diagnostic Guides
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '720px', margin: 0 }}>
                Medically reviewed articles by certified Pathologists explaining when to test, preparation protocols, and interpreting your blood reports in Bengaluru.
              </p>
            </div>
            <button 
              onClick={() => {
                if (setCurrentTab) setCurrentTab('blogs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 22px',
                borderRadius: '12px',
                background: '#EF4444',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
              }}
            >
              <span>Explore All {BLOG_POSTS.length} Health Guides</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article 
                key={post.id}
                onClick={() => {
                  if (setCurrentTab) setCurrentTab('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '18px',
                  border: '1px solid #E2E8F0',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#EF4444';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge-pink-tag" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{post.image}</div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 700 }}>
                    👨‍⚕️ {post.author.split(',')[0]}
                  </span>
                  <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Guide →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQS ACCORDION */}
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
                    Attach your doctor's prescription photo or PDF. We will automatically select the prescribed tests at our published BJSL rates and arrange home sample collection where available.
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
