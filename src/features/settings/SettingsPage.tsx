import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../app/providers/AuthProvider';
import { Settings, User, Bell, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, currentBrand } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage user account, workspace configurations, and security preferences"
      />

      <Card className="space-y-4">
        <CardHeader title="User Profile" subtitle="Your personal information and role permissions" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue={user?.name} />
          <Input label="Email Address" defaultValue={user?.email} disabled />
          <Input label="Assigned Role" defaultValue={user?.role} disabled />
          <Input label="Brand Workspace" defaultValue={currentBrand.name} disabled />
        </div>
        <div className="flex justify-end pt-4 border-t border-[#E4E7EC]">
          <Button variant="primary">Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};
