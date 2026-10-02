import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Gift, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  Lock, 
  Clock, 
  Truck,
  ArrowRight
} from 'lucide-react';

export default function LegalPage({ activeTab = 'promo', setActiveTab, setCurrentTab, openBookingWizard }) {
  const [currentLegalTab, setCurrentLegalTab] = useState(activeTab);

  const tabs = [
    { id: 'promo', label: 'Promo Terms & Conditions', icon: Gift, color: '#EF4444' },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText, color: '#0284C7' },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck, color: '#059669' },
    { id: 'safety', label: 'Patient Safety & Fasting', icon: Lock, color: '#7C3AED' }
  ];

  return (
    <div style={{ padding: '2.5rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }}
            style={{ border: 'none', background: 'none', color: '#EF4444', fontWeight: 800, cursor: 'pointer', padding: 0 }}
          >
            Home
          </button>
          <span>›</span>
          <span style={{ color: '#0F172A' }}>Legal & Patient Compliance</span>
        </div>

        {/* HERO BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
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
              <ShieldCheck size={16} color="#EF4444" /> BJSL PATIENT COMPLIANCE & GOVERNANCE
            </span>

            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
              Legal Terms, Policies & Patient Guidelines
            </h1>

            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Bharath Jan Sewa Labs (BJSL) operates under strict NABL diagnostic quality protocols, patient data protection laws, and transparent pricing policies.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 700 }}>
              <span>📅 Effective Date: October 2, 2026</span>
              <span>•</span>
              <span>📍 Applicable: All Bengaluru Hubs & Doorstep Phlebotomy</span>
            </div>
          </div>
        </div>

        {/* TAB SELECTOR STRIP */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '0.75rem',
          marginBottom: '2.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {tabs.map(tab => {
            const TabIcon = tab.icon;
            const isSelected = currentLegalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentLegalTab(tab.id)}
                style={{
                  flex: '1 1 200px',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: isSelected ? '#FFF1F2' : 'transparent',
                  color: isSelected ? '#EF4444' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isSelected ? '1px solid #FECDD3' : '1px solid transparent'
                }}
              >
                <TabIcon size={18} color={isSelected ? '#EF4444' : '#64748B'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT CARDS */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '3rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 40px rgba(15, 23, 42, 0.04)',
          marginBottom: '3rem'
        }}>

          {/* TAB 1: PROMO TERMS & CONDITIONS */}
          {currentLegalTab === 'promo' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gift size={26} color="#EF4444" />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Promo Terms & Conditions
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>
                    Special Offers, Package Discounts & Home Collection Campaign Rules
                  </div>
                </div>
              </div>

              <div style={{ background: '#FFF1F2', padding: '1.5rem', borderRadius: '18px', border: '1px solid #FECDD3', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 900, color: '#991B1B', fontSize: '1.05rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gift size={18} /> Pre-Applied Promotional Pricing Standard
                </div>
                <p style={{ color: '#7F1D1D', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                  Special promotional pricing (50%–70% lower than market rates) applies automatically to all Chirayu Full Body Checkup packages booked online at <strong>bharathjansewalabs.com</strong> or at any BJSL Bengaluru collection hub.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.975rem', color: '#334155', lineHeight: 1.7 }}>
                
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    1. Direct-to-Consumer Discount Rates
                  </h3>
                  <p>
                    All displayed prices (e.g., <strong>Chirayu PRIME at ₹796</strong> instead of ₹2,388, <strong>Chirayu MASTER at ₹1,566</strong> instead of ₹5,698, and <strong>ALL IN ONE at ₹6,366</strong> instead of ₹16,630) reflect our direct-to-consumer promotional rates without hidden surcharges or registration fees.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    2. Free Doorstep Sample Collection Eligibility
                  </h3>
                  <p>
                    Free doorstep phlebotomy sample collection applies across covered Bengaluru neighborhoods (Sanjaynagar, Peenya 2nd Stage, Kengeri, Banashankari, Subramanyapura, Jaraganahalli, etc.) on order values of <strong>₹499 and above</strong>. For test bookings below ₹499, a nominal ₹50 convenience fee applies.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    3. Offer Validity & Combination Rules
                  </h3>
                  <p>
                    Promotional package pricing cannot be combined with bulk corporate camp vouchers unless authorized in writing by BJSL central administration. Promotional offers are valid through October 2026.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    4. Cancellation & Refund Guarantee
                  </h3>
                  <p>
                    Bookings canceled at least 2 hours prior to scheduled phlebotomist dispatch receive a 100% instant refund with zero cancellation charges.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {currentLegalTab === 'terms' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={26} color="#0284C7" />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Terms & Conditions of Service
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>
                    Standard Operating Terms for BJSL Diagnostic Services & Collection Hubs
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.975rem', color: '#334155', lineHeight: 1.7 }}>
                
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    1. Diagnostic Scope & Medical Disclaimer
                  </h3>
                  <p>
                    Bharath Jan Sewa Labs provides specimen collection and diagnostic testing processed at NABL-accredited partner laboratories. Laboratory test reports are designed to assist registered medical practitioners in clinical evaluation and do not substitute for direct medical diagnosis or emergency advice.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    2. Patient Preparation Protocols
                  </h3>
                  <p>
                    Patients are required to adhere to test preparation instructions provided during booking (such as 10–12 hours overnight fasting for Diabetic and Lipid profiles). BJSL is not responsible for biological variance caused by non-compliance with fasting protocols.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    3. Report Turnaround Time (TAT)
                  </h3>
                  <p>
                    Routine blood tests (CBC, HbA1c, Thyroid, Lipid, KFT, LFT) are processed on the <strong>same day within 4 to 8 hours</strong>. Specialized panels (Allergy screenings or molecular testing) may take up to 48–72 hours for thorough incubation and secondary pathologist verification.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {currentLegalTab === 'privacy' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={26} color="#059669" />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Patient Privacy & Data Protection Policy
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>
                    TLS 1.3 Encrypted Patient Report Storage & Medical Confidentiality Guarantee
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.975rem', color: '#334155', lineHeight: 1.7 }}>
                
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    1. Data Collection & Confidentiality
                  </h3>
                  <p>
                    We collect necessary patient details (name, age, gender, contact number, delivery address, and referring physician) solely to facilitate sample processing and report dispatch. We strictly enforce a zero data-selling policy — your health records are never shared with commercial advertising networks.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                    2. Barcode Security & Encrypted Delivery
                  </h3>
                  <p>
                    All specimens are barcoded at the point of collection to eliminate manual mix-ups. Test reports are encrypted using 256-bit TLS 1.3 standards and delivered directly to your registered WhatsApp number and secured Patient Portal.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: PATIENT SAFETY & FASTING */}
          {currentLegalTab === 'safety' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={26} color="#7C3AED" />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    Patient Safety & Fasting Guidelines
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>
                    Single-Use Sterile Vacutainers & Temperature-Controlled Transit
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.975rem', color: '#334155', lineHeight: 1.7 }}>
                
                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem' }}>
                    📋 Mandatory Fasting Rules Table
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #CBD5E1', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0', color: '#0F172A' }}>Test Category</th>
                        <th style={{ padding: '8px 0', color: '#0F172A' }}>Fasting Required?</th>
                        <th style={{ padding: '8px 0', color: '#0F172A' }}>Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>Lipid Profile / FBS</td>
                        <td style={{ padding: '8px 0', color: '#EF4444', fontWeight: 800 }}>YES (10-12 Hours)</td>
                        <td style={{ padding: '8px 0' }}>Water permitted. No food, tea, coffee or smoking.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>HbA1c Diabetes</td>
                        <td style={{ padding: '8px 0', color: '#059669', fontWeight: 800 }}>NO FASTING</td>
                        <td style={{ padding: '8px 0' }}>Can be sampled at any time of day.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>CBC Blood Count</td>
                        <td style={{ padding: '8px 0', color: '#059669', fontWeight: 800 }}>NO FASTING</td>
                        <td style={{ padding: '8px 0' }}>Can be sampled at any time of day.</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', fontWeight: 700 }}>Thyroid Profile (T3, T4, TSH)</td>
                        <td style={{ padding: '8px 0', color: '#0284C7', fontWeight: 800 }}>RECOMMENDED</td>
                        <td style={{ padding: '8px 0' }}>Morning sample prior to daily thyroid medication.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* CONTACT & HELP STRIP */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '2rem 2.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', marginBottom: '4px' }}>
              Have questions about our legal policies or promo terms?
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
              Our patient compliance desk is available Monday through Sunday.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="tel:+919805543143"
              className="btn-red-solid" 
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              <Phone size={16} /> Call +91 98055 43143
            </a>
            <button 
              onClick={openBookingWizard}
              className="btn-red-outline" 
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            >
              Book Test Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
