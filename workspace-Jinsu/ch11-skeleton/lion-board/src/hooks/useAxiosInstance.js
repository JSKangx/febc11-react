import axios from 'axios';
import { toast, Slide } from 'react-toastify';
import useUserStore from '../zutand/userStore';
import { useLocation, useNavigate } from 'react-router-dom';

// access token 재발급 URL
const REFRESH_URL = '/auth/refresh';

function useAxiosInstance() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 기본 설정을 가진 새로운 인스턴스를 생성할 때 사용하는 메서드.
  // 매 요청마다 공통된 설정을 적용할 수 있다.
  const instance = axios.create({
    baseURL: 'https:/11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'client-id': '00-board',
    },
  });

  // 요청 인터셉터 추가하기
  // 전달되는 config는 서버 요청할 때 보내는 axios 설정값 (instance + 호출할 때 설정한 것)
  instance.interceptors.request.use((config) => {
    // refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
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
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);
      const { config, response } = error;

      if (response?.status === 401) {
        // 인증 실패
        if (config.url === REFRESH_URL) {
          // refresh token 만료
          navigateLogin();
        } else if (user) {
          // 로그인 했으나 access token 만료된 경우
          // refresh 토큰으로 access 토큰 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          setUser({ ...user, accessToken });
          // 갱신된 accessToken으로 재요청
          config.headers.Authorization = `Bearer ${accessToken}`;
          // 다시 서버 요청
          return axios(config);
        } else {
          // 로그인 안한 경우
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  // 로그인되지 않은 사용자가 로그인 이후에 사용할 api호출할 때 리다이렉트
  function navigateLogin() {
    const gotoLogin = confirm('로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?');
    gotoLogin && navigate('/users/login', { state: { from: location.pathname } });
  }

  return instance;
}

export default useAxiosInstance;
