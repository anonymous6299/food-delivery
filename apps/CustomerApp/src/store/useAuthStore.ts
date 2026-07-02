import { create } from 'zustand';
import { User } from '../types';
import { MOCK_USER } from '../constants/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  setOnboarded: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isOnboarded: false,
  login: async (phone) => {
    // Simulated API call
    console.log('Requesting OTP for phone:', phone);
  },
  verifyOtp: async (otp) => {
    // Simulated verification
    if (otp === '1234' || otp === '123456') {
      set({ user: MOCK_USER, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  setOnboarded: (val) => set({ isOnboarded: val }),
}));

export default useAuthStore;
