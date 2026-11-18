import React, { useState } from 'react';
import { BLOG_POSTS, TODAY_FORMATTED } from '../data/mockData';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, ShieldCheck, Search, Share2, Check, MessageSquare } from 'lucide-react';

export default function BlogsPage({ onBookTest }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    'All',
    'Diagnostic Affordability',
    'Infection Care',
    'Organ Function',
    'Preventive Healthcare',
    'Women\'s Health',
    'Lifestyle & Metabolism',
    'Diabetes & Sugar',
    'Thyroid Care',
    'Heart & Lipids',
    'Vitamins & Minerals',
    'Blood Tests'
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = !searchQuery.trim() || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (article) => {
    const url = `${window.location.origin}/blog/${article.slug || article.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      alert(`Article link: ${url}`);
    }
  };

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh', backgroundColor: '#FAF9F8' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        
        {/* SEO Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem' }}>
          <span className="badge-red-pill" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} /> MEDICAL INSIGHTS &amp; DIAGNOSTIC KNOWLEDGE HUB
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Health Insights &amp; Clinical Pathology Articles
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6 }}>
            Evidence-based medical guides authored by certified Pathologists and Clinical Advisors. Updated for Bengaluru patients as of <strong>18 November 2026</strong>.
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '560px',
            margin: '1.75rem auto 0',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.08)'
          }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search articles by condition, test, or symptom (e.g. Dengue, HbA1c, Ferritin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 44px 14px 46px',
                borderRadius: '14px',
                border: '1.5px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
                color: '#0F172A',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'btn-red-solid' : 'btn-red-outline'}
              style={{ 
                padding: '0.45rem 1.15rem', 
                borderRadius: '99px', 
                fontSize: '0.85rem',
                fontWeight: activeCategory === cat ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#64748B', fontSize: '0.875rem' }}>
          <span>Showing <strong>{filteredPosts.length}</strong> medical articles</span>
          {activeCategory !== 'All' && (
            <button 
              onClick={() => setActiveCategory('All')} 
              style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Blogs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              className="white-liquid-card"
              style={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                borderRadius: '18px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px -4px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedArticle(post)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge-pink-tag" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{post.image}</div>

                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 700 }}>
                  👨‍⚕️ {post.author}
                </div>
                <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read Guide →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>No articles found for "{searchQuery}"</h3>
            <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Try searching by test name like CBC, Dengue, Thyroid, Sugar, or select another category.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="btn-red-solid"
              style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ARTICLE READ MODAL */}
        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)} style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div className="modal-card-white" onClick={(e) => e.stopPropagation()} style={{
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
              position: 'relative'
            }}>
              
              {/* Modal Header */}
              <div style={{ 
                padding: '1.25rem 2rem', 
                borderBottom: '1px solid #E2E8F0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: '#FFFFFF',
                zIndex: 10
              }}>
                <span className="badge-pink-tag" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  {selectedArticle.category}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => handleShare(selectedArticle)} 
                    title="Share Article Link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedLink ? <Check size={14} color="#16A34A" /> : <Share2 size={14} />}
                    {copiedLink ? 'Link Copied!' : 'Share'}
                  </button>

                  <button 
                    onClick={() => setSelectedArticle(null)} 
                    style={{ 
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      border: 'none',
                      color: '#64748B', 
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedArticle.image}</div>
                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: '#0F172A', marginBottom: '1rem', lineHeight: 1.25 }}>
                  {selectedArticle.title}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1.75rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem' }}>
                  <span>👨‍⚕️ <strong>{selectedArticle.author}</strong></span>
                  <span>📅 Published: {selectedArticle.date || '18 November 2026'}</span>
                  <span>⏱️ {selectedArticle.readTime}</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>✓ Clinically Reviewed</span>
                </div>

                <div 
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8, marginBottom: '2.5rem' }}
                />

                {/* Direct Action Booking Box */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                  padding: '1.75rem 2rem', 
                  borderRadius: '18px', 
                  color: 'white',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '4px' }}>
                      Need to get this test done in Bengaluru?
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#CBD5E1' }}>
                      NABL-accredited processing • Fast 4–8 hr report • Free home collection for ₹499+
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/919805543143?text=${encodeURIComponent(`Namaste BJSL, I would like to book the diagnostic test discussed in your article: "${selectedArticle.title}" in Bengaluru.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#25D366',
                      color: 'white',
                      padding: '12px 22px',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <MessageSquare size={18} fill="white" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
