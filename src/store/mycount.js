// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const mycount = create(persist(
  (set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set({ count: 0 }),
  }),
  {
    name: 'counter-storage', // localStorage key name
  }
));

export default mycount;
