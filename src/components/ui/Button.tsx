import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ai' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#173B63] text-white hover:bg-[#122F50] focus:ring-[#173B63] shadow-sm',
    secondary: 'bg-[#287C7A] text-white hover:bg-[#1F6361] focus:ring-[#287C7A]',
    outline: 'border border-[#E4E7EC] bg-white text-[#17202A] hover:bg-[#F7F8FA] focus:ring-[#173B63]',
    ghost: 'bg-transparent text-[#667085] hover:bg-[#F7F8FA] hover:text-[#17202A]',
    ai: 'bg-[#5B5BD6] text-white hover:bg-[#4A4AC4] focus:ring-[#5B5BD6] shadow-sm',
    danger: 'bg-[#C53B3B] text-white hover:bg-[#A82E2E] focus:ring-[#C53B3B]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
