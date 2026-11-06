import React, { useState } from 'react';
import { X, Trash2, Zap, Calendar, Check, ArrowRight, ShieldCheck, FileText, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function CartDrawer({ isOpen, onClose, cart, setCart, onProceedToBooking }) {
  const [selectedSlot, setSelectedSlot] = useState('instant');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [includeHardcopy, setIncludeHardcopy] = useState(false);
  const [collectionMode, setCollectionMode] = useState('home'); // 'home' or 'centre'

  if (!isOpen) return null;

  const coupons = {
    'BHARATH250': { discount: 250, minOrder: 500, label: '₹250 Flat Discount' },
    'JANSEWA500': { discount: 500, minOrder: 1500, label: '₹500 Flat Discount' },
    'SEWA10': { percent: 10, maxDiscount: 350, minOrder: 300, label: '10% Off on Health Tests' }
  };

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const coupon = coupons[code];
    if (!coupon) {
      setCouponError('Invalid coupon code. Try BHARATH250 or JANSEWA500');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order amount for this coupon is ₹${coupon.minOrder}`);
      return;
    }

    setAppliedCoupon({ code, ...coupon });
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const origTotal = cart.reduce((sum, item) => sum + (item.mrp || item.origPrice || item.price * 1.5 || 0), 0);
  const discountSavings = Math.max(0, origTotal - subtotal);

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount) {
      couponDiscount = appliedCoupon.discount;
    } else if (appliedCoupon.percent) {
      couponDiscount = Math.min(appliedCoupon.maxDiscount, Math.round(subtotal * (appliedCoupon.percent / 100)));
    }
  }

  const hardcopyFee = includeHardcopy ? 99 : 0;
  const homeCollectionFee = collectionMode === 'home' ? (subtotal >= 499 ? 0 : 100) : 0;
  const finalPayable = Math.max(0, subtotal - couponDiscount + hardcopyFee + homeCollectionFee);

  const handleWhatsAppCheckout = () => {
    const itemsList = cart.map((item, idx) => `  ${idx + 1}. *${item.name || item.title}* (₹${item.price})`).join('%0A');
    const modeText = collectionMode === 'home' 
      ? `🏠 Doorstep Home Collection (${homeCollectionFee === 0 ? 'FREE for orders ₹499+' : '₹100 convenience fee for orders under ₹499'})` 
      : '🏥 Walk-in Sample Collection (100% FREE at all 10 BJSL Hubs)';
    const slotText = selectedSlot === 'instant' ? '⚡ Instant 60-Min Phlebotomist' : '🗓️ Scheduled Morning Slot (7:00 AM - 10:00 AM)';
    const couponInfo = appliedCoupon ? `%0A🎟️ *Coupon Applied:* ${appliedCoupon.code} (-₹${couponDiscount})` : '';
    const hardcopyInfo = includeHardcopy ? '%0A📄 *Printed Report Delivery:* Included (+₹99)' : '';
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0A🩺 *New Blood Test Booking Request:*%0A${itemsList}%0A${couponInfo}${hardcopyInfo}%0A%0A📍 *Collection Method:* ${modeText}%0A💰 *Total Amount Payable:* ₹${finalPayable} (Pay after collection)%0A⏱️ *Preferred Slot:* ${slotText}%0A📍 *City:* Bengaluru%0A%0APlease confirm my appointment and collection arrangements.`;
    window.open(`https://wa.me/919805543143?text=${msg}`, '_blank');
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-950)' }}>
              My Health Cart ({cart.length})
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="circle-icon-btn" 
            style={{ width: '36px', height: '36px' }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--ink-500)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-950)', marginBottom: '8px' }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                Explore our NABL-accredited health checkups and blood tests at 50-70% lower rates.
              </p>
              <button 
                type="button" 
                onClick={onClose}
                className="btn-centres-nearest"
                style={{ padding: '10px 24px' }}
              >
                Browse Checkups
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-top">
                      <div>
                        <div className="cart-item-title">{item.name || item.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-500)', marginTop: '2px' }}>
                          Includes {item.parametersCount || item.parameters || 1} Parameters • Reports in {item.tat || '6 hours'}
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveItem(item.id)} 
                        className="cart-item-remove"
                        aria-label={`Remove ${item.name || item.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', textDecoration: 'line-through', color: 'var(--ink-400)' }}>
                          ₹{item.mrp || item.origPrice || (item.price * 1.5).toFixed(0)}
                        </span>
                        <span className="cart-item-price">₹{item.price}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--green-600)', fontWeight: 700, background: 'var(--green-50)', padding: '2px 8px', borderRadius: '99px' }}>
                        Free for Orders ₹499+
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Collection Mode Selector (Home vs Centre) */}
              <div style={{
                background: '#fff',
                border: '1.5px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px 16px',
                marginBottom: '14px'
              }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--ink-950)', marginBottom: '10px' }}>
                  Select Sample Collection Mode
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setCollectionMode('home')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: collectionMode === 'home' ? '2px solid #BA192D' : '1px solid #E2E8F0',
                      background: collectionMode === 'home' ? '#FFF1F2' : '#F8FAFC',
                      color: collectionMode === 'home' ? '#BA192D' : '#334155',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    🏠 Doorstep Home
                    <div style={{ fontSize: '10.5px', fontWeight: 600, marginTop: '2px', color: subtotal >= 499 ? '#15803D' : '#B45309' }}>
                      {subtotal >= 499 ? '100% FREE' : '₹100 (Free ₹499+)'}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionMode('centre')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: collectionMode === 'centre' ? '2px solid #BA192D' : '1px solid #E2E8F0',
                      background: collectionMode === 'centre' ? '#FFF1F2' : '#F8FAFC',
                      color: collectionMode === 'centre' ? '#BA192D' : '#334155',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    🏥 Centre Walk-in
                    <div style={{ fontSize: '10.5px', fontWeight: 600, marginTop: '2px', color: '#15803D' }}>
                      100% FREE (10 Hubs)
                    </div>
                  </button>
                </div>

                {collectionMode === 'home' && subtotal < 499 && (
                  <div style={{ marginTop: '10px', padding: '6px 10px', background: '#FEF3C7', color: '#92400E', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                    💡 Add ₹{499 - subtotal} more to unlock 100% FREE home collection! (Or choose free Centre Walk-in)
                  </div>
                )}
              </div>

              {/* Slot Selector */}
              <div className="slot-selector-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: 'var(--ink-950)' }}>
                  <Zap size={16} style={{ color: 'var(--brand-500)' }} />
                  <span>Choose Phlebotomist Sample Slot</span>
                </div>
                <div className="slot-radio-group">
                  <label className="slot-option-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <input 
                      type="radio" 
                      name="slot" 
                      value="instant" 
                      checked={selectedSlot === 'instant'}
                      onChange={() => setSelectedSlot('instant')}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>⚡ 60-Min Instant Dispatch (Fastest)</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>
                        Certified eMedic arrives at your Bangalore doorstep within 60 minutes
                      </div>
                    </div>
                  </label>
                  <label className="slot-option-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <input 
                      type="radio" 
                      name="slot" 
                      value="morning" 
                      checked={selectedSlot === 'morning'}
                      onChange={() => setSelectedSlot('morning')}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>📅 Scheduled Tomorrow Morning (6:30 AM - 9:30 AM)</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-500)' }}>
                        Ideal for 10-12 hour fasting blood tests & full body checkups
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Hardcopy Addon */}
              <div style={{ 
                background: '#fff', 
                border: '1.5px solid var(--border-medium)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} style={{ color: 'var(--brand-500)' }} />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink-900)' }}>
                      Physical Printed Report Booklet
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-500)' }}>
                      High quality spiral bound report delivered to doorstep (+₹99)
                    </div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={includeHardcopy} 
                  onChange={(e) => setIncludeHardcopy(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--brand-500)' }}
                />
              </div>

              {/* Coupon Box */}
              <div>
                <form onSubmit={handleApplyCoupon} className="coupon-input-group">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. BHARATH250)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <button type="button" onClick={handleRemoveCoupon} className="btn-apply-coupon" style={{ background: '#DC2626' }}>
                      Remove
                    </button>
                  ) : (
                    <button type="submit" className="btn-apply-coupon">
                      Apply
                    </button>
                  )}
                </form>
                {couponError && (
                  <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '6px', fontWeight: 600 }}>
                    {couponError}
                  </div>
                )}
                {appliedCoupon && (
                  <div style={{ color: 'var(--green-600)', fontSize: '12px', marginTop: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Coupon {appliedCoupon.code} applied! Saved ₹{couponDiscount}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="bill-summary">
              <div className="bill-row">
                <span>Total Test MRP</span>
                <span>₹{origTotal.toFixed(0)}</span>
              </div>
              <div className="bill-row" style={{ color: 'var(--green-600)' }}>
                <span>Bharath Jan Sewa Lab Subsidy</span>
                <span>-₹{discountSavings.toFixed(0)}</span>
              </div>
              {appliedCoupon && (
                <div className="bill-row" style={{ color: 'var(--green-600)' }}>
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              {includeHardcopy && (
                <div className="bill-row">
                  <span>Printed Report Delivery</span>
                  <span>+₹99</span>
                </div>
              )}
              <div className="bill-row">
                <span>{collectionMode === 'home' ? 'Home Sample Collection' : 'Centre Walk-in Sample Collection'}</span>
                <span style={{ color: homeCollectionFee === 0 ? 'var(--green-600)' : 'var(--ink-800)', fontWeight: 700 }}>
                  {homeCollectionFee === 0 ? 'FREE' : '+₹100'}
                </span>
              </div>
              <div className="bill-row total">
                <span>To Pay</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button" 
                onClick={handleWhatsAppCheckout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '15px 22px',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.715-.514-5.267-1.408l-.377-.217-3.916 1.027 1.045-3.817-.247-.393c-1.002-1.59-1.532-3.433-1.531-5.32 0-5.419 4.408-9.827 9.829-9.827 2.624 0 5.091 1.023 6.947 2.88 1.857 1.858 2.879 4.325 2.878 6.95 0 5.421-4.409 9.827-9.828 9.827m0-21.848C5.463 0 0 5.463 0 12c0 2.094.545 4.137 1.58 5.938L0 24l6.236-1.635C8.003 23.364 10.024 24 12.051 24c6.537 0 11.949-5.412 11.949-11.95 0-3.193-1.243-6.195-3.501-8.453C18.241 1.339 15.24 0 12.051 0z"/>
                </svg>
                <span>Book Now via WhatsApp</span>
                <ArrowRight size={18} />
              </button>

              <div style={{
                textAlign: 'center',
                fontSize: '12.5px',
                color: '#64748B',
                lineHeight: 1.5,
                padding: '4px 8px'
              }}>
                💬 Instant WhatsApp Booking • Zero advance payment • Pay after sample collection
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
