import { create } from 'zustand';
// zustand 스토어를 스토리지에 연결하는 기능
import { persist, createJSONStorage } from 'zustand/middleware';

// 스토리지를 경유하는 버전
const useUserStore = create(
  // 1번인자 : 함수, 2번인자 : 객체
  persist(
    (set) => ({
      user: null, // 초기값
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user', // 키값
      storage: createJSONStorage(() => sessionStorage), // 기본은 로컬이기에 session으로 변경
    }
  )
);

// 스토리지를 경유하지 않는 버전
const prevUseUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
