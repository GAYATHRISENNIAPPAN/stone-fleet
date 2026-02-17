'use client';

import React from 'react';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  disabled = false,
}: FormFieldProps<T>) {

  const error = errors[name]?.message?.toString();

  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? 'border-red-500' : ''}`}
        {...register(name)}
      />

      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--danger)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
