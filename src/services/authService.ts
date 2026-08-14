import { User } from '../types';
import { mockCurrentUser } from '../mock/data';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate async network call
    if (email && password) {
      localStorage.setItem('mts_auth_token', 'mock-jwt-token-123456');
      return { ...mockCurrentUser, email };
    }
    throw new Error('Invalid email or password');
  },

  async getCurrentUser(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCurrentUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('mts_auth_token');
  },
};
