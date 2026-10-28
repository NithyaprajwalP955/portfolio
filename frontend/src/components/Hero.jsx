export default function Hero({ data }) {
  if (!data) return null;

  const fallbackBackend = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : (import.meta.env.PROD ? 'https://nithyaprajwalp-backend.vercel.app' : 'http://localhost:8000');
  const resumeHref = data.resume_url || `${fallbackBackend}/media/resume/PRAJWAL_RESUME.pdf`;
  const photoSrc = data.photo_url
    ? (data.photo_url.startsWith('http') ? data.photo_url : `${fallbackBackend}${data.photo_url}`)
    : null;

  return (
    <section id="about" className="hero-section">
      <div className="hero-content">
        {/* Text */}
        <div className="hero-text fade-in-up">
          <div>
            <h1 className="hero-name">{data.name}</h1>
            <p className="hero-title gradient-text" style={{ marginTop: 8 }}>
              {data.title}
            </p>
          </div>

          <p className="hero-bio">{data.bio}</p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
            <a
              href={resumeHref}
              download="PRAJWAL_RESUME.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <span>Resume</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <path d="m7 10 5 5 5-5"/>
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div className="stat-pill">
              <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>{data.years_experience}+</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#475569' }}>Years Exp</span>
            </div>
            <div className="stat-pill">
              <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>{data.projects_count}+</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#475569' }}>Projects</span>
            </div>
            <div className="stat-pill">
              <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>{data.certs_count}</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#475569' }}>Certs</span>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: 12 }}>
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="social-btn" title="Email">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg>
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="social-btn" title="Call">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Profile Photo */}
        <div className="profile-circle">
          <div
            style={{
              position: 'absolute',
              inset: -10,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div className="profile-circle-ring">
            <div className="profile-circle-inner">
              {photoSrc
                ? <img src={photoSrc} alt={data.name} className="profile-photo" />
                : (
                  <>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
                      Profile Photo
                    </span>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
