'use client';

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react';

interface Option {
  label: string;
  value: string;
}

interface TypeaheadProps {
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  onChange?: (selected: Option | Option[] | null) => void;
  label?: string;
}

export default function Typeahead({
  options,
  placeholder = 'Search...',
  multiple = false,
  onChange,
  label,
}: TypeaheadProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()) &&
        !selected.some((s) => s.value === opt.value)
    );
  }, [options, search, selected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (multiple) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange?.(newSelected);
      setSearch('');
      inputRef.current?.focus();
    } else {
      setSelected([option]);
      onChange?.(option);
      setSearch(option.label);
      setIsOpen(false);
    }
    setHighlightIndex(-1);
  };

  const handleRemove = (option: Option) => {
    const newSelected = selected.filter((s) => s.value !== option.value);
    setSelected(newSelected);
    onChange?.(multiple ? newSelected : null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (filtered[highlightIndex]) {
          handleSelect(filtered[highlightIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightIndex(-1);
        break;
      case 'Backspace':
        if (multiple && search === '' && selected.length > 0) {
          handleRemove(selected[selected.length - 1]);
        }
        break;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {label && <label className="label">{label}</label>}
      <div ref={wrapperRef} className="typeahead-container">
        <div className="typeahead-input-wrapper">
          {selected.map((opt) => (
            <span key={opt.value} className="typeahead-tag">
              {opt.label}
              <button type="button" onClick={() => handleRemove(opt)} className="typeahead-tag-remove">
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={search}
            placeholder={selected.length === 0 ? placeholder : ''}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="typeahead-input"
          />
        </div>
        {isOpen && (
          <ul className="typeahead-dropdown">
            {filtered.length > 0 ? (
              filtered.map((opt, index) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={`typeahead-option ${highlightIndex === index ? 'typeahead-option-highlighted' : ''}`}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="typeahead-no-results">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
