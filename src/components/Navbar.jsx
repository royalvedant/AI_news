import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { languageNames } from '../data/mockData';
import { useState } from 'react';

const navItems = [
  { path: '/newsroom', label: 'Newsroom', icon: '📰' },
  { path: '/navigator', label: 'AI Chat', icon: '🤖' },
  { path: '/story-arc', label: 'Story Arc', icon: '📊' },
  { path: '/vernacular', label: 'Vernacular', icon: '🌏' },
  { path: '/video-studio', label: 'Video AI', icon: '🎥' },
];

export default function Navbar() {
  const { userProfile, language, updateLanguage, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);

  const isLanding = location.pathname === '/';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 64, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: 'white', fontFamily: 'Space Grotesk, sans-serif',
          }}>N</div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17, color: '#f1f5f9' }}>
            ET <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nexus AI</span>
          </span>
        </Link>

        {/* Nav items */}
        {!isLanding && userProfile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} style={{
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? '#93c5fd' : '#94a3b8',
                  background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 6,
                  whiteSpace: 'nowrap',
                }}>
                  <span>{item.icon}</span> {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Language selector */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(v => !v)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 20,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              🌐 {languageNames[language]}
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute', top: 36, right: 0, minWidth: 140,
                background: '#0d1225', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: 8, zIndex: 2000,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}>
                {Object.entries(languageNames).map(([code, name]) => (
                  <button key={code} onClick={() => { updateLanguage(code); setLangOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '8px 12px', borderRadius: 8, border: 'none',
                      background: language === code ? 'rgba(59,130,246,0.15)' : 'transparent',
                      color: language === code ? '#93c5fd' : '#94a3b8',
                      fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                    }}>{name}</button>
                ))}
              </div>
            )}
          </div>

          {/* User avatar */}
          {userProfile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: 'white',
                }}>
                  {userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, color: '#f1f5f9', fontWeight: 600, lineHeight: 1 }}>{userProfile.name}</span>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'capitalize' }}>{userProfile.role}</span>
                </div>
              </div>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                style={{
                  background: 'transparent', border: 'none', color: '#ef4444', 
                  fontSize: 11, fontWeight: 700, cursor: 'pointer', padding: '4px 8px',
                  borderRadius: 4, transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => navigate('/onboarding')} className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13, color: '#f8fafc' }}>
                Log in
              </button>
              <button onClick={() => navigate('/onboarding')} className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
