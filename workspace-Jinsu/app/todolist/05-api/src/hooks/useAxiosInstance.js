import axios from 'axios';

function useAxiosInstance() {
  // 기본 설정을 가진 새로운 인스턴스를 생성할 때 사용하는 메서드.
  // 매 요청마다 공통된 설정을 적용할 수 있다.
  const instance = axios.create({
    baseURL: 'https://todo-api.fesp.shop/api',
    timeout: 1500,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  return instance;
}

export default useAxiosInstance;
