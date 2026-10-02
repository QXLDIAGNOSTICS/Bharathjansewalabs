import React from 'react';
import { ShieldCheck, Clock, ArrowRight, Droplet, FileCheck } from 'lucide-react';

export default function TestCard({ test, onSelect, onBook }) {
  const discountPercent = Math.round(((test.mrp - test.price) / test.mrp) * 100);

  return (
    <div 
      className="white-liquid-card" 
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Badges Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ 
            fontSize: '0.725rem', 
            fontWeight: 800, 
            color: '#0284C7', 
            background: 'rgba(240, 249, 255, 0.9)', 
            backdropFilter: 'blur(8px)',
            border: '1px solid #BAE6FD', 
            padding: '3px 10px', 
            borderRadius: '8px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}>
            {test.code || 'BJSL-TEST'}
          </span>

          <span className="badge-safe-green">
            <ShieldCheck size={13} /> NABL ACCREDITED
          </span>
        </div>

        {/* Test Name & Description */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.35 }}>
          {test.name}
        </h3>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          {test.shortDesc || 'Comprehensive diagnostic blood parameter analysis processed at NABL labs.'}
        </p>

        {/* Specimen & Report Info Pill Box */}
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.65)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '0.85rem 1rem', 
            borderRadius: '14px', 
            border: '1px solid rgba(226, 232, 240, 0.8)', 
            marginBottom: '1rem', 
            fontSize: '0.775rem', 
            color: 'var(--text-secondary)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          }}
        >
          <div>🩸 Sample: <strong style={{ color: 'var(--text-primary)' }}>{test.sampleType || 'Blood (Serum)'}</strong></div>
          <div>⏱️ Fasting: <strong style={{ color: 'var(--text-primary)' }}>{test.fasting || 'No Fasting Required'}</strong></div>
          <div>📄 Report: <strong style={{ color: 'var(--text-primary)' }}>{test.tat || 'Same Day Delivery'}</strong></div>
        </div>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            ₹{test.price.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 500 }}>
            ₹{test.mrp.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800, background: 'rgba(236, 253, 245, 0.9)', padding: '2px 8px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
            {discountPercent}% OFF
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        <button 
          onClick={() => onSelect(test)} 
          className="btn-red-outline" 
          style={{ justifyContent: 'center', padding: '0.65rem', fontSize: '0.825rem' }}
        >
          View Details
        </button>
        <button 
          onClick={() => onBook(test)} 
          className="btn-red-solid" 
          style={{ justifyContent: 'center', padding: '0.65rem', fontSize: '0.825rem' }}
        >
          Book Test <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
