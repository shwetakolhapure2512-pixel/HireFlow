import React from 'react'
import MainLayout from '../layouts/MainLayout'

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
          <a href="/" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Go Home
          </a>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
