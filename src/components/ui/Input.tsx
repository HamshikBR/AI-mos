import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#17202A] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#667085] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full rounded-lg border bg-white text-sm text-[#17202A] placeholder-[#98A2B3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#173B63] focus:border-transparent disabled:bg-[#F7F8FA] disabled:text-[#98A2B3]',
              leftIcon ? 'pl-9' : 'pl-3.5',
              rightIcon ? 'pr-9' : 'pr-3.5',
              'py-2',
              error ? 'border-[#C53B3B] focus:ring-[#C53B3B]' : 'border-[#E4E7EC]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[#667085]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-[#C53B3B] mt-1 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#667085] mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
