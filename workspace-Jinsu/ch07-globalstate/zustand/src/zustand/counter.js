import { create } from 'zustand';

const useCounterState = create((set, get) => ({
  count: 8,
  countUp: (step) => {
    const newState = { count: get().count + step };
    set(newState);
  },
  countReset: () => {},
  countDown: (step) => {},
}));

export default useCounterState;
