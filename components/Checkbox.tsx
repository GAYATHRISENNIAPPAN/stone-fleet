'use client'

import React from "react"

interface CheckboxFieldProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
}

export default function CheckboxField({
  label,
  checked,
  onChange,
  name,
}: CheckboxFieldProps) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '14px',
    }}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{
          width: '18px',
          height: '18px',
          cursor: 'pointer',
          accentColor: 'var(--primary)',
        }}
      />
      {label}
    </label>
  )
}
