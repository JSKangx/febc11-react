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
    if (user) {
      // 기본적으로는 access token을 보낸다.
      let token = user.accessToken;
      // 만약 refresh url로 보내는 경우에만 refresh token을 사용한다.
      if (config.url === REFRESH_URL) {
        token = user.refreshToken;
      }

      config.headers['Authorization'] = `Bearer ${token}`;
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

      const { config, reponse } = error;
      // reponse가 있다 : 서버로부터 응답이 된 에러
      if (reponse?.status === 401) {
        // 401 : 인증 실패 코드
        if (config.url === REFRESH_URL) {
          // refresh 토큰까지 만료된 경우 (REFRESH_URL로부터 응답 받았다)
          const goToLogin = confirm(
            '로그인 후에 이용 가능합니다. \n 로그인 페이지로 이동하시겠습니까?'
          );
          if (goToLogin) {
            // 원래 가려던 페이지를 from이라는 값에 저장
            navigate('/users/login', { state: { from: location.pathname } });
          }
        } else {
          // (1) accessToken 만료된 경우 : 재발행
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            // 갱신된 accessToken으로 요청을 다시 보냄
            // 헤더에 Authorization을 새로운 값으로 세팅
            config.headers.Authorization = `Bearer ${accessToken}`;
            // 다시 요청하고 완성된 결과를 return
            return axios(config); // instance 아님.
          }
          // (2) 아예 토큰이 없을 경우(로그인 안 함) - refresh 토큰 한 번 더 써보고, 안 되면 if 문으로 걸림
        }
      } else {
        // 인증 실패가 아닌 다른 에러는 클라이언트에 error 객체로 넘겨줌.
        // 여기서 전달한 error 객체는 catch 블럭의 err 인수로 전달된다.
        return Promise.reject(error);
      }
    }
  );

  // access token 재발급
  async function getAccessToken(instance) {
    try {
      // 이 안에서 refreshToken을 가지고 와서 instance를 통해 ajax 요청을 보내지 않는 이유는 instance의 요청 인터셉터에 설정된 headers 설정이 덮어씌워져서 결국 리프레시 토큰이 안 보내지기 때문이다.
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      setUser({ ...user, accessToken });
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useAxiosInstance;
