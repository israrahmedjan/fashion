// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCart = create(persist(
  (set, get) => ({
    item: [],
    success:false,
    // Add product to array
    add: (product) =>
      set((state) => {
        const exist = state.item.some((item)=>item._id === product._id)
        if(exist) return state;
        return {item: [...state.item, product],success:true}
      }),
    clear: () =>
    set((state) => ({
    item: [],
    success:false,
    })),
    setMessage: (msg)=>
    set((state)=>({success:msg})),
    // Reset cart
    reset: () => set({ item: [] }),
  }),
  {
    name: 'cartItems-storage', // localStorage key
  }
));

export default useCart;
