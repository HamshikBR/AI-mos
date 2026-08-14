import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  action,
  breadcrumbs,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-xs text-[#667085] mb-1.5">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <span className={idx === breadcrumbs.length - 1 ? 'text-[#17202A] font-medium' : ''}>
                  {b.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl md:text-[28px] font-bold text-[#17202A] tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-[#667085] mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
};

export const Avatar: React.FC<{ src?: string; name: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover border border-[#E4E7EC] ${sizes[size]} ${className || ''}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-[#173B63] text-white font-semibold flex items-center justify-center border border-[#173B63] ${sizes[size]} ${className || ''}`}
    >
      {initials}
    </div>
  );
};
