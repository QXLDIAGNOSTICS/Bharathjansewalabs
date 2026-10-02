import React, { useState } from 'react';
import { X, CheckCircle2, Building2, TrendingUp, ShieldCheck, Send } from 'lucide-react';
import { FRANCHISE_INFO } from '../data/mockData';

export default function FranchiseModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Bangalore',
    state: 'Karnataka',
    currentBusiness: '',
    investmentRange: '₹5 Lakhs - ₹8 Lakhs',
    propertyAvailable: 'Yes',
    propertyLocation: '',
    experience: 'Healthcare / Pharmacy',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '780px' }}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D9488', textTransform: 'uppercase' }}>
              Franchise Conversion Funnel
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              Start Your BJSL Diagnostic Collection Centre
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!submitted ? (
            <div>
              {/* ROI & Key Investment Highlights */}
              <div style={{
                background: 'linear-gradient(135deg, #071E33 0%, #0C3866 100%)',
                color: 'white',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Capital Investment</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38BDF8' }}>{FRANCHISE_INFO.investmentRange}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Space Required</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>{FRANCHISE_INFO.spaceRequired}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Est. Payback</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FBBF24' }}>{FRANCHISE_INFO.paybackPeriod}</div>
                </div>
              </div>

              {/* Dedicated Franchise Lead Enquiry Form (Prompt Point 18) */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target City / Town *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Investment Range</label>
                    <select 
                      className="form-select"
                      value={formData.investmentRange}
                      onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                    >
                      <option value="₹5 Lakhs - ₹8 Lakhs">₹5 Lakhs - ₹8 Lakhs</option>
                      <option value="₹8 Lakhs - ₹12 Lakhs">₹8 Lakhs - ₹12 Lakhs</option>
                      <option value="₹12 Lakhs+">Above ₹12 Lakhs</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Do you have a commercial property?</label>
                    <select 
                      className="form-select"
                      value={formData.propertyAvailable}
                      onChange={(e) => setFormData({ ...formData, propertyAvailable: e.target.value })}
                    >
                      <option value="Yes">Yes, Owned / Rented Space Available</option>
                      <option value="Searching">Currently Searching for Location</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Property Address / Location Details (If available)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Main Road, Jayanagar 4th Block, Bangalore"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prior Background & Additional Message</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3}
                    placeholder="Tell us about your background (Pharmacy owner, Lab tech, Healthcare professional, Investor, etc.)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-teal" style={{ padding: '0.85rem', width: '100%', justifyContent: 'center' }}>
                  <Send size={18} /> Submit Franchise Partner Application
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', background: '#D1FAE5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={38} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                Franchise Application Received!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
                Thank you <strong>{formData.name}</strong>. Our Franchise Expansion Lead will contact you at <strong>+91 {formData.phone}</strong> within 24 business hours to discuss territory feasibility in {formData.city}.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
