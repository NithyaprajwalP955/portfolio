export default function Certifications({ data }) {
  if (!data?.length) return null;

  return (
    <section id="certifications" className="section">
      <h2 className="section-title">Certifications</h2>
      <div className="grid-3">
        {data.map((cert) => (
          <div key={cert.id} className="cert-card">
            {/* Image area */}
            <div className="cert-image">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cert.issuer}</p>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 20px 20px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--foreground)', marginBottom: 4 }}>
                {cert.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--foreground-muted)', marginBottom: cert.credential_url ? 12 : 0 }}>
                {cert.issuer} {cert.date && `• ${cert.date}`}
              </p>
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary btn-sm"
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  View Credential
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
