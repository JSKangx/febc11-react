import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function TodoAdd() {
  // 페이지를 이동할 수 있는 navigate 함수 반환
  const navigate = useNavigate();

  // useForm으로 상태 관리
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const axios = useAxiosInstance();

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  // react-hook-form의 handleSumbit을 통해 검증이 끝난 사용자 입력 객체가 자동으로 addItem.mutate의 인수로 넘어온다.
  const addItem = useMutation({
    mutationFn: (item) => axios.post('/todolist', item),
    onSuccess: (item) => {
      alert('할 일이 추가되었습니다.');
      reset();
      // refetch 호출하고 싶어도 TodoList에 있는 거라 호출 못한다. 그래서 아래 방법.
      // 지정한 키의 캐시를 무효화시킨다 == 다시 서버 통신한다.
      // useQuery에서 설정한 키. todolist로 시작하는 캐시는 무효화.
      queryClient.invalidateQueries(['todolist']);
      navigate(`/list`);
      console.log(item);
    },
    onError: (err) => {
      console.error('에러입니다.', err?.message);
      alert(err?.message || '할 일 추가에 실패했습니다.');
    },
  });

  return (
    <div id='main'>
      <h2>할일 추가</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(addItem.mutate)}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            autoFocus
            {...register('title', {
              required: '할일을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.title?.message}</div>
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea
            id='content'
            cols='23'
            rows='5'
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.content?.message}</div>
          <br />
          <button type='submit'>추가</button>
          <Link to='/list'>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
