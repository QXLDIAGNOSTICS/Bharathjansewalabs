import React, { useState } from 'react';
import { X, Droplet, Clock, ShieldCheck, MapPin, CheckCircle2, HelpCircle, Code } from 'lucide-react';

export default function TestDetailModal({ item, onClose, onBook }) {
  const [showSchema, setShowSchema] = useState(false);

  if (!item) return null;

  const isPackage = item.includedCategories !== undefined;

  // JSON-LD Schema preview generator for AI readiness audit (Point 28 in request)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": isPackage ? "MedicalBusiness" : "MedicalTest",
    "name": item.name,
    "code": item.code,
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Bharath Jan Sewa Labs",
      "url": "https://bharathjansewalabs.com"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": item.price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    },
    "signOrSymptom": item.whyDone || item.tagline,
    "usedToDiagnose": item.shortDesc,
    "howPerformed": item.preparation
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284C7', background: '#F0F9FF', padding: '2px 8px', borderRadius: '4px' }}>
              {item.code}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              {item.name}
            </h2>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          
          {/* Top Quick Details Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            border: '1px solid #BAE6FD',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#0369A1', fontWeight: 700 }}>BJSL Transparent Pricing</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#071E33' }}>₹{item.price}</span>
                <span style={{ textDecoration: 'line-through', color: '#64748B', fontSize: '0.95rem' }}>MRP ₹{item.mrp}</span>
                <span className="badge-savings">Save ₹{item.mrp - item.price}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => onBook(item)}
                className="btn-primary"
              >
                Book Home Collection
              </button>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Sample Type</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplet size={14} color="#EF4444" /> {item.sampleType}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Fasting Rule</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                ⏱️ {item.fasting}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Report Turnaround</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                📄 {item.tat}
              </div>
            </div>
          </div>

          {/* Why done / Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>About this Diagnostic Evaluation</h4>
            <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.6 }}>
              {item.shortDesc || item.tagline}
            </p>
            {item.whyDone && (
              <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.6, marginTop: '8px' }}>
                <strong>Clinical Purpose:</strong> {item.whyDone}
              </p>
            )}
          </div>

          {/* Included Parameters List */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
              Included Parameters ({item.parametersCount || item.parameters?.length})
            </h4>
            
            {isPackage ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {item.includedCategories.map((cat, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 800, color: '#0284C7', fontSize: '0.95rem', marginBottom: '6px' }}>
                      {cat.name} ({cat.count} parameters)
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cat.items.map((sub, sidx) => (
                        <span key={sidx} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '3px 8px', borderRadius: '6px', fontSize: '0.8rem', color: '#334155' }}>
                          ✓ {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                {item.parameters.map((param, pidx) => (
                  <div key={pidx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <CheckCircle2 size={15} color="#059669" /> {param}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test Preparation */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 800, color: '#92400E', fontSize: '0.9rem', marginBottom: '4px' }}>
              📋 Patient Preparation Guidelines
            </div>
            <p style={{ fontSize: '0.875rem', color: '#78350F' }}>
              {item.preparation}
            </p>
          </div>

          {/* AI / SEO Structured Data Toggle */}
          <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '1rem' }}>
            <button 
              onClick={() => setShowSchema(!showSchema)}
              style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Code size={14} /> {showSchema ? 'Hide' : 'View'} AI-Structured Schema metadata (JSON-LD)
            </button>

            {showSchema && (
              <pre style={{
                background: '#0F172A',
                color: '#38BDF8',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                overflowX: 'auto'
              }}>
                {JSON.stringify(jsonLdSchema, null, 2)}
              </pre>
            )}
          </div>

        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button onClick={() => onBook(item)} className="btn-primary">
            Book Test Now
          </button>
        </div>
      </div>
    </div>
  );
}
