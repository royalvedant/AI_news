import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tickerData } from '../data/mockData';

const prompts = [
  "Why did RBI cut repo rate?",
  "Which stocks benefit from budget 2026?",
  "Explain fiscal deficit in Marathi",
  "How does inflation affect my SIP?",
  "Analyze the Adani story arc",
];

const features = [
  { icon: "🧠", title: "AI Newsroom", desc: "A personalized terminal that knows your portfolio.", color: "var(--accent-blue)" },
  { icon: "📊", title: "Story Arcs", desc: "Interactive timelines for market-moving narratives.", color: "var(--accent-cyan)" },
  { icon: "🎥", title: "AI Shorts", desc: "Vertical news feed with AI voice narration.", color: "var(--accent-purple)" },
  { icon: "🌏", title: "Vernacular", desc: "Complex finance, simplified in 6+ languages.", color: "var(--accent-green)" },
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
    }, 40)
    return () => clearInterval(interval);
  }, [promptIdx]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Ticker */}
      <div style={{ paddingTop: 64 }}>
        <div className="ticker-wrap" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="ticker-track">
            {[...tickerData, ...tickerData].map((item, i) => (
              <div key={i} className="ticker-item">
                <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{item.price}</span>
                <span style={{ color: item.up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{item.change}</span>
                <span style={{ color: 'var(--border-subtle)', margin: '0 8px' }}>|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '80px 24px',
        position: 'relative'
      }}>
        <div className="ambient-glow" style={{ top: '20%', left: '10%', opacity: 0.15 }} />
        <div className="ambient-glow" style={{ bottom: '20%', right: '10%', opacity: 0.1, background: 'var(--accent-purple)' }} />

        <div className="animate-fade-up" style={{ textAlign: 'center', maxWidth: 1000 }}>
          <div className="badge badge-blue" style={{ marginBottom: 24, padding: '8px 16px' }}>
            <span className="ai-pulse" style={{ marginRight: 8 }} />
            FINPULSE AI • THE FUTURE OF NEWS
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(48px, 8vw, 92px)', 
            fontWeight: 800, 
            lineHeight: 0.95, 
            marginBottom: 24,
            fontFamily: 'Space Grotesk'
          }}>
            News that <br/>
            <span className="gradient-text">Understands You.</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 22px)', 
            color: 'var(--text-secondary)', 
            maxWidth: 700, 
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Experience India's first AI-native financial intelligence platform. 
            Real-time insights, personalized for your portfolio, in the language you speak.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch} 
            style={{ 
              width: '100%', 
              maxWidth: 720, 
              margin: '0 auto',
              position: 'relative',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', gap: 12, background: 'var(--bg-glass)', padding: 10, borderRadius: 20, border: '1px solid var(--border-accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <input 
                className="input-field"
                style={{ background: 'transparent', border: 'none', padding: '12px 20px', fontSize: 18, width: '100%' }}
                placeholder={typed || "Ask about market sentiment..."}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 32px', borderRadius: 14 }}>
                Ask AI
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              {["Adani arc", "Budget winners", "Marathi explainer"].map(tag => (
                <span key={tag} className="chip" style={{ cursor: 'pointer' }} onClick={() => setQuery(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section / Button */}
      <section style={{ 
        padding: '60px 24px 20px', 
        textAlign: 'center', 
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.02))'
      }}>
        <button 
          className="btn-primary" 
          style={{ padding: '18px 56px', fontSize: 18, borderRadius: 16, boxShadow: '0 12px 32px rgba(59,130,246,0.3)' }}
          onClick={() => navigate('/onboarding')}
        >
          🚀 Enter the Newsroom
        </button>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px 120px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 48, justifyContent: 'center' }}>Intelligence Suite</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {features.map((f, i) => (
            <div 
              key={f.title} 
              className="card animate-fade-up" 
              style={{ padding: 32, animationDelay: `${i * 0.1}s`, cursor: 'pointer' }}
              onClick={() => navigate('/onboarding')}
            >
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: 16, 
                background: `${f.color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 20,
                border: `1px solid ${f.color}33`
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
