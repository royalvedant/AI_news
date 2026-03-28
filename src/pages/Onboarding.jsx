import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const steps = [
  {
    id: 0,
    emoji: "👤",
    title: "Basic Identity",
    subtitle: "Tell us who you are to get started",
    type: "input",
    fields: [
      { key: "name", label: "Full Name", placeholder: "e.g. Vedant Sonawane" },
      { key: "username", label: "Username", placeholder: "e.g. vedant_ai" },
      { key: "email", label: "Email ID", placeholder: "e.g. vedant@finpulse.ai" },
    ]
  },
  {
    id: 1,
    emoji: "👋",
    title: "Tell us about you",
    subtitle: "We'll personalize your entire experience",
    field: "role",
    options: [
      { value: "student", label: "Student", icon: "🎓", desc: "Learning finance & economics" },
      { value: "investor", label: "Investor", icon: "📈", desc: "Tracking markets & portfolio" },
      { value: "founder", label: "Startup Founder", icon: "🚀", desc: "Startup news & funding" },
      { value: "professional", label: "Corporate Professional", icon: "💼", desc: "Business & macro news" },
      { value: "reader", label: "Curious Reader", icon: "📚", desc: "Just want to stay informed" },
    ],
  },
  {
    id: 2,
    emoji: "🎯",
    title: "What topics interest you?",
    subtitle: "Select all that apply",
    field: "interests",
    multi: true,
    options: [
      { value: "stock-market", label: "Stock Market", icon: "📊" },
      { value: "startups", label: "Startups", icon: "🚀" },
      { value: "crypto", label: "Crypto", icon: "₿" },
      { value: "policy", label: "Government Policy", icon: "🏛️" },
      { value: "technology", label: "Technology", icon: "💻" },
      { value: "economy", label: "Economy", icon: "🌐" },
    ],
  },
  {
    id: 3,
    emoji: "🌐",
    title: "Preferred Language",
    subtitle: "AI will explain news in your language",
    field: "language",
    options: [
      { value: "en", label: "English", icon: "🇬🇧" },
      { value: "hi", label: "हिंदी", icon: "🇮🇳" },
      { value: "mr", label: "मराठी", icon: "🏵️" },
      { value: "ta", label: "தமிழ்", icon: "🌺" },
      { value: "te", label: "తెలుగు", icon: "🌸" },
      { value: "bn", label: "বাংলা", icon: "🌼" },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile, updateLanguage } = useUser();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ 
    name: '', 
    username: '', 
    email: '', 
    role: '', 
    interests: [], 
    language: 'en' 
  });
  const [completing, setCompleting] = useState(false);

  const current = steps[step];

  const select = (value) => {
    if (current.multi) {
      setAnswers(a => ({
        ...a,
        interests: a.interests.includes(value)
          ? a.interests.filter(v => v !== value)
          : [...a.interests, value],
      }));
    } else {
      setAnswers(a => ({ ...a, [current.field]: value }));
    }
  };

  const handleInputChange = (key, value) => {
    setAnswers(a => ({ ...a, [key]: value }));
  };

  const isSelected = (value) => {
    if (current.multi) return answers.interests.includes(value);
    return answers[current.field] === value;
  };

  const canNext = current.type === "input" 
    ? current.fields.every(f => !!answers[f.key])
    : current.multi 
      ? answers.interests.length > 0 
      : !!answers[current.field];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setCompleting(true);
    const profile = {
      name: answers.name || "User",
      username: answers.username,
      email: answers.email,
      role: answers.role,
      interests: answers.interests,
      language: answers.language,
      risk_level: answers.role === 'investor' ? 'moderate' : 'low',
    };
    updateProfile(profile);
    updateLanguage(answers.language);
    setTimeout(() => navigate('/newsroom'), 1200);
  };

  if (completing) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        // ... (loading state remains same or can be cleaned up)
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, animation: 'glow 1.5s ease infinite',
        }}>✅</div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24 }}>Building your AI Newsroom…</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Personalizing your experience for {answers.name}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent-blue)',
              animation: `pulse-dot 1s ease ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      {/* Progress */}
      <div style={{ width: '100%', maxWidth: 560, marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i < step ? '#10b981' : i === step ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'var(--bg-card)',
                border: i === step ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: i <= step ? 'white' : 'var(--text-muted)',
                transition: 'all 0.3s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  height: 2, width: 90,
                  background: i < step ? 'var(--accent-blue)' : 'rgba(255,255,255,0.07)',
                  transition: 'all 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'right', marginTop: 8 }}>
          Step {step + 1} of {steps.length}
        </div>
      </div>

      {/* Card */}
      <div key={step} style={{ width: '100%', maxWidth: 560, animation: 'fadeInUp 0.35s ease forwards' }}>
        <div className="card" style={{ padding: '36px 32px' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{current.emoji}</div>
          <h2 style={{ fontSize: 26, marginBottom: 6 }}>{current.title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>{current.subtitle}</p>

          {current.type === "input" ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {current.fields.map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>{f.label}</label>
                  <input 
                    type="text"
                    className="input-field"
                    placeholder={f.placeholder}
                    value={answers[f.key]}
                    onChange={(e) => handleInputChange(f.key, e.target.value)}
                    style={{ width: '100%', padding: '14px 16px' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: current.multi ? 'repeat(2,1fr)' : '1fr', gap: 10 }}>
              {current.options.map(opt => {
                const sel = isSelected(opt.value);
                return (
                  <button key={opt.value} onClick={() => select(opt.value)} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                    background: sel ? 'rgba(59,130,246,0.12)' : 'var(--bg-glass)',
                    border: sel ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.07)',
                    color: sel ? '#93c5fd' : 'var(--text-primary)',
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                    transition: 'all 0.2s', textAlign: 'left',
                    transform: sel ? 'scale(1.01)' : 'scale(1)',
                  }}>
                    <span style={{ fontSize: 20 }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{opt.label}</div>
                      {opt.desc && <div style={{ fontSize: 12, color: sel ? '#93c5fd99' : 'var(--text-muted)', marginTop: 2 }}>{opt.desc}</div>}
                    </div>
                    {sel && <span style={{ marginLeft: 'auto', color: 'var(--accent-blue)', fontSize: 16 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}

          <button className="btn-primary" onClick={next} disabled={!canNext} style={{
            width: '100%', marginTop: 28, justifyContent: 'center', fontSize: 15,
            opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed',
          }}>
            {step < steps.length - 1 ? 'Continue →' : '🚀 Launch My AI Newsroom'}
          </button>
        </div>
      </div>
    </div>
  );
}
