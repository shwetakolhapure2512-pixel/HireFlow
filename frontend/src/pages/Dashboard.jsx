import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from '../layouts/PrivateRoute'
import { useAuth } from '../context/AuthContext'
import { dashboardService } from '../services/dashboardService'
import Spinner from '../components/Spinner'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const endpoint = user?.role === 'recruiter' ? 'recruiter' : 'candidate'
        const response = await dashboardService[`get${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}Dashboard`]()
        setData(response.data)
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.role) fetchDashboard()
  }, [user])

  if (loading) return <Spinner size="lg" />
  if (!data) return <MainLayout><div className="text-center py-20">No dashboard data available</div></MainLayout>

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'} Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user?.role === 'recruiter' ? (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">{data?.total_jobs}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-green-600">{data?.active_jobs}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-purple-600">{data?.total_applications}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-orange-600">4.5/5</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-3xl font-bold text-blue-600">{data?.total_applications}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm">Saved Jobs</p>
                <p className="text-3xl font-bold text-green-600">{data?.saved_jobs}</p>
              </motion.div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {data?.applications_per_month && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Applications Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.applications_per_month}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {data?.applications_by_status && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Applications by Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(data.applications_by_status).map(([key, value]) => ({
                      name: key,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(data.applications_by_status).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Recent Applicants / Applications */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            {user?.role === 'recruiter' ? 'Recent Applicants' : 'Recent Applications'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-900">Name/Job</th>
                  <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(data?.recent_applicants || data?.recent_applications)?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name || item.job_title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        item.status === 'hired' ? 'bg-green-100 text-green-800' :
                        item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(item.applied_at || item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
