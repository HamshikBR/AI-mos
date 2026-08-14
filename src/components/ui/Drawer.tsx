import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: 'right' | 'left';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#17202A]/40 backdrop-blur-xs">
      <div
        className={clsx(
          'fixed inset-y-0 flex max-w-full',
          position === 'right' ? 'right-0 pl-10' : 'left-0 pr-10'
        )}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#E4E7EC] flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7EC] bg-[#F7F8FA]">
            <div>
              <h3 className="text-base font-semibold text-[#17202A]">{title}</h3>
              {subtitle && <p className="text-xs text-[#667085] mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#667085] hover:text-[#17202A] hover:bg-[#E4E7EC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
