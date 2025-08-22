


import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, Save, X, LogOut } from "lucide-react"

function AdminUserPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newRow, setNewRow] = useState(false)
  const [editUserId, setEditUserId] = useState(null)
  const [form, setForm] = useState({ username: "", role: "Employee" })
  const navigate = useNavigate()

  const API_URL = "http://127.0.0.1:8000/app/admin/user-list/"

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("access_token")
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(res.data)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch users")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate("/login")
  }

  // Save user (Add or Update)
  const handleSave = async () => {
    const token = localStorage.getItem("access_token")
    try {
      if (editUserId) {
        await axios.patch(
          API_URL + `?id=${editUserId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      setForm({ username: "", role: "Employee" })
      setNewRow(false)
      setEditUserId(null)
      fetchUsers()
    } catch (err) {
      console.error(err)
      setError("Failed to save user")
    }
  }

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return
    const token = localStorage.getItem("access_token")
    try {
      await axios.delete(API_URL + `?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchUsers()
    } catch (err) {
      console.error(err)
      setError("Failed to delete user")
    }
  }

  // Start editing
  const handleEdit = (user) => {
    setEditUserId(user.id)
    setForm({ username: user.username, role: user.role })
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* User List */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
          {!newRow && !editUserId && (
            <button
              onClick={() => setNewRow(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus size={18} /> Add User
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* New Row */}
                {newRow && (
                  <tr className="bg-blue-50">
                    <td className="p-3 text-gray-400">New</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                        placeholder="Enter username"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={form.role}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3 flex justify-end gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        <Save size={16} /> Save
                      </button>
                      <button
                        onClick={() => setNewRow(false)}
                        className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </td>
                  </tr>
                )}

                {/* User Rows */}
                {users.map((u) =>
                  editUserId === u.id ? (
                    <tr key={u.id} className="bg-yellow-50">
                      <td className="p-3">{u.id}</td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={form.username}
                          onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                          }
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={form.role}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                          className="border p-2 rounded w-full"
                        >
                          <option value="Employee">Employee</option>
                          <option value="Manager">Manager</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3 flex justify-end gap-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          onClick={() => setEditUserId(null)}
                          className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="p-3">{u.id}</td>
                      <td className="p-3">{u.username}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3 flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}

                {users.length === 0 && !newRow && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUserPage
