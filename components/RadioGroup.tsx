'use client'

import React from "react"

interface Option {
  label: string
  value: string
}

interface RadioGroupFieldProps {
  label?: string
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  name: string
}

export default function RadioGroupField({
  label,
  options,
  value,
  onChange,
  name,
}: RadioGroupFieldProps) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}

      <div style={{ display: 'flex', gap: '16px' }}>
        {options.map((option) => (
          <label key={option.value} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: 'var(--primary)',
              }}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
