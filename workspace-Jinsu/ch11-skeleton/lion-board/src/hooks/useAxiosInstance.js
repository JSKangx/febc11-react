import axios from 'axios';
import { toast, Slide } from 'react-toastify';
import useUserStore from '../zutand/userStore';

function useAxiosInstance() {
  const { user } = useUserStore();
  // 기본 설정을 가진 새로운 인스턴스를 생성할 때 사용하는 메서드.
  // 매 요청마다 공통된 설정을 적용할 수 있다.
  const instance = axios.create({
    baseURL: 'https:/11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'client-id': '00-brunch',
    },
  });

  // 요청 인터셉터 추가하기
  // 전달되는 config는 서버 요청할 때 보내는 axios 설정값 (instance + 호출할 때 설정한 것)
  instance.interceptors.request.use((config) => {
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.accessToken}`;
    }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      // 호출할 때 delay를 명시적으로 지정 안 했으면 아래가 지정됨.
      // 개발할 때는 2000으로, 운영할 때는 0으로 환경변수로 지정해주면 된다.
      delay: 500,
      ...config.params, // 나머지 기존 속성값 그대로
    };

    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error(error);

      toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });

      // 여기서 전달한 error 객체는 catch 블럭의 err 인수로 전달된다.
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
