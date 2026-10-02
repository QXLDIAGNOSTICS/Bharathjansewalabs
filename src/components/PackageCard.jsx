import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, ArrowRight, Activity, ChevronRight, Sparkles } from 'lucide-react';

export default function PackageCard({ 
  pkg, 
  onSelect, 
  onBook, 
  isCompared, 
  onToggleCompare 
}) {
  const discountPercent = pkg.savings ? Math.round((pkg.savings / pkg.mrp) * 100) : 60;

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
        {/* Top Package Image Preview if available */}
        {pkg.image && (
          <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', background: '#F1F5F9', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
            <img 
              src={pkg.image} 
              alt={pkg.name} 
              onError={(e) => { e.currentTarget.src = '/images/banners/main-banner.webp'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        )}

        {/* Top Badges Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
            color: 'white', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            padding: '4px 14px', 
            borderRadius: '99px',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={12} color="white" /> {discountPercent}% OFF
          </span>
          <span className="badge-safe-green">
            <ShieldCheck size={14} /> NABL ACCREDITED
          </span>
        </div>

        {/* Package Title */}
        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
          {pkg.name}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          {pkg.tagline || 'All tests conducted at NABL-accredited labs with fully automated precision systems.'}
        </p>

        {/* Specular Liquid Glass Price Box */}
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.65)', 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '1.1rem 1.25rem', 
            borderRadius: '18px', 
            border: '1px solid rgba(226, 232, 240, 0.8)', 
            marginBottom: '1.25rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>SPECIAL OFFER PRICE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              ₹{pkg.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 600 }}>
              ₹{pkg.mrp.toLocaleString('en-IN')}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✓ Includes {pkg.parametersCount || 71} Parameters Screened
          </div>
        </div>

        {/* Included Parameter Breakdown Pills Grid */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Included Health Panels:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {pkg.includedCategories ? (
              pkg.includedCategories.slice(0, 6).map((cat, idx) => (
                <span 
                  key={idx}
                  style={{
                    background: 'rgba(254, 242, 242, 0.85)',
                    color: '#991B1B',
                    border: '1px solid rgba(254, 205, 211, 0.9)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {cat.name} ({cat.count})
                </span>
              ))
            ) : (
              <>
                <span style={{ background: 'rgba(254, 242, 242, 0.85)', color: '#991B1B', border: '1px solid rgba(254, 205, 211, 0.9)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '8px' }}>Lipids (14)</span>
                <span style={{ background: 'rgba(254, 242, 242, 0.85)', color: '#991B1B', border: '1px solid rgba(254, 205, 211, 0.9)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '8px' }}>Liver (14)</span>
                <span style={{ background: 'rgba(254, 242, 242, 0.85)', color: '#991B1B', border: '1px solid rgba(254, 205, 211, 0.9)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '8px' }}>Renal (7)</span>
                <span style={{ background: 'rgba(254, 242, 242, 0.85)', color: '#991B1B', border: '1px solid rgba(254, 205, 211, 0.9)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '8px' }}>CBC (29)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <button 
            onClick={() => onSelect(pkg)} 
            className="btn-red-outline" 
            style={{ justifyContent: 'center', padding: '0.75rem', fontSize: '0.875rem' }}
          >
            Know More
          </button>
          <button 
            onClick={() => onBook(pkg)} 
            className="btn-red-solid" 
            style={{ justifyContent: 'center', padding: '0.75rem', fontSize: '0.875rem' }}
          >
            Book Now <ArrowRight size={15} />
          </button>
        </div>

        {onToggleCompare && (
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={isCompared} 
              onChange={() => onToggleCompare(pkg)} 
              style={{ accentColor: '#EF4444', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            Add to Compare
          </label>
        )}
      </div>
    </div>
  );
}
