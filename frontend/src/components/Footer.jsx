export default function Footer({ name }) {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} <strong>{name || 'Portfolio'}</strong>. Built with Django &amp; React.
        {' '}&nbsp;
        <a
          href="/admin-login"
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
        >
          Admin
        </a>
      </p>
    </footer>
  );
}
