const Alert = ({ type = 'info', message }) => {
  if (!message) return null

  const styles = {
    success: { background: '#dcfce7', color: '#166534', border: '1px solid #86efac' },
    error: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' },
    info: { background: '#eff6ff', color: '#1d4ed8', border: '1px solid #93c5fd' },
  }

  return (
    <div style={{ ...styles[type], padding: '0.75rem 1rem', borderRadius: '0.4rem', marginBottom: '1rem' }}>
      {message}
    </div>
  )
}

export default Alert
