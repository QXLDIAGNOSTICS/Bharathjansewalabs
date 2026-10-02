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
    setTimeout(() => {
      openBookingWizard(topForm.package ? HEALTH_PACKAGES.find(p => p.id === topForm.package) : null);
      setSubmitted(false);
    }, 1000);
  };

  const handleBottomFormSubmit = (e) => {
    e.preventDefault();
    if (!bottomForm.agreed) {
      alert('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      openBookingWizard(bottomForm.package ? HEALTH_PACKAGES.find(p => p.id === bottomForm.package) : null);
      setSubmitted(false);
    }, 1000);
  };

  const filteredCentres = selectedArea === 'All' 
    ? CENTRES 
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
              <MapPin size={16} /> 10+ NABL Accredited Centres Across Bangalore
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>
              Our Diagnostic Centres & Collection Hubs
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94A3B8' }}>
              Walk in to any nearby BJSL collection hub or book free home sample collection across Sanjaynagar, Peenya, Kengeri, Banashankari, and all Bangalore zones.
            </p>
          </div>

          {/* Quick Appointment Booking Card at Top */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            color: '#0F172A',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <CheckCircle2 size={22} color="#059669" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                ✅ Select Your Location & Choose Your Health Package
              </h3>
            </div>

            <form onSubmit={handleTopFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Select a Package*
                </label>
                <select 
                  className="form-input" 
                  required
                  value={topForm.package}
                  onChange={(e) => setTopForm({...topForm, package: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                >
                  <option value="">-- Choose Health Package --</option>
                  {HEALTH_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>{pkg.name} (₹{pkg.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Full Name*
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your full name" 
                  required 
                  value={topForm.name}
                  onChange={(e) => setTopForm({...topForm, name: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Email Address*
                </label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@example.com" 
                  required 
                  value={topForm.email}
                  onChange={(e) => setTopForm({...topForm, email: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Phone No*
                </label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+91 Mobile number" 
                  required 
                  value={topForm.phone}
                  onChange={(e) => setTopForm({...topForm, phone: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Select Location*
                </label>
                <select 
                  className="form-input" 
                  required
                  value={topForm.location}
                  onChange={(e) => setTopForm({...topForm, location: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                >
                  <option value="">-- Select BJSL Hub --</option>
                  {CENTRES.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.area})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Appointment Date*
                </label>
                <input 
                  type="date" 
                  className="form-input" 
                  required 
                  value={topForm.date}
                  onChange={(e) => setTopForm({...topForm, date: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Appointment Time*
                </label>
                <select 
                  className="form-input" 
                  required
                  value={topForm.time}
                  onChange={(e) => setTopForm({...topForm, time: e.target.value})}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.65rem' }}
                >
                  <option value="">Select Slot</option>
                  <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM</option>
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    required 
                    checked={topForm.agreed}
                    onChange={(e) => setTopForm({...topForm, agreed: e.target.checked})}
                    style={{ width: '16px', height: '16px', accentColor: '#0284C7' }}
                  />
                  I agree to the Terms of Use and Privacy Policy
                </label>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', borderRadius: '12px' }}
                >
                  {submitted ? 'Processing Booking...' : 'Make Appointment'}
                </button>
              </div>
            </form>
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
            All Locations (10)
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                    🟢 Open Today (7 AM - 8 PM)
                  </span>
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

        {/* Bottom Form Section: "Book Your Health Test" */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              QUICK ONLINE REGISTRATION
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'white', marginTop: '6px', marginBottom: '0.5rem' }}>
              Book Your Health Test
            </h2>
            <p style={{ fontSize: '1rem', color: '#94A3B8' }}>
              Schedule doorstep sample collection or a priority walk-in appointment at your nearest Bharath Jan Sewa Labs centre.
            </p>
          </div>

          <form onSubmit={handleBottomFormSubmit} style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Select Package*
              </label>
              <select 
                className="form-input" 
                required
                value={bottomForm.package}
                onChange={(e) => setBottomForm({...bottomForm, package: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              >
                <option value="">-- Choose Health Package --</option>
                {HEALTH_PACKAGES.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name} (₹{pkg.price})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Full Name*
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter your name" 
                required 
                value={bottomForm.name}
                onChange={(e) => setBottomForm({...bottomForm, name: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Email Address*
              </label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@example.com" 
                required 
                value={bottomForm.email}
                onChange={(e) => setBottomForm({...bottomForm, email: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Phone No*
              </label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="+91 Mobile number" 
                required 
                value={bottomForm.phone}
                onChange={(e) => setBottomForm({...bottomForm, phone: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Select Location*
              </label>
              <select 
                className="form-input" 
                required
                value={bottomForm.location}
                onChange={(e) => setBottomForm({...bottomForm, location: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              >
                <option value="">-- Select Location --</option>
                {CENTRES.map(c => (
                  <option key={c.id} value={c.name}>{c.name} ({c.area})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Appointment Date*
              </label>
              <input 
                type="date" 
                className="form-input" 
                required 
                value={bottomForm.date}
                onChange={(e) => setBottomForm({...bottomForm, date: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Appointment Time*
              </label>
              <select 
                className="form-input" 
                required
                value={bottomForm.time}
                onChange={(e) => setBottomForm({...bottomForm, time: e.target.value})}
                style={{ background: '#1E293B', border: '1px solid #475569', color: 'white', borderRadius: '12px', padding: '0.75rem' }}
              >
                <option value="">Select Slot</option>
                <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM</option>
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', marginTop: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#CBD5E1', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  required 
                  checked={bottomForm.agreed}
                  onChange={(e) => setBottomForm({...bottomForm, agreed: e.target.checked})}
                  style={{ width: '18px', height: '18px', accentColor: '#38BDF8' }}
                />
                I agree to the Terms of Use and Privacy Policy
              </label>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '0.85rem 3rem', fontSize: '1.05rem', borderRadius: '14px', background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}
              >
                {submitted ? 'Submitting Appointment...' : 'Make Appointment'}
              </button>
            </div>
          </form>
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
