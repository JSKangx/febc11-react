import axios from 'axios';
import { toast } from 'react-toastify';

function useAxiosInstance() {
  // 기본 설정을 가진 새로운 인스턴스를 생성할 때 사용하는 메서드.
  // 매 요청마다 공통된 설정을 적용할 수 있다.
  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'client-id': '00-nike',
    },
  });

  // 요청 인터셉터 추가하기
  // 전달되는 config는 서버 요청할 때 보내는 axios 설정값 (instance + 호출할 때 설정한 것)
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuygnOydtOyKqCIsImVtYWlsIjoidTFAZ21haWwuY29tIiwiaW1hZ2UiOiIvZmlsZXMvMDAtbmlrZS91c2VyLWpheWcud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzMzMjc5MjUzLCJleHAiOjE3MzMzNjU2NTMsImlzcyI6IkZFU1AifQ.lvU0XamBGYN3rr5z39GENUdnyYLj2Ps-TrMPUycNZig`;
    // 요청이 전달되기 전에 필요한 공통 작업 수행
    console.log(config);
    config.params = {
      // 호출할 때 delay를 명시적으로 지정 안 했으면 아래가 지정됨.
      // 개발할 때는 2000으로, 운영할 때는 0으로 환경변수로 지정해주면 된다.
      delay: 1000,
      ...config.params, // 기존값 그대로
    };

    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행
      // 이 코드만 작성해놔도 호출하는 컴포넌트에서 이걸 안 찍어도 된다.
      if (response.data?.ok !== undefined) {
        // Truthy(1), Falsy(0) 값을 실제로 bool 값으로 바꿀 때 !! 쓴다.
        // 나는 ok값을 1, 0이 아닌 true, false로 쓰고 싶다!
        response.data.ok = !!response.data.ok;
      }
      console.log('인터셉터', response);

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);
      // 화면에 출력하는 방법
      const message = '잠시 후 다시 요청하세요.';
      // error.message = message;

      // toast를 사용하는 방법
      toast(message);

      // 여기서 전달한 error 객체는 catch 블럭의 err 인수로 전달된다.
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
