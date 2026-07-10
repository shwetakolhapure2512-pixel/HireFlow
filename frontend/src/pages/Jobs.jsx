import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import { jobService } from '../services/jobService'
import { applicationService } from '../services/applicationService'
import JobCard from '../components/JobCard'
import Spinner from '../components/Spinner'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: '',
    employment_type: '',
    experience_level: '',
    page: 1
  })
  const [savedJobs, setSavedJobs] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    fetchJobs()
    if (user?.role === 'candidate') fetchSavedJobs()
  }, [filters])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobService.getAllJobs(filters.page, filters)
      setJobs(response.data.results || response.data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSavedJobs = async () => {
    try {
      const response = await applicationService.getSavedJobs()
      setSavedJobs(response.data.results?.map(item => item.job.id) || [])
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error)
    }
  }

  const handleSaveJob = async (jobId) => {
    if (!user?.role === 'candidate') return
    try {
      if (savedJobs.includes(jobId)) {
        const savedJob = (await applicationService.getSavedJobs()).data.results?.find(
          item => item.job.id === jobId
        )
        if (savedJob) await applicationService.removeSavedJob(savedJob.id)
        setSavedJobs(prev => prev.filter(id => id !== jobId))
      } else {
        await applicationService.saveJob(jobId)
        setSavedJobs(prev => [...prev, jobId])
      }
    } catch (error) {
      console.error('Failed to save job:', error)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Browse Jobs</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value, page: 1 })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.employment_type}
              onChange={(e) => setFilters({ ...filters, employment_type: e.target.value, page: 1 })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select
              value={filters.experience_level}
              onChange={(e) => setFilters({ ...filters, experience_level: e.target.value, page: 1 })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
              <option value="executive">Executive</option>
            </select>
            <button
              onClick={() => setFilters({ location: '', employment_type: '', experience_level: '', page: 1 })}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <Spinner size="lg" />
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No jobs found</p>
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard
                  job={job}
                  onSave={handleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}

export default Jobs
