import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { newsArticles, tickerData, portfolioImpact, personaConfig } from '../data/mockData';

const categoryColors = {
  Policy: { bg: 'rgba(59,130,246,0.12)', color: '#93c5fd', border: 'rgba(59,130,246,0.3)' },
  Markets: { bg: 'rgba(16,185,129,0.12)', color: '#6ee7b7', border: 'rgba(16,185,129,0.3)' },
  Startups: { bg: 'rgba(139,92,246,0.12)', color: '#c4b5fd', border: 'rgba(139,92,246,0.3)' },
  Explainer: { bg: 'rgba(6,182,212,0.12)', color: '#67e8f9', border: 'rgba(6,182,212,0.3)' },
  Crypto: { bg: 'rgba(251,191,36,0.12)', color: '#fde68a', border: 'rgba(251,191,36,0.3)' },
  Technology: { bg: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: 'rgba(239,68,68,0.3)' },
  Economy: { bg: 'rgba(245,158,11,0.12)', color: '#fcd34d', border: 'rgba(245,158,11,0.3)' },
};

export default function Newsroom() {
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const persona = personaConfig[userProfile?.role] || personaConfig.reader;

  const filteredArticles = newsArticles.filter(a =>
    a.relevantFor.includes(userProfile?.role) || userProfile?.interests?.some(i => a.tags.includes(i))
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="page-wrapper">
      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: '#64748b' }}>{item.name}</span>
              <span style={{ fontWeight: 600 }}>{item.price}</span>
              <span style={{ color: item.up ? '#10b981' : '#ef4444' }}>{item.change}</span>
              <span style={{ color: '#1e293b' }}>•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, animation: 'fadeInUp 0.4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>{persona.greeting}</p>
              <h1 style={{ fontSize: 28, fontFamily: 'Space Grotesk' }}>
                {greeting}, <span className="gradient-text">Vedant</span> 👋
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 15 }}>
                Here's your personalized AI newsroom for today
              </p>
            </div>
            <div className="ai-pulse" style={{ fontSize: 13 }}>AI Powered</div>
          </div>
        </div>

        {/* Top Insight */}
        <div style={{
          padding: '20px 24px', borderRadius: 16, marginBottom: 28,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
          border: '1px solid rgba(59,130,246,0.3)',
          animation: 'fadeInUp 0.4s ease 0.1s both',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ fontSize: 28 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Top AI Insight Today</div>
              <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, color: 'var(--text-primary)' }}>{persona.primaryInsight}</p>
            </div>
            <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: 13, flexShrink: 0 }}
              onClick={() => navigate('/navigator')}>
              Ask AI →
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          {/* Main feed */}
          <div>
            {/* AI Explainers - shown for student/reader */}
            {(userProfile?.role === 'student' || userProfile?.role === 'reader') && (
              <div style={{ marginBottom: 28, animation: 'fadeInUp 0.4s ease 0.2s both' }}>
                <div className="section-label">🧠 AI Explainers</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                  {["What is Repo Rate?", "Why Inflation Matters?", "How Mutual Funds Work", "Fiscal Deficit Explained"].map((q, i) => (
                    <button key={q} onClick={() => navigate('/navigator')} style={{
                      padding: '14px 16px', borderRadius: 12,
                      background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.07)',
                      color: 'var(--text-primary)', fontSize: 14, fontWeight: 500,
                      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: 10,
                      transition: 'all 0.2s',
                    }}>
                      <span style={{ fontSize: 16 }}>💡</span> {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* News Feed */}
            <div className="section-label">🗞 Your News Feed</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredArticles.map((article, i) => {
                const cat = categoryColors[article.category] || categoryColors.Policy;
                return (
                  <div key={article.id} className="card" style={{
                    padding: '20px 22px', cursor: 'pointer',
                    animation: `fadeInUp 0.4s ease ${0.1 + i * 0.06}s both`,
                  }} onClick={() => navigate('/navigator')}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20,
                          background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                        }}>{article.category}</span>
                        {article.impact === 'high' && (
                          <span style={{ padding: '3px 8px', borderRadius: 20, background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', fontSize: 11, fontWeight: 600 }}>HIGH IMPACT</span>
                        )}
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{article.timeAgo}</span>
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 8, color: 'var(--text-primary)' }}>{article.title}</h3>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{article.summary}</p>

                    {/* AI Insight */}
                    <div style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
                      fontSize: 13, color: '#93c5fd', lineHeight: 1.5,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>AI Insight · </span>
                      {article.aiInsight}
                    </div>

                    {/* Stock tags */}
                    {article.stocks.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        {article.stocks.map(s => (
                          <span key={s.name} style={{
                            padding: '4px 10px', borderRadius: 8,
                            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
                            fontSize: 12, color: '#6ee7b7', fontWeight: 600,
                          }}>{s.name} {s.change}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{article.source} · {article.readTime} read</span>
                      <span style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>Ask AI about this →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Portfolio Impact - investor only */}
            {(userProfile?.role === 'investor' || userProfile?.role === 'professional') && (
              <div className="card" style={{ padding: 20 }}>
                <div className="section-label">📈 Portfolio Impact</div>
                <div style={{ fontSize: 12, color: '#10b981', marginBottom: 14, fontWeight: 600 }}>
                  ↑ RBI Rate Cut Expected — Banking likely to rally
                </div>
                {portfolioImpact.map(stock => (
                  <div key={stock.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{stock.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stock.allocation}% allocation</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{stock.value}</div>
                      <div style={{ fontSize: 12, color: stock.up ? '#10b981' : '#ef4444', fontWeight: 600 }}>{stock.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="card" style={{ padding: 20 }}>
              <div className="section-label">⚡ Quick AI Actions</div>
              {[
                { label: "Briefing: Budget 2026", icon: "📋", path: '/navigator' },
                { label: "Track Adani Story", icon: "📌", path: '/story-arc' },
                { label: "Switch to Hindi", icon: "🌏", path: '/vernacular' },
                { label: "Generate Video Brief", icon: "🎥", path: '/video-studio' },
              ].map(a => (
                <button key={a.label} onClick={() => navigate(a.path)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10, marginBottom: 8,
                  background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                }}>
                  <span>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>

            {/* Token usage card */}
            <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-purple)', marginBottom: 10 }}>AI Profile</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Row label="Role" value={userProfile?.role} />
                <Row label="Language" value={userProfile?.language?.toUpperCase()} />
                <Row label="Topics" value={userProfile?.interests?.length + ' selected'} />
                <Row label="Risk Level" value={userProfile?.risk_level} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600, textTransform: 'capitalize' }}>{value}</span>
    </div>
  );
}
