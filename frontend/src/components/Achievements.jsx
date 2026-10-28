export default function Achievements({ data }) {
  if (!data?.length) return null;

  return (
    <section id="achievements" className="section">
      <h2 className="section-title">Achievements</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((item) => (
          <div key={item.id} className="achievement-card">
            <div className="achievement-dot" />
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(15px,2.5vw,17px)', color: 'var(--foreground)', marginBottom: 4 }}>
                {item.title}
              </h3>
              {item.description && (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--foreground-muted)', lineHeight: 1.65 }}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
