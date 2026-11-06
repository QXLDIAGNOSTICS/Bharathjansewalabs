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
    const pkgObj = HEALTH_PACKAGES.find(p => p.id === formData.package);
    const pkgName = pkgObj ? pkgObj.name : (formData.package || 'Health Checkup');
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0A🩺 *New Health Test Appointment Request:*%0A*Package/Test:* ${pkgName}%0A*Patient Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Location/Area:* ${formData.location || 'Bangalore'}%0A*Preferred Date:* ${formData.date || 'Earliest available'}%0A*Preferred Slot:* ${formData.time || 'Morning'}%0A%0APlease confirm my appointment.`;
    window.open(`https://wa.me/919805543143?text=${msg}`, '_blank');
    if (onBookSuccess) onBookSuccess(formData);
    setTimeout(() => {
      setSubmitted(false);
    }, 1200);
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
          {submitted ? 'Opening WhatsApp...' : 'Make Appointment (WhatsApp)'}
        </button>

        {/* Direct WhatsApp Instant Booking */}
        <a 
          href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20book%20a%20health%20test%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#25D366',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.98rem',
            padding: '0.85rem',
            borderRadius: '99px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            textAlign: 'center'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
          </svg>
          <span>Or Book Directly via WhatsApp</span>
        </a>

      </form>
    </div>
  );
}
