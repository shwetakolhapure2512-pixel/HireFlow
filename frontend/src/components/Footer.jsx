import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HireFlow</h3>
            <p className="text-gray-400">Connect talent with opportunities</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">My Profile</Link></li>
              <li><Link to="/applications" className="hover:text-white transition">Applications</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Recruiters</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/post-job" className="hover:text-white transition">Post Job</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/companies" className="hover:text-white transition">Companies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-blue-400 transition"><FaFacebook /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaLinkedin /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HireFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
