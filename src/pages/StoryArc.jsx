import { useState } from 'react';
import { storyArcs } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const arcKeys = Object.keys(storyArcs);

const typeColors = { positive: '#10b981', negative: '#ef4444', neutral: '#f59e0b' };

export default function StoryArc() {
  const [activeArc, setActiveArc] = useState('adani');
  const [selected, setSelected] = useState(null);
  const arc = storyArcs[activeArc];

  const chartData = arc.milestones.map(m => ({
    name: m.year,
    sentiment: Math.round(m.sentiment * 100),
    type: m.type,
  }));

  const CustomDot = ({ cx, cy, payload }) => {
    const color = typeColors[payload.type];
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill={color} stroke="var(--bg-primary)" strokeWidth={2} />
      </g>
    );
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '28px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div className="ai-pulse" style={{ marginBottom: 8 }}>Story Arc Intelligence</div>
          <h1 style={{ fontSize: 28, fontFamily: 'Space Grotesk', marginBottom: 8 }}>
            📊 Story Arc <span className="gradient-text">Tracker</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Track how major stories evolve — sentiment, key events, and player relationships
          </p>
        </div>

        {/* Arc selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {arcKeys.map(key => (
            <button key={key} onClick={() => { setActiveArc(key); setSelected(null); }} className={`chip ${activeArc === key ? 'active' : ''}`}>
              {storyArcs[key].title}
            </button>
          ))}
        </div>

        {/* Arc hero */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 24, background: 'linear-gradient(135deg, rgba(59,130,246,0.07), rgba(139,92,246,0.05))' }}>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>{arc.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{arc.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
          <div>
            {/* Sentiment chart */}
            <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
              <div className="section-label">📈 Sentiment Over Time</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} domain={[-100, 100]} />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 10, fontSize: 12 }}
                    itemStyle={{ color: '#93c5fd' }}
                    labelStyle={{ color: '#94a3b8' }}
                    formatter={(val) => [`${val > 0 ? '+' : ''}${val}`, 'Sentiment']}
                  />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
                  <Line
                    type="monotone"
                    dataKey="sentiment"
                    stroke="url(#sentGrad)"
                    strokeWidth={2.5}
                    dot={<CustomDot />}
                    activeDot={{ r: 8, fill: '#3b82f6' }}
                  />
                  <defs>
                    <linearGradient id="sentGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>

              <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12 }}>
                {Object.entries(typeColors).map(([type, color]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: '20px 24px' }}>
              <div className="section-label">🗓 Event Timeline</div>
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: 71, top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.06)' }} />

                {arc.milestones.map((m, i) => {
                  const color = typeColors[m.type];
                  const isSel = selected === i;
                  return (
                    <div key={i} onClick={() => setSelected(isSel ? null : i)} style={{
                      display: 'flex', gap: 20, marginBottom: 20, cursor: 'pointer',
                      animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                    }}>
                      {/* Year */}
                      <div style={{ minWidth: 64, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', paddingTop: 10, textAlign: 'right' }}>
                        {m.year}
                      </div>

                      {/* Dot */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', paddingTop: 12 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: '2px solid var(--bg-primary)', zIndex: 1, flexShrink: 0 }} />
                      </div>

                      {/* Content */}
                      <div style={{
                        flex: 1, padding: '10px 14px', borderRadius: 12,
                        background: isSel ? `${color}12` : 'var(--bg-glass)',
                        border: `1px solid ${isSel ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                        transition: 'all 0.25s',
                      }}>
                        <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>{m.event}</p>
                        {isSel && (
                          <div style={{ marginTop: 10, fontSize: 12, color: color, fontWeight: 600 }}>
                            Sentiment Score: {m.sentiment > 0 ? '+' : ''}{Math.round(m.sentiment * 100)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div>
            <div className="card" style={{ padding: '20px' }}>
              <div className="section-label">🕸 Key Players</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {arc.players.map((player, i) => (
                  <div key={player} style={{
                    padding: '10px 14px', borderRadius: 10,
                    background: 'var(--bg-glass)', border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', gap: 10,
                    animation: `fadeInUp 0.4s ease ${i * 0.07}s both`,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: `hsl(${(i * 60) % 360}, 60%, 40%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: 'white',
                    }}>{player[0]}</div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{player}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment summary */}
            <div className="card" style={{ padding: '20px', marginTop: 20 }}>
              <div className="section-label">📊 Sentiment Summary</div>
              {(['positive', 'neutral', 'negative']).map(type => {
                const count = arc.milestones.filter(m => m.type === type).length;
                const pct = Math.round((count / arc.milestones.length) * 100);
                return (
                  <div key={type} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
                      <span style={{ textTransform: 'capitalize', color: typeColors[type] }}>{type}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-glass)' }}>
                      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: typeColors[type], transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
