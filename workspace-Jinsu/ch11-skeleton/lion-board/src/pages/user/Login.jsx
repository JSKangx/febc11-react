import InputError from '@components/InputError';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../zutand/userStore';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  // 로그인 상태 관리 dispatch 함수
  const setUser = useUserStore((store) => store.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // 수동으로 errors 객체를 지정하고 싶을 때
  } = useForm({
    // 테스트할 때 로그인 쉽게 하기 위한 아이디 비밀번호 기본값 저장
    defaultValues: {
      email: 'rkdwlstn@gmail.com',
      password: '11111111',
    },
  });

  const axios = useAxiosInstance();

  const login = useMutation({
    mutationFn: (formData) => axios.post(`/users/login`, formData),
    onSuccess: (res) => {
      // 회원정보 저장
      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        profile: user.image?.path,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      alert(res.data.item.name + '님, 로그인 되었습니다.');
      // 로그인 성공 후, 이전에 접속하려던 페이지로 이동 || 홈페이지로 이동
      navigate(location.state?.from || `/`);
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        // 서버에서 에러메시지가 넘어왔다면 (4xx, 5xx)
        err.response?.data.errors.forEach((error) => setError(error.path, { message: error.msg }));
      } else {
        // 서버에서 에러메시지가 안 넘어왔다면
        alert(err.response?.data.message || '잠시 후 다시 요청하세요.');
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>로그인 - 멋사컴</title>
        <meta property='og:title' content='로그인 - 멋사컴' />
        <meta
          property='og:description'
          content='다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요.'
        />
      </Helmet>
      <main className='min-w-80 flex-grow flex items-center justify-center'>
        <div className='p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0'>
          <div className='text-center py-4'>
            <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>로그인</h2>
          </div>

          <form onSubmit={handleSubmit(login.mutate)}>
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-200 mb-2' htmlFor='email'>
                이메일
              </label>
              <input
                id='email'
                type='email'
                placeholder='이메일을 입력하세요'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
                {...register('email', { required: '이메일은 필수입니다.' })}
              />
              <InputError target={errors.email} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 dark:text-gray-200 mb-2' htmlFor='password'>
                비밀번호
              </label>
              <input
                id='password'
                type='password'
                placeholder='비밀번호를 입력하세요'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700'
                {...register('password', { required: '비밀번호는 필수입니다.' })}
              />
              <InputError target={errors.password} />
              <a
                href='#'
                className='block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline'
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
            <div className='mt-10 flex justify-center items-center'>
              <button
                type='submit'
                className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                로그인
              </button>
              <a href='/users/signup' className='ml-8 text-gray-800 hover:underline'>
                회원가입
              </a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
