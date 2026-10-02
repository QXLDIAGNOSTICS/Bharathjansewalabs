import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Eye, Shield, Check, RefreshCw, X, Zap } from 'lucide-react';

export default function LiquidGlassCustomizer({
  currentTheme,
  setTheme,
  blurLevel,
  setBlurLevel,
  liquidBlobsEnabled,
  setLiquidBlobsEnabled
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Apply root CSS custom property whenever blur level changes
  useEffect(() => {
    document.documentElement.style.setProperty('--glass-blur-amount', `${blurLevel}px`);
  }, [blurLevel]);

  // Apply theme class to document body
  useEffect(() => {
    document.body.classList.remove('theme-liquid-obsidian', 'theme-liquid-aurora');
    if (currentTheme !== 'crystal') {
      document.body.classList.add(`theme-liquid-${currentTheme}`);
    }
  }, [currentTheme]);

  return (
    <>
      {/* Floating Toggle Button (Bottom Left) */}
      <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 180 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="liquid-glass-btn"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '99px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 800,
            fontSize: '0.85rem',
            color: '#0F172A',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            cursor: 'pointer'
          }}
          title="Customize Liquid Glass UI/UX Physics"
        >
          <Sparkles size={18} color="#EF4444" />
          <span>Liquid Glass Controls</span>
        </button>
      </div>

      {/* Control Drawer Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '24px',
            zIndex: 190,
            width: '320px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '24px',
            padding: '1.25rem',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25), inset 0 1.5px 0 rgba(255, 255, 255, 1)',
            color: '#0F172A',
            animation: 'modalGlassPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '0.95rem' }}>
              <Zap size={18} color="#EF4444" />
              <span>Liquid Glass Physics</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'rgba(0,0,0,0.06)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Theme Preset Selector */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              Glass Specular Theme
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                onClick={() => setTheme('crystal')}
                style={{
                  background: currentTheme === 'crystal' ? '#EF4444' : '#F1F5F9',
                  color: currentTheme === 'crystal' ? 'white' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                💎 Frost
              </button>

              <button
                onClick={() => setTheme('obsidian')}
                style={{
                  background: currentTheme === 'obsidian' ? '#EF4444' : '#F1F5F9',
                  color: currentTheme === 'obsidian' ? 'white' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                🌌 Obsidian
              </button>

              <button
                onClick={() => setTheme('aurora')}
                style={{
                  background: currentTheme === 'aurora' ? '#EF4444' : '#F1F5F9',
                  color: currentTheme === 'aurora' ? 'white' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ✨ Aurora
              </button>
            </div>
          </div>

          {/* Backdrop Blur Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', marginBottom: '6px' }}>
              <span>Glass Blur Intensity</span>
              <span style={{ color: '#EF4444' }}>{blurLevel}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="40"
              step="4"
              value={blurLevel}
              onChange={(e) => setBlurLevel(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }}
            />
          </div>

          {/* Liquid Blobs Background Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
              Ambient Liquid Flow Orbs
            </span>
            <input
              type="checkbox"
              checked={liquidBlobsEnabled}
              onChange={(e) => setLiquidBlobsEnabled(e.target.checked)}
              style={{ accentColor: '#EF4444', width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
