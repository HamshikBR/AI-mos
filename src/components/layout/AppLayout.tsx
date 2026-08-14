import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { clsx } from 'clsx';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex text-[#17202A]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={clsx(
          'flex-1 flex flex-col transition-all duration-300 min-w-0',
          collapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Header sidebarCollapsed={collapsed} />
        <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
