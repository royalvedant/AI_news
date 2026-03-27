import { useState } from 'react';

const sampleUrls = [
  "https://economictimes.com/markets/rbi-repo-rate-cut-2026",
  "https://economictimes.com/budget-2026-startup-tax",
  "https://economictimes.com/markets/sensex-rally-fii",
];

const mockVideos = [
  {
    headline: "RBI Rate Cut: What It Means for Your Money",
    script: "India's central bank is set to cut interest rates for the fourth time. This is good news for home loan borrowers and equity investors. Banking stocks are expected to surge.",
    duration: "1:45",
    highlights: ["25bps repo rate cut expected", "Home loan EMIs may fall ₹1,500/month", "HDFC Bank, SBI stocks likely to rally", "Real estate sector to benefit"],
    chart: [40, 55, 48, 72, 68, 85, 90],
    color: "#3b82f6",
  },
  {
    headline: "Budget 2026: 5 Things Every Startup Founder Must Know",
    script: "The government has extended the startup tax holiday to 15 years. Infrastructure spending hits a record high. Three new sectors get PLI incentives.",
    duration: "2:10",
    highlights: ["15-year tax holiday for startups", "₹15L Cr infra capex announced", "Fintech, EV, Space get PLI boost", "Fiscal deficit at 4.5% of GDP"],
    chart: [60, 55, 70, 65, 80, 88, 95],
    color: "#8b5cf6",
  },
  {
    headline: "Sensex at 75,420 — FII Buying Spree Explained",
    script: "Foreign investors pumped ₹8,400 crore into Indian markets today. The Sensex rose 1,200 points. Mid-cap index outperformed. Here's what's driving the rally.",
    duration: "1:30",
    highlights: ["FII net buying: ₹8,400 Cr", "Sensex up 1,200 points", "Mid-cap index: +2.1%", "Next support at 74,500"],
    chart: [70, 68, 75, 80, 76, 88, 92],
    color: "#10b981",
  },
];

const MiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 160;
  const height = 48;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function VideoStudio() {
  const [url, setUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(null);
  const [playing, setPlaying] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setGenerating(true);
    setProgress(0);
    setGenerated(null);

    for (let p = 0; p <= 100; p += 8) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(p);
    }
    setProgress(100);
    await new Promise(r => setTimeout(r, 400));

    const video = mockVideos[Math.floor(Math.random() * mockVideos.length)];
    setGenerated(video);
    setGenerating(false);
  };

  const steps = [
    { label: "Fetching Article", done: progress >= 20, active: progress > 0 && progress < 20 },
    { label: "AI Summarization", done: progress >= 50, active: progress >= 20 && progress < 50 },
    { label: "Generating Voiceover", done: progress >= 75, active: progress >= 50 && progress < 75 },
    { label: "Rendering Video", done: progress >= 100, active: progress >= 75 && progress < 100 },
  ];

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '28px 24px', maxWidth: 860 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div className="ai-pulse" style={{ marginBottom: 8 }}>AI Video Studio</div>
          <h1 style={{ fontSize: 28, fontFamily: 'Space Grotesk', marginBottom: 8 }}>
            🎥 AI Video <span className="gradient-text">News Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Paste any news URL → get a professional video brief with AI narration and charts
          </p>
        </div>

        {/* Input card */}
        <div className="card" style={{ padding: '28px 28px', marginBottom: 28 }}>
          <div className="section-label">🔗 Paste News URL</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://economictimes.com/markets/..."
              className="input-field"
              style={{ flex: 1 }}
              disabled={generating}
            />
            <button
              onClick={generate}
              disabled={!url.trim() || generating}
              className="btn-primary"
              style={{ flexShrink: 0, opacity: (!url.trim() || generating) ? 0.5 : 1 }}
            >
              {generating ? '⏳ Generating…' : '🎬 Generate Video'}
            </button>
          </div>

          {/* Sample URLs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', paddingTop: 6 }}>Try:</span>
            {sampleUrls.map(u => (
              <button key={u} onClick={() => setUrl(u)} style={{
                padding: '4px 12px', borderRadius: 20, background: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-secondary)',
                fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
                maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{u.split('//')[1]}</button>
            ))}
          </div>
        </div>

        {/* Progress */}
        {generating && (
          <div className="card" style={{ padding: '24px 28px', marginBottom: 28, animation: 'fadeInUp 0.3s ease both' }}>
            <div className="section-label">⚙️ AI Processing Pipeline</div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-glass)', marginBottom: 24, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 3, transition: 'width 0.3s ease' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {steps.map((s, i) => (
                <div key={s.label} style={{
                  padding: '12px 14px', borderRadius: 10, textAlign: 'center',
                  background: s.done ? 'rgba(16,185,129,0.1)' : s.active ? 'rgba(59,130,246,0.1)' : 'var(--bg-glass)',
                  border: s.done ? '1px solid rgba(16,185,129,0.3)' : s.active ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.4s',
                }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>
                    {s.done ? '✅' : s.active ? '⚡' : '⏳'}
                  </div>
                  <div style={{ fontSize: 11, color: s.done ? '#10b981' : s.active ? '#93c5fd' : 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generated Video */}
        {generated && !generating && (
          <div style={{ animation: 'fadeInUp 0.5s ease both' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>✅ Generated Video Brief</div>
            <div className="card" style={{ overflow: 'hidden' }}>
              {/* Video preview */}
              <div style={{
                background: `linear-gradient(135deg, ${generated.color}22, rgba(139,92,246,0.15))`,
                border: `1px solid ${generated.color}44`,
                padding: '32px 28px',
                position: 'relative',
              }}>
                {/* Play button */}
                <div style={{ position: 'absolute', top: '50%', right: 32, transform: 'translateY(-50%)' }}>
                  <button onClick={() => setPlaying(p => !p)} style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: playing ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.9)',
                    border: 'none', cursor: 'pointer', fontSize: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}>
                    {playing ? '⏸' : '▶'}
                  </button>
                </div>

                <div style={{ maxWidth: '75%' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span className="badge badge-blue">AI Video</span>
                    <span className="badge badge-green">{generated.duration}</span>
                    <span style={{ padding: '3px 8px', borderRadius: 20, background: `${generated.color}22`, color: generated.color, border: `1px solid ${generated.color}44`, fontSize: 11, fontWeight: 600 }}>AUTO-GENERATED</span>
                  </div>

                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, lineHeight: 1.3 }}>{generated.headline}</h2>

                  {playing && (
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, animation: 'fadeIn 0.4s ease' }}>
                      🎙 {generated.script}
                    </p>
                  )}

                  <div style={{ marginTop: 16 }}>
                    <MiniChart data={generated.chart} color={generated.color} />
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ padding: '20px 28px' }}>
                <div className="section-label" style={{ marginBottom: 14 }}>📌 Key Highlights</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                  {generated.highlights.map((h, i) => (
                    <div key={i} style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.06)',
                      fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ color: generated.color }}>►</span> {h}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button className="btn-primary" style={{ fontSize: 13, padding: '10px 22px' }}>⬇ Download Video</button>
                  <button className="btn-secondary" style={{ fontSize: 13, padding: '10px 22px' }}>📤 Share</button>
                  <button className="btn-secondary" style={{ fontSize: 13, padding: '10px 22px' }}>📋 Copy Script</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How it works */}
        {!generating && !generated && (
          <div className="card" style={{ padding: '24px 28px' }}>
            <div className="section-label">⚙️ How AI Video Studio Works</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {[
                { step: "01", icon: "🔗", label: "Paste URL", desc: "Any ET article URL" },
                { step: "02", icon: "🤖", label: "AI Analysis", desc: "Summarize & extract key points" },
                { step: "03", icon: "🎙", label: "Voiceover", desc: "AI voice narration" },
                { step: "04", icon: "🎬", label: "Video Ready", desc: "Download & share instantly" },
              ].map(s => (
                <div key={s.step} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 4 }}>STEP {s.step}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
