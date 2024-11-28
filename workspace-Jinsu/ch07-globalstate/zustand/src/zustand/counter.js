import { create } from 'zustand';

const useCounterStore = create((set, get) => ({
  count: 8,
  countUp: (step) => {
    set({ count: get().count + step });
  },
  countReset: () => {
    set({ count: 0 });
  },
  countDown: (step) => {
    set({ count: get().count - step });
  },
}));

export default useCounterStore;
