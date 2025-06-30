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
      RemoveItem: (id) =>
      set((state) => {
        return {item: state.item.filter((product) => product._id !== id)}
       
      }),
    UpdateItem: (qty, id) =>
  set((state) => ({
    item: state.item.map((product) =>
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
