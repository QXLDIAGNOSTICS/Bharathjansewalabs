import React from 'react';
import { X, ShieldCheck, FileText, Gift } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Bharath Jan Sewa Labs (BJSL) Patient Data Protection & Confidentiality Policy',
      icon: <ShieldCheck size={24} color="#059669" />,
      body: (
        <div>
          <p><strong>Effective Date:</strong> January 1, 2026 | <strong>Last Updated:</strong> October 2026</p>
          <p>At Bharath Jan Sewa Labs (BJSL), accessible from <code>bharathjansewalabs.com</code>, patient confidentiality, medical data privacy, and diagnostic integrity are our top priorities.</p>
          
          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>1. Collection of Diagnostic & Personal Data</h4>
          <p>When you book a blood test, doorstep sample collection, or health checkup package, we collect necessary personal details including your name, contact phone number, email address, home address, age, gender, and referring physician details.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>2. Use of Diagnostic Laboratory Data</h4>
          <p>Your blood sample reports and diagnostic findings are processed under strict NABL laboratory guidelines. Test reports are encrypted and delivered directly to your registered WhatsApp number and email ID. We do not sell or share patient health records with third-party advertisers.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>3. Sample Handling & Security</h4>
          <p>All biological specimens are barcode-tagged at the point of collection. Data stored in our Laboratory Information System (LIS) is protected with TLS 1.3 encryption and access-controlled by certified pathologists.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>4. Patient Rights</h4>
          <p>Patients have the right to request access to their historical diagnostic reports or request deletion of personal contact profiles by writing to <code>contact@bharathjansewalabs.com</code>.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Standard Operating Terms for Bharath Jan Sewa Labs Services & Collection Centres',
      icon: <FileText size={24} color="#0284C7" />,
      body: (
        <div>
          <p>Welcome to Bharath Jan Sewa Labs. By accessing our services, visiting our collection hubs, or booking doorstep phlebotomy, you agree to comply with these terms.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>1. Diagnostic Service Scope</h4>
          <p>Bharath Jan Sewa Labs provides specimen collection and diagnostic testing processed at NABL-accredited reference laboratories. Laboratory test reports are intended to assist registered medical practitioners and do not replace formal clinical consultation.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>2. Appointments & Fasting Protocols</h4>
          <p>Patients are responsible for following test preparation protocols (such as 10-12 hours fasting for Lipid/FBS/HbA1c profiles). BJSL is not liable for skewed test results resulting from non-compliance with fasting instructions.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>3. Transparent Pricing & Cancellations</h4>
          <p>All package prices displayed on our website are inclusive of sample processing. Free home collection applies for bookings of ₹499 or above. Cancellations made 2 hours prior to phlebotomist dispatch incur zero cancellation fee.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>4. Report Turnaround Time (TAT)</h4>
          <p>Routine test reports are delivered on the same day (4-8 hours). Specialized profiles (such as ALL IN ONE Allergy panels) require up to 3 days for complete multi-allergen incubation.</p>
        </div>
      )
    },
    promo: {
      title: 'Promo Terms & Conditions',
      subtitle: 'Special Offers, Package Discounts & Home Collection Campaign Rules',
      icon: <Gift size={24} color="#EF4444" />,
      body: (
        <div>
          <p>Special promotional pricing (50–70% lower than market rates) applies to all Chirayu Full Body Checkup packages booked online or at BJSL Bangalore collection hubs.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>1. Promotional Discount Rates</h4>
          <p>Displayed prices (e.g. Chirayu PRIME at ₹796 instead of ₹2,388, Chirayu MASTER at ₹1,566 instead of ₹5,698, and ALL IN ONE at ₹6,366 instead of ₹16,630) represent pre-applied promotional rates.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>2. Free Home Collection Eligibility</h4>
          <p>Free doorstep sample collection applies across covered Bangalore neighborhoods (Sanjaynagar, Peenya, Kengeri, Banashankari, Subramanyapura, etc.) on order values of ₹499 and above.</p>

          <h4 style={{ color: '#0F172A', marginTop: '1.25rem', marginBottom: '0.5rem' }}>3. Validity & Combination</h4>
          <p>Promotional offers cannot be combined with institutional bulk camp discounts unless authorized by BJSL central administration.</p>
        </div>
      )
    }
  };

  const currentLegal = contentMap[type] || contentMap.privacy;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentLegal.icon}
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {currentLegal.title}
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                {currentLegal.subtitle}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.6, maxHeight: '60vh', overflowY: 'auto' }}>
          {currentLegal.body}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.65rem 1.75rem', borderRadius: '10px' }}>
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
