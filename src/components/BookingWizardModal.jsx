import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { INDIVIDUAL_TESTS, HEALTH_PACKAGES, TODAY_SHORT, TODAY_SLOTS } from '../data/mockData';

export default function BookingWizardModal({ 
  isOpen, 
  onClose, 
  cart, 
  setCart,
  onBookingSuccess
}) {
  const [step, setStep] = useState(1);

  // Form State
  const [pincode, setPincode] = useState('560094');
  const [areaName, setAreaName] = useState('Sanjaynagar, Bangalore');
  const [bookingType, setBookingType] = useState('home'); // 'home' or 'centre'
  const [selectedCentre, setSelectedCentre] = useState('Sanjaynagar Centre');
  
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TODAY_SLOTS[0]);

  const [patientName, setPatientName] = useState('Afi Kumar');
  const [patientPhone, setPatientPhone] = useState('9805543143');
  const [patientAge, setPatientAge] = useState('34');
  const [patientGender, setPatientGender] = useState('Male');
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, 80 Feet Road');
  const [landmark, setLandmark] = useState('Near RMV 2nd Stage Park');
  
  const [addedSearch, setAddedSearch] = useState('');

  if (!isOpen) return null;

  // Pricing math
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const totalMrp = cart.reduce((acc, item) => acc + item.mrp, 0);
  const totalSavings = totalMrp - subtotal;
  const homeCollectionFee = (subtotal >= 499 || bookingType === 'centre') ? 0 : 50;
  const finalPayable = subtotal + homeCollectionFee;

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleAddQuickTest = (test) => {
    if (!cart.some(i => i.id === test.id)) {
      setCart([...cart, test]);
    }
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    const bookingDetails = {
      bookingId: 'BJSL-' + Math.floor(100000 + Math.random() * 900000),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName,
      patientPhone,
      address: bookingType === 'home' ? address : selectedCentre,
      bookingType,
      items: cart,
      payable: finalPayable,
      status: 'Confirmed (Phlebotomist Assigned)'
    };
    onBookingSuccess(bookingDetails);
    setStep(5); // Success step
  };

  const allAvailableItems = [...INDIVIDUAL_TESTS, ...HEALTH_PACKAGES];
  const filteredQuickTests = addedSearch.trim() === '' ? [] : allAvailableItems.filter(i => i.name.toLowerCase().includes(addedSearch.toLowerCase())).slice(0, 4);

  return (
    <div className="modal-overlay" style={{ padding: '0.75rem' }}>
      <div 
        className="modal-card-white" 
        style={{ 
          maxWidth: '840px', 
          width: '100%',
          borderRadius: '28px',
          boxShadow: '0 30px 70px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '94vh'
        }}
      >
        
        {/* Mobile Header Bar */}
        <div style={{ 
          padding: '1.25rem 1.5rem', 
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
          color: 'white',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F87171', letterSpacing: '0.05em' }}>
              STEP {step} OF 5 • BJSL DIAGNOSTIC BOOKING
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', marginTop: '2px' }}>
              {step === 1 && '1. Choose Location & Service Mode'}
              {step === 2 && '2. Review Tests & Packages'}
              {step === 3 && '3. Select Date & Arrival Slot'}
              {step === 4 && '4. Patient & Address Details'}
              {step === 5 && '🎉 Sample Collection Confirmed!'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'rgba(255,255,255,0.15)', 
              color: 'white', 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Clean Step Indicator Pills */}
        {step < 5 && (
          <div style={{ 
            background: '#F8FAFC', 
            padding: '0.85rem 1.25rem', 
            borderBottom: '1px solid #E2E8F0',
            overflowX: 'auto'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content' }}>
              {[
                { num: 1, name: 'Service Mode' },
                { num: 2, name: `Cart (${cart.length})` },
                { num: 3, name: 'Date & Slot' },
                { num: 4, name: 'Patient Info' }
              ].map(s => (
                <div 
                  key={s.num}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: step === s.num ? '#EF4444' : (step > s.num ? '#D1FAE5' : 'white'),
                    color: step === s.num ? 'white' : (step > s.num ? '#059669' : '#64748B'),
                    border: `1px solid ${step === s.num ? '#EF4444' : '#E2E8F0'}`
                  }}
                >
                  <span>{step > s.num ? '✓' : s.num}.</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Scrollable Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* STEP 1: Service Mode Selection */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Home Collection Option Card */}
                <div 
                  onClick={() => setBookingType('home')}
                  style={{
                    border: `2px solid ${bookingType === 'home' ? '#EF4444' : '#E2E8F0'}`,
                    background: bookingType === 'home' ? '#FFF1F2' : 'white',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    boxShadow: bookingType === 'home' ? '0 10px 25px rgba(239, 68, 68, 0.15)' : 'none',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', background: 'white', padding: '12px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                    🩸
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0F172A', marginBottom: '4px' }}>
                      Free Home Sample Collection
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                      Certified DMLT phlebotomist visits your home anywhere in Bangalore with temperature-controlled cold-chain specimen tubes. <strong>FREE collection on orders ₹499+</strong>.
                    </p>
                  </div>
                </div>

                {/* Visit Centre Option Card */}
                <div 
                  onClick={() => setBookingType('centre')}
                  style={{
                    border: `2px solid ${bookingType === 'centre' ? '#EF4444' : '#E2E8F0'}`,
                    background: bookingType === 'centre' ? '#FFF1F2' : 'white',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    boxShadow: bookingType === 'centre' ? '0 10px 25px rgba(239, 68, 68, 0.15)' : 'none',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', background: 'white', padding: '12px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                    🏥
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0F172A', marginBottom: '4px' }}>
                      Visit Nearest BJSL Collection Centre
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                      Walk into any of our 10 Bangalore Diagnostic Centres (Sanjaynagar, Peenya, Kengeri, Ittamadu, KR Market, etc.)
                    </p>
                  </div>
                </div>

              </div>

              {bookingType === 'home' ? (
                <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '8px' }}>
                    Bangalore Delivery Location & Pincode
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '8px' }}>
                    <input 
                      type="text" 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)} 
                      placeholder="Pincode (560094)"
                      style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontWeight: 700 }}
                    />
                    <input 
                      type="text" 
                      value={areaName} 
                      onChange={(e) => setAreaName(e.target.value)} 
                      placeholder="Area Name"
                      style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontWeight: 700 }}
                    />
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#059669', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={15} /> Free Home Collection slot verified for {areaName} ({pincode})
                  </div>
                </div>
              ) : (
                <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '8px' }}>
                    Select Nearest BJSL Walk-In Centre
                  </label>
                  <select 
                    value={selectedCentre}
                    onChange={(e) => setSelectedCentre(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontWeight: 700, background: 'white' }}
                  >
                    <option value="Sanjaynagar Centre">BJSL Sanjaynagar (RMV Hospital Road)</option>
                    <option value="Peenya Centre">BJSL Peenya 2nd Stage (Industrial Area)</option>
                    <option value="Kengeri Centre">BJSL BDA Complex Kengeri Satellite Town</option>
                    <option value="Ittamadu Centre">BJSL Ittamadu / Banashankari 3rd Stage</option>
                    <option value="Subramanyapura Centre">BJSL Subramanyapura (Jayanagar Society)</option>
                    <option value="Jaraganahalli Centre">BJSL Jaraganahalli (JP Nagar 6th Phase)</option>
                  </select>
                </div>
              )}

            </div>
          )}

          {/* STEP 2: Tests & Cart Review */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Selected Diagnostic Tests ({cart.length})</h4>
                <span className="badge-pink-tag">Save ₹{totalSavings}</span>
              </div>

              {cart.length === 0 ? (
                <div style={{ background: '#FFF1F2', padding: '2rem', borderRadius: '16px', textAlign: 'center', color: '#EF4444', fontWeight: 700 }}>
                  Your test cart is empty. Please search and add a test below to proceed!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'white',
                      padding: '1rem 1.25rem',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                      <div>
                        <div style={{ fontWeight: 900, color: '#0F172A', fontSize: '1rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>{item.sampleType} • {item.fasting}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>₹{item.price}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>₹{item.mrp}</div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} style={{ background: '#FFF1F2', color: '#EF4444', border: 'none', padding: '8px', borderRadius: '10px' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add more tests search bar */}
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '8px' }}>
                  Add More Tests to Your Order
                </label>
                <input 
                  type="text" 
                  placeholder="🔍 Type CBC, HbA1c, Thyroid, Vitamin D, Full Body..."
                  value={addedSearch}
                  onChange={(e) => setAddedSearch(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                />

                {filteredQuickTests.length > 0 && (
                  <div style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '12px', marginTop: '8px', overflow: 'hidden' }}>
                    {filteredQuickTests.map(t => (
                      <div 
                        key={t.id} 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid #F1F5F9' }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>{t.name}</div>
                          <span style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 900 }}>₹{t.price}</span>
                        </div>
                        <button 
                          onClick={() => { handleAddQuickTest(t); setAddedSearch(''); }} 
                          className="btn-red-outline" 
                          style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                        >
                          + Add Test
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Payable Summary Card */}
              {cart.length > 0 && (
                <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', padding: '1.25rem', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569' }}>
                    <span>Total Market MRP:</span>
                    <span style={{ textDecoration: 'line-through' }}>₹{totalMrp}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#059669', fontWeight: 800, marginTop: '4px' }}>
                    <span>BJSL Offer Savings:</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
                    <span>Doorstep Phlebotomist Collection Fee:</span>
                    <span style={{ fontWeight: 800, color: '#059669' }}>
                      {homeCollectionFee === 0 ? 'FREE (₹0)' : '₹50'}
                    </span>
                  </div>
                  <div style={{ borderTop: '1px solid #FECDD3', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 900, color: '#0F172A' }}>
                    <span>Total Payable Amount:</span>
                    <span style={{ color: '#EF4444' }}>₹{finalPayable}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Collection Date & Time Slot */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '8px' }}>
                  Select Specimen Collection Date
                </label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  style={{ width: '100%', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid #CBD5E1', fontSize: '1rem', fontWeight: 800, background: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '8px' }}>
                  Select Phlebotomist Arrival Time Slot ({TODAY_SHORT})
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  {TODAY_SLOTS.map((slot, sidx) => (
                    <div 
                      key={sidx}
                      onClick={() => setSelectedTimeSlot(slot)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: `2px solid ${selectedTimeSlot === slot ? '#EF4444' : '#E2E8F0'}`,
                        background: selectedTimeSlot === slot ? '#FFF1F2' : 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        color: selectedTimeSlot === slot ? '#EF4444' : '#0F172A',
                        boxShadow: selectedTimeSlot === slot ? '0 4px 15px rgba(239, 68, 68, 0.15)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>⏱️</span>
                      <span>{slot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Details & Address */}
          {step === 4 && (
            <form onSubmit={handleCompleteBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Full Patient Name</label>
                  <input 
                    type="text" 
                    required 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Mobile Phone (For WhatsApp Report)</label>
                  <input 
                    type="tel" 
                    required 
                    value={patientPhone} 
                    onChange={(e) => setPatientPhone(e.target.value)} 
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Age (Years)</label>
                  <input 
                    type="number" 
                    required 
                    value={patientAge} 
                    onChange={(e) => setPatientAge(e.target.value)} 
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Gender</label>
                  <select 
                    value={patientGender} 
                    onChange={(e) => setPatientGender(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', background: 'white' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {bookingType === 'home' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Full Doorstep Address</label>
                    <input 
                      type="text" 
                      required 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '6px' }}>Landmark / Apartment Name</label>
                    <input 
                      type="text" 
                      value={landmark} 
                      onChange={(e) => setLandmark(e.target.value)} 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }}
                    />
                  </div>
                </>
              )}

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                <div style={{ fontWeight: 900, color: '#059669', fontSize: '0.95rem' }}>💳 Zero Advance Payment Required</div>
                <div style={{ fontSize: '0.85rem', color: '#047857' }}>Pay ₹{finalPayable} via Cash / UPI / Card after sample collection by certified phlebotomist.</div>
              </div>

              <button type="submit" className="btn-red-solid" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }}>
                Confirm Booking & Schedule Visit (Pay ₹{finalPayable})
              </button>
            </form>
          )}

          {/* STEP 5: Success Step */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '72px', height: '72px', background: '#DCFCE7', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={44} />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
                Sample Collection Booking Confirmed!
              </h2>
              <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '1.5rem' }}>
                Booking ID: <strong style={{ color: '#EF4444' }}>BJSL-982314</strong>
              </p>

              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                <div style={{ marginBottom: '8px' }}><strong>Patient:</strong> {patientName} ({patientAge} Yrs, {patientGender})</div>
                <div style={{ marginBottom: '8px' }}><strong>Date & Slot:</strong> {selectedDate} • {selectedTimeSlot}</div>
                <div style={{ marginBottom: '8px' }}><strong>Address:</strong> {bookingType === 'home' ? address : selectedCentre}</div>
                <div><strong>Total Amount Payable:</strong> ₹{finalPayable} (Pay after collection)</div>
              </div>

              <button onClick={onClose} className="btn-red-solid" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
                Done & Return to Site
              </button>
            </div>
          )}

        </div>

        {/* Wizard Mobile Bottom Sticky Action Bar */}
        {step < 4 && (
          <div style={{ 
            padding: '1rem 1.5rem', 
            background: '#FFFFFF', 
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-red-outline" style={{ padding: '0.65rem 1.25rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            <button 
              disabled={cart.length === 0}
              onClick={() => setStep(step + 1)} 
              className="btn-red-solid"
              style={{ padding: '0.75rem 1.75rem' }}
            >
              Next Step ({step + 1}/4) <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
