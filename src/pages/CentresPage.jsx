import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Star, Search, ShieldCheck, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';
import { CENTRES, HEALTH_PACKAGES } from '../data/mockData';

export default function CentresPage({ openBookingWizard }) {
  const [selectedArea, setSelectedArea] = useState('All');

  // Form states
  const [topForm, setTopForm] = useState({
    package: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    agreed: false
  });

  const [bottomForm, setBottomForm] = useState({
    package: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    agreed: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleTopFormSubmit = (e) => {
    e.preventDefault();
    if (!topForm.agreed) {
      alert('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }
    setSubmitted(true);
    const pkg = HEALTH_PACKAGES.find(p => p.id === topForm.package);
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0A🩺 *New Health Test Booking Request (Centres Page):*%0A*Package/Test:* ${pkg ? pkg.name : (topForm.package || 'Health Checkup')}%0A*Patient Name:* ${topForm.name}%0A*Phone:* ${topForm.phone}%0A*Email:* ${topForm.email || 'N/A'}%0A*Preferred Location:* ${topForm.location || 'Bangalore'}%0A*Preferred Date:* ${topForm.date || 'Earliest available'}%0A*Preferred Slot:* ${topForm.time || 'Morning'}%0A%0APlease confirm my appointment.`;
    window.open(`https://wa.me/919805543143?text=${msg}`, '_blank');
    setTimeout(() => {
      setSubmitted(false);
    }, 1200);
  };

  const handleBottomFormSubmit = (e) => {
    e.preventDefault();
    if (!bottomForm.agreed) {
      alert('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }
    setSubmitted(true);
    const pkg = HEALTH_PACKAGES.find(p => p.id === bottomForm.package);
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0A🩺 *New Health Test Booking Request (Centres Page):*%0A*Package/Test:* ${pkg ? pkg.name : (bottomForm.package || 'Health Checkup')}%0A*Patient Name:* ${bottomForm.name}%0A*Phone:* ${bottomForm.phone}%0A*Email:* ${bottomForm.email || 'N/A'}%0A*Preferred Location:* ${bottomForm.location || 'Bangalore'}%0A*Preferred Date:* ${bottomForm.date || 'Earliest available'}%0A*Preferred Slot:* ${bottomForm.time || 'Morning'}%0A%0APlease confirm my appointment.`;
    window.open(`https://wa.me/919805543143?text=${msg}`, '_blank');
    setTimeout(() => {
      setSubmitted(false);
    }, 1200);
  };

  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredCentres = selectedArea === 'All' 
    ? (selectedRegion === 'All' ? CENTRES : CENTRES.filter(c => c.region === selectedRegion))
    : CENTRES.filter(c => c.id === selectedArea || c.area.toLowerCase().includes(selectedArea.toLowerCase()));

  return (
    <div style={{ paddingBottom: '4rem', background: '#F8FAFC' }}>
      
      {/* Breadcrumb Strip */}
      <div style={{ background: '#0F172A', color: 'white', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#94A3B8' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }} style={{ color: '#38BDF8', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <span style={{ color: '#F1F5F9', fontWeight: 600 }}>Our Centres</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.95) 100%), url('/images/gallery/gallery-02.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3.5rem 0 4rem',
        color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '99px',
              background: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38BDF8',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              <MapPin size={16} /> 10 Verified Collection Hubs Across Bengaluru
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>
              Our Diagnostic Centres &amp; Collection Hubs
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94A3B8' }}>
              Walk in to any nearby BJSL collection hub or book convenient home sample collection across South, West, Central, and North Bengaluru. Samples processed through verified NABL-accredited partner laboratories.
            </p>
          </div>

          {/* WhatsApp Direct Appointment Booking Card (Zero Forms) */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            color: '#0F172A',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Instant Appointment Booking via WhatsApp
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                    Zero online forms. Instant confirmation for priority walk-in or doorstep collection across all 10 hubs.
                  </p>
                </div>
              </div>

              <span style={{ background: '#DCFCE7', color: '#15803D', fontWeight: 800, fontSize: '0.78rem', padding: '6px 12px', borderRadius: '99px' }}>
                ⚡ Fast 10-Min Confirmation
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Select Health Package or Test:
                </label>
                <select 
                  className="form-input" 
                  value={topForm.package}
                  onChange={(e) => setTopForm({...topForm, package: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '0.8rem', width: '100%', fontSize: '0.92rem', fontWeight: 600 }}
                >
                  <option value="Chirayu Prime Checkup (71 Tests - ₹796)">Chirayu Prime Checkup (71 Tests - ₹796)</option>
                  <option value="Chirayu Master Checkup (109 Tests - ₹1,566)">Chirayu Master Checkup (109 Tests - ₹1,566)</option>
                  <option value="Blood Glucose Test (₹20)">Blood Glucose Test (₹20)</option>
                  <option value="Complete Blood Count CBC + ESR (₹160)">Complete Blood Count CBC + ESR (₹160)</option>
                  <option value="Lipid Profile (₹260)">Lipid Profile (₹260)</option>
                  <option value="Thyroid Profile TFT (₹190)">Thyroid Profile TFT (₹190)</option>
                  <option value="HbA1c Diabetes Test (₹260)">HbA1c Diabetes Test (₹260)</option>
                  <option value="Vitamin D 25-OH (₹660)">Vitamin D 25-OH (₹660)</option>
                  <option value="Vitamin B12 (₹440)">Vitamin B12 (₹440)</option>
                  <option value="Custom Blood Test / Doctor Prescription">Custom Blood Test / Doctor Prescription</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Preferred Centre / Locality:
                </label>
                <select 
                  className="form-input" 
                  value={topForm.location}
                  onChange={(e) => setTopForm({...topForm, location: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '0.8rem', width: '100%', fontSize: '0.92rem', fontWeight: 600 }}
                >
                  <option value="Any Hub (Home Collection / Nearest)">Any Hub (Home Collection / Nearest)</option>
                  {CENTRES.map(c => (
                    <option key={c.id} value={`${c.name} (${c.area})`}>{c.name} — {c.area}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a 
                  href={`https://wa.me/919805543143?text=Namaste%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20would%20like%20to%20book%20an%20appointment%20for%20${encodeURIComponent(topForm.package || 'Health Checkup')}%20at%20${encodeURIComponent(topForm.location || 'Bengaluru')}.%20Please%20confirm%20slots.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: '1 1 auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#25D366',
                    color: 'white',
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
                  </svg>
                  <span>Book via WhatsApp</span>
                </a>

                <a 
                  href="tel:+919805543143"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#0F172A',
                    color: 'white',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={18} />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Centres List Section */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        
        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              LOCATE YOUR NEAREST LAB
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
              Our Centres across Bangalore
            </h2>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={18} color="#059669" /> Mon - Sat: 07:00 AM to 08:00 PM | Sun: 07:00 AM to 02:00 PM
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {['All', 'South', 'West', 'Central', 'North'].map(reg => (
            <button
              key={reg}
              onClick={() => { setSelectedRegion(reg); setSelectedArea('All'); }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: selectedRegion === reg ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                background: selectedRegion === reg ? '#0284C7' : 'white',
                color: selectedRegion === reg ? 'white' : '#475569',
                cursor: 'pointer'
              }}
            >
              {reg === 'All' ? 'All Bengaluru Regions' : `${reg} Bengaluru`}
            </button>
          ))}
        </div>

        {/* Location Selector Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          paddingBottom: '1rem', 
          marginBottom: '2rem',
          scrollbarWidth: 'thin'
        }}>
          <button
            onClick={() => setSelectedArea('All')}
            style={{
              padding: '10px 18px',
              borderRadius: '99px',
              fontSize: '0.875rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              border: selectedArea === 'All' ? '1px solid #0284C7' : '1px solid #E2E8F0',
              background: selectedArea === 'All' ? '#0284C7' : 'white',
              color: selectedArea === 'All' ? 'white' : '#334155',
              cursor: 'pointer',
              boxShadow: selectedArea === 'All' ? '0 4px 14px rgba(2, 132, 199, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            All Centres ({filteredCentres.length})
          </button>
          {CENTRES.map(centre => (
            <button
              key={centre.id}
              onClick={() => setSelectedArea(centre.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '99px',
                fontSize: '0.875rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: selectedArea === centre.id ? '1px solid #0284C7' : '1px solid #E2E8F0',
                background: selectedArea === centre.id ? '#0284C7' : 'white',
                color: selectedArea === centre.id ? 'white' : '#334155',
                cursor: 'pointer',
                boxShadow: selectedArea === centre.id ? '0 4px 14px rgba(2, 132, 199, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              📍 {centre.area}
            </button>
          ))}
        </div>

        {/* Grid of Detailed Centre Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {filteredCentres.map(centre => (
            <div 
              key={centre.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                {/* Header with Status & Rating */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                      🟢 Open Today (7 AM - 8 PM)
                    </span>
                    {centre.region && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#EFF6FF', color: '#1D4ED8', padding: '4px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                        {centre.region} Bengaluru
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="#D97706" /> {centre.rating} ({centre.reviewCount} reviews)
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
                  {centre.name}
                </h3>

                {/* Detailed Information Blocks matching specs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                      Address
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#1E293B', lineHeight: 1.5, fontWeight: 500 }}>
                      {centre.address}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                      Contact Information
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>✉️ {centre.email}</span>
                      <span>📞 {centre.phone}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                      Opening Hour
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>Mon - Sat: 07:00 AM to 08:00 PM</span>
                      <span>Sunday: 07:00 AM to 02:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Home collection coverage area tags */}
                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '0.775rem', fontWeight: 800, color: '#0284C7', marginBottom: '4px' }}>
                    Free Home Collection Neighborhoods:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                    {centre.homeCollectionCoverage.join(' • ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9' }}>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(centre.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1rem', justifyContent: 'center', fontSize: '0.875rem', borderRadius: '10px' }}
                >
                  <Navigation size={16} color="#0284C7" /> Directions
                </a>
                <button 
                  onClick={openBookingWizard}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1rem', justifyContent: 'center', fontSize: '0.875rem', borderRadius: '10px' }}
                >
                  Book Test
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Direct WhatsApp Appointment Banner (Zero Forms) */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '8px' }}>
              DIRECT WHATSAPP DESK • ZERO ONLINE FORMS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              Need Help Booking Your Health Test?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '2rem' }}>
              Message our Bangalore clinical support team on WhatsApp. Share your prescription or test requirements to confirm a priority walk-in or doorstep collection in 10 minutes.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/919805543143?text=Namaste%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20would%20like%20to%20book%20a%20blood%20test%20or%20health%20checkup%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: 'white',
                  padding: '1rem 2.25rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
                </svg>
                <span>Chat &amp; Book via WhatsApp</span>
              </a>

              <a 
                href="tel:+919805543143"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  padding: '1rem 1.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.25)'
                }}
              >
                <Phone size={20} color="#38BDF8" />
                <span>Call Lab: +91 98055 43143</span>
              </a>
            </div>
          </div>
        </div>

        {/* NABL Guarantee Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #A7F3D0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <ShieldCheck size={28} color="#059669" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#065F46', margin: 0 }}>
            All our tests are conducted at NABL-accredited laboratories using fully automated systems to ensure accuracy and reliability.
          </p>
        </div>

      </div>
    </div>
  );
}
