import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#17202A] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full appearance-none rounded-lg border bg-white py-2 pl-3.5 pr-9 text-sm text-[#17202A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63] focus:border-transparent disabled:bg-[#F7F8FA]',
              error ? 'border-[#C53B3B] focus:ring-[#C53B3B]' : 'border-[#E4E7EC]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="text-xs text-[#C53B3B] font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#667085]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
