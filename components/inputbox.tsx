'use client'

import React from "react"

interface InputFieldProps {
  label?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  name?: string
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  name,
}: InputFieldProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="input-field"
      />

      {error && <p style={{ fontSize: '14px', color: 'var(--danger)', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}
