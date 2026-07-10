import React from 'react'

const SkeletonLoader = ({ count = 1, height = 'h-20' }) => {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className={`${height} bg-gray-200 rounded animate-pulse`}></div>
      ))}
    </div>
  )
}

export default SkeletonLoader
