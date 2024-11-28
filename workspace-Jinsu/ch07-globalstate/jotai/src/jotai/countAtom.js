import { atom } from 'jotai';

// (1) 상태 정의 & 초기값 설정
export const countAtom = atom(7);

// (2) 상태 관리 로직 정의 (디스패치 함수)
export const countActionsAtom = atom(
  // (2-1) 상태를 읽는 역할을 하는 get 함수
  (get) => get(countAtom),
  // (2-2) 상태를 업데이트하는 디스패치 함수들을 정의
  (get, set, action) => {
    switch (action.type) {
      case 'INCREMENT':
        set(countAtom, get(countAtom) + (Number(action.payload) || 1));
        break;
      case 'DECREMENT':
        set(countAtom, get(countAtom) - (Number(action.payload) || 1));
        break;
      case 'RESET':
        set(countAtom, 0);
        break;
      default:
        return get(countAtom);
    }
  }
);
