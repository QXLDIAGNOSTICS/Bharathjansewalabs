import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Activity, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Sparkles, 
  Building2, 
  HeartHandshake, 
  Microscope, 
  Stethoscope, 
  Truck, 
  FileText, 
  ArrowRight,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

export default function AboutPage({ setCurrentTab, openBookingWizard }) {
  const [activeTab, setActiveTab] = useState('mission');

  // Lab photo gallery
  const galleryImages = [
    { src: '/images/gallery/gallery-1.jpg', title: 'Automated Clinical Chemistry Analyzer' },
    { src: '/images/gallery/gallery-2.jpg', title: 'Barcoded Sample Accessioning Desk' },
    { src: '/images/gallery/gallery-3.jpg', title: 'NABL Certified Reference Laboratory' },
    { src: '/images/gallery/gallery-4.jpg', title: 'Fully Automated Hematology Counter' },
    { src: '/images/gallery/gallery-5.jpg', title: 'Cold-Chain Sample Transport Hub' },
    { src: '/images/gallery/gallery-6.jpg', title: 'Sterile Phlebotomy Collection Desk' },
  ];

  return (
    <div style={{ padding: '2rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => { setCurrentTab('home'); window.scrollTo(0,0); }}
            style={{ border: 'none', background: 'none', color: '#EF4444', fontWeight: 800, cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <span>›</span>
          <span style={{ color: '#0F172A' }}>About Us</span>
        </div>

        {/* HERO BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          marginBottom: '3rem',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Light Effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none',
            borderRadius: '50%'
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <span style={{ 
                background: 'rgba(239, 68, 68, 0.15)', 
                color: '#FCA5A5', 
                border: '1px solid rgba(239, 68, 68, 0.4)',
                fontSize: '0.8rem', 
                fontWeight: 900, 
                padding: '6px 16px', 
                borderRadius: '99px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '1rem' 
              }}>
                <ShieldCheck size={16} color="#EF4444" /> NABL ACCREDITED DIAGNOSTICS
              </span>

              <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Democratizing Healthcare with <span style={{ color: '#EF4444', background: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dignity & Precision</span>
              </h1>

              <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                Bharath Jan Sewa Labs (BJSL) was founded with a singular mission: to make world-class NABL-accredited diagnostic testing accessible and affordable to every family in Bengaluru. We combine 100% automated lab technology, painless home collection, and transparent pricing.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => { setCurrentTab('packages'); window.scrollTo(0,0); }}
                  className="btn-red-solid" 
                  style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', fontWeight: 800 }}
                >
                  View Health Packages <ArrowRight size={18} />
                </button>
                <button 
                  onClick={openBookingWizard}
                  style={{
                    padding: '0.9rem 2rem',
                    borderRadius: '99px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Book Doorstep Test
                </button>
              </div>
            </div>

            {/* Featured Hero Card Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                border: '2px solid rgba(255,255,255,0.1)'
              }}>
                <img 
                  src="/images/banners/bridging-divide.webp" 
                  alt="Bharath Jan Sewa Labs Diagnostic Lab"
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.currentTarget.src = '/images/gallery/gallery-3.jpg'; }}
                />
              </div>

              {/* Trust Badge Floating Box */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                padding: '1rem 1.5rem',
                borderRadius: '18px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#0F172A',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} color="#EF4444" />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A' }}>NABL & ISO Certified</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>100% Quality Assured Tests</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* KEY STATS COUNTER STRIP */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {[
            { label: 'Happy Patients Served', value: '500,000+', icon: Users, color: '#EF4444', bg: '#FFF1F2' },
            { label: 'Diagnostic Centres in Bengaluru', value: '10+', icon: MapPin, color: '#0284C7', bg: '#E0F2FE' },
            { label: 'NABL Tests & Packages Offered', value: '500+', icon: Microscope, color: '#059669', bg: '#DCFCE7' },
            { label: 'Diagnostic Report Accuracy', value: '99.8%', icon: ShieldCheck, color: '#7C3AED', bg: '#F3E8FF' }
          ].map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div 
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '1.75rem 1.5rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComp size={28} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginTop: '4px' }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* OUR STORY & MISSION */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '3rem',
          marginBottom: '4rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 40px rgba(15, 23, 42, 0.04)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
            <span style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              OUR FOUNDING PHILOSOPHY
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', marginTop: '0.5rem', marginBottom: '1rem' }}>
              Why Bharath Jan Sewa Labs Was Built
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65 }}>
              For decades, high diagnostic test costs forced middle-class families and senior citizens to postpone vital health checkups. We set out to transform healthcare delivery by cutting out middleman markups and offering direct lab pricing.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Pillar 1 */}
            <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <HeartHandshake size={24} color="#EF4444" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>
                Diagnostics with Dignity
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Every patient deserves respectful, compassionate care, transparent reports, and clear medical guidance. Healthcare is a basic right, not a luxury commodity.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Microscope size={24} color="#0284C7" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>
                Automated NABL Precision
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Our partner reference laboratories utilize fully automated Roche, Beckman Coulter, and Abbott clinical analyzers to eliminate manual errors and deliver gold-standard precision.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Activity size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>
                50% - 70% Cost Savings
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                By streamlining lab operations and working at scale across Bengaluru, we pass maximum cost savings directly to patients without compromising test quality.
              </p>
            </div>

          </div>
        </div>

        {/* PATHOLOGY LEADERSHIP TEAM */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <span style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              EXPERT MEDICAL GOVERNANCE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Guided by Experienced Doctors & Pathologists
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem' }}>
              Our clinical operations and report authorizations are overseen by senior medical experts with decades of diagnostic excellence.
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '320px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}>
              <img 
                src="/images/banners/doctors.webp" 
                alt="BJSL Medical Leadership Team"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/images/gallery/gallery-1.jpg'; }}
              />
            </div>

            <div>
              <span style={{ background: '#FFF1F2', color: '#EF4444', fontSize: '0.8rem', fontWeight: 900, padding: '4px 14px', borderRadius: '99px' }}>
                CLINICAL LABORATORY TEAM
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                Uncompromising Quality Control Standards
              </h3>
              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Every blood, urine, and biochemical sample undergoes multi-tier verification. Abnormal values are re-run on secondary automated channels and reviewed directly by our Chief Pathologist before digital signing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Daily Internal & External Quality Assurance (EQAS) Calibration',
                  'Barcode tracking prevents sample mix-ups at every step',
                  'Temperature-controlled cold chain logistics with live IoT sensors',
                  'Instant digital PDF reports delivered via WhatsApp and SMS'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
                    <CheckCircle2 size={18} color="#EF4444" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5-STEP DOORSTEP SAMPLE WORKFLOW */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          color: 'white',
          marginBottom: '4rem',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              SEAMLESS PATIENT EXPERIENCE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              How Doorstep Diagnostics Works
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
              Enjoy painless blood collection at home in 5 simple steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Easy Online Booking', desc: 'Select your package or test and pick your preferred date and morning slot.', icon: Clock },
              { step: '02', title: 'Painless Home Draw', desc: 'Vaccutainer-trained phlebotomist arrives at your door with sterile single-use kits.', icon: Stethoscope },
              { step: '03', title: 'Cold-Chain Transit', desc: 'Samples are barcoded and transported in temperature-sealed cooling carriers.', icon: Truck },
              { step: '04', title: 'Automated Processing', desc: 'Processed at NABL-accredited reference lab with automated analyzers.', icon: Microscope },
              { step: '05', title: 'Instant Digital Report', desc: 'Receive your verified PDF report on WhatsApp & Patient Portal within hours.', icon: FileText }
            ].map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '1.75rem 1.25rem',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#EF4444', background: 'rgba(239, 68, 68, 0.15)', display: 'inline-block', padding: '2px 10px', borderRadius: '99px', marginBottom: '1rem' }}>
                    STEP {s.step}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <StepIcon size={26} color="#F87171" />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>{s.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* LABORATORY & CENTRE PHOTO GALLERY */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <span style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              OUR FACILITIES
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              State-of-the-Art Laboratory Gallery
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem' }}>
              Take a look inside our high-tech testing facilities and patient care hubs across Bengaluru.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={img.src} 
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = '/images/banners/main-banner.webp'; }}
                  />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{img.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>Bharath Jan Sewa Labs Bengaluru</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOOKING CTA BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(239, 68, 68, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span style={{ background: 'white', color: '#EF4444', fontSize: '0.8rem', fontWeight: 900, padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              BOOK YOUR HEALTH CHECKUP TODAY
            </span>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: 'white', marginTop: '1rem', marginBottom: '1rem', lineHeight: 1.2 }}>
              Experience Dignified Diagnostics at Home
            </h2>
            <p style={{ color: '#FFE4E6', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.25rem' }}>
              Book your Chirayu Full Body Package or individual blood test now. Get free home collection anywhere in Bengaluru with same-day reports.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={openBookingWizard}
                style={{
                  background: '#0F172A',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1rem',
                  padding: '1rem 2.5rem',
                  borderRadius: '99px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Book Doorstep Test <ArrowRight size={18} />
              </button>

              <a 
                href="https://wa.me/919805543143?text=Hi%20BJSL,%20I%20want%20to%20know%20more%20about%20your%20lab%20tests"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'white',
                  color: '#16A34A',
                  fontWeight: 900,
                  fontSize: '1rem',
                  padding: '1rem 2.5rem',
                  borderRadius: '99px',
                  textDecoration: 'none',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
