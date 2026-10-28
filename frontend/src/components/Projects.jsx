export default function Projects({ data }) {
  if (!data?.length) return null;

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="grid-3">
        {data.map((proj) => (
          <div key={proj.id} className="project-card">
            {/* Image area */}
            <div className="project-card-image">
              &lt;/&gt;
            </div>

            {/* Body */}
            <div className="project-card-body">
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(16px,3vw,20px)', color: 'var(--foreground)' }}>
                {proj.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--foreground-muted)', lineHeight: 1.65, flex: 1 }}>
                {proj.description}
              </p>

              {proj.technologies?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {proj.technologies.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(226,232,240,0.8)', marginTop: 'auto' }}>
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Live</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    </svg>
                  </a>
                )}
                {!proj.github_url && !proj.live_url && (
                  <span style={{ fontSize: 12, color: 'var(--foreground-muted)', fontStyle: 'italic' }}>No links available</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
