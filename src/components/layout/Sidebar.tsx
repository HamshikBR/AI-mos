import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Building2,
  Dna,
  Users,
  Calendar,
  Layers,
  Sparkles,
  CheckSquare,
  Send,
  MessageSquare,
  BarChart3,
  Lightbulb,
  ThumbsUp,
  BookOpen,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderOpen
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  isAi?: boolean;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { user, currentBrand, logout } = useAuth();
  const location = useLocation();

  const navSections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'BRAND',
      items: [
        { label: 'Brand Workspace', path: '/brand', icon: Building2 },
        { label: 'Brand DNA', path: '/brand/dna', icon: Dna },
        { label: 'Customer Personas', path: '/brand/personas', icon: Users },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        { label: 'Marketing Calendar', path: '/calendar', icon: Calendar },
        { label: 'Campaigns', path: '/campaigns', icon: Layers },
        { label: 'Creative Assets', path: '/creative-library', icon: FolderOpen },
        { label: 'Creative Studio', path: '/creative-studio', icon: Sparkles, isAi: true },
      ],
    },
    {
      title: 'WORK',
      items: [
        { label: 'Approvals', path: '/approvals', icon: CheckSquare, badge: 3 },
        { label: 'Publishing', path: '/publishing', icon: Send },
        { label: 'Community', path: '/community', icon: MessageSquare, badge: 2 },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
        { label: 'Insights', path: '/insights', icon: Lightbulb, isAi: true },
        { label: 'Recommendations', path: '/recommendations', icon: ThumbsUp, isAi: true },
      ],
    },
    {
      title: 'KNOWLEDGE',
      items: [
        { label: 'Knowledge Repository', path: '/knowledge', icon: BookOpen },
      ],
    },
    {
      title: 'GOVERNANCE',
      items: [
        { label: 'Governance', path: '/governance', icon: ShieldCheck },
        { label: 'Audit Log', path: '/audit', icon: FileSpreadsheet },
      ],
    },
  ];

  const bottomItems: NavItem[] = [
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Administration', path: '/admin', icon: Users },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-30 bg-[#17202A] text-white flex flex-col transition-all duration-300 border-r border-[#2C3A4B]',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#2C3A4B] bg-[#121A22]">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#173B63] to-[#5B5BD6] flex items-center justify-center font-bold text-white text-sm shadow-sm">
              M
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide text-white block leading-none">MTS-AI-MOS</span>
              <span className="text-[10px] text-[#98A2B3] uppercase tracking-wider block mt-0.5">Marketing OS</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#173B63] to-[#5B5BD6] flex items-center justify-center font-bold text-white text-sm mx-auto">
            M
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-[#98A2B3] hover:text-white hover:bg-[#2C3A4B] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {!collapsed && (
              <h4 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3] mb-1">
                {section.title}
              </h4>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors relative group',
                      isActive
                        ? 'bg-[#173B63] text-white font-semibold shadow-xs'
                        : 'text-[#D0D5DD] hover:bg-[#243242] hover:text-white'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={clsx('w-4 h-4 shrink-0', item.isAi ? 'text-[#C7C7FF]' : '')} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge !== undefined && (
                      <span className="ml-auto bg-[#C53B3B] text-white px-1.5 py-0.2 text-[10px] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-2 border-t border-[#2C3A4B] bg-[#121A22] space-y-0.5">
        {bottomItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                isActive
                  ? 'bg-[#173B63] text-white'
                  : 'text-[#D0D5DD] hover:bg-[#243242] hover:text-white'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#F97316] hover:bg-[#243242] transition-colors mt-2"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
