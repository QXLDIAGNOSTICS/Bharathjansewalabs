import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ShieldCheck, ArrowRight, User, HelpCircle, PhoneCall, CheckCircle, Globe, Languages, Stethoscope, FileText, MapPin } from 'lucide-react';
import { INDIVIDUAL_TESTS, HEALTH_PACKAGES } from '../data/mockData';

export default function AIChatBotModal({ isOpen, onClose, onBookTest }) {
  const [input, setInput] = useState('');
  const [selectedLang, setSelectedLang] = useState('en'); // 'en', 'hi', 'kn', 'ta', 'te'
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am your BJSL AI Health & Diagnostic Assistant. Ask me anything about blood tests, health checkup packages, fasting rules, sample collection, or report delivery.',
      textHi: 'नमस्ते! मैं आपका बीजेएसएल एआई स्वास्थ्य एवं निदान सहायक हूं। मुझसे ब्लड टेस्ट, हेल्थ चेकअप पैकेज या होम कलेक्शन के बारे में कुछ भी पूछें।',
      textKn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಬಿಜೆಎಸ್ಎಲ್ ಎಐ ಆರೋಗ್ಯ ಮತ್ತು ರೋಗನಿರ್ಣಯ ಸಹಾಯಕ. ರಕ್ತ ಪರೀಕ್ಷೆಗಳು, ಹೆಲ್ತ್ ಪ್ಯಾಕೇಜ್‌ಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.'
    }
  ]);

  if (!isOpen) return null;

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', label: 'ಕನ್ನಡ', flag: '🟡🔴' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  const quickPrompts = [
    { en: 'Recommend Full Body Check', hi: 'फुल बॉडी चेकअप की सिफारिश', kn: 'ಫುಲ್ ಬಾಡಿ ಚೆಕಪ್ ಶಿಫಾರಸು' },
    { en: 'Fasting Rules for Diabetes', hi: 'डायबिटीज के लिए फास्टिंग नियम', kn: 'ಮಧುಮೇಹಕ್ಕೆ ಉಪವಾಸದ ನಿಯಮಗಳು' },
    { en: 'Chirayu PRIME vs MASTER', hi: 'चिरायु प्राइम और मास्टर में अंतर', kn: 'ಚಿರಾಯು ಪ್ರೈಮ್ ಮತ್ತು ಮಾಸ್ಟರ್ ವ್ಯತ್ಯಾಸ' },
    { en: 'Free Home Collection Bangalore', hi: 'मुफ्त होम कलेक्शन बैंगलोर', kn: 'ಉಚಿತ ಹೋಮ್ ಕಲೆಕ್ಷನ್ ಬೆಂಗಳೂರು' },
    { en: 'Same Day Report Delivery', hi: 'सैम डे रिपोर्ट डिलीवरी', kn: 'ಅದೇ ದಿನದ ವರದಿ ವಿತರಣೆ' },
    { en: 'Nearest BJSL Centre', hi: 'निकटतम बीजेएसएल केंद्र', kn: 'ಸಮೀಪದ ಬಿಜೆಎಸ್ಎಲ್ ಕೇಂದ್ರ' }
  ];

  const handleSend = (userText) => {
    const textToProcess = userText || input;
    if (!textToProcess.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToProcess };
    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInput('');

    // Generate AI Bot Response with Multilingual Support
    setTimeout(() => {
      let responseObj = {
        id: Date.now() + 1,
        sender: 'bot',
        text: '',
        textHi: '',
        textKn: '',
        recommendedPkg: null
      };

      const query = textToProcess.toLowerCase();

      if (query.includes('full body') || query.includes('recommend') || query.includes('checkup') || query.includes('बॉडी') || query.includes('ಬಾಡಿ')) {
        responseObj.text = 'We highly recommend Chirayu Full Body Check PRIME (71 Parameters) at ₹796 (MRP ₹2,388 - 66% OFF). Includes Lipids, Liver (LFT), Kidney (KFT), Fasting Glucose, Iron & CBC with free doorstep collection!';
        responseObj.textHi = 'हम चिरायु फुल बॉडी चेक प्राइम (71 पैरामीटर) को ₹796 (66% छूट) में देने की सिफारिश करते हैं। इसमें लिपिड, लिवर, किडनी, शुगर और सीबीसी शामिल हैं।';
        responseObj.textKn = 'ನಾವು ಚಿರಾಯು ಫುಲ್ ಬಾಡಿ ಚೆಕ್ ಪ್ರೈಮ್ (71 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು) ಅನ್ನು ₹796 (66% ರಿಯಾಯಿತಿ) ಗೆ ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ.';
        responseObj.recommendedPkg = HEALTH_PACKAGES[0];
      } else if (query.includes('fasting') || query.includes('rules') || query.includes('food') || query.includes('फास्टिंग') || query.includes('ಉಪವಾಸ')) {
        responseObj.text = 'For Fasting Blood Sugar, HbA1c, and Lipid Profile tests, 10 to 12 hours of overnight fasting is required (water allowed). Routine CBC, Vitamin D, and Thyroid tests do not require fasting.';
        responseObj.textHi = 'फास्टिंग ब्लड शुगर और लिपिड प्रोफाइल के लिए 10 से 12 घंटे का उपवास आवश्यक है (पानी पी सकते हैं)। सीबीसी और थायराइड के लिए उपवास की आवश्यकता नहीं है।';
        responseObj.textKn = 'ಫಾಸ್ಟಿಂಗ್ ಬ್ಲಡ್ ಶುಗರ್ ಮತ್ತು ಲಿಪಿಡ್ ಪ್ರೊಫೈಲ್‌ಗಾಗಿ 10 ರಿಂದ 12 ಗಂಟೆಗಳ ಕಾಲ ಉಪವಾಸ ಅಗತ್ಯವಿದೆ (ನೀರು ಕುಡಿಯಬಹುದು).';
      } else if (query.includes('prime') || query.includes('master') || query.includes('chirayu')) {
        responseObj.text = 'Chirayu PRIME (₹796) covers 71 parameters. Chirayu MASTER (₹1,566) covers 109 parameters including Vitamin D, B12, Thyroid profile, and Apolipoproteins!';
        responseObj.textHi = 'चिरायु प्राइम (₹796) में 71 टेस्ट हैं। चिरायु मास्टर (₹1,566) में 109 टेस्ट हैं जिनमें विटामिन डी, बी12 और थायराइड शामिल हैं!';
        responseObj.textKn = 'ಚಿರಾಯು ಪ್ರೈಮ್ (₹796) 71 ಟೆಸ್ಟ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಚಿರಾಯು ಮಾಸ್ಟರ್ (₹1,566) 109 ಟೆಸ್ಟ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ!';
        responseObj.recommendedPkg = HEALTH_PACKAGES[1];
      } else if (query.includes('home collection') || query.includes('free') || query.includes(' Bangalore') || query.includes('होम')) {
        responseObj.text = 'Home sample collection is 100% FREE across Bangalore on all bookings of ₹499 or above. Our certified phlebotomists maintain strict temperature cold-chain transport to NABL reference labs.';
        responseObj.textHi = '₹499 या अधिक की बुकिंग पर पूरे बैंगलोर में होम सैंपल कलेक्शन 100% मुफ्त है। हमारे तकनीशियन कोल्ड चेन में सैंपल पहुंचाते हैं।';
        responseObj.textKn = '₹499 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಬುಕಿಂಗ್‌ಗಳಿಗೆ ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಹೋಮ್ ಸ್ಯಾಂಪಲ್ ಕಲೆಕ್ಷನ್ 100% ಉಚಿತವಾಗಿದೆ.';
      } else if (query.includes('report') || query.includes('time') || query.includes('tat') || query.includes('रिपोर्ट')) {
        responseObj.text = 'All routine blood test reports are processed on automated systems and delivered on the SAME DAY within 4 to 8 hours via WhatsApp and Email PDF!';
        responseObj.textHi = 'सभी ब्लड टेस्ट रिपोर्ट उसी दिन 4 से 8 घंटे के भीतर व्हाट्सएप और ईमेल पीडीएफ द्वारा डिलीवर की जाती हैं!';
        responseObj.textKn = 'ಎಲ್ಲಾ ರಕ್ತ ಪರೀಕ್ಷೆಯ ವರದಿಗಳನ್ನು ಅದೇ ದಿನ 4 ರಿಂದ 8 ಗಂಟೆಗಳ ಒಳಗೆ ವಾಟ್ಸಾಪ್ ಮತ್ತು ಇಮೇಲ್ ಮೂಲಕ ಕಳುಹಿಸಲಾಗುತ್ತದೆ!';
      } else {
        responseObj.text = `Thank you for asking about "${textToProcess}". Our NABL-accredited labs deliver tests at 50–70% lower rates. You can call our helpline directly at +91 98055 43143 or book online!`;
        responseObj.textHi = `हमारे एनएबीएल मान्यता प्राप्त लैब 50-70% कम दरों पर टेस्ट प्रदान करते हैं। आप +91 98055 43143 पर कॉल कर सकते हैं!`;
        responseObj.textKn = `ನಮ್ಮ NABL ಮಾನ್ಯತೆ ಪಡೆದ ಲ್ಯಾಬ್‌ಗಳು 50-70% ಕಡಿಮೆ ದರದಲ್ಲಿ ಪರೀಕ್ಷೆಗಳನ್ನು ನೀಡುತ್ತವೆ. ನೀವು +91 98055 43143 ಗೆ ಕರೆ ಮಾಡಬಹುದು!`;
      }

      setMessages(prev => [...prev, responseObj]);
    }, 350);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
      }}
    >
      {/* Full Screen AI Modal Container (Bottom Nav Remains Floating Below) */}
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          width: '100%',
          maxWidth: '720px',
          height: 'calc(100vh - 65px)', // Keep mobile bottom nav accessible
          maxHeight: '850px',
          borderRadius: '0',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          border: '1.5px solid rgba(239, 68, 68, 0.3)',
          animation: 'mobileSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.98) 0%, rgba(220, 38, 38, 0.98) 100%)',
          color: 'white',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'white', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
              <Bot size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                BJSL AI Health Assistant <Sparkles size={16} color="#FFE4E6" />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#FFF1F2', fontWeight: 700 }}>
                NABL Diagnostic Intelligence
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={onClose} 
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(m => {
            let msgText = m.text;
            if (selectedLang === 'hi' && m.textHi) msgText = m.textHi;
            if (selectedLang === 'kn' && m.textKn) msgText = m.textKn;

            return (
              <div 
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '10px'
                }}
              >
                {m.sender === 'bot' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', boxShadow: '0 4px 10px rgba(239,68,68,0.3)' }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    background: m.sender === 'user' 
                      ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' 
                      : 'white',
                    color: m.sender === 'user' ? 'white' : '#0F172A',
                    padding: '0.9rem 1.15rem',
                    borderRadius: m.sender === 'user' ? '20px 20px 2px 20px' : '20px 20px 20px 2px',
                    boxShadow: m.sender === 'user' 
                      ? '0 6px 18px rgba(239, 68, 68, 0.25)' 
                      : '0 2px 14px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    border: m.sender === 'bot' ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {msgText}
                  </div>

                  {/* If recommended package exists */}
                  {m.recommendedPkg && (
                    <div style={{
                      background: '#FFF1F2',
                      border: '1.5px solid #FECDD3',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A' }}>{m.recommendedPkg.name}</div>
                        <div style={{ fontSize: '0.775rem', color: '#EF4444', fontWeight: 900 }}>₹{m.recommendedPkg.price} <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>₹{m.recommendedPkg.mrp}</span></div>
                      </div>
                      <button 
                        onClick={() => { onClose(); onBookTest(m.recommendedPkg); }}
                        style={{
                          background: '#EF4444',
                          color: 'white',
                          padding: '6px 14px',
                          borderRadius: '99px',
                          fontSize: '0.775rem',
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Prompts Horizontal Pill Slider */}
        <div style={{ padding: '0.65rem 1rem', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', overflowX: 'auto', display: 'flex', gap: '8px' }}>
          {quickPrompts.map((qp, idx) => {
            const labelText = selectedLang === 'hi' ? qp.hi : selectedLang === 'kn' ? qp.kn : qp.en;
            return (
              <button
                key={idx}
                onClick={() => handleSend(labelText)}
                style={{
                  background: '#FFF1F2',
                  color: '#991B1B',
                  fontSize: '0.775rem',
                  fontWeight: 800,
                  padding: '6px 14px',
                  borderRadius: '99px',
                  whiteSpace: 'nowrap',
                  border: '1px solid #FECDD3',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                {labelText}
              </button>
            );
          })}
        </div>

        {/* Input Footer */}
        <div style={{ padding: '0.85rem 1rem', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="text"
            placeholder={selectedLang === 'hi' ? 'ब्लड टेस्ट, पैकेज या कीमतों के बारे में पूछें...' : selectedLang === 'kn' ? 'ಪರೀಕ್ಷೆಗಳು, ಪ್ಯಾಕೇಜ್‌ಗಳ ಬಗ್ಗೆ ಕೇಳಿ...' : 'Ask about tests, packages, fasting rules, prices...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ 
              flex: 1, 
              padding: '0.85rem 1.15rem', 
              borderRadius: '99px', 
              border: '1.5px solid #CBD5E1', 
              fontSize: '0.9rem', 
              outline: 'none',
              background: '#F8FAFC'
            }}
          />
          <button 
            onClick={() => handleSend()}
            style={{ 
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
              color: 'white', 
              width: '46px', 
              height: '46px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(239, 68, 68, 0.35)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
