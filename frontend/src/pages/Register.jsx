import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { registerUser } from '../services/AuthService'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: 'info', text: 'Creating your account...' })

    try {
      const { name, email, password } = form
      await registerUser({ name, email, password })

      setMessage({ type: 'success', text: 'Registration successful. Please login.' })
      navigate('/login')
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Registration failed. Verify your backend endpoint and payload formatting.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem', maxWidth: '320px', margin: '2rem auto' }}>
      <h2>Register</h2>
      <Alert type={message.type} message={message.text} />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
