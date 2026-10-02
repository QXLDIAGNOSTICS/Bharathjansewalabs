import React from 'react';
import { Home, Activity, CalendarCheck, User, Sparkles } from 'lucide-react';

export default function MobileBottomNav({ currentTab, setCurrentTab, openBookingWizard, toggleAIChat, openPortal }) {
  return (
    <nav className="mobile-bottom-nav">
      {/* 1. Home */}
      <button 
        onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }}
        className="mobile-nav-btn"
        style={{ color: currentTab === 'home' ? '#EF4444' : '#1E293B' }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          background: currentTab === 'home' ? '#EF4444' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: currentTab === 'home' ? 'white' : '#1E293B'
        }}>
          <Home size={18} fill={currentTab === 'home' ? 'white' : 'none'} />
        </div>
        <span style={{ color: currentTab === 'home' ? '#EF4444' : '#1E293B', fontWeight: 800 }}>Home</span>
      </button>

      {/* 2. Tests */}
      <button 
        onClick={() => { setCurrentTab('packages'); window.scrollTo(0, 0); }}
        className="mobile-nav-btn"
        style={{ color: currentTab === 'packages' ? '#EF4444' : '#1E293B' }}
      >
        <Activity size={22} color={currentTab === 'packages' ? '#EF4444' : '#1E293B'} />
        <span style={{ fontWeight: 700 }}>Tests</span>
      </button>

      {/* 3. Ask AI (Central Elevated 3D Red Button without green circle) */}
      <button 
        onClick={toggleAIChat}
        className="mobile-nav-btn"
        style={{ position: 'relative', marginTop: '-18px' }}
        title="Ask BJSL AI Health Assistant"
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
          border: '2.5px solid #EF4444',
          boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2), 0 8px 25px rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #EF4444 0%, #DC2626 60%, #991B1B 100%)',
            boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.3), 0 4px 12px rgba(239, 68, 68, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="white" />
          </div>
        </div>
        <span style={{ color: '#0F172A', fontWeight: 800, fontSize: '0.75rem', marginTop: '2px' }}>Ask AI</span>
      </button>

      {/* 4. Bookings */}
      <button 
        onClick={openBookingWizard}
        className="mobile-nav-btn"
        style={{ color: '#1E293B' }}
      >
        <CalendarCheck size={22} color="#1E293B" />
        <span style={{ fontWeight: 700 }}>Bookings</span>
      </button>

      {/* 5. Profile / Patient Portal */}
      <button 
        onClick={() => { openPortal ? openPortal() : setCurrentTab('portal'); }}
        className="mobile-nav-btn"
        style={{ color: currentTab === 'portal' ? '#EF4444' : '#1E293B' }}
      >
        <User size={22} color={currentTab === 'portal' ? '#EF4444' : '#1E293B'} />
        <span style={{ fontWeight: 700 }}>Profile</span>
      </button>
    </nav>
  );
}

