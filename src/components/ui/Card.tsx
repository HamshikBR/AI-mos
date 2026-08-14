import React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-2xs transition-all duration-200',
        hoverable && 'hover:border-[#D0D5DD] hover:shadow-xs cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode; className?: string }> = ({
  title,
  subtitle,
  action,
  className,
}) => (
  <div className={clsx('flex items-start justify-between pb-4 border-b border-[#E4E7EC] mb-4', className)}>
    <div>
      <h3 className="text-base font-semibold text-[#17202A] tracking-tight">{title}</h3>
      {subtitle && <p className="text-xs text-[#667085] mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);
