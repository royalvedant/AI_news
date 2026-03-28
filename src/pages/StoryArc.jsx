import { useState } from 'react';
import { storyArcs } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';

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

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div className="ai-pulse" style={{ marginBottom: 12 }}>Temporal Intelligence Engine</div>
          <h1 style={{ fontSize: 36, fontFamily: 'Space Grotesk', marginBottom: 12 }}>
            Story <span className="gradient-text">Arc</span> Tracker
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 600 }}>
            Visualizing the evolution of market-moving narratives. Track sentiment shifts and key milestones across months of coverage.
          </p>
        </div>

        {/* Arc Selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {arcKeys.map(key => (
            <button 
              key={key} 
              onClick={() => { setActiveArc(key); setSelected(null); }} 
              className={`chip ${activeArc === key ? 'active' : ''}`}
              style={{ padding: '10px 20px', fontSize: 14 }}
            >
              {storyArcs[key].title}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Sentiment Area Chart */}
            <div className="card" style={{ padding: '32px' }}>
              <div className="section-label">Sentiment Trajectory</div>
              <div style={{ height: 300, width: '100%', marginTop: 24 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      axisLine={false} 
                      tickLine={false} 
                      domain={[-100, 100]} 
                    />
                    <Tooltip
                      contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 12 }}
                      itemStyle={{ color: 'var(--text-primary)', fontSize: 12 }}
                    />
                    <ReferenceLine y={0} stroke="var(--border-subtle)" strokeDasharray="3 3" />
                    <Area 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="var(--accent-blue)" 
                      fillOpacity={1} 
                      fill="url(#colorSent)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Premium Timeline */}
            <div className="card" style={{ padding: '32px' }}>
              <div className="section-label">Event Narrative</div>
              <div className="timeline" style={{ marginTop: 32 }}>
                {arc.milestones.map((m, i) => (
                  <div 
                    key={i} 
                    className="timeline-item" 
                    onClick={() => setSelected(selected === i ? null : i)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={`timeline-dot ${selected === i ? 'active' : ''}`} style={{ borderColor: typeColors[m.type] }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)' }}>{m.year}</span>
                      <span className="badge" style={{ 
                        background: `${typeColors[m.type]}15`, 
                        color: typeColors[m.type],
                        borderColor: `${typeColors[m.type]}33`
                      }}>
                        {m.type}
                      </span>
                    </div>
                    <div style={{ 
                      padding: '20px', 
                      borderRadius: '16px', 
                      background: selected === i ? 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' : 'var(--bg-glass)',
                      border: selected === i ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                      boxShadow: selected === i ? 'var(--shadow-glow)' : 'none',
                      transition: 'var(--transition-slow)'
                    }}>
                      <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Key Entities */}
            <div className="card" style={{ padding: '24px' }}>
              <div className="section-label">Key Entities</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {arc.players.map((player) => (
                  <span key={player} className="chip" style={{ fontSize: 12, padding: '8px 14px' }}>
                    {player}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="card" style={{ 
              padding: '24px', 
              background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
              border: '1px solid var(--border-accent)'
            }}>
              <div className="ai-pulse" style={{ marginBottom: 12 }}>Arc Insight</div>
              <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                This story arc shows a <strong>{arc.milestones.filter(m => m.type === 'positive').length > arc.milestones.filter(m => m.type === 'negative').length ? 'positive' : 'cautious'}</strong> recovery pattern. 
                Recent events suggest the narrative is stabilizing around secondary infrastructure plays.
              </p>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <div style={{ width: '70%', height: '100%', background: 'var(--accent-blue)', borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>70% Stability</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
