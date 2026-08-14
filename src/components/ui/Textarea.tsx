import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#17202A] uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full rounded-lg border bg-white p-3 text-sm text-[#17202A] placeholder-[#98A2B3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63] focus:border-transparent disabled:bg-[#F7F8FA]',
            error ? 'border-[#C53B3B] focus:ring-[#C53B3B]' : 'border-[#E4E7EC]',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-[#C53B3B] font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#667085]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
