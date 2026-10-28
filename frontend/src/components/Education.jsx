export default function Education({ data }) {
  if (!data?.length) return null;

  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      <div className="grid-2">
        {data.map((edu) => (
          <div key={edu.id} className="education-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="skill-icon" style={{ width: 48, height: 48, borderRadius: 16 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
                    <path d="M22 10v6"/>
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(16px,3vw,20px)', color: 'var(--foreground)' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--primary)', marginTop: 2 }}>
                    {edu.field}
                  </p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, color: 'var(--foreground-muted)' }}>
                {edu.institution}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--card-border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--foreground-muted)' }}>
                {edu.start_year} – {edu.end_year || 'Present'}
              </span>
              {edu.score && (
                <span className="tech-pill" style={{ fontWeight: 700, color: 'var(--primary)', borderColor: 'var(--primary)', padding: '5px 14px', fontSize: 12 }}>
                  {edu.score}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
