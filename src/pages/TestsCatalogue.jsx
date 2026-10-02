import React, { useState } from 'react';
import { Search, Filter, Droplet } from 'lucide-react';
import TestCard from '../components/TestCard';
import { INDIVIDUAL_TESTS, CATEGORIES } from '../data/mockData';

export default function TestsCatalogue({ onSelectTest, onBookTest }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sampleFilter, setSampleFilter] = useState('all');

  const filteredTests = INDIVIDUAL_TESTS.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSample = sampleFilter === 'all' || test.sampleType.toLowerCase().includes(sampleFilter);
    return matchesCategory && matchesSearch && matchesSample;
  });

  return (
    <div style={{ padding: '3rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase' }}>
            NABL Accredited Diagnostics
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
            Diagnostic Tests Catalogue
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>
            Search individual blood, urine, thyroid, lipid, liver, and specialized lab tests with transparent pricing.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          background: 'white',
          padding: '1.25rem',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid #E2E8F0',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Search Box */}
          <div className="search-input-wrapper" style={{ border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.6rem 1rem' }}>
            <Search size={18} color="#0284C7" />
            <input 
              type="text" 
              placeholder="Search tests by name, keyword or code (e.g. CBC, HbA1c, TSH)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {CATEGORIES.filter(c => c.id !== 'packages').map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat.id ? '#0284C7' : '#F1F5F9',
                  color: selectedCategory === cat.id ? 'white' : '#475569',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>
          Showing {filteredTests.length} Available Diagnostic Tests
        </div>

        {/* Cards Grid */}
        <div className="card-grid">
          {filteredTests.map(test => (
            <TestCard 
              key={test.id}
              test={test}
              onSelect={onSelectTest}
              onBook={onBookTest}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
