import React, { useState } from 'react';
import { FRANCHISE_INFO, HEALTH_PACKAGES } from '../data/mockData';
import { CheckCircle2, Building2, TrendingUp, ShieldCheck, ArrowRight, MapPin, Phone, Mail, User, Send } from 'lucide-react';

export default function FranchisePage({ openFranchiseModal, onBookTest }) {
  // Franchise Enquiry Form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryCity, setEnquiryCity] = useState('');
  const [enquiryLocation, setEnquiryLocation] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryAgree, setEnquiryAgree] = useState(true);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Form State for "Book Your Health Test" Banner at bottom
  const [formPackage, setFormPackage] = useState('Chirayu Full Body Check (PRIME)');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState('Sanjaynagar');
  const [formDate, setFormDate] = useState('2026-09-28');
  const [formTime, setFormTime] = useState('08:00 AM');
  const [formAgree, setFormAgree] = useState(true);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert('Please enter your Name and Phone Number.');
      return;
    }
    const selectedPkg = HEALTH_PACKAGES.find(p => p.name.includes(formPackage)) || HEALTH_PACKAGES[0];
    onBookTest(selectedPkg);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#" style={{ color: '#EF4444' }}>Home</a>
          <span>›</span>
          <span style={{ color: '#0F172A' }}>Why Franchise</span>
        </div>

        {/* Hero Header Banner */}
        <div style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.95) 100%), url('/images/banners/lab-sevamitra.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, background: '#EF4444', color: 'white', padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            DIAGNOSTIC EQUITY MOVEMENT
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginTop: '0.75rem', marginBottom: '1rem', lineHeight: 1.15 }}>
            Why Franchise with Bharath Jan Sewa Labs (BJSL)?
          </h1>
          <p style={{ color: '#E2E8F0', fontSize: '1.1rem', maxWidth: '780px', lineHeight: 1.65 }}>
            Join the movement for Diagnostic Equity in India. BJSL is transforming access to diagnostics by bringing affordable, accurate, and dignified testing to underserved communities across India. As a franchise partner, you become part of a national mission – where impact and opportunity grow together.
          </p>
        </div>

        {/* Section 1: A High-Impact Model with Low Investment */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '3rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem' }}>
            A High-Impact Model with Low Investment
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
            BJSL uses small, community-based collection centers and mobile vans to deliver diagnostics at the last mile. This means low setup cost, quick activation, and fast scalability across rural and urban clusters.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', padding: '1.75rem', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.85rem', color: '#991B1B', fontWeight: 800, textTransform: 'uppercase' }}>REQUIRED INVESTMENT</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#EF4444', margin: '4px 0' }}>{FRANCHISE_INFO.investmentRange}</div>
              <div style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 800 }}>Low Capital Risk • Central NABL Lab</div>
            </div>

            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '1.75rem', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.85rem', color: '#0369A1', fontWeight: 800, textTransform: 'uppercase' }}>SPACE REQUIRED</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0284C7', margin: '4px 0' }}>{FRANCHISE_INFO.spaceRequired}</div>
              <div style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 800 }}>Ground Floor Commercial Space</div>
            </div>

            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1.75rem', borderRadius: '18px' }}>
              <div style={{ fontSize: '0.85rem', color: '#065F46', fontWeight: 800, textTransform: 'uppercase' }}>ESTIMATED PAYBACK</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', margin: '4px 0' }}>{FRANCHISE_INFO.paybackPeriod}</div>
              <div style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 800 }}>High Recurring Monthly Cash Flow</div>
            </div>
          </div>
        </div>

        {/* Section 2: What Makes BJSL a Powerful Franchise Opportunity? */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '3rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginBottom: '1.5rem' }}>
            What Makes BJSL a Powerful Franchise Opportunity?
          </h2>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#EF4444', marginBottom: '1.5rem' }}>
            BJSL Model at a Glance
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Local Collection Points', desc: 'Easy neighborhood access for fast walk-in blood sampling.' },
              { title: 'Mobile Vans Outreach', desc: 'Doorstep testing in remote zones and doorstep phlebotomy.' },
              { title: 'NABL Certified Reference Lab', desc: 'Centralized high-precision automated laboratory processing.' },
              { title: '50–70% Lower Pricing', desc: 'Unbeatable affordable rates passing volume scale to patients.' },
              { title: 'App-Based Booking & Tracking', desc: 'Cloud LIS software for automated WhatsApp report dispatch.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#F8FAFC', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={24} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>{item.title}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Be the Spark for Better Health */}
        <div style={{ background: '#FFF5F5', borderRadius: '24px', padding: '3rem', border: '1px solid #FECDD3', marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem' }}>
            Be the Spark for Better Health
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '780px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
            Become a BJSL franchisee and help deliver life-saving diagnostics to the communities that need them most. Whether you are an entrepreneur, CSR leader, philanthropist, or healthcare enthusiast—your partnership can change lives.
          </p>
        </div>

        {/* FORM 1: Bharath Jan Sewa Labs Franchise Enquiry Form */}
        <div style={{ background: '#FFFFFF', borderRadius: '28px', padding: '3.5rem 3rem', border: '1px solid #E2E8F0', boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)', marginBottom: '4rem', maxWidth: '840px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem', textAlign: 'center' }}>
            Bharath Jan Sewa Labs
          </h2>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', marginBottom: '2rem', textAlign: 'center' }}>
            Franchise Enquiry Form
          </h3>

          {!enquirySubmitted ? (
            <form onSubmit={handleEnquirySubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Full Name*</label>
                <input type="text" required placeholder="Afi Kumar" value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Phone Number*</label>
                <input type="tel" required placeholder="9805543143" value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Email Address*</label>
                <input type="email" required placeholder="contact@example.com" value={enquiryEmail} onChange={(e) => setEnquiryEmail(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>City*</label>
                <input type="text" required placeholder="Bangalore" value={enquiryCity} onChange={(e) => setEnquiryCity(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A' }} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Preferred Location for Franchise*</label>
                <input type="text" required placeholder="e.g. Sanjaynagar / Hebbal / Peenya" value={enquiryLocation} onChange={(e) => setEnquiryLocation(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A' }} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Message / Your Query</label>
                <textarea rows="3" placeholder="Tell us about your proposed commercial space or business experience..." value={enquiryMessage} onChange={(e) => setEnquiryMessage(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '0.95rem', color: '#0F172A', fontFamily: 'inherit' }} />
              </div>

              <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={enquiryAgree} onChange={(e) => setEnquiryAgree(e.target.checked)} style={{ accentColor: '#EF4444', width: '16px', height: '16px' }} />
                  I agree to the Terms & Conditions
                </label>
                <br />
                <button type="submit" className="btn-red-solid" style={{ padding: '1rem 3rem', fontSize: '1rem' }}>
                  <Send size={18} /> Submit Franchise Enquiry
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem' }}>
              <CheckCircle2 size={54} color="#059669" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A' }}>Enquiry Submitted Successfully!</h4>
              <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '1rem' }}>
                Thank you for reaching out. Our Franchise Expansion Director will contact you within 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* FORM 2: BOOK YOUR HEALTH TEST FORM BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          boxShadow: '0 25px 60px rgba(239, 68, 68, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
            Book Your Health Test
          </h2>

          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '960px', margin: '0 auto' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Select Package*</label>
              <select value={formPackage} onChange={(e) => setFormPackage(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                {HEALTH_PACKAGES.map(p => (
                  <option key={p.id} value={p.name}>{p.name} - ₹{p.price}</option>
                ))}
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

            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
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
  );
}
