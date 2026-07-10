import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { motion } from 'framer-motion'
import { FaRocket, FaUsers, FaTrophy, FaHeadset } from 'react-icons/fa'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Dream Job</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Connect with top companies and land your next opportunity</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button variant="secondary" size="lg">Browse Jobs</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose HireFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaRocket, title: 'Fast & Easy', desc: 'Quick job search and applications' },
              { icon: FaUsers, title: 'Top Companies', desc: 'Connect with leading employers' },
              { icon: FaTrophy, title: 'Best Matches', desc: 'AI-powered job recommendations' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Always here to help' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
              >
                <item.icon className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of job seekers finding their perfect match</p>
          <Link to="/register">
            <Button variant="secondary" size="lg">Sign Up Now</Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
