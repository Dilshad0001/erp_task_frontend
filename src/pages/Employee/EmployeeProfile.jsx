
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/app/employee/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate("/login")
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          My Profile
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">ID:</span>
            <span className="text-gray-900">{profile.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-900">
              {profile.username} {profile.last_name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Role:</span>
            <span className="text-gray-900">{profile.role}</span>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
