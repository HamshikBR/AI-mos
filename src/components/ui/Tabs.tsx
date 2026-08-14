import React from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}) => {
  if (variant === 'pills') {
    return (
      <div className={clsx('flex space-x-1 bg-[#F1F3F5] p-1 rounded-lg w-fit', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all',
                isActive
                  ? 'bg-white text-[#173B63] shadow-xs'
                  : 'text-[#667085] hover:text-[#17202A]'
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    'px-1.5 py-0.5 text-[10px] rounded-full font-bold',
                    isActive ? 'bg-[#173B63]/10 text-[#173B63]' : 'bg-[#E4E7EC] text-[#667085]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={clsx('border-b border-[#E4E7EC] flex space-x-6 overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors',
              isActive
                ? 'border-[#173B63] text-[#173B63] font-semibold'
                : 'border-transparent text-[#667085] hover:text-[#17202A] hover:border-[#D0D5DD]'
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'px-2 py-0.5 text-xs rounded-full font-semibold',
                  isActive ? 'bg-[#173B63]/10 text-[#173B63]' : 'bg-[#F1F3F5] text-[#667085]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
