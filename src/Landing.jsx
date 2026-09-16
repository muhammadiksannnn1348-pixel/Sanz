export default function Landing({ onMasuk }) {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        marginBottom: '0.5rem'
      }}>
        Selamat Datang
      </h1>

      <p style={{
        color: '#b8b8c8',
        marginBottom: '2.5rem',
        fontSize: '1rem'
      }}>
        Klik tombol di bawah untuk memulai
      </p>

      <button
        onClick={onMasuk}
        style={{
          padding: '1rem 3.5rem',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#fff',
          background: 'linear-gradient(135deg, #e94560, #f5a623)',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(233, 69, 96, 0.35)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Masuk
      </button>
    </div>
  );
}