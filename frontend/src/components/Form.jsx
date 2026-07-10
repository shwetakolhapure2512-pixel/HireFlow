import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Form = ({ onSubmit, children, className = '' }) => {
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { ...methods })
      )}
    </form>
  )
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  placeholder = '',
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        {...register?.(name, { required: required ? `${label} is required` : false })}
        {...props}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  )
}

export const FormTextarea = ({
  label,
  name,
  register,
  errors,
  placeholder = '',
  required = false,
  rows = 4,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        {...register?.(name, { required: required ? `${label} is required` : false })}
        {...props}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  )
}

export const FormSelect = ({
  label,
  name,
  register,
  errors,
  options = [],
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        }`}
        {...register?.(name, { required: required ? `${label} is required` : false })}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  )
}

export default Form
