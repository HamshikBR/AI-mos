import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
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
        className={`rounded-full object-cover border border-[#E4E7EC] ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-[#173B63] text-white font-semibold flex items-center justify-center border border-[#173B63] ${sizes[size]} ${className}`}
    >
      {initials}
    </div>
  );
};
