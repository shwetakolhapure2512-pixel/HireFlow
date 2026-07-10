import React from 'react'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa'
import { formatDate, formatCurrency } from '../utils/helpers'

const JobCard = ({ job, onSave, isSaved = false }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/jobs/${job.slug}`} className="text-xl font-bold text-gray-900 hover:text-blue-600">
            {job.title}
          </Link>
          <p className="text-gray-600 mt-1">{job.company.name}</p>
        </div>
        {job.company.logo && (
          <img src={job.company.logo} alt={job.company.name} className="w-12 h-12 rounded" />
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          {job.location}
        </div>
        {job.salary_min && (
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-green-500" />
            {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
          </div>
        )}
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-purple-500" />
          {job.employment_type}
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-orange-500" />
          {formatDate(job.created_at)}
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="flex gap-2">
        <Link
          to={`/jobs/${job.slug}`}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center transition"
        >
          View Details
        </Link>
        <button
          onClick={() => onSave(job.id)}
          className={`px-4 py-2 rounded border transition ${
            isSaved
              ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {isSaved ? '❤️ Saved' : '🤍 Save'}
        </button>
      </div>
    </div>
  )
}

export default JobCard
