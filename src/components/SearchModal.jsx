import React, { useState } from 'react';
import { X, Search, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';
import { INDIVIDUAL_TESTS, HEALTH_PACKAGES } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, onSelectTest, onBookTest }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const allItems = [...INDIVIDUAL_TESTS, ...HEALTH_PACKAGES];
  
  const filtered = query.trim() === '' 
    ? allItems.slice(0, 6) 
    : allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.shortDesc?.toLowerCase().includes(query.toLowerCase()) ||
        item.code?.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '680px' }}>
        
        {/* Search Header Bar */}
        <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={22} color="#0284C7" />
          <input 
            type="text" 
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#0F172A'
            }}
            placeholder="Search CBC, Thyroid, HbA1c, Vitamin D, Full Body Checkup..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {query.trim() === '' ? 'Popular Diagnostic Searches' : `Search Results (${filtered.length})`}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(item => (
              <div 
                key={item.id}
                style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'border-color 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0284C7', background: '#F0F9FF', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.code}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {item.sampleType} • {item.fasting}
                    </span>
                  </div>
                  <h4 
                    onClick={() => { onSelectTest(item); onClose(); }}
                    style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}
                  >
                    {item.name}
                  </h4>
                  {item.parametersCount && (
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                      ✓ Includes {item.parametersCount} Parameters
                    </span>
                  )}
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.8rem', marginRight: '6px' }}>₹{item.mrp}</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#071E33' }}>₹{item.price}</span>
                  </div>
                  <button 
                    onClick={() => { onBookTest(item); onClose(); }}
                    className="btn-primary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    Book Test <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
