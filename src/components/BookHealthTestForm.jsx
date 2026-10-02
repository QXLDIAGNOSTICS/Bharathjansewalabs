import React, { useState } from 'react';
import { ChevronDown, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { HEALTH_PACKAGES, CENTRES } from '../data/mockData';

export default function BookHealthTestForm({ onBookSuccess }) {
  const [formData, setFormData] = useState({
    package: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    agreed: true
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert(`Appointment Booked Successfully for ${formData.name || 'Patient'}! Our team will call you back shortly.`);
      setSubmitted(false);
      if (onBookSuccess) onBookSuccess(formData);
    }, 1000);
  };

  const inputPillStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.28)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1.5px solid rgba(255, 255, 255, 0.55)',
    borderRadius: '99px',
    padding: '0.85rem 1.4rem',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 600,
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    appearance: 'none',
    WebkitAppearance: 'none'
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, #EF4444 0%, #DC2626 100%)',
      borderRadius: '28px',
      padding: '2.5rem 1.75rem',
      color: 'white',
      boxShadow: '0 20px 50px rgba(239, 68, 68, 0.35)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Heading matching Screenshot 1 */}
      <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'white', marginBottom: '1.75rem', textAlign: 'left', letterSpacing: '-0.02em' }}>
        Book Your Health Test
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        
        {/* 1. Select Package */}
        <div style={{ position: 'relative' }}>
          <select 
            required 
            style={inputPillStyle}
            value={formData.package}
            onChange={(e) => setFormData({...formData, package: e.target.value})}
          >
            <option value="" style={{ color: '#0F172A', background: 'white' }}>Select Package*</option>
            {HEALTH_PACKAGES.map(pkg => (
              <option key={pkg.id} value={pkg.id} style={{ color: '#0F172A', background: 'white' }}>
                {pkg.name} (₹{pkg.price})
              </option>
            ))}
          </select>
          <ChevronDown size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>

        {/* 2. Full Name */}
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Full Name*" 
            required 
            style={inputPillStyle}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <User size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.9 }} />
        </div>

        {/* 3. Email Address */}
        <div style={{ position: 'relative' }}>
          <input 
            type="email" 
            placeholder="Email Address*" 
            required 
            style={inputPillStyle}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Mail size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.9 }} />
        </div>

        {/* 4. Phone No */}
        <div style={{ position: 'relative' }}>
          <input 
            type="tel" 
            placeholder="Phone No*" 
            required 
            style={inputPillStyle}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <Phone size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.9 }} />
        </div>

        {/* 5. Select Location */}
        <div style={{ position: 'relative' }}>
          <select 
            required 
            style={inputPillStyle}
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          >
            <option value="" style={{ color: '#0F172A', background: 'white' }}>Select Location*</option>
            {CENTRES.map(c => (
              <option key={c.id} value={c.name} style={{ color: '#0F172A', background: 'white' }}>
                {c.name} ({c.area})
              </option>
            ))}
          </select>
          <MapPin size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.9 }} />
        </div>

        {/* 6. Date */}
        <div style={{ position: 'relative' }}>
          <input 
            type="date" 
            required 
            style={inputPillStyle}
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
          <Calendar size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.9 }} />
        </div>

        {/* 7. Appointment Time */}
        <div style={{ position: 'relative' }}>
          <select 
            required 
            style={inputPillStyle}
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          >
            <option value="" style={{ color: '#0F172A', background: 'white' }}>Appointment Time*</option>
            <option value="07:00 AM - 09:00 AM" style={{ color: '#0F172A', background: 'white' }}>07:00 AM - 09:00 AM</option>
            <option value="09:00 AM - 11:00 AM" style={{ color: '#0F172A', background: 'white' }}>09:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 01:00 PM" style={{ color: '#0F172A', background: 'white' }}>11:00 AM - 01:00 PM</option>
            <option value="04:00 PM - 06:00 PM" style={{ color: '#0F172A', background: 'white' }}>04:00 PM - 06:00 PM</option>
            <option value="06:00 PM - 08:00 PM" style={{ color: '#0F172A', background: 'white' }}>06:00 PM - 08:00 PM</option>
          </select>
          <ChevronDown size={18} color="white" style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>

        {/* Checkbox matching Screenshot 1 */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'white', cursor: 'pointer', marginTop: '0.5rem' }}>
          <input 
            type="checkbox" 
            required 
            checked={formData.agreed}
            onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
            style={{ width: '18px', height: '18px', accentColor: 'white' }}
          />
          <span>I agree to the Terms of Use and Privacy Policy</span>
        </label>

        {/* White Solid Pill Button matching Screenshot 1 */}
        <button 
          type="submit"
          style={{
            background: 'white',
            color: '#0F172A',
            fontWeight: 900,
            fontSize: '1.05rem',
            padding: '0.9rem',
            borderRadius: '99px',
            border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            marginTop: '0.75rem',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
        >
          {submitted ? 'Processing...' : 'Make Appointment'}
        </button>

      </form>
    </div>
  );
}
