import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem' }}>
      <Link to="/">Dashboard</Link>
      {localStorage.getItem('token') ? (
        <button onClick={handleLogout} type="button">Logout</button>
      ) : (
        <div>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
