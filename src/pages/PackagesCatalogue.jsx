import React, { useState } from 'react';
import PackageCard from '../components/PackageCard';
import { HEALTH_PACKAGES } from '../data/mockData';
import { ArrowRight, SlidersHorizontal, ShieldCheck, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function PackagesCatalogue({ 
  onSelectTest, 
  onBookTest, 
  comparedPackages, 
  onToggleCompare, 
  openCompareModal 
}) {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Checkup Categories (Moved from Home as requested)
  const categoriesList = [
    { 
      id: 'women', 
      name: 'Women', 
      image: '/images/packages/cat_women.jpg',
      fallbackImage: '/images/packages/chirayu-women.webp',
      subtitle: '65+ Parameters',
      price: 'From ₹796',
      accentColor: '#F43F5E',
      packageId: 'chirayu-women',
      filterKey: 'women'
    },
    { 
      id: 'seniors', 
      name: 'Seniors', 
      image: '/images/packages/cat_seniors.jpg',
      fallbackImage: '/images/packages/senior-female.webp',
      subtitle: 'Geriatric Care',
      price: 'From ₹999',
      accentColor: '#D97706',
      packageId: 'senior-female',
      filterKey: 'senior'
    },
    { 
      id: 'men', 
      name: 'Men', 
      image: '/images/packages/cat_men.jpg',
      fallbackImage: '/images/packages/chirayu-men.webp',
      subtitle: 'Vital Organs & PSA',
      price: 'From ₹796',
      accentColor: '#2563EB',
      packageId: 'chirayu-men',
      filterKey: 'men'
    },
    { 
      id: 'kids', 
      name: 'Kids', 
      image: '/images/packages/cat_kids.jpg',
      fallbackImage: '/images/slides/hero-slide1.jpg',
      subtitle: 'Growth & Immunity',
      price: 'From ₹599',
      accentColor: '#059669',
      packageId: 'chirayu-prime',
      filterKey: 'kids'
    }
  ];

  // Form State for "Book Your Health Test" Banner at the bottom
  const [formPackage, setFormPackage] = useState('Chirayu Full Body Check (PRIME)');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocation, setFormLocation] = useState('Sanjaynagar');
  const [formDate, setFormDate] = useState('2026-09-28');
  const [formTime, setFormTime] = useState('08:00 AM');
  const [formAgree, setFormAgree] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0A🩺 *New Health Package Booking Request:*%0A*Package:* ${formPackage}%0A*Patient Name:* ${formName}%0A*Phone:* ${formPhone}%0A*Email:* ${formEmail}%0A*Location:* ${formLocation}%0A*Preferred Date:* ${formDate}%0A*Time Slot:* ${formTime}%0A%0APlease confirm my appointment.`;
    window.open(`https://wa.me/919805543143?text=${msg}`, '_blank');
  };

  const filteredPackages = HEALTH_PACKAGES.filter(pkg => {
    if (filterType === 'all') return true;
    if (filterType === 'senior') return pkg.id.includes('senior');
    if (filterType === 'women') return pkg.id.includes('women');
    if (filterType === 'men') return pkg.id.includes('men');
    if (filterType === 'gender') return pkg.id.includes('men') || pkg.id.includes('women');
    if (filterType === 'prime' || filterType === 'kids') return pkg.id.includes('prime') || pkg.id.includes('master');
    return true;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'tests-high') return b.parametersCount - a.parametersCount;
    return 0; // default popular
  });

  return (
    <div style={{ padding: '2.5rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="#" style={{ color: '#EF4444' }}>Home</a>
          <span>›</span>
          <span style={{ color: '#0F172A' }}>Package</span>
        </div>

        {/* Page Banner Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.98) 100%)',
          color: 'white',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 50px rgba(239, 68, 68, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '680px', position: 'relative', zIndex: 5 }}>
            <span style={{ background: 'white', color: '#EF4444', fontSize: '0.8rem', fontWeight: 900, padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> NABL ACCREDITED DIAGNOSTIC PACKAGES
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginTop: '0.75rem', marginBottom: '0.75rem', lineHeight: 1.15 }}>
              Health Checkup Packages
            </h1>
            <p style={{ color: '#FFE4E6', fontSize: '1.05rem', lineHeight: 1.6 }}>
              All our tests are conducted at NABL-accredited laboratories using fully automated systems to ensure accuracy and reliability. Rates are 50–70% lower than market prices with free doorstep sample collection.
            </p>
          </div>
        </div>

        {/* CHECKUP Categories (Moved from Home Page / Screenshot 2) */}
        <div className="catalogue-categories-wrapper" style={{ marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.08em', display: 'block' }}>
              CHECKUP
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 850, color: '#0F172A', margin: '2px 0 0' }}>
              Categories
            </h2>
          </div>

          <div className="catalogue-categories-grid">
            {categoriesList.map((cat) => {
              const isSelected = filterType === cat.filterKey;
              return (
                <div 
                  key={cat.id} 
                  className={`category-card-pill ${isSelected ? 'selected-category-card' : ''}`}
                  onClick={() => {
                    setFilterType(isSelected ? 'all' : cat.filterKey);
                  }}
                  role="button"
                  tabIndex={0}
                  style={isSelected ? { borderColor: cat.accentColor, boxShadow: `0 8px 24px ${cat.accentColor}25` } : {}}
                >
                  <div className="cat-img-wrapper" style={{ borderColor: cat.accentColor || '#E2E8F0' }}>
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="cat-card-img" 
                      onError={(e) => { e.currentTarget.src = cat.fallbackImage; }}
                    />
                  </div>
                  <div className="cat-text-wrapper">
                    <div className="cat-name-row">
                      <span className="cat-card-name">{cat.name}</span>
                      <ChevronRight size={15} className="cat-arrow-icon" />
                    </div>
                    <span className="cat-card-sub">{cat.subtitle}</span>
                    <span className="cat-card-price" style={{ color: cat.accentColor }}>{cat.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter and Sort Control Bar */}
        <div style={{
          background: 'white',
          borderRadius: '18px',
          padding: '1.25rem 1.75rem',
          marginBottom: '2.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
              <SlidersHorizontal size={18} color="#EF4444" />
              <span>Show:</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Packages' },
                { id: 'prime', label: 'Chirayu Prime & Master' },
                { id: 'gender', label: 'Men & Women Care' },
                { id: 'senior', label: 'Senior Citizens' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '99px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    border: 'none',
                    background: filterType === f.id ? '#EF4444' : '#F1F5F9',
                    color: filterType === f.id ? 'white' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#475569' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#0F172A',
                background: '#FFFFFF',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="tests-high">Parameters: High to Low</option>
            </select>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {sortedPackages.map(pkg => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg}
              onSelect={onSelectTest}
              onBook={onBookTest}
              isCompared={comparedPackages.some(p => p.id === pkg.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

        {/* SECTION: BOOK YOUR HEALTH TEST FORM BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '3.5rem 3rem',
          boxShadow: '0 25px 60px rgba(239, 68, 68, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
            Book Your Health Test
          </h2>

          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '960px', margin: '0 auto' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Select Package*</label>
              <select value={formPackage} onChange={(e) => setFormPackage(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                {HEALTH_PACKAGES.map(p => (
                  <option key={p.id} value={p.name}>{p.name} - ₹{p.price}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Full Name*</label>
              <input type="text" required placeholder="e.g. Ramesh Kumar" value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Email Address*</label>
              <input type="email" required placeholder="contact@example.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Phone No*</label>
              <input type="tel" required placeholder="9805543143" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Select Location*</label>
              <select value={formLocation} onChange={(e) => setFormLocation(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                <option value="Sanjaynagar">Sanjaynagar Hub</option>
                <option value="Peenya">Peenya 2nd Stage</option>
                <option value="Kengeri">Kengeri BDA Complex</option>
                <option value="Ittamadu">Ittamadu / Banashankari</option>
                <option value="Subramanyapura">Subramanyapura Hub</option>
                <option value="Jaraganahalli">Jaraganahalli Hub</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Preferred Date</label>
              <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', color: '#0F172A' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Appointment Time*</label>
              <select value={formTime} onChange={(e) => setFormTime(e.target.value)} style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '99px', border: 'none', background: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                <option value="07:00 AM">07:00 AM - 09:00 AM</option>
                <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                <option value="02:00 PM">02:00 PM - 05:00 PM</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formAgree} onChange={(e) => setFormAgree(e.target.checked)} style={{ accentColor: '#0F172A', width: '16px', height: '16px' }} />
                I agree to the Terms of Use and Privacy Policy
              </label>
              <br />
              <button 
                type="submit" 
                style={{
                  background: '#25D366',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  padding: '1rem 3rem',
                  borderRadius: '99px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
                </svg>
                <span>Book via WhatsApp (+91 98055 43143)</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
