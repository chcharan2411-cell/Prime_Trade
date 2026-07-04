import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { loginUser } from '../services/AuthService'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: 'info', text: 'Signing you in...' })

    try {
      const { email, password } = form
      const response = await loginUser({ email, password })

      if (!response?.data?.token) {
        throw new Error('No token returned by server')
      }

      const token = response.data.token
      localStorage.setItem('token', token)

      // Backend now returns the role directly on login, so no more
      // guessing/decoding the JWT payload on the frontend.
      const role = (response?.data?.role || 'USER').toString().toUpperCase()
      localStorage.setItem('role', role)

      setMessage({ type: 'success', text: 'Login successful' })
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Login failed. Check your credentials and backend URL.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '320px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <Alert type={message.type} message={message.text} />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
