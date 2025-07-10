// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWish = create(persist(
  (set, get) => ({
    itemwish: [],
    success:false,
    // Add product to array
    addwish: (product) =>
      set((state) => {
        const exist = state.itemwish.some((itemwish)=>itemwish._id === product._id)
        if(exist) return state;
        return {itemwish: [...state.itemwish, product],success:true}
      }),
      Removeitemwish: (id) =>
      set((state) => {
        
        return {itemwish: state.itemwish.filter((product) => product._id !== id)}
       
      }),
    Updateitemwishwish: (qty, id) =>
  set((state) => ({
    itemwish: state.itemwish.map((product) =>
    {
      if(qty == 0)
      {
      
      return product._id === id
  ? (product.qty > 1 ? { ...product, qty: product.qty - 1 } : product)
  : product;
      }
      return product._id === id ? { ...product, qty:product.qty+1 } : product
    }
      
    ),
  })),
 
    clear: () =>
    set((state) => ({
    itemwish: [],
    success:false,
    })),
    setMessage: (msg)=>
    set((state)=>({success:msg})),
    // Reset cart
    reset: () => set({ itemwish: [] }),
  }),
  {
    name: 'wishitemwishs-storage', // localStorage key
  }
));

export default useWish;
