import { useState, useRef } from 'react';
import { newsArticles } from '../data/mockData';

export default function VideoStudio() {
  const [activeTab, setActiveTab] = useState('shorts');
  const [activeReel, setActiveReel] = useState(0);
  const scrollRef = useRef(null);

  const shorts = newsArticles.filter(a => a.videoScript);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / scrollRef.current.clientHeight);
      setActiveReel(index);
    }
  };

  return (
    <div className="page-wrapper" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ background: 'var(--bg-secondary)', padding: 4, borderRadius: 20, display: 'flex', border: '1px solid var(--border-subtle)' }}>
            <button 
              onClick={() => setActiveTab('shorts')}
              className={`chip ${activeTab === 'shorts' ? 'active' : ''}`}
              style={{ border: 'none', padding: '8px 20px', fontSize: 13 }}
            >
              📱 AI Shorts Feed
            </button>
            <button 
              onClick={() => setActiveTab('studio')}
              className={`chip ${activeTab === 'studio' ? 'active' : ''}`}
              style={{ border: 'none', padding: '8px 20px', fontSize: 13 }}
            >
              🎥 Video Studio
            </button>
          </div>
        </div>

        {activeTab === 'shorts' ? (
          <div className="reels-container" ref={scrollRef} onScroll={handleScroll}>
            {shorts.map((short, i) => (
              <div key={short.id} className="reel-card">
                  <div className="reel-video-placeholder" style={{ 
                    background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.95) 100%), url('${short.thumbnail || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'}') center/cover`
                  }}>
                    <div style={{ position: 'absolute', top: 24, left: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div className="ai-pulse" style={{ color: '#fff' }}>LIVE AI ANCHOR</div>
                    </div>
                    
                    <div style={{ marginBottom: 16 }}>
                      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
                        {short.title}
                      </h2>
                      <div style={{ 
                        padding: '16px', 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(12px)',
                        borderRadius: 16,
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: 16,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }}>
                      <p style={{ fontSize: 14, color: '#eee', lineHeight: 1.5, fontStyle: 'italic' }}>
                        🎙️ {short.videoScript}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span className="badge badge-blue">@ET_NEXUS_AI</span>
                      <span className="badge badge-green">TRUST: {short.trustScore}%</span>
                    </div>
                  </div>

                  {/* Right Side Actions (Simulation) */}
                  <div style={{ position: 'absolute', right: 16, bottom: 100, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
                    <ActionBtn icon="❤️" label="2.4k" />
                    <ActionBtn icon="💬" label="128" />
                    <ActionBtn icon="↗️" label="Share" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StudioGenerator />
        )}
      </div>
    </div>
  );
}

function ActionBtn({ icon, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }}>
        {icon}
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{label}</span>
    </div>
  );
}

function StudioGenerator() {
  const [url, setUrl] = useState('');
  return (
    <div className="animate-fade-up" style={{ maxWidth: 600, margin: '0 auto', width: '100%' }}>
      <div className="card" style={{ padding: 32 }}>
        <div className="section-label">AI Video Generator</div>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>Create a Video Brief</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
          Paste any Economic Times news URL to generate a 60-second AI video summary instantly.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <input 
            className="input-field" 
            placeholder="https://economictimes.indiatimes.com/..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn-primary">Generate</button>
        </div>
        
        <div style={{ 
          marginTop: 24, 
          padding: '24px', 
          background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.02))', 
          borderRadius: '16px', 
          border: '1px solid rgba(251,191,36,0.2)', 
          backdropFilter: 'blur(12px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: 16 
        }}>
          <div>
            <h3 style={{ fontSize: 15, color: 'var(--accent-gold)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              <span>👑</span> Premium Capability
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              You have <strong style={{color: '#fff'}}>0</strong> video regeneration credits left today. <br/>
              Unlock real-time AI avatars, precise voice-cloning, and unlimited shorts.
            </p>
          </div>
          <button className="btn-primary" style={{ 
            background: 'var(--gradient-gold)', 
            color: '#1a1000', 
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(251,191,36,0.3)'
          }}>
            Explore Subscriptions
          </button>
        </div>
      </div>
    </div>
  );
}
