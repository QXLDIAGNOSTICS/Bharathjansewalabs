import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import TESTS from '../data/testDirectory.json';
import { PRICE_BANDS } from '../data/priceBands';

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;
const MAX_LINKS_PER_SLIDE = 8;

// Homepage "Affordable Diagnostic Tests in Bengaluru" slider: one slide per
// price band, each linking to individual test pages and to its dedicated
// price page (/tests-under-100/ etc.).
export default function TestPriceSlider() {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-slide]');
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.9;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const navBtn = {
    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E2E8F0',
    background: 'white', color: '#0F172A', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
  };

  return (
    <section id="test-prices" aria-label="Affordable diagnostic test prices" style={{ background: '#F8FAFC', padding: '4rem 0', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <span className="split-eyebrow" style={{ color: '#0284C7' }}>TRANSPARENT TEST PRICES</span>
            <h2 className="section-main-heading" style={{ marginBottom: '6px' }}>
              Affordable Diagnostic Tests in Bengaluru
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '680px', margin: 0 }}>
              Browse all {TESTS.length} tests by price. Every test has its own page with the published price, sample type, preparation and common patient questions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button type="button" style={navBtn} onClick={() => scrollBy(-1)} aria-label="Previous price range">
              <ChevronLeft size={18} />
            </button>
            <button type="button" style={navBtn} onClick={() => scrollBy(1)} aria-label="Next price range">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', paddingBottom: '6px', WebkitOverflowScrolling: 'touch',
          }}
        >
          {PRICE_BANDS.map((band) => {
            const inBand = TESTS
              .filter((t) => t.price >= band.slideMin && t.price <= band.slideMax)
              .sort((a, b) => a.price - b.price);
            const shown = inBand.slice(0, MAX_LINKS_PER_SLIDE);
            return (
              <article
                key={band.slug}
                data-slide
                style={{
                  flex: '0 0 min(320px, 86%)', scrollSnapAlign: 'start', background: 'white',
                  borderRadius: '18px', border: '1px solid #E2E8F0', padding: '1.25rem',
                  display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px -6px rgba(15,23,42,0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ background: band.tint, color: band.accent, fontWeight: 900, fontSize: '1.05rem', padding: '6px 12px', borderRadius: '10px' }}>
                    {band.slideLabel}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700 }}>{inBand.length} tests</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem' }}>{band.slideTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', flex: 1 }}>
                  {shown.map((t) => (
                    <li key={t.slug} style={{ borderTop: '1px solid #F1F5F9' }}>
                      <a
                        href={`/tests/${t.slug}/`}
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', padding: '7px 0', color: '#1E293B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                        <span style={{ color: band.accent, fontWeight: 800, flexShrink: 0 }}>{inr(t.price)}</span>
                      </a>
                    </li>
                  ))}
                  {inBand.length > shown.length && (
                    <li style={{ borderTop: '1px solid #F1F5F9', padding: '7px 0', fontSize: '0.8rem', color: '#64748B' }}>
                      + {inBand.length - shown.length} more tests
                    </li>
                  )}
                </ul>
                <a
                  href={`/${band.slug}/`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '10px 16px', borderRadius: '12px', background: '#0F172A', color: 'white',
                    fontWeight: 800, fontSize: '0.875rem', textDecoration: 'none',
                  }}
                >
                  <span>{band.slug === 'tests-above-500' ? 'View specialised tests' : `All tests ${band.pageLabel.toLowerCase()}`}</span>
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/tests/" style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            See the full price list of all {TESTS.length} tests <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
