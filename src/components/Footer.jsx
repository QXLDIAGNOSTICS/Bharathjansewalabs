import React from 'react';
import { MapPin, Phone, Mail, ChevronUp, MessageSquare, ShieldCheck, Clock, Calendar } from 'lucide-react';

export default function Footer({ setCurrentTab, openLegal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #090D16 100%)', 
      color: '#94A3B8', 
      paddingTop: '4.5rem', 
      paddingBottom: '2.5rem', 
      borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif", 
      position: 'relative' 
    }}>
      
      {/* Top Ambient Glow Accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '1000px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.6) 50%, transparent 100%)'
      }} />

      <div className="container">
        
        {/* Main 4-Column Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          
          {/* Column 1: Brand Info & NABL Quality */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '10px 16px',
              borderRadius: '16px',
              display: 'inline-block',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
              <img src="/logo.webp" alt="Bharath Jan Sewa Labs" style={{ height: '48px', objectFit: 'contain', display: 'block' }} />
            </div>

            <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: '#CBD5E1', marginBottom: '1.5rem' }}>
              All our tests are conducted at <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>NABL-accredited laboratories</strong> using fully automated systems to ensure 100% accuracy and reliability.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.75rem', background: 'rgba(255,255,255,0.05)', padding: '8px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content' }}>
              <ShieldCheck size={18} color="#10B981" />
              <span style={{ fontSize: '0.825rem', color: '#E2E8F0', fontWeight: 700 }}>NABL Certified Quality Standards</span>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Facebook */}
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="X" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Our Locations */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="#EF4444" /> Our Locations
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Sanjaynagar',
                'Ittamadu',
                'Peenya',
                'Subramanyapura',
                'BDA Complex Kengeri',
                'Jaraganahalli'
              ].map(loc => (
                <li key={loc} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.925rem', color: '#CBD5E1', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                  <span 
                    onClick={() => setCurrentTab && setCurrentTab('centres')} 
                    style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}
                  >
                    {loc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="#EF4444" /> Opening Hours
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { day: 'Monday', time: '7 am To 8 pm' },
                { day: 'Tuesday', time: '7 am To 8 pm' },
                { day: 'Wednesday', time: '7 am To 8 pm' },
                { day: 'Thursday', time: '7 am To 8 pm' },
                { day: 'Friday', time: '7 am To 8 pm' },
                { day: 'Saturday', time: '7 am To 8 pm' },
                { day: 'Sunday', time: '7 am To 2 pm', highlight: true }
              ].map(item => (
                <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', paddingBottom: '6px', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ color: '#94A3B8', fontWeight: 600 }}>{item.day}</span>
                  <span style={{ 
                    fontWeight: 700, 
                    color: item.highlight ? '#F87171' : '#E2E8F0',
                    background: item.highlight ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                    padding: item.highlight ? '2px 8px' : '0',
                    borderRadius: item.highlight ? '6px' : '0'
                  }}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Cards & Quick Actions */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={20} color="#EF4444" /> Get In Touch
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Call Us Card */}
              <a 
                href="tel:+919805543143" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Helpline</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>+91 98055 43143</div>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/919805543143?text=Hi%20BJSL,%20I%20want%20to%20book%20a%20health%20test" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'; e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp Chat</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>+91 98055 43143</div>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:contact@bharathjansewalabs.com" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Support</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>contact@bharathjansewalabs.com</div>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          fontSize: '0.875rem'
        }}>
          <div>
            Copyright © Bharath Jan Sewa Labs. All Rights Reserved | <strong style={{ color: '#E2E8F0' }}>Powered by DC Studio</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); openLegal && openLegal('privacy'); }} style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openLegal && openLegal('terms'); }} style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#94A3B8'}>Terms & Conditions</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openLegal && openLegal('promo'); }} style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.8rem' }}>*Promo T&Cs Apply</a>
          </div>

          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.borderColor = '#EF4444'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}
            title="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        </div>

      </div>
    </footer>
  );
}

