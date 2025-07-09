import { create } from 'zustand';

const useMessageStore = create((set) => ({
  message: '',
  type: '', // e.g. 'success', 'error'

  setMessage: (msg, msgType = 'success') => set({ message: msg, type: msgType }),
  clearMessage: () => set({ message: '', type: '' }),
}));

export default useMessageStore;
