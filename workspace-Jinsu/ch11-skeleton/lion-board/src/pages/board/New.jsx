import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputError from '@components/InputError';
import { Helmet } from 'react-helmet-async';

export default function New() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axios = useAxiosInstance();
  const { type, _id } = useParams();

  const queryClient = useQueryClient();

  const addItem = useMutation({
    mutationFn: (formData) => {
      // 새 글을 쓸 때 게시판의 종류에 따라 게시글의 type을 params에서 받아와서 추가해줘야 한다.
      formData.type = type;
      return axios.post(`/posts`, formData);
    },
    onSuccess: () => {
      alert('게시물이 등록되었습니다.');
      // 목록으로 돌아갔을 때 캐시된 데이터 말고(없애고) 최신 데이터 보여주기
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <Helmet>
        <title>게시글 등록 - 멋사컴</title>
        <meta property='og:title' content='게시글 등록 - 멋사컴' />
        <meta
          property='og:description'
          content='다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요.'
        />
      </Helmet>
      <main className='min-w-[320px] p-4'>
        <div className='text-center py-4'>
          <h2 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>게시글 등록</h2>
        </div>
        <section className='mb-8 p-4'>
          <form onSubmit={handleSubmit(addItem.mutate)}>
            <div className='my-4'>
              <label className='block text-lg content-center' htmlFor='title'>
                제목
              </label>
              <input
                id='title'
                type='text'
                placeholder='제목을 입력하세요.'
                className='w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                // 프론트에서는 필수 및 패턴만 검증. 서버에서 유효성 검증.
                {...register('title', { required: '제목은 필수입니다.' })}
              />
              {/* 에러 메시지는 여러 곳에서 사용되므로 컴포넌트로 만들어 활용 */}
              <InputError target={errors.title} />
            </div>
            <div className='my-4'>
              <label className='block text-lg content-center' htmlFor='content'>
                내용
              </label>
              <textarea
                id='content'
                rows='15'
                placeholder='내용을 입력하세요.'
                className='w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                {...register('content', { required: '내용은 필수입니다.' })}
              ></textarea>
              <InputError target={errors.content} />
            </div>
            <hr />
            <div className='flex justify-end my-6'>
              <button
                type='submit'
                className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                등록
              </button>
              <Link
                to='/info'
                className='bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                취소
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
