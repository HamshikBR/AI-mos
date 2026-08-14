import React from 'react';
import { Drawer } from '../ui/Drawer';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckSquare, Send, Lightbulb, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

export const NotificationDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useAuth();
  const navigate = useNavigate();

  const handleNotificationClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
      onClose();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckSquare className="w-4 h-4 text-[#C98216]" />;
      case 'publishing':
        return <Send className="w-4 h-4 text-[#287C7A]" />;
      case 'insight':
        return <Lightbulb className="w-4 h-4 text-[#5B5BD6]" />;
      default:
        return <Bell className="w-4 h-4 text-[#173B63]" />;
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Notifications" subtitle="Stay informed on system activity and governance alerts">
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleNotificationClick(n)}
            className={clsx(
              'p-3.5 rounded-lg border text-xs cursor-pointer transition-all',
              n.read ? 'bg-white border-[#E4E7EC]' : 'bg-[#F0F0FF]/40 border-[#C7C7FF] shadow-2xs'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#E4E7EC] shadow-2xs mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#17202A]">{n.title}</h4>
                  <span className="text-[10px] text-[#667085]">{n.timestamp}</span>
                </div>
                <p className="text-[#667085] mt-1">{n.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
