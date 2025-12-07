import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type User = {
  email: string
  token: string
}

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please enter an email and password.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://api.example-login.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const text = await response.text().catch(() => '')
        throw new Error(text || 'Login failed')
      }

      const data: { token: string; user: { email: string } } = await response.json()

      setUser({
        email: data.user.email,
        token: data.token,
      })
      setPassword('');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unknown error occurred during login.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
    setPassword('')
    setError(null)
  }

  if (!user) {
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Login</h1>
        <div className="card">
          <form
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </div>
        <p className="read-the-docs">
          This demo sends email/password to <code>https://api.example-login.com/v1/auth/login</code>.
          Replace with your real backend and response handling.
        </p>
      </>
    )
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>
        Logged in as <strong>{user.email}</strong>
      </p>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <button style={{ marginLeft: '0.5rem' }} onClick={handleLogout}>
          Log out
        </button>
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', wordBreak: 'break-all' }}>
          Demo token (from API response): <code>{user.token}</code>
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
