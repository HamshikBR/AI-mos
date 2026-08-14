import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, BrandWorkspace, Permission, Notification } from '../../types';
import { mockCurrentUser, mockBrandWorkspace, mockNotifications } from '../../mock/data';
import { authService } from '../../services/authService';

interface AuthContextType {
  user: User | null;
  currentBrand: BrandWorkspace;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadNotificationsCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockCurrentUser);
  const [currentBrand] = useState<BrandWorkspace>(mockBrandWorkspace);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, pass);
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        currentBrand,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        notifications,
        markNotificationRead,
        unreadNotificationsCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
