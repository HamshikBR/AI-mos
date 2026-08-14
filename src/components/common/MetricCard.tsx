import React from 'react';
import { Card } from '../ui/Card';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  description,
  icon,
  action,
  className,
}) => {
  return (
    <Card className={clsx('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-[#17202A] tracking-tight">{value}</h4>
        </div>
        {icon && (
          <div className="p-2.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-lg text-[#173B63]">
            {icon}
          </div>
        )}
      </div>

      {(change || description) && (
        <div className="mt-3 pt-3 border-t border-[#E4E7EC] flex items-center justify-between text-xs">
          {change && (
            <span
              className={clsx(
                'inline-flex items-center gap-1 font-semibold',
                changeType === 'positive' && 'text-[#16855B]',
                changeType === 'negative' && 'text-[#C53B3B]',
                changeType === 'neutral' && 'text-[#667085]'
              )}
            >
              {changeType === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
              {changeType === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {description && <span className="text-[#667085]">{description}</span>}
        </div>
      )}

      {action && <div className="mt-3">{action}</div>}
    </Card>
  );
};
