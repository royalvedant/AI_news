import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tickerData } from '../data/mockData';

const prompts = [
  "Why did RBI cut repo rate?",
  "Which stocks benefit from budget 2026?",
  "Explain fiscal deficit in Hindi",
  "How does inflation affect my SIP?",
  "What is the Adani crisis all about?",
];

const features = [
  { icon: "🧠", title: "AI Newsroom", desc: "Personalized feed powered by your profile", color: "#3b82f6" },
  { icon: "💬", title: "News Navigator", desc: "Chat with the news — ask anything", color: "#8b5cf6" },
  { icon: "📊", title: "Story Arc", desc: "Track how stories evolve over time", color: "#06b6d4" },
  { icon: "🌏", title: "Vernacular AI", desc: "News in your language, simplified", color: "#10b981" },
  { icon: "🎥", title: "Video Studio", desc: "Transform any article into a video brief", color: "#f59e0b" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);
  const [typed, setTyped] = useState('');

  // Typewriter effect
  useEffect(() => {
    const target = prompts[promptIdx];
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      if (i < target.length) {
        setTyped(target.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPromptIdx(p => (p + 1) % prompts.length);
        }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [promptIdx]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Ticker */}
      <div style={{ paddingTop: 64 }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="ticker-item">
                <span style={{ color: '#64748b' }}>{item.name}</span>
                <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{item.price}</span>
                <span style={{ color: item.up ? '#10b981' : '#ef4444' }}>{item.change}</span>
                <span style={{ color: '#1e293b', margin: '0 4px' }}>•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{ marginBottom: 24, animation: 'fadeInUp 0.5s ease forwards' }}>
          <span className="badge badge-blue">
            <span className="ai-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
              AI-Powered
            </span>
            &nbsp;Financial Intelligence Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 76px)', textAlign: 'center', maxWidth: 900, lineHeight: 1.1, marginBottom: 20, animation: 'fadeInUp 0.6s ease 0.1s both' }}>
          News that{' '}
          <span className="gradient-text">thinks, explains</span>
          {' '}and{' '}
          <span className="gradient-text-gold">evolves</span>
          {' '}with you.
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 600, marginBottom: 40, lineHeight: 1.7, animation: 'fadeInUp 0.6s ease 0.2s both' }}>
          ET Nexus AI is India's first AI-native financial intelligence platform — personalized, multilingual, and conversational.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 680, animation: 'fadeInUp 0.6s ease 0.3s both' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{
              position: 'absolute', left: 20, color: 'var(--text-muted)', fontSize: 18, pointerEvents: 'none',
            }}>🔍</div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={typed || 'Ask anything about business news...'}
              style={{
                width: '100%', padding: '18px 20px 18px 52px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 16, color: 'var(--text-primary)',
                fontSize: 16, outline: 'none',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 0 40px rgba(59,130,246,0.1)',
                transition: 'all 0.3s',
              }}
              onFocus={e => e.target.style.boxShadow = '0 0 60px rgba(59,130,246,0.25)'}
              onBlur={e => e.target.style.boxShadow = '0 0 40px rgba(59,130,246,0.1)'}
            />
            <button type="submit" className="btn-primary" style={{
              position: 'absolute', right: 8, borderRadius: 12, padding: '10px 24px', fontSize: 14,
            }}>
              Ask AI →
            </button>
          </div>

          {/* Example chips */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {["RBI rate cut impact", "Budget 2026 stocks", "Explain inflation"].map(p => (
              <button key={p} type="button" onClick={() => { setQuery(p); navigate('/onboarding'); }}
                className="chip" style={{ fontSize: 12 }}>{p}</button>
            ))}
          </div>
        </form>

        {/* Persona cards */}
        <div style={{ display: 'flex', gap: 12, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeInUp 0.6s ease 0.4s both' }}>
          {[
            { role: "Investor", insight: "HDFC ↑2.3% post rate cut signal", color: "#10b981" },
            { role: "Student", insight: "Fiscal deficit explained simply", color: "#06b6d4" },
            { role: "Founder", insight: "Startup tax holiday: 15 years!", color: "#8b5cf6" },
          ].map(p => (
            <div key={p.role} style={{
              padding: '14px 20px', borderRadius: 12,
              background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 180,
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>{p.role}</span>
              <span style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>{p.insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Platform Features</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
            Everything you need to{' '}
            <span className="gradient-text-cyan">understand markets</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
            AI workflows that go beyond summarization — news that explains, predicts, and personalizes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <div key={f.title} className="glass-card" style={{ padding: 28, cursor: 'pointer', animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}
              onClick={() => navigate('/onboarding')}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, marginBottom: 16,
                background: `${f.color}20`, border: `1px solid ${f.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
              <div style={{ marginTop: 16, fontSize: 12, color: f.color, fontWeight: 600 }}>Explore →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 32 }}>
          {[
            { value: "2M+", label: "Active Readers" },
            { value: "6", label: "Indian Languages" },
            { value: "180%", label: "Avg Session ↑" },
            { value: "30M+", label: "Vernacular Users" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontFamily: 'Space Grotesk', fontWeight: 800 }} className="gradient-text">{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ fontSize: 40, marginBottom: 16 }}>Ready to experience <span className="gradient-text">AI news?</span></h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>Set up your profile in 60 seconds. No signup required.</p>
        <button className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }} onClick={() => navigate('/onboarding')}>
          🚀 Build My AI Newsroom
        </button>
      </div>
    </div>
  );
}
