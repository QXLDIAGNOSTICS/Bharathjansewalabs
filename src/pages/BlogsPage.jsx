import React, { useState } from 'react';
import { BLOG_POSTS, TODAY_FORMATTED } from '../data/mockData';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, ShieldCheck } from 'lucide-react';

export default function BlogsPage({ onBookTest }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Diabetes & Metabolism', 'Vitamins & Immunity', 'Preventive Healthcare', 'Lab Diagnostics'];

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ padding: '3.5rem 0' }}>
      <div className="container">
        
        {/* SEO Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <span className="badge-red-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            MEDICAL INSIGHTS & DIAGNOSTIC KNOWLEDGE HUB
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.15, marginBottom: '1rem' }}>
            Health Insights & Laboratory Diagnostics Articles
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6 }}>
            Authored by certified Pathologists and Medical Advisors. Updated as of <strong>{TODAY_FORMATTED}</strong>.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'btn-red-solid' : 'btn-red-outline'}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '99px', fontSize: '0.875rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="card-grid">
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              className="white-liquid-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedArticle(post)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge-pink-tag">{post.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.image}</div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.35 }}>
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
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ARTICLE READ MODAL */}
        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="modal-card-white" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge-pink-tag">{selectedArticle.category}</span>
                <button onClick={() => setSelectedArticle(null)} style={{ color: '#64748B', fontSize: '1.4rem' }}>✕</button>
              </div>
              <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginBottom: '1rem', lineHeight: 1.25 }}>
                  {selectedArticle.title}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: '#64748B', marginBottom: '1.75rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem' }}>
                  <span>👨‍⚕️ {selectedArticle.author}</span>
                  <span>📅 Published: {selectedArticle.date}</span>
                  <span>⏱️ {selectedArticle.readTime}</span>
                </div>

                <div 
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8, marginBottom: '2rem' }}
                />

                <div style={{ background: '#FFF1F2', padding: '1.5rem', borderRadius: '16px', border: '1px solid #FECDD3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>Schedule Relevant Diagnostic Test</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>NABL Accredited Processing with Free Home Collection</div>
                  </div>
                  <button onClick={() => { setSelectedArticle(null); onBookTest({ name: selectedArticle.title, price: 796 }); }} className="btn-red-solid">
                    Book Related Test Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
