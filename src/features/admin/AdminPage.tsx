import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { mockCurrentUser } from '../../mock/data';
import { Users, Plus, Shield, Building2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const users = [
    mockCurrentUser,
    {
      id: 'usr_2',
      name: 'Laurent Moreau',
      email: 'chef.laurent@grandpalace.com',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=250&q=80',
      role: 'Content Strategist',
      brandId: 'brand_grand_palace',
      brandName: 'The Grand Palace Hotel',
      lastActive: '2 hours ago',
      status: 'Active',
    },
    {
      id: 'usr_3',
      name: 'Ananya Rao',
      email: 'ananya.r@grandpalace.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Social Media Manager',
      brandId: 'brand_grand_palace',
      brandName: 'The Grand Palace Hotel',
      lastActive: '1 day ago',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Administration"
        subtitle="User management, role-based access control, and workspace security"
        action={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add New User
          </Button>
        }
      />

      <Card>
        <CardHeader title="User Access Directory" subtitle="Manage permissions for team members and brand managers" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-[#667085] uppercase tracking-wider font-bold">
                <th className="p-3.5 pl-4">User</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Brand Workspace</th>
                <th className="p-3.5">Last Active</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="p-3.5 pl-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-[#17202A] block">{u.name}</span>
                      <span className="text-[11px] text-[#667085]">{u.email}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-[#173B63]">{u.role}</td>
                  <td className="p-3.5 text-[#667085]">{u.brandName}</td>
                  <td className="p-3.5 text-[#667085]">{u.lastActive}</td>
                  <td className="p-3.5"><StatusBadge status={u.status} /></td>
                  <td className="p-3.5 pr-4 text-right">
                    <Button variant="outline" size="sm">Edit Role</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
