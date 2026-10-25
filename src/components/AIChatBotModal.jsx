import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Paperclip, 
  ChevronDown, 
  Check, 
  MapPin, 
  Globe,
  ArrowRight,
  FileText
} from 'lucide-react';
import { HEALTH_PACKAGES } from '../data/mockData';

export default function AIChatBotModal({ isOpen, onClose, onBookTest }) {
  const [input, setInput] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [gpsLocation, setGpsLocation] = useState('Bengaluru (10 Labs Active)');
  const [gpsDetected, setGpsDetected] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Good morning! How can I help you today? You can ask me questions about tests, symptoms, or packages, or upload your report!',
      textHi: 'शुभ प्रभात! आज मैं आपकी क्या सहायता कर सकता हूँ? आप मुझसे ब्लड टेस्ट, स्वास्थ्य पैकेज या होम कलेक्शन के बारे में पूछ सकते हैं!',
      textKn: 'ಶುಭೋದಯ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ರಕ್ತ ಪರೀಕ್ಷೆಗಳು, ಆರೋಗ್ಯ ಪ್ಯಾಕೇಜ್‌ಗಳು ಅಥವಾ ವರದಿಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!'
    }
  ]);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', label: 'ಕನ್ನಡ', flag: '🟡🔴' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  // Quick Questions (Matching Image 2 UI)
  const quickPrompts = [
    { q: 'What health packages do you offer?' },
    { q: 'Do you provide home collection?' },
    { q: 'Where is your lab located?' },
    { q: 'Can you explain a CBC test?' },
    { q: 'How long do reports take?' },
    { q: 'Fasting rules for blood tests?' }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Clean up speech synthesis on unmount or close
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const currentLangObj = languages.find(l => l.code === selectedLang) || languages[0];

  // AI Voice Synthesis (Listen AI Voice feature from Image 2)
  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const greetingText = "Hello! I am the Bharath Jan Sewa Labs AI Assistant. Good morning! How can I help you today? You can ask me questions about tests, symptoms, or health checkup packages, or upload your report!";
    const utterance = new SpeechSynthesisUtterance(greetingText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // GPS Locator Action
  const handleGpsClick = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setGpsDetected(true);
      setGpsLocation('Bengaluru Centre: Indiranagar Hub');
    }, 800);
  };

  // File Upload Simulation
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userUploadMsg = {
      id: Date.now(),
      sender: 'user',
      text: `📎 Uploaded Prescription / Report: "${file.name}"`
    };
    setMessages(prev => [...prev, userUploadMsg]);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `📄 Thank you! I have received your medical file "${file.name}". Our MD Pathologists are reviewing it to recommend the exact required blood tests with our 50-70% lower subsidized rates. Our healthcare advisor can also assist you on WhatsApp (+91 98055 43143).`,
        recommendedPkg: HEALTH_PACKAGES[0]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let botText = '';
      let recommended = null;
      const lower = query.toLowerCase();

      if (lower.includes('package') || lower.includes('offer') || lower.includes('full body') || lower.includes('checkup')) {
        botText = 'We offer comprehensive doctor-curated health packages with in-house NABL certified testing! Our most popular is the Chirayu Full Body Check PRIME (71 Vital Parameters) at ₹796 (MRP ₹2,388 - 66% OFF) with FREE doorstep sample collection across Bengaluru.';
        recommended = HEALTH_PACKAGES[0];
      } else if (lower.includes('home collection') || lower.includes('doorstep') || lower.includes('pickup') || lower.includes('sample')) {
        botText = 'Yes! We provide 100% FREE doorstep sample collection across all areas of Bengaluru. Our certified phlebotomists arrive with temperature-controlled 4°C cold-chain bags and single-use sterile vacutainers.';
        recommended = HEALTH_PACKAGES[0];
      } else if (lower.includes('where') || lower.includes('located') || lower.includes('lab') || lower.includes('centre') || lower.includes('address')) {
        botText = 'Our central NABL Reference Lab is located at HSR Layout / Koramangala, Bengaluru with 10 active diagnostic and collection centres across Indiranagar, Jayanagar, Whitefield, Malleshwaram, Rajajinagar, Electronic City, and Yelahanka.';
      } else if (lower.includes('cbc') || lower.includes('complete blood count') || lower.includes('hemoglobin')) {
        botText = 'A Complete Blood Count (CBC) tests 27 vital blood parameters including Hemoglobin, RBC, WBC count, Platelets, MCV, MCH, and differential count. At BJSL, a CBC test is only ₹160 with same-day reports within 6 hours!';
      } else if (lower.includes('how long') || lower.includes('report') || lower.includes('turnaround') || lower.includes('tat')) {
        botText = 'Our digital reports are processed by MD pathologists and delivered on the SAME DAY within 4 to 8 hours directly to your WhatsApp and Email in PDF format. You can also view them anytime on the BJSL Patient Portal.';
      } else if (lower.includes('fasting') || lower.includes('rules') || lower.includes('eat') || lower.includes('food')) {
        botText = 'For Full Body Health Checkups and Fasting Blood Sugar / Lipid Profiles, 10-12 hours of overnight fasting is recommended (drinking plain water is allowed). For routine CBC, Dengue, or Thyroid tests, no fasting is required.';
      } else {
        botText = `Thank you for asking! At Bharath Jan Sewa Labs (NABL MC-6849), all diagnostic tests are performed at 50-70% lower transparent rates with MD doctor guidance. Would you like to book a test or speak to our healthcare counselor?`;
        recommended = HEALTH_PACKAGES[0];
      }

      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          sender: 'bot', 
          text: botText,
          recommendedPkg: recommended 
        }
      ]);
    }, 450);
  };

  return (
    <div className="bjsl-ai-widget-panel" role="dialog" aria-modal="true" aria-label="BJSL AI Health Assistant">
      
      {/* 1. Header (Matching Image 2 UI with Blue Gradient, Colorful Avatar Ring, Assistant Badge, Language Dropdown & Close) */}
      <div className="bjsl-ai-header">
        
        {/* Left: Avatar Ring + Title & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <div className="bjsl-ai-avatar-ring">
            <div className="bjsl-ai-avatar-inner">
              <Sparkles size={18} color="#DC2626" />
            </div>
          </div>
          <div>
            <div className="bjsl-ai-title-row">
              <span className="bjsl-ai-title">BJSL AI</span>
              <span className="bjsl-ai-badge">ASSISTANT</span>
            </div>
            <div className="bjsl-ai-status">
              <span className="bjsl-ai-dot"></span>
              <span>Online • Healthcare Agent</span>
            </div>
          </div>
        </div>

        {/* Right: Language Pill Dropdown + Circular Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          
          <button
            type="button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="bjsl-ai-lang-btn"
            title="Change language"
          >
            <Globe size={13} />
            <span>{currentLangObj.label}</span>
            <ChevronDown size={12} />
          </button>

          {/* Language Dropdown Menu */}
          {isLangDropdownOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '38px',
                right: '42px',
                background: '#ffffff',
                color: '#0F172A',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid #E2E8F0',
                padding: '6px',
                zIndex: 260,
                width: '130px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setIsLangDropdownOpen(false);
                  }}
                  style={{
                    background: selectedLang === lang.code ? '#FEF2F2' : 'transparent',
                    color: selectedLang === lang.code ? '#DC2626' : '#1E293B',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{lang.flag} {lang.label}</span>
                  {selectedLang === lang.code && <Check size={13} color="#DC2626" />}
                </button>
              ))}
            </div>
          )}

          {/* Close Circular Button */}
          <button 
            type="button" 
            onClick={onClose}
            className="bjsl-ai-close-btn"
            aria-label="Close AI Assistant"
          >
            <X size={18} />
          </button>
        </div>

      </div>

      {/* 2. GPS Location Strip (Matching Image 2 UI) */}
      <div className="bjsl-ai-gps-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={13} color="#DC2626" />
          <span style={{ fontWeight: 650 }}>{gpsLocation}</span>
        </div>
        <button 
          type="button" 
          onClick={handleGpsClick}
          className="bjsl-ai-gps-btn"
        >
          {isLocating ? 'Locating...' : gpsDetected ? 'Detected ✓' : 'Detect GPS'}
        </button>
      </div>

      {/* 3. Messages & Greeting Card Body */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Greeting Card (Exact Image 2 UI) */}
        <div className="bjsl-ai-greeting-card">
          <div className="bjsl-ai-greeting-title">
            <span>👋</span> Hello! I am the BJSL AI Assistant.
          </div>
          <div className="bjsl-ai-greeting-body">
            Good morning! How can I help you today?<br />
            You can ask me questions about tests, symptoms, or packages, or upload your report!
          </div>
          <button 
            type="button" 
            onClick={handleToggleVoice}
            className={`bjsl-ai-voice-btn ${isSpeaking ? 'speaking' : ''}`}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={15} /> <span>Stop Voice</span>
              </>
            ) : (
              <>
                <Volume2 size={15} /> <span>Listen AI Voice</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Chat Messages */}
        {messages.slice(1).map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: '6px'
            }}
          >
            <div 
              style={{
                maxWidth: '85%',
                padding: '11px 15px',
                borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' : '#FFFFFF',
                color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                fontSize: '13.5px',
                lineHeight: 1.5,
                boxShadow: msg.sender === 'user' 
                  ? '0 4px 14px rgba(220, 38, 38, 0.25)' 
                  : '0 2px 10px rgba(15, 23, 42, 0.05)',
                border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                wordBreak: 'break-word'
              }}
            >
              {msg.text}
            </div>

            {/* If bot recommended a package */}
            {msg.recommendedPkg && (
              <div 
                style={{
                  background: '#FEF2F2',
                  border: '1.5px solid #FECACA',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  maxWidth: '85%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.08)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '12.5px', color: '#991B1B' }}>
                    {msg.recommendedPkg.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: 850, marginTop: '2px' }}>
                    ₹{msg.recommendedPkg.price} <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontWeight: 500 }}>₹{msg.recommendedPkg.mrp}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookTest(msg.recommendedPkg);
                  }}
                  style={{
                    background: '#DC2626',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  Book Now <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Quick Prompts (Matching Image 2 UI with Pill Buttons) */}
        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 750, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Suggested Queries
          </div>
          <div className="bjsl-ai-quick-prompts">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(item.q)}
                className="bjsl-ai-prompt-pill"
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Input Bar (Matching Image 2 UI with Paperclip, Rounded Input & Circular Send) */}
      <div className="bjsl-ai-input-bar">
        
        {/* Hidden File Input for Prescription / Report */}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*,.pdf"
          onChange={handleFileUpload}
        />

        {/* Attachment Paperclip Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bjsl-ai-attach-btn"
          title="Upload lab report or prescription"
          aria-label="Upload report or prescription"
        >
          <Paperclip size={20} />
        </button>

        {/* Text Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a health question..."
          className="bjsl-ai-input"
          aria-label="Ask a health question"
        />

        {/* Circular Send Button */}
        <button
          type="button"
          onClick={() => handleSend()}
          className={`bjsl-ai-send-btn ${input.trim() ? 'active' : ''}`}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>

    </div>
  );
}
