import React, { useState } from 'react';
import { FileText, Calendar, Users, Download, Eye, Plus, ShieldCheck, User } from 'lucide-react';
import { MOCK_USER_REPORTS } from '../data/mockData';

export default function PatientPortal({ onOpenReportViewer, openBookingWizard }) {
  const [activeSubTab, setActiveSubTab] = useState('reports');
  
  const [familyMembers, setFamilyMembers] = useState([
    { id: 'fm-1', name: 'Afi Kumar', relation: 'Self', age: 34, gender: 'Male', bloodGroup: 'O+' },
    { id: 'fm-2', name: 'Ramesh Kumar', relation: 'Father', age: 64, gender: 'Male', bloodGroup: 'B+' },
    { id: 'fm-3', name: 'Sunitha Kumar', relation: 'Mother', age: 59, gender: 'Female', bloodGroup: 'A+' }
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Spouse');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [newMemberGender, setNewMemberGender] = useState('Female');

  const handleAddFamilyMember = (e) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember = {
      id: 'fm-' + (familyMembers.length + 1),
      name: newMemberName,
      relation: newMemberRelation,
      age: newMemberAge || '30',
      gender: newMemberGender,
      bloodGroup: 'B+'
    };
    setFamilyMembers([...familyMembers, newMember]);
    setNewMemberName('');
  };

  return (
    <div style={{ padding: '3rem 0 5rem', background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Top User Profile Header */}
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
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #071E33, #0284C7)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.4rem'
            }}>
              AK
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>My BJSL Patient Portal</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Account: Afi Kumar (+91 98765 43210) • 2 Ready Reports
              </div>
            </div>
          </div>

          <button onClick={openBookingWizard} className="btn-primary">
            + Book New Test
          </button>
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
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeSubTab === 'reports' ? '#0284C7' : '#64748B',
              borderBottom: activeSubTab === 'reports' ? '3px solid #0284C7' : 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={16} /> My Lab Reports ({MOCK_USER_REPORTS.length})
          </button>

          <button
            onClick={() => setActiveSubTab('family')}
            style={{
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeSubTab === 'family' ? '#0284C7' : '#64748B',
              borderBottom: activeSubTab === 'family' ? '3px solid #0284C7' : 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={16} /> Family Profiles ({familyMembers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('appointments')}
            style={{
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeSubTab === 'appointments' ? '#0284C7' : '#64748B',
              borderBottom: activeSubTab === 'appointments' ? '3px solid #0284C7' : 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={16} /> Active Bookings
          </button>
        </div>

        {/* 1. MY LAB REPORTS TAB */}
        {activeSubTab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {MOCK_USER_REPORTS.map(rep => (
              <div 
                key={rep.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#D1FAE5', padding: '2px 8px', borderRadius: '4px' }}>
                      ✓ {rep.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Report ID: {rep.id} • {rep.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    {rep.testName}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                    Patient: <strong>{rep.patientName}</strong> ({rep.age} Yrs, {rep.gender})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    Authorized by: {rep.pathologist}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => onOpenReportViewer(rep)}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    <Eye size={15} /> View Report
                  </button>

                  <button 
                    onClick={() => onOpenReportViewer(rep)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    <Download size={15} /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. FAMILY MEMBERS PROFILE MANAGER (Prompt Point 26) */}
        {activeSubTab === 'family' && (
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
                Add Family Member Profile
              </h3>
              <form onSubmit={handleAddFamilyMember} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Member Name" 
                    value={newMemberName} 
                    onChange={(e) => setNewMemberName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Relationship</label>
                  <select 
                    className="form-select"
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                  >
                    <option value="Self">Self</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Age</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Age" 
                    value={newMemberAge} 
                    onChange={(e) => setNewMemberAge(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-teal" style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}>
                    <Plus size={16} /> Add Profile
                  </button>
                </div>
              </form>
            </div>

            {/* List of Profiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {familyMembers.map(member => (
                <div key={member.id} style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{member.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {member.relation} • {member.age} Yrs ({member.gender})
                    </div>
                  </div>
                  <button 
                    onClick={openBookingWizard}
                    className="btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
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
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#F0F9FF', borderRadius: '12px', border: '1px solid #BAE6FD' }}>
              <Calendar size={24} color="#0284C7" />
              <div>
                <div style={{ fontWeight: 800, color: '#0F172A' }}>Scheduled Visit: Tomorrow, 07:30 AM</div>
                <div style={{ fontSize: '0.85rem', color: '#0369A1' }}>
                  Chirayu Full Body Check PRIME • Phlebotomist: Manjunath K. (+91 98765 00112)
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
