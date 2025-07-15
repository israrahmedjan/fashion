// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      // Set user object
      setUser: (userData) => set({ user: userData }),

      // Clear user object (logout)
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store', // localStorage key
    }
  )
);

export default useUserStore;