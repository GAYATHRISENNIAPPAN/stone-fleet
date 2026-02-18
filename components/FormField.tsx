'use client'

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react'

interface Option {
  label: string
  value: string
}

interface FormFieldProps {
  type: "text" | "password" | "date" | "checkbox" | "radio" | "typeahead"
  label?: string
  value?: any
  onChange?: (value: any) => void
  placeholder?: string
  options?: Option[]
  name?: string
  multiple?: boolean
  error?: string
}

export default function FormField({
  type,
  label,
  value,
  onChange,
  placeholder,
  options = [],
  name,
  multiple = false,
  error
}: FormFieldProps) {

  switch (type) {
    case "text":
    case "password":
      return <InputField label={label} type={type} value={value} onChange={onChange} placeholder={placeholder} error={error} name={name} />

    case "date":
      return <DateField label={label} value={value} onChange={onChange} />

    case "checkbox":
      return <CheckboxField label={label} checked={value} onChange={onChange} />

    case "radio":
      return <RadioField label={label} options={options} value={value} onChange={onChange} name={name || "radio"} />

    case "typeahead":
      return <TypeaheadField label={label} options={options} onChange={onChange} multiple={multiple} placeholder={placeholder} />

    default:
      return null
  }
}

function InputField({ label, type, value, onChange, placeholder, error, name }: any) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <input type={type} name={name} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="input-field" />
      {error && <p style={{ fontSize: '14px', color: 'var(--danger)', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}

function DateField({ label, value, onChange }: any) {
  const dateValue = value ? value.toISOString().split('T')[0] : ''
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined
    onChange?.(newDate)
  }
  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <input type="date" value={dateValue} onChange={handleChange} className="input-field" />
    </div>
  )
}

function CheckboxField({ label, checked, onChange }: any) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }} />
      {label}
    </label>
  )
}

function RadioField({ label, options, value, onChange, name }: any) {
  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <div style={{ display: 'flex', gap: '16px' }}>
        {options.map((option: Option) => (
          <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange?.(option.value)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }} />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

function TypeaheadField({ label, options, onChange, multiple, placeholder = 'Search...' }: any) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    return options.filter((opt: Option) => opt.label.toLowerCase().includes(search.toLowerCase()) && !selected.some((s) => s.value === opt.value))
  }, [options, search, selected])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setHighlightIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: Option) => {
    if (multiple) {
      const newSelected = [...selected, option]
      setSelected(newSelected)
      onChange?.(newSelected)
      setSearch('')
      inputRef.current?.focus()
    } else {
      setSelected([option])
      onChange?.(option)
      setSearch(option.label)
      setIsOpen(false)
    }
    setHighlightIndex(-1)
  }

  const handleRemove = (option: Option) => {
    const newSelected = selected.filter((s) => s.value !== option.value)
    setSelected(newSelected)
    onChange?.(multiple ? newSelected : null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex])
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightIndex(-1)
        break
      case 'Backspace':
        if (multiple && search === '' && selected.length > 0) handleRemove(selected[selected.length - 1])
        break
    }
  }

  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <div ref={wrapperRef} className="typeahead-container">
        <div className="typeahead-input-wrapper">
          {selected.map((opt) => (
            <span key={opt.value} className="typeahead-tag">
              {opt.label}
              <button type="button" onClick={() => handleRemove(opt)} className="typeahead-tag-remove">×</button>
            </span>
          ))}
          <input ref={inputRef} type="text" value={search} placeholder={selected.length === 0 ? placeholder : ''} onChange={(e) => { setSearch(e.target.value); setIsOpen(true) }} onFocus={() => setIsOpen(true)} onKeyDown={handleKeyDown} className="typeahead-input" />
        </div>
        {isOpen && (
          <ul className="typeahead-dropdown">
            {filtered.length > 0 ? filtered.map((opt: Option, index: number) => (
              <li key={opt.value} onClick={() => handleSelect(opt)} className={`typeahead-option ${highlightIndex === index ? 'typeahead-option-highlighted' : ''}`}>{opt.label}</li>
            )) : <li className="typeahead-no-results">No results found</li>}
          </ul>
        )}
      </div>
    </div>
  )
}

