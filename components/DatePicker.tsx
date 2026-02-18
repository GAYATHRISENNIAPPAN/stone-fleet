'use client';

import { useState } from 'react';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  minDate?: string;
  maxDate?: string;
}

export default function DatePicker({ 
  value, 
  onChange, 
  placeholder = 'Select date', 
  label, 
  error,
  minDate,
  maxDate 
}: DatePickerProps) {
  const [focused, setFocused] = useState(false);

  const dateValue = value ? value.toISOString().split('T')[0] : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    onChange?.(newDate);
  };

  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <input
        type="date"
        value={dateValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={minDate}
        max={maxDate}
        placeholder={placeholder}
        className="input-field"
      />
      {error && (
        <p style={{ fontSize: '14px', color: 'var(--danger)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
