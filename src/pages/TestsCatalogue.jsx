import React, { useState, useMemo } from 'react';
import { Search, Filter, Droplet, LayoutGrid, List, Printer, Phone, Globe, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import TestCard from '../components/TestCard';
import { INDIVIDUAL_TESTS, CATEGORIES } from '../data/mockData';

export default function TestsCatalogue({ onSelectTest, onBookTest }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' (Official Price List) | 'grid' (Card Grid)
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sampleFilter, setSampleFilter] = useState('all');

  const filteredTests = useMemo(() => {
    return INDIVIDUAL_TESTS.filter(test => {
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
                            test.name.toLowerCase().includes(q) ||
                            (test.shortDesc && test.shortDesc.toLowerCase().includes(q)) ||
                            (test.code && test.code.toLowerCase().includes(q)) ||
                            (test.testNumber && String(test.testNumber) === q);
      const matchesSample = sampleFilter === 'all' || (test.sampleType && test.sampleType.toLowerCase().includes(sampleFilter));
      return matchesCategory && matchesSearch && matchesSample;
    });
  }, [selectedCategory, searchQuery, sampleFilter]);

  // Split for 2-column Rate List view (1-33 on left, 34-66 on right when full list is active)
  const leftColumnTests = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') {
      return filteredTests.slice(0, Math.ceil(filteredTests.length / 2));
    }
    return INDIVIDUAL_TESTS.filter(t => t.testNumber >= 1 && t.testNumber <= 33);
  }, [filteredTests, selectedCategory, searchQuery]);

  const rightColumnTests = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') {
      return filteredTests.slice(Math.ceil(filteredTests.length / 2));
    }
    return INDIVIDUAL_TESTS.filter(t => t.testNumber >= 34 && t.testNumber <= 66);
  }, [filteredTests, selectedCategory, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tests-catalogue-page" style={{ padding: '2.5rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                NABL Accredited Diagnostics
              </span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                Official Subsidized Rates
              </span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
              Diagnostic Tests Catalogue & Rate Card
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '6px', maxWidth: '680px' }}>
              Browse all 66 individual blood, urine, diabetes, thyroid, and hormone diagnostic tests. Standardized high-quality lab testing at subsidized community prices.
            </p>
          </div>

          {/* Action Tools: Print & View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="no-print"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '10px',
                background: 'white',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              title="Print official rate card"
            >
              <Printer size={16} color="#0284C7" />
              Print Rate Sheet
            </button>

            {/* View Mode Toggle Pill */}
            <div 
              className="no-print"
              style={{
                display: 'inline-flex',
                background: '#E2E8F0',
                padding: '4px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1'
              }}
            >
              <button
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: viewMode === 'list' ? 'white' : 'transparent',
                  color: viewMode === 'list' ? '#0F172A' : '#64748B',
                  boxShadow: viewMode === 'list' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <List size={16} color={viewMode === 'list' ? '#EF4444' : '#64748B'} />
                <span>Price List (ಪರೀಕ್ಷಾ ದರ)</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: viewMode === 'grid' ? 'white' : 'transparent',
                  color: viewMode === 'grid' ? '#0F172A' : '#64748B',
                  boxShadow: viewMode === 'grid' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <LayoutGrid size={16} color={viewMode === 'grid' ? '#0284C7' : '#64748B'} />
                <span>Card View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div 
          className="no-print"
          style={{
            background: 'white',
            padding: '1.25rem',
            borderRadius: '18px',
            boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Search Box */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#F8FAFC', 
              border: '1.5px solid #CBD5E1', 
              borderRadius: '12px', 
              padding: '0.65rem 1rem' 
            }}>
              <Search size={19} color="#0284C7" />
              <input 
                type="text" 
                placeholder="Search by test name, keyword or number (e.g. CBC, Glucose, HbA1c, TSH, Vitamin D, Ferritin)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '0.95rem',
                  width: '100%',
                  color: '#0F172A'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginRight: '4px', flexShrink: 0 }}>
              Category:
            </span>
            {CATEGORIES.filter(c => c.id !== 'packages').map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat.id ? '#0284C7' : '#F1F5F9',
                  color: selectedCategory === cat.id ? 'white' : '#475569',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>
            Showing <strong style={{ color: '#0F172A' }}>{filteredTests.length}</strong> of 66 Official Diagnostic Tests
            {selectedCategory !== 'all' && ` in "${CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
          {filteredTests.length === 0 && (
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              style={{ background: 'none', border: 'none', color: '#0284C7', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* VIEW 1: OFFICIAL RATE SHEET VIEW (ಪರೀಕ್ಷಾ ದರ ಪಟ್ಟಿ) */}
        {viewMode === 'list' && (
          <div 
            className="official-price-list-container"
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '2px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            {/* Red Top Bar Banner */}
            <div style={{
              background: 'linear-gradient(90deg, #D92D20 0%, #B42318 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              textAlign: 'center',
              fontWeight: 900,
              fontSize: '1.15rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>TEST PRICE LIST</span>
              <span style={{ opacity: 0.8 }}>–</span>
              <span>ಪರೀಕ್ಷಾ ದರ ಪಟ್ಟಿ</span>
            </div>

            {/* Header Identity Strip */}
            <div style={{
              padding: '1.25rem 2rem',
              background: '#FFFFFF',
              borderBottom: '2px solid #0F172A',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              {/* Left Brand block: English */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/logo.webp" alt="Bharath Jan Sewa Labs" style={{ height: '36px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      BHARATH JAN SEWA LABS<span style={{ fontSize: '0.75rem', verticalAlign: 'super' }}>™</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D92D20', letterSpacing: '0.02em' }}>
                      Affordable + Accessible + Accurate
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  Diagnostics with Dignity, For Every Indian
                </div>
                <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0284C7', color: 'white', padding: '4px 12px', borderRadius: '6px', fontWeight: 800, fontSize: '0.9rem' }}>
                  <Phone size={14} /> 9805543143
                </div>
              </div>

              {/* Right Brand block: Kannada */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#0F172A', lineHeight: 1.2 }}>
                  ಭಾರತ್ ಜನ ಸೇವಾ ಲ್ಯಾಬ್ಸ್<span style={{ fontSize: '0.75rem', verticalAlign: 'super' }}>™</span>
                </div>
                <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#D92D20' }}>
                  ಕಡಿಮೆ ದರ + ಸುಲಭ + ನಿಖರ
                </div>
                <div style={{ marginTop: '4px', fontSize: '0.775rem', color: '#475569', fontWeight: 600 }}>
                  ಘನತೆಯಿಂದ ನಿಮ್ಮ ಆರೋಗ್ಯ ಪರೀಕ್ಷೆ, ಪ್ರತಿಯೊಬ್ಬ ಭಾರತೀಯನಿಗಾಗಿ.
                </div>
                <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#D92D20', color: 'white', padding: '4px 12px', borderRadius: '6px', fontWeight: 800, fontSize: '0.85rem' }}>
                  <Globe size={14} /> www.bharathjansewalabs.com
                </div>
              </div>
            </div>

            {/* 2-Column Official Rate Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
              gap: '0',
              background: '#FFFFFF'
            }}>
              {/* Column 1 (Tests 1–33 or First Half) */}
              <div style={{ borderRight: '1px solid #CBD5E1' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <tbody>
                    {leftColumnTests.map((test, idx) => (
                      <tr 
                        key={test.id}
                        style={{ 
                          borderBottom: '1px solid #E2E8F0',
                          background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                          transition: 'background 0.15s'
                        }}
                        className="rate-table-row"
                      >
                        <td style={{ 
                          width: '42px', 
                          padding: '8px 10px', 
                          fontWeight: 800, 
                          color: '#0F172A', 
                          textAlign: 'center',
                          borderRight: '1px solid #E2E8F0'
                        }}>
                          {test.testNumber || idx + 1}
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.88rem' }}>
                                {test.name}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', gap: '6px', marginTop: '2px' }}>
                                <span>🩸 {test.sampleType}</span>
                                {test.fasting && test.fasting !== 'No Fasting Required' && (
                                  <span style={{ color: '#D97706', fontWeight: 600 }}>• ⏱️ Fasting req.</span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => onBookTest(test)}
                              style={{
                                padding: '4px 10px',
                                background: '#F0F9FF',
                                border: '1px solid #BAE6FD',
                                color: '#0284C7',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                              }}
                              className="no-print"
                              title="Book this test"
                            >
                              + Book
                            </button>
                          </div>
                        </td>
                        <td style={{ 
                          width: '85px', 
                          padding: '8px 12px', 
                          textAlign: 'right',
                          fontWeight: 900,
                          fontSize: '1.05rem',
                          color: '#0284C7',
                          borderLeft: '1px solid #E2E8F0',
                          whiteSpace: 'nowrap'
                        }}>
                          ₹ {test.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Column 2 (Tests 34–66 or Second Half) */}
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <tbody>
                    {rightColumnTests.map((test, idx) => (
                      <tr 
                        key={test.id}
                        style={{ 
                          borderBottom: '1px solid #E2E8F0',
                          background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                          transition: 'background 0.15s'
                        }}
                        className="rate-table-row"
                      >
                        <td style={{ 
                          width: '42px', 
                          padding: '8px 10px', 
                          fontWeight: 800, 
                          color: '#0F172A', 
                          textAlign: 'center',
                          borderRight: '1px solid #E2E8F0'
                        }}>
                          {test.testNumber || (leftColumnTests.length + idx + 1)}
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.88rem' }}>
                                {test.name}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', gap: '6px', marginTop: '2px' }}>
                                <span>🩸 {test.sampleType}</span>
                                {test.fasting && test.fasting !== 'No Fasting Required' && (
                                  <span style={{ color: '#D97706', fontWeight: 600 }}>• ⏱️ Fasting req.</span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => onBookTest(test)}
                              style={{
                                padding: '4px 10px',
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                              }}
                              className="no-print"
                              title="Book this test"
                            >
                              + Book
                            </button>
                          </div>
                        </td>
                        <td style={{ 
                          width: '85px', 
                          padding: '8px 12px', 
                          textAlign: 'right',
                          fontWeight: 900,
                          fontSize: '1.05rem',
                          color: '#DC2626',
                          borderLeft: '1px solid #E2E8F0',
                          whiteSpace: 'nowrap'
                        }}>
                          ₹ {test.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div style={{
              padding: '1rem 1.5rem',
              background: '#F1F5F9',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.8rem',
              color: '#64748B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#16A34A" />
                <span>All diagnostic samples tested using fully automated analyzers at NABL accredited labs. Same-day digital reports via WhatsApp & portal.</span>
              </div>
              <div style={{ fontWeight: 700, color: '#0F172A' }}>
                Helpline: 9805543143 • Home Sample Collection Available Citywide
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE CARDS GRID */}
        {viewMode === 'grid' && (
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
        )}

      </div>

      {/* Scoped CSS for Print & Interactive Hover */}
      <style>{`
        .rate-table-row:hover {
          background-color: #EFF6FF !important;
        }
        @media print {
          .no-print, header, footer, .mobile-bottom-nav {
            display: none !important;
          }
          .tests-catalogue-page {
            padding: 0 !important;
            background: white !important;
          }
          .official-price-list-container {
            border: 1px solid #000 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
