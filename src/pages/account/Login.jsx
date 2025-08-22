import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('http://localhost:8000/auth/login/', {
        username: username,
        password: password,
      })
console.log(response.data.user.access_token);

    //   localStorage.setItem('access_token', response.data.user.access_token)
    localStorage.setItem('access_token', response.data.access)

      if (response.data.user.role === "Manager") {
        navigate('/manager/home')
      } else if (response.data.user.role === "Employee") {
        navigate('/employee/home')
      } else {
        navigate('/admin/home')
      }
    } catch (err) {
      setError('Invalid username or password')
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Link to Register Page */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
