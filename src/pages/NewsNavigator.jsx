import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { aiChatResponses, newsArticles } from '../data/mockData';

const suggestedTopics = [
  { label: "RBI Rate Cut", icon: "🏦" },
  { label: "Budget 2026", icon: "📋" },
  { label: "Sensex Rally", icon: "📈" },
  { label: "Startup Funding", icon: "🚀" },
  { label: "Crypto Regulation", icon: "₿" },
];

const followUps = {
  default: [
    "Explain in simple Hindi",
    "Which stocks benefit?",
    "How does this affect my SIP?",
    "What's the historical precedent?",
  ],
  rbi: ["How does this affect home loans?", "Which banks benefit most?", "Should I increase my SIP?"],
  budget: ["Best sectors to invest in?", "Impact on startup ecosystem?", "Fiscal deficit explained"],
  sip: ["What's the best SIP allocation?", "Lump sum vs SIP now?", "Top mutual funds to consider"],
};

function buildResponse(input, lang) {
  const lower = input.toLowerCase();
  if (lower.includes('rbi') || lower.includes('repo') || lower.includes('home loan') || lower.includes('emi')) {
    return aiChatResponses.rbi[lang] || aiChatResponses.rbi.en;
  }
  if (lower.includes('sip') || lower.includes('mutual fund')) {
    return aiChatResponses.sip[lang] || aiChatResponses.sip.en;
  }
  if (lower.includes('stock') || lower.includes('sector') || lower.includes('budget')) {
    return aiChatResponses.stocks[lang] || aiChatResponses.stocks.en;
  }
  if (lower.includes('fiscal') || lower.includes('deficit')) {
    return aiChatResponses.fiscal[lang] || aiChatResponses.fiscal.en;
  }
  return `**Analyzing your query…**\n\nBased on the latest ET Nexus AI intelligence layer:\n\n📰 **Top Context:** India's macro indicators are strengthening — inflation at 4.1%, RBI expected to cut rates, FII inflows surging.\n\n💡 **AI Summary:** The current economic environment is broadly positive for equity investors and challenging for fixed income. Key risk: global oil price volatility.\n\n🎯 **Recommendation:** Stay invested, review sector allocation quarterly.`;
}

let msgId = 0;

export default function NewsNavigator() {
  const { language } = useUser();
  const [messages, setMessages] = useState([
    { id: msgId++, type: 'ai', text: "Hello! I'm your **AI News Navigator**. Ask me anything about business & financial news — I'll give you personalized, research-backed answers.\n\n🔥 Try: *\"How does RBI rate cut affect home loans?\"*" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');
    setMessages(prev => [...prev, { id: msgId++, type: 'user', text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const response = buildResponse(msg, language);
    setMessages(prev => [...prev, { id: msgId++, type: 'ai', text: response }]);
    setLoading(false);
  };

  const loadBriefing = (topic) => {
    setActiveTopic(topic);
    const article = newsArticles.find(a => a.title.toLowerCase().includes(topic.toLowerCase().split(' ')[0]));
    const briefingMsg = article
      ? `**${article.title}**\n\n${article.summary}\n\n🤖 **AI Summary:**\n${article.aiInsight}\n\n**Impact:** ${article.stocks.map(s => `${s.name} ${s.change}`).join(' | ') || 'N/A'}`
      : `Loading AI briefing on **${topic}**…\n\nThis topic is currently being analyzed by our real-time intelligence layer.`;
    setMessages(prev => [...prev, { id: msgId++, type: 'ai', text: briefingMsg }]);
  };

  const renderText = (text) => {
    return text
      .split('\n')
      .map((line, i) => {
        line = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        if (line.startsWith('# ')) return <h3 key={i} style={{ fontSize: 16, marginBottom: 6, marginTop: 12 }} dangerouslySetInnerHTML={{ __html: line.slice(2) }} />;
        if (line.startsWith('## ')) return <h4 key={i} style={{ fontSize: 14, marginBottom: 4, marginTop: 10, color: '#93c5fd' }} dangerouslySetInnerHTML={{ __html: line.slice(3) }} />;
        if (!line.trim()) return <br key={i} />;
        return <p key={i} style={{ marginBottom: 4, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: line }} />;
      });
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 0, maxHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <div style={{ borderRight: '1px solid var(--border-subtle)', padding: '20px 16px', overflowY: 'auto', background: 'var(--bg-secondary)' }}>
          <div className="section-label">🔥 Topics</div>
          {suggestedTopics.map(t => (
            <button key={t.label} onClick={() => loadBriefing(t.label)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, marginBottom: 6,
              background: activeTopic === t.label ? 'rgba(59,130,246,0.12)' : 'transparent',
              border: activeTopic === t.label ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              color: activeTopic === t.label ? '#93c5fd' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left',
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}

          <div className="divider" />
          <div className="section-label">💡 Follow-ups</div>
          {(followUps.default).map(q => (
            <button key={q} onClick={() => send(q)} style={{
              width: '100%', padding: '8px 12px', borderRadius: 8, marginBottom: 4,
              background: 'transparent', border: 'none',
              color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left', lineHeight: 1.4,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{q}</button>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                animation: 'fadeInUp 0.3s ease both',
              }}>
                {msg.type === 'ai' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginRight: 10, marginTop: 2,
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                  }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '72%',
                  padding: '14px 18px',
                  borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.type === 'user'
                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                    : 'var(--bg-card)',
                  border: msg.type === 'ai' ? '1px solid var(--border-subtle)' : 'none',
                  fontSize: 14, lineHeight: 1.6,
                }}>
                  {msg.type === 'ai' ? renderText(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🤖</div>
                <div style={{ padding: '14px 18px', borderRadius: '18px 18px 18px 4px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', display: 'flex', gap: 6 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)', animation: `pulse-dot 1s ease ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
            <form onSubmit={e => { e.preventDefault(); send(); }} style={{ display: 'flex', gap: 12 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything about business news…"
                className="input-field"
                style={{ flex: 1 }}
                disabled={loading}
              />
              <button type="submit" disabled={!input.trim() || loading} className="btn-primary" style={{ padding: '12px 20px', flexShrink: 0 }}>
                ↑ Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
