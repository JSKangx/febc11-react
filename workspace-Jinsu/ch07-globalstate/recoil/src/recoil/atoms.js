import { atom } from 'recoil';

export const countState = atom({
  key: 'count', // atom 식별자로 모든 atom 에서 고유해야 함.
  default: 8,
});

export const loginState = atom({
  key: 'loginUser',
  default: null,
});

// 관리할 상태가 많으면 atom 파일을 더 만들면 된다.
