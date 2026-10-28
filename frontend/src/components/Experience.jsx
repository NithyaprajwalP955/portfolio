export default function Experience({ data }) {
  if (!data?.length) return null;

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data.map((exp) => (
          <div key={exp.id} className="experience-card fade-in-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(16px,3vw,20px)', color: 'var(--foreground)' }}>
                  {exp.role}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--primary)', marginTop: 2 }}>
                  {exp.company}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--foreground-muted)', whiteSpace: 'nowrap', background: 'rgba(79,70,229,0.06)', padding: '4px 10px', borderRadius: 8 }}>
                {exp.start_date} – {exp.end_date || 'Present'}
              </span>
            </div>

            {exp.description && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--foreground-muted)', lineHeight: 1.7, marginBottom: 14 }}>
                {exp.description}
              </p>
            )}

            {exp.bullets?.length > 0 && (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--primary)', fontSize: 8, marginTop: 7, flexShrink: 0 }}>●</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.technologies?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.technologies.map((t, i) => (
                  <span key={i} className="tech-pill">{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
