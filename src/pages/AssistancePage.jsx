import React from 'react';
import { Heart, ShieldCheck, CheckCircle2, MessageSquare, Phone, Clock, FileText, ArrowRight } from 'lucide-react';

export default function AssistancePage({ openBookingWizard }) {
  return (
    <div style={{ padding: '3.5rem 0', minHeight: '85vh', backgroundColor: '#FAF9F8' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        
        {/* Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          <span className="badge-red-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
            <Heart size={14} color="#16A34A" /> COMPASSIONATE DIAGNOSTIC CARE
          </span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Jan Sewa Diagnostic Assistance Programme
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.65 }}>
            We believe no patient or family in Bengaluru should ever delay a medically appropriate essential blood investigation due to financial hardship.
          </p>
        </div>

        {/* Core Guarantee Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem 2.25rem',
          boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
            Our Assistance Commitment
          </h2>
          <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '850px', marginBottom: '1.75rem' }}>
            If cost is preventing you from obtaining an essential test prescribed by your doctor, contact Bharath Jan Sewa Labs to request our lowest available approved price and enquire about current diagnostic fee subsidies. Our mission is to make diagnostic dignity accessible to all.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20would%20like%20to%20enquire%20about%20the%20Jan%20Sewa%20Diagnostic%20Assistance%20programme."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'white',
                padding: '13px 22px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(37, 211, 102, 0.4)'
              }}
            >
              <MessageSquare size={18} fill="white" />
              <span>Enquire via WhatsApp</span>
            </a>

            <a 
              href="tel:+919805543143"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                padding: '13px 22px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Phone size={18} />
              <span>Call Helpline: +91 98055 43143</span>
            </a>
          </div>
        </div>

        {/* 3 Step Assistance Process */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', textAlign: 'center' }}>
          How the Assistance Request Works
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', marginBottom: '1rem' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Share Doctor's Prescription
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Send a clear photo or copy of your doctor's test recommendation on WhatsApp to +91 98055 43143.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', marginBottom: '1rem' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Transparent Fee Quotation
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Our clinical desk immediately reviews your required tests and quotes the subsidized rate with zero hidden charges.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', marginBottom: '1rem' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Confidential Phlebotomy
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Visit any of our 10 Bengaluru collection hubs with zero walk-in collection fee, or request a doorstep phlebotomist visit.
            </p>
          </div>
        </div>

        {/* Clinical Transparency Note */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '1.5rem',
          fontSize: '0.85rem',
          color: '#64748B',
          lineHeight: 1.6
        }}>
          <strong style={{ color: '#334155' }}>Governance &amp; Privacy Notice: </strong>
          All patient assistance requests are handled under strict medical confidentiality. Aggregated program numbers are monitored internally for community benefit; no personal health records, diagnoses, or patient identifiers are ever disclosed or shared with commercial advertising networks.
        </div>

      </div>
    </div>
  );
}

