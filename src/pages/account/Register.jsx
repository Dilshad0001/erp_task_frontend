
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')


    
    try {
      const response = await axios.post('http://localhost:8000/auth/register/', {
        username,
        password,
      })

      setSuccess('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/') // redirect to login page
      }, 2000)
    } catch (err) {
      if (err.response && err.response.data) {
        // store field-wise errors from backend
        setErrors(err.response.data)
      } else {
        setErrors({ general: ['Registration failed. Please try again.'] })
      }
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {success && <p className="text-green-500 mb-4">{success}</p>}
        {errors.general && (
          <p className="text-red-500 mb-4">{errors.general[0]}</p>
        )}

        <form onSubmit={handleRegister}>
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
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
