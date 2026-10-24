import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Users, Download, Eye, Plus, ShieldCheck, 
  User, Lock, Smartphone, KeyRound, LogOut, CheckCircle2, 
  ArrowRight, Sparkles, Clock, AlertCircle 
} from 'lucide-react';
import { MOCK_USER_REPORTS } from '../data/mockData';

// Helper to extract clean dynamic initials from any user's real full name
const getInitials = (name) => {
  if (!name) return 'PT';
  const clean = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'PT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function PatientPortal({ onOpenReportViewer, openBookingWizard }) {
  // Session authentication state (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bjsl_patient_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Portal sub-tabs (only visible when logged in)
  const [activeSubTab, setActiveSubTab] = useState('reports');

  // Login form state
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [authStep, setAuthStep] = useState(1); // 1 = Phone & Name, 2 = 4-digit OTP
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic family members list initialized with logged-in user
  const [familyMembers, setFamilyMembers] = useState(() => {
    if (!currentUser) return [];
    return [
      { id: 'fm-1', name: currentUser.name, relation: 'Self', age: currentUser.age || 32, gender: currentUser.gender || 'Male', bloodGroup: 'O+' },
      { id: 'fm-2', name: 'Ramesh Verma', relation: 'Father', age: 64, gender: 'Male', bloodGroup: 'B+' },
      { id: 'fm-3', name: 'Sunitha Verma', relation: 'Mother', age: 59, gender: 'Female', bloodGroup: 'A+' }
    ];
  });

  // Keep family members in sync when user logs in or changes
  useEffect(() => {
    if (currentUser) {
      setFamilyMembers(prev => {
        if (prev.length > 0 && prev[0].relation === 'Self') {
          return [
            { ...prev[0], name: currentUser.name },
            ...prev.slice(1)
          ];
        }
        return [
          { id: 'fm-1', name: currentUser.name, relation: 'Self', age: currentUser.age || 32, gender: currentUser.gender || 'Male', bloodGroup: 'O+' },
          { id: 'fm-2', name: 'Ramesh Verma', relation: 'Father', age: 64, gender: 'Male', bloodGroup: 'B+' },
          { id: 'fm-3', name: 'Sunitha Verma', relation: 'Mother', age: 59, gender: 'Female', bloodGroup: 'A+' }
        ];
      });
    }
  }, [currentUser]);

  // Form state for adding family members
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Spouse');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [newMemberGender, setNewMemberGender] = useState('Female');

  // Handle Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!fullName.trim()) {
      setAuthError('Please enter your full name for your medical profile.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthStep(2);
    }, 500);
  };

  // Handle OTP digit input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setAuthError('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setAuthError('');

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setAuthError('Please enter the complete 4-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      const formattedPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
      
      const userData = {
        name: fullName.trim(),
        phone: formattedPhone,
        rawPhone: cleanPhone,
        age: 32,
        gender: 'Male',
        memberSince: 'October 2026'
      };

      localStorage.setItem('bjsl_patient_session', JSON.stringify(userData));
      setCurrentUser(userData);
      window.dispatchEvent(new Event('bjsl_auth_change'));
    }, 600);
  };

  // Quick Demo Login helper
  const handleDemoLogin = (demoName, demoPhone) => {
    const userData = {
      name: demoName,
      phone: demoPhone,
      rawPhone: demoPhone.replace(/\D/g, ''),
      age: 34,
      gender: demoName.includes('Sunita') ? 'Female' : 'Male',
      memberSince: 'October 2026'
    };

    localStorage.setItem('bjsl_patient_session', JSON.stringify(userData));
    setCurrentUser(userData);
    window.dispatchEvent(new Event('bjsl_auth_change'));
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('bjsl_patient_session');
    setCurrentUser(null);
    setAuthStep(1);
    setOtp(['', '', '', '']);
    setPhone('');
    setFullName('');
    setAuthError('');
    window.dispatchEvent(new Event('bjsl_auth_change'));
  };

  // Add Family Member Profile
  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newMember = {
      id: 'fm-' + (familyMembers.length + 1),
      name: newMemberName.trim(),
      relation: newMemberRelation,
      age: newMemberAge || '28',
      gender: newMemberGender,
      bloodGroup: 'B+'
    };
    setFamilyMembers([...familyMembers, newMember]);
    setNewMemberName('');
    setNewMemberAge('');
  };

  // Reports personalized for the logged in user
  const userReports = currentUser ? MOCK_USER_REPORTS.map(rep => ({
    ...rep,
    patientName: currentUser.name,
    age: currentUser.age || rep.age,
    gender: currentUser.gender || rep.gender
  })) : [];

  return (
    <div style={{ padding: '3rem 0 5rem', background: '#F8FAFC', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: currentUser ? '960px' : '560px' }}>
        
        {/* ============================================================== */}
        {/* SCENARIO 1: PATIENT NOT LOGGED IN -> SECURE LOGIN CARD         */}
        {/* ============================================================== */}
        {!currentUser ? (
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.12)',
            textAlign: 'center'
          }}>
            
            {/* Header Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 800,
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={16} /> 256-Bit Encrypted • NABL Patient Portal
            </div>

            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: '#071E33',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.25
            }}>
              Patient Sign In
            </h1>

            <p style={{
              fontSize: '0.925rem',
              color: '#64748B',
              marginBottom: '2rem',
              lineHeight: 1.5
            }}>
              {authStep === 1 
                ? 'Enter your mobile number and name to access your authentic NABL lab reports, view booked visits, and download certificates.'
                : `We've sent a 4-digit verification code to +91 ${phone.replace(/\D/g, '').slice(-10)}.`}
            </p>

            {/* Error Message Alert */}
            {authError && (
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#DC2626',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'left'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            {/* STEP 1: Enter Phone & Name */}
            {authStep === 1 && (
              <form onSubmit={handleSendOtp} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                    Full Name (Patient / Account Holder)*
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                      <User size={18} />
                    </div>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem 0.85rem 2.6rem',
                        borderRadius: '14px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.95rem',
                        color: '#0F172A',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        background: '#F8FAFC'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0284C7'}
                      onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                    Mobile Number (10 Digits)*
                  </label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      background: '#F1F5F9',
                      border: '1.5px solid #CBD5E1',
                      borderRight: 'none',
                      borderTopLeftRadius: '14px',
                      borderBottomLeftRadius: '14px',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: '#334155',
                      gap: '4px'
                    }}>
                      <span>🇮🇳 +91</span>
                    </div>
                    <input 
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderTopRightRadius: '14px',
                        borderBottomRightRadius: '14px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#0F172A',
                        outline: 'none',
                        background: '#F8FAFC'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0284C7'}
                      onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    We'll send an authentication code to this number.
                  </span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #071E33, #0284C7)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.25)',
                    marginTop: '0.5rem',
                    transition: 'transform 0.15s, box-shadow 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {isSubmitting ? 'Sending OTP...' : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Enter 4-digit OTP */}
            {authStep === 2 && (
              <form onSubmit={handleVerifyOtp} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '1rem 0' }}>
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[idx]}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        autoFocus={idx === 0}
                        style={{
                          width: '54px',
                          height: '60px',
                          borderRadius: '12px',
                          border: '2px solid #CBD5E1',
                          textAlign: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          color: '#071E33',
                          outline: 'none',
                          background: '#F8FAFC'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0284C7'}
                        onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                      />
                    ))}
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: '#059669',
                    background: '#ECFDF5',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    fontWeight: 700
                  }}>
                    💡 Demo Access: Enter <strong>1234</strong> or any 4 digits to sign in
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #071E33, #0284C7)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.25)'
                  }}
                >
                  {isSubmitting ? 'Verifying OTP...' : (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Verify & Access Portal</span>
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <button 
                    type="button" 
                    onClick={() => { setAuthStep(1); setOtp(['', '', '', '']); }}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← Change Mobile Number
                  </button>
                  <button 
                    type="button" 
                    onClick={() => alert('New OTP sent to +91 ' + phone)}
                    style={{ background: 'none', border: 'none', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            {/* Quick Demo Login Option */}
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid #E2E8F0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                Or Try One-Click Demo Profiles
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Rahul Sharma', '+91 98450 12345')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#E0F2FE'; e.currentTarget.style.borderColor = '#38BDF8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                >
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#0284C7', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>RS</span>
                  <span>Rahul Sharma (+91 98450 12345)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('Dr. Sunita Patel', '+91 98860 99882')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#E0F2FE'; e.currentTarget.style.borderColor = '#38BDF8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                >
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#0D9488', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>SP</span>
                  <span>Dr. Sunita Patel (+91 98860 99882)</span>
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed #E2E8F0',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#64748B'
            }}>
              <div>
                <strong style={{ color: '#0F172A', display: 'block', marginBottom: '2px' }}>🔒 100% Confidential</strong>
                ISO 27001 & DISHA Compliant
              </div>
              <div>
                <strong style={{ color: '#0F172A', display: 'block', marginBottom: '2px' }}>⚡ Instant PDF</strong>
                NABL QR-Verified Reports
              </div>
              <div>
                <strong style={{ color: '#0F172A', display: 'block', marginBottom: '2px' }}>👨‍👩‍👧‍👦 Family Access</strong>
                Unified Family Health History
              </div>
            </div>

          </div>
        ) : (

        /* ============================================================== */
        /* SCENARIO 2: AUTHENTICATED USER PORTAL                          */
        /* ============================================================== */
        <>
          {/* Top User Profile Header with Dynamic Initials & Actual Name */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #071E33, #0284C7)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.45rem',
                letterSpacing: '0.02em',
                boxShadow: '0 8px 18px rgba(2, 132, 199, 0.25)',
                border: '3px solid white'
              }}>
                {getInitials(currentUser.name)}
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#071E33', letterSpacing: '-0.02em' }}>
                  My BJSL Patient Portal
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
                  Account: <strong style={{ color: '#0F172A' }}>{currentUser.name}</strong> ({currentUser.phone}) • {userReports.length} Ready Reports
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={openBookingWizard} className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                + Book New Test
              </button>

              <button 
                onClick={handleLogout}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  borderRadius: '12px',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#475569'; }}
                title="Sign out of patient portal"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab Navigation Bar */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '2px solid #E2E8F0',
            marginBottom: '2rem',
            overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveSubTab('reports')}
              style={{
                padding: '10px 18px',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: activeSubTab === 'reports' ? '#0284C7' : '#64748B',
                borderBottom: activeSubTab === 'reports' ? '3px solid #0284C7' : 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <FileText size={17} /> My Lab Reports ({userReports.length})
            </button>

            <button
              onClick={() => setActiveSubTab('family')}
              style={{
                padding: '10px 18px',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: activeSubTab === 'family' ? '#0284C7' : '#64748B',
                borderBottom: activeSubTab === 'family' ? '3px solid #0284C7' : 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Users size={17} /> Family Profiles ({familyMembers.length})
            </button>

            <button
              onClick={() => setActiveSubTab('appointments')}
              style={{
                padding: '10px 18px',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: activeSubTab === 'appointments' ? '#0284C7' : '#64748B',
                borderBottom: activeSubTab === 'appointments' ? '3px solid #0284C7' : 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Calendar size={17} /> Active Bookings (1)
            </button>
          </div>

          {/* 1. MY LAB REPORTS TAB */}
          {activeSubTab === 'reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {userReports.map(rep => (
                <div 
                  key={rep.id}
                  style={{
                    background: 'white',
                    borderRadius: '18px',
                    padding: '1.75rem',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#D1FAE5', padding: '3px 10px', borderRadius: '99px' }}>
                        ✓ {rep.status}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                        Report ID: <strong>{rep.id}</strong> • {rep.date}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      {rep.testName}
                    </h3>

                    <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                      Patient: <strong style={{ color: '#071E33' }}>{currentUser.name}</strong> ({rep.age} Yrs, {rep.gender})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '3px' }}>
                      Authorized Pathologist: <strong>{rep.pathologist}</strong> • NABL Central Facility
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button 
                      onClick={() => onOpenReportViewer(rep)}
                      className="btn-secondary"
                      style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Eye size={16} /> View Report
                    </button>

                    <button 
                      onClick={() => onOpenReportViewer(rep)}
                      className="btn-primary"
                      style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Download size={16} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. FAMILY MEMBERS PROFILE MANAGER */}
          {activeSubTab === 'family' && (
            <div>
              <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #E2E8F0', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                  Add Family Member Profile
                </h3>
                <form onSubmit={handleAddFamilyMember} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Full Name*</label>
                    <input 
                      type="text" 
                      required
                      className="form-input" 
                      placeholder="e.g. Anjali Sharma" 
                      value={newMemberName} 
                      onChange={(e) => setNewMemberName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Relationship*</label>
                    <select 
                      className="form-select"
                      value={newMemberRelation}
                      onChange={(e) => setNewMemberRelation(e.target.value)}
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Age</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="e.g. 29" 
                      value={newMemberAge} 
                      onChange={(e) => setNewMemberAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Gender</label>
                    <select 
                      className="form-select"
                      value={newMemberGender}
                      onChange={(e) => setNewMemberGender(e.target.value)}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gridColumn: 'span 1' }}>
                    <button type="submit" className="btn-teal" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                      <Plus size={16} /> Add Profile
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Profiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {familyMembers.map(member => (
                  <div key={member.id} style={{
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: member.relation === 'Self' ? '#0284C7' : '#0D9488',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}>
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{member.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                          <span style={{ fontWeight: 700, color: member.relation === 'Self' ? '#0284C7' : '#0D9488' }}>{member.relation}</span> • {member.age} Yrs ({member.gender})
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={openBookingWizard}
                      className="btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      Book Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ACTIVE APPOINTMENTS TAB */}
          {activeSubTab === 'appointments' && (
            <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #E2E8F0' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.25rem',
                background: '#F0F9FF',
                borderRadius: '16px',
                border: '1px solid #BAE6FD'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(2, 132, 199, 0.15)',
                  flexShrink: 0
                }}>
                  <Calendar size={24} color="#0284C7" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 800, background: '#0284C7', color: 'white', padding: '2px 8px', borderRadius: '99px' }}>
                      SCHEDULED
                    </span>
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
                      Tomorrow, 07:30 AM (Fasting Sample)
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#0369A1', marginTop: '4px' }}>
                    Chirayu Full Body Check PRIME • Assigned Phlebotomist: <strong>Manjunath K.</strong> (+91 98055 43143)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
                    Home Collection Cold Chain: Active & Calibrated (2°C - 8°C Barcoded Vials)
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        )}

      </div>
    </div>
  );
}
