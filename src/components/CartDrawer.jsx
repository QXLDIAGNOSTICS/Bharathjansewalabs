import React, { useState } from 'react';
import { X, Trash2, Zap, Calendar, Check, ArrowRight, ShieldCheck, FileText, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function CartDrawer({ isOpen, onClose, cart, setCart, onProceedToBooking }) {
  const [selectedSlot, setSelectedSlot] = useState('instant');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [includeHardcopy, setIncludeHardcopy] = useState(false);

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
  const finalPayable = Math.max(0, subtotal - couponDiscount + hardcopyFee);

  const handleWhatsAppCheckout = () => {
    const itemsList = cart.map((item, idx) => `${idx + 1}. ${item.name || item.title} (₹${item.price})`).join('%0A');
    const slotText = selectedSlot === 'instant' ? 'Instant 60-Min Phlebotomist' : 'Scheduled Morning Slot';
    const msg = `*Namaste Bharath Jan Sewa Labs!*%0A%0AI would like to book home collection for:%0A${itemsList}%0A%0A*Total Payable:* ₹${finalPayable}%0A*Preferred Slot:* ${slotText}%0A*Location:* Bangalore%0A%0APlease confirm my booking.`;
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
                        Free Home Collection
                      </span>
                    </div>
                  </div>
                ))}
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
                <span>Home Sample Collection Fee</span>
                <span style={{ color: 'var(--green-600)', fontWeight: 700 }}>FREE</span>
              </div>
              <div className="bill-row total">
                <span>To Pay</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                type="button" 
                onClick={handleWhatsAppCheckout}
                className="btn-checkout"
              >
                <span>Book Sample Collection (WhatsApp)</span>
                <ArrowRight size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => {
                  onClose();
                  if (onProceedToBooking) onProceedToBooking();
                }}
                style={{
                  background: '#F1EAE2',
                  color: 'var(--ink-900)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Or Continue Online Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
