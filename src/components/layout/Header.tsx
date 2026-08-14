import React, { useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { Avatar } from '../common/Avatar';
import { Search, Bell, HelpCircle, Building2, ChevronDown, Plus } from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';
import { SearchModal } from './SearchModal';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const Header: React.FC<{ sidebarCollapsed: boolean }> = () => {
  const { user, currentBrand, unreadNotificationsCount } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="h-16 bg-white border-b border-[#E4E7EC] px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        {/* Brand Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E4E7EC] bg-[#F7F8FA] text-xs font-semibold text-[#17202A] cursor-pointer hover:border-[#D0D5DD] transition-colors">
            <Building2 className="w-4 h-4 text-[#173B63]" />
            <div>
              <span className="block leading-none font-semibold text-[#17202A]">{currentBrand.name}</span>
              <span className="text-[10px] text-[#667085] leading-none font-normal">{currentBrand.location}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#667085] ml-1" />
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => navigate('/campaigns/new')}
          >
            Create
          </Button>
        </div>

        {/* Global Search Input */}
        <div className="flex-1 max-w-md mx-8">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-lg text-xs text-[#667085] hover:border-[#D0D5DD] transition-colors text-left"
          >
            <Search className="w-4 h-4 text-[#667085]" />
            <span>Search campaigns, content, creative assets, knowledge...</span>
            <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#667085] bg-white border border-[#E4E7EC] rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-[#667085] hover:text-[#17202A] hover:bg-[#F7F8FA] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C53B3B] rounded-full ring-2 ring-white" />
            )}
          </button>

          <button
            className="p-2 rounded-lg text-[#667085] hover:text-[#17202A] hover:bg-[#F7F8FA] transition-colors"
            title="Help & Documentation"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-[#E4E7EC]" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/settings')}>
            <Avatar name={user?.name || 'Sarah Johnson'} src={user?.avatar} size="sm" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-[#17202A] leading-tight">{user?.name || 'Sarah Johnson'}</p>
              <p className="text-[10px] text-[#667085] leading-tight mt-0.5">{user?.role || 'Brand Manager'}</p>
            </div>
          </div>
        </div>
      </header>

      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
