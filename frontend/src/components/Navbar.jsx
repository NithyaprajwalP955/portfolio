import { useState, useEffect } from 'react';

const sections = ['about', 'experience', 'projects', 'skills', 'education', 'certifications', 'achievements', 'contact'];

export default function Navbar({ name, resume }) {
  const fallbackBackend = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : (import.meta.env.PROD ? 'https://nithyaprajwalp-backend.vercel.app' : 'http://localhost:8000');
  const resumeHref = resume || `${fallbackBackend}/media/resume/PRAJWAL_RESUME.pdf`;
  const [active, setActive] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Brand (mobile) */}
          <span className="navbar-brand" style={{ display: 'none' }} id="nav-brand">
            {name || 'Portfolio'}
          </span>

          {/* Desktop links */}
          <div className="navbar-links">
            {sections.map(s => (
              <button
                key={s}
                className={`nav-link${active === s ? ' active' : ''}`}
                onClick={() => scrollTo(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Resume button */}
          <a href={resumeHref} download target="_blank" rel="noreferrer" className="navbar-resume">
            <span>Resume</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <path d="m7 10 5 5 5-5"/>
            </svg>
          </a>

          {/* Mobile menu button */}
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                : <><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-nav" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
            {sections.map(s => (
              <a key={s} className="mobile-nav-link" onClick={() => scrollTo(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
            <a href={resumeHref} download target="_blank" rel="noreferrer" className="btn-primary btn-sm" style={{ marginTop: 8, justifyContent: 'center' }}>
              Download Resume
            </a>
          </div>
        </div>
      )}

      {/* Show brand on mobile */}
      <style>{`
        @media (max-width: 1024px) {
          #nav-brand { display: block !important; }
        }
      `}</style>
    </>
  );
}
