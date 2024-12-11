import { create } from 'zustand';
// zustand 스토어를 스토리지에 연결하는 기능
import { persist } from 'zustand/middleware';

// 스토리지를 경유하는 버전
const useThemeStore = create(
  // 1번인자 : 함수(스토어 세팅 함수), 2번인자 : 객체(스토리지에 저장할 때 설정 정보)
  persist(
    (set) => ({
      // 초기값을 사용자의 os 설정에 따라 보이게 함
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
      toggleTheme: () => set((prevState) => ({ isDarkMode: !prevState.isDarkMode })),
    }),
    {
      name: 'themeStore', // 키값
    }
  )
);

export default useThemeStore;

// 스토리지를 경유하지 않는 버전
// const prevUseUserStore = create((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   resetUser: () => set({ user: null }),
// }));
