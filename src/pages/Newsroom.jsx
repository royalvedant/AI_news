import { useState } from 'react';
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
  const { userProfile, language } = useUser();
  const navigate = useNavigate();
  const [activeArticle, setActiveArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const persona = personaConfig[userProfile?.role] || personaConfig.reader;

  const filteredArticles = newsArticles.filter(a =>
    a.relevantFor.includes(userProfile?.role) || userProfile?.interests?.some(i => a.tags.includes(i))
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  async function analyzeArticle(article) {
    setActiveArticle(article);
    setLoading(true);
    setAiResult(null);

    // Simulate AI loading
    setTimeout(() => {
      setAiResult({
        summary: article.summary,
        sentiment: article.sentiment === 'positive' ? 'BULLISH' : article.sentiment === 'negative' ? 'BEARISH' : 'NEUTRAL',
        sentimentIcon: article.sentiment === 'positive' ? '📈' : article.sentiment === 'negative' ? '📉' : '➡️',
        portfolioAlert: `⚠️ This news about ${article.stocks[0]?.name || article.category} may affect your holdings significantly.`,
        alertLevel: article.impact === 'high' ? 'HIGH' : 'MEDIUM',
        shortTerm: "Expect volatility in the next 48 hours.",
        midTerm: "Positive outlook as policy stabilizes.",
        longTerm: "Structural growth driver for the sector.",
        confidence: "HIGH",
        actionSuggestion: article.sentiment === 'positive' ? 'CONSIDER BUYING' : 'HOLD',
        impactedStocks: article.stocks.map(s => `${s.name} ${s.change}`)
      });
      setLoading(false);
    }, 1200);
  }

  const alertColors = { HIGH: "#ef4444", MEDIUM: "#f59e0b", LOW: "#22c55e" };
  const sentimentBg = { BULLISH: "#052e16", BEARISH: "#2d0000", NEUTRAL: "#1c1f26" };

  return (
    <div className="page-wrapper">
      {/* Ticker */}
      <div className="ticker-wrap">
        <span className="live-tag">● LIVE</span>
        <div className="ticker-track">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: '#64748b' }}>{item.name}</span>
              <span style={{ fontWeight: 600 }}>{item.price}</span>
              <span style={{ color: item.up ? '#10b981' : '#ef4444' }}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, animation: 'fadeInUp 0.4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{persona.greeting}</p>
              <h1 style={{ fontSize: 32, fontFamily: 'Space Grotesk' }}>
                {greeting}, <span className="gradient-text">Vedant</span> 👋
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 16 }}>
                Tailored financial intelligence for your <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{userProfile.label}</span> profile.
              </p>
            </div>
            <div className="ai-pulse" style={{ fontSize: 13 }}>Neural Engine Online</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
          {/* Main feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="section-label">🗞 Today's Impactful Stories</div>
            {filteredArticles.map((article, i) => {
              const cat = categoryColors[article.category] || categoryColors.Policy;
              return (
                <div key={article.id} className="card" style={{
                  padding: '24px', 
                  animation: `fadeInUp 0.4s ease ${0.1 + i * 0.05}s both`,
                  border: activeArticle?.id === article.id ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 20,
                        background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`,
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase',
                      }}>{article.category}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: article.trustScore > 85 ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
                        {article.trustScore > 85 ? '🔒 VERIFIED' : '⚡ DEVELOPING'} • {article.trustScore}/100 TRUST
                      </span>
                      {article.sentiment && (
                        <span style={{
                          padding: '2px 8px', borderRadius: 4,
                          background: article.sentiment === 'positive' ? 'rgba(16,185,129,0.1)' : article.sentiment === 'negative' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                          color: article.sentiment === 'positive' ? 'var(--accent-green)' : article.sentiment === 'negative' ? 'var(--accent-red)' : 'var(--accent-orange)',
                          fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                        }}>
                          {article.sentiment === 'positive' ? '📈 Bullish' : article.sentiment === 'negative' ? '📉 Bearish' : '➖ Neutral'}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{article.timeAgo}</span>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 10, color: 'var(--text-primary)' }}>{article.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{article.summary}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700 }}
                        onClick={() => analyzeArticle(article)}>
                        ✨ AI Analysis
                      </button>
                      <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => navigate('/story-arc')}>
                        📜 Story Arc
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analysis Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 100 }}>
            {/* AI Analysis Result */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: 400 }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="section-label" style={{ margin: 0 }}>🧠 AI Intelligence</span>
                {loading && <div className="spinner-small" />}
              </div>

              {!activeArticle && !loading && (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🤖</div>
                  <p style={{ fontSize: 14 }}>Select a story to run<br/>deep market analysis</p>
                </div>
              )}

              {loading && (
                <div style={{ padding: 40, textAlign: 'center' }}>
                  <div className="ai-pulse" style={{ marginBottom: 16 }}>Computing Impact...</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Cross-referencing with your portfolio</p>
                </div>
              )}

              {aiResult && !loading && (
                <div className="animate-fade-in" style={{ padding: '20px' }}>
                  <div className="sentiment-banner" style={{ background: sentimentBg[aiResult.sentiment], marginBottom: 20 }}>
                    <span style={{ fontSize: 24 }}>{aiResult.sentimentIcon}</span>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>SENTIMENT</div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{aiResult.sentiment}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>ACTION</div>
                      <div style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: 12 }}>{aiResult.actionSuggestion}</div>
                    </div>
                  </div>

                  <div className="alert-box" style={{ borderColor: alertColors[aiResult.alertLevel] }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>PORTFOLIO ALERT</span>
                      <span className="alert-level" style={{ background: alertColors[aiResult.alertLevel] + '33', color: alertColors[aiResult.alertLevel] }}>
                        {aiResult.alertLevel} RISK
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>{aiResult.portfolioAlert}</p>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Market Predictions</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                      <PredictionRow label="Short Term" value={aiResult.shortTerm} />
                      <PredictionRow label="Mid Term" value={aiResult.midTerm} />
                      <PredictionRow label="Long Term" value={aiResult.longTerm} />
                    </div>
                  </div>

                  <div style={{ marginTop: 24, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    ⚠️ AI-generated analysis. Not SEBI-registered advice. Consult a certified advisor.
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="card" style={{ padding: 20 }}>
              <span className="section-label">📊 Your Exposure</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                <ExposureRow label="Equity" value="45%" color="var(--accent-blue)" />
                <ExposureRow label="Debt" value="30%" color="var(--accent-green)" />
                <ExposureRow label="Gold" value="15%" color="var(--accent-gold)" />
                <ExposureRow label="Crypto" value="10%" color="var(--accent-purple)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PredictionRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ minWidth: 80, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>{value}</div>
    </div>
  );
}

function ExposureRow({ label, value, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <div style={{ height: '100%', width: value, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}
