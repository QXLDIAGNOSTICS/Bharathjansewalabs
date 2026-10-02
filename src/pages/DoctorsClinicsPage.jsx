import React, { useState } from 'react';
import { Stethoscope, ShieldCheck, FileText, Truck, Clock, CheckCircle2, Send } from 'lucide-react';

export default function DoctorsClinicsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '3rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Header Banner with Doctors Image */}
        <div style={{
          background: `linear-gradient(135deg, rgba(239, 68, 68, 0.92) 0%, rgba(220, 38, 38, 0.95) 100%), url('/images/banners/doctors.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: 'white',
          marginBottom: '3rem',
          boxShadow: '0 20px 50px rgba(239, 68, 68, 0.25)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, background: 'white', color: '#EF4444', padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            MEDICAL PROFESSIONAL PORTAL
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            Reliable Diagnostics for Your Patients
          </h1>
          <p style={{ color: '#FFE4E6', fontSize: '1.05rem', maxWidth: '640px' }}>
            Bharath Jan Sewa Labs provides general practitioners, clinical consultants, and nursing homes with high-precision NABL-accredited laboratory processing.
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ background: '#F0F9FF', color: '#0284C7', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Digital LIS Report Access</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
              Instant PDF report access on doctor portal, WhatsApp, and SMS as soon as test parameters are authorized by Pathologists.
            </p>
          </div>

          <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ background: '#CCFBF1', color: '#0D9488', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Truck size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Dedicated Sample Pickup</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
              Free daily courier sample pick-up for clinics and hospitals with cold-chain storage bags provided by BJSL.
            </p>
          </div>

          <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ background: '#FEF3C7', color: '#D97706', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Clock size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>STAT Emergency Processing</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
              Priority turnaround within 3 hours for critical parameters like Cardiac Enzymes, Trop-I, Electrolytes, and Dengue NS1.
            </p>
          </div>
        </div>

        {/* Doctor Registration Form */}
        <div style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Register Your Clinic / Practice
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Fill out the details below to request a B2B diagnostic partner account & sample collection kit.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Doctor Name & Degree *</label>
                  <input type="text" className="form-input" required placeholder="Dr. Rajesh V. Reddy, MD" />
                </div>

                <div className="form-group">
                  <label className="form-label">Clinic / Hospital Name *</label>
                  <input type="text" className="form-input" required placeholder="Reddy Healthcare Clinic" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input type="tel" className="form-input" required placeholder="+91 98765 43210" />
                </div>

                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <select className="form-select">
                    <option value="General Physician">General Physician / Internal Medicine</option>
                    <option value="Diabetologist">Diabetologist / Endocrinologist</option>
                    <option value="Gynecologist">Gynecologist & Obstetrician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Clinic Manager">Clinic / Nursing Home Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Clinic Address & Area</label>
                <input type="text" className="form-input" required placeholder="No. 14, Main Road, Jayanagar, Bangalore" />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem', width: '100%', justifyContent: 'center' }}>
                <Send size={18} /> Partner With BJSL Network
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <CheckCircle2 size={48} color="#059669" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Partnership Request Submitted!</h3>
              <p style={{ color: '#475569', marginTop: '0.5rem' }}>
                Our Medical Relationship Manager will contact your clinic today to deliver your sample collection kit & LIS credentials.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
