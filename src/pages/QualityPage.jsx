import React from 'react';
import { ShieldCheck, Award, CheckCircle, Clock, Thermometer, FileCheck, Phone, MessageSquare } from 'lucide-react';

export default function QualityPage() {
  return (
    <div style={{ padding: '3.5rem 0', minHeight: '85vh', backgroundColor: '#FAF9F8' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        
        {/* Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          <span className="badge-red-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
            <Award size={14} color="#2563EB" /> CLINICAL STANDARDS &amp; GOVERNANCE
          </span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Quality Framework &amp; Laboratory Standards
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.65 }}>
            Transparent disclosure of our testing protocols, specimen cold-chain logistics, and laboratory partnerships.
          </p>
          <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.65, marginTop: '1rem', fontWeight: 600 }}>
            Bharath Jan Sewa Labs collaborates with NABL-accredited medical testing laboratories to provide affordable, accessible and quality-focused diagnostic services. Samples are collected through our network and processed at collaborating laboratories. Accredited testing is undertaken in accordance with the respective laboratory’s approved scope of accreditation under ISO 15189.
          </p>
        </div>

        {/* 4 Pillars of Laboratory Quality */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Partner Lab Testing
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Samples are processed at collaborating NABL-accredited medical testing laboratories. Accreditation covers only the tests within each performing laboratory’s approved ISO 15189 scope; performing-laboratory details are available on request.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Thermometer size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Cold-Chain Specimen Control
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Blood samples are drawn into barcode-tagged vacuum tubes and transferred in insulated temperature-monitored gel carrier boxes to prevent cellular degradation.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Daily 3-Level Calibration
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Automated biochemistry and immunoassay analyzers undergo rigorous daily 3-level quality controls (Internal QC) and participate in External Quality Assurance Schemes (EQAS).
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F8FAFC', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Pathologist Authorization
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Every diagnostic report is systematically reviewed and digitally authenticated by certified MD Pathologists prior to encrypted patient release.
            </p>
          </div>

        </div>

        {/* Technical Regulatory Transparency Box */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '20px',
          padding: '2.25rem',
          marginBottom: '3rem',
          boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
            Collection Hub &amp; Laboratory Disclosure
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            In compliance with national clinical establishment guidelines and truthful advertising ethics, Bharath Jan Sewa Labs maintains a clear distinction between its neighbourhood phlebotomy desks and performing laboratories:
          </p>
          <ul style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 1.5rem' }}>
            <li>
              <strong>Collection Centres:</strong> Our 10 centres across Bengaluru (Sanjaynagar, Peenya, Kengeri, Ittamadu, Subramanyapura, Jaraganahalli, RR Nagar, Basaveshwaranagar, Vijayanagar, KR Market) are patient service hubs equipped for hygienic phlebotomy specimen collection.
            </li>
            <li>
              <strong>Testing Laboratories:</strong> Investigations are performed at collaborating NABL-accredited medical testing laboratories. Bharath Jan Sewa Labs and its collection centres are not themselves NABL accredited, and not every test is necessarily within a performing laboratory’s accredited scope. Details of the performing laboratory and its accreditation scope for any test are available on request.
            </li>
            <li>
              <strong>ICMR NEDL Alignment:</strong> Where indicated, our test profiles reference recommendations of the ICMR National Essential Diagnostics List (2025 Second Edition) as an educational public health benchmark. The NEDL is a national guidance list, not an accreditation or certification programme.
            </li>
          </ul>

          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="https://wa.me/919805543143?text=Namaste%20BJSL,%20I%20have%20a%20query%20regarding%20your%20laboratory%20quality%20standards%20and%20partner%20laboratories."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0F172A',
                color: 'white',
                padding: '11px 20px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <MessageSquare size={16} />
              <span>Ask Quality Desk on WhatsApp</span>
            </a>

            <a 
              href="tel:+919805543143"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0F172A',
                padding: '11px 20px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid #CBD5E1'
              }}
            >
              <Phone size={16} />
              <span>Contact Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

