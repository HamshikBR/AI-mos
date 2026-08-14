import React from 'react';
import { Button } from '../ui/Button';
import { FolderOpen, Sparkles, AlertCircle } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-[#E4E7EC] shadow-2xs my-4">
      <div className="p-4 bg-[#F7F8FA] border border-[#E4E7EC] rounded-2xl text-[#173B63] mb-4">
        {icon || <FolderOpen className="w-8 h-8 text-[#667085]" />}
      </div>
      <h3 className="text-base font-semibold text-[#17202A]">{title}</h3>
      <p className="text-sm text-[#667085] max-w-md mt-1 mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string; aiMode?: boolean }> = ({
  message = 'Loading data...',
  aiMode = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center my-6">
      <div className="relative flex items-center justify-center w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#E4E7EC] border-t-[#173B63] animate-spin" />
        {aiMode && <Sparkles className="w-5 h-5 text-[#5B5BD6] animate-pulse" />}
      </div>
      <p className="text-sm font-medium text-[#17202A]">{message}</p>
      {aiMode && <p className="text-xs text-[#5B5BD6] mt-1 font-medium">Analyzing Brand DNA & Context...</p>}
    </div>
  );
};

export const ErrorState: React.FC<{ title?: string; message: string; onRetry?: () => void }> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <div className="p-6 bg-[#FDF2F2] border border-[#C53B3B]/20 rounded-xl my-4 text-center">
      <div className="inline-flex p-3 bg-white rounded-full text-[#C53B3B] mb-3 shadow-2xs">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-[#17202A]">{title}</h4>
      <p className="text-sm text-[#C53B3B] max-w-md mx-auto mt-1 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Retry Action
        </Button>
      )}
    </div>
  );
};
