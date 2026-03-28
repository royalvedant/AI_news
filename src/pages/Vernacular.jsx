import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { translations, languageNames } from '../data/mockData';

export default function Vernacular() {
  const { language, updateLanguage } = useUser();
  const [switching, setSwitching] = useState(false);

  const switchLang = async (code) => {
    setSwitching(true);
    await new Promise(r => setTimeout(r, 400));
    updateLanguage(code);
    setSwitching(false);
  };

  // We use the single comprehensive translation object from mockData
  const trans = translations[language] || translations.en;
  const enTrans = translations.en;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div className="ai-pulse" style={{ marginBottom: 12 }}>Multilingual Intelligence Engine</div>
          <h1 style={{ fontSize: 36, fontFamily: 'Space Grotesk', marginBottom: 12 }}>
            Vernacular <span className="gradient-text">Explainer</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 640 }}>
            Complex financial news, decoded in your mother tongue. Our AI doesn't just translate — it contextualizes.
          </p>
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {Object.entries(languageNames).map(([code, name]) => (
            <button 
              key={code} 
              onClick={() => switchLang(code)} 
              className={`chip ${language === code ? 'active' : ''}`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Translation Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32, opacity: switching ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
          {/* Source/English side */}
          <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--border-subtle)' }}>
            <div className="section-label">Source Context (English)</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {enTrans.headline}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
              {enTrans.body}
            </p>
            <div style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: '12px', borderLeft: '4px solid var(--accent-blue)' }}>
               <h4 style={{ fontSize: 12, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: 4 }}>AI Explainer</h4>
               <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{enTrans.aiExplainer}</p>
            </div>
          </div>

          {/* Vernacular side */}
          <div className="card" style={{ padding: '32px', borderTop: '4px solid var(--accent-green)', background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))' }}>
            <div className="section-label" style={{ color: 'var(--accent-green)' }}>AI Vernacular ({languageNames[language]})</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {trans.headline}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
              {trans.body}
            </p>
            <div style={{ padding: '16px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-green)' }}>
               <h4 style={{ fontSize: 12, color: 'var(--accent-green)', textTransform: 'uppercase', marginBottom: 4 }}>స్థానిక AI విశ్లేషణ / Local AI Explainer</h4>
               <p style={{ fontSize: 14, color: 'var(--text-primary)' }}>{trans.aiExplainer}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
