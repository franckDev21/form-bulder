import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout, userInfo } from './services/auth';
import { UserModel } from '@/models/user';

interface UserState {
  user: UserModel|null;
  signIn: () => Promise<void>;
  signOut: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      signIn: async () => {
        try {
          const response = await userInfo();
          set({ user: response.data });
        } catch {
          set({ user: null });
        }
      },
      signOut: async () => {
        await logout();
        set({ user: null });
        window.location.href = '/';
      },
      isLoggedIn: () => {
        // Vérifier si l'utilisateur est connecté
        const { user } = get();
        return user !== null;
      },
    }),
    { name: 'user-storage' }
  )
);
