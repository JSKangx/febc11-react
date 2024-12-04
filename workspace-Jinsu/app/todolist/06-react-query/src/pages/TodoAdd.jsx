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

  // react-hook-form의 handleSumbit을 통해 검증이 끝난 사용자 객체가 onSumbit의 인수로 넘어온다.
  // const onSubmit = async (item) => {
  //   console.log('서버에 전송', item);

  //   // (1) 커스텀 axios instance를 활용하는 방법
  //   try {
  //     const res = await axios.post('/todolist', item);
  //     console.log(res);
  //     alert('할 일이 추가되었습니다.');
  //     setFocus('title');
  //     reset();
  //     navigate(`/list/${res.data.item._id}`);
  //   } catch (err) {
  //     console.error('에러입니다.', err.message);
  //     alert(err?.message || '할 일 추가에 실패했습니다.');
  //   }

  //   // (2) XHR을 이용하는 방법
  //   // 요청 전송하면 바로 타이머 시작
  //   // const timer = setTimeout(() => {
  //   //   xhr.abort(); // 2초 뒤 요청 취소
  //   // }, 2000);

  //   // const xhr = new XMLHttpRequest();

  //   // xhr.open('POST', 'https://todo-api.fesp.shop/api/todolist');
  //   // xhr.setRequestHeader('Content-Type', 'application/json');
  //   // xhr.responseType = 'json';

  //   // 서버로부터 응답이 도착하면 호출되는 함수
  //   // xhr.onload = () => {
  //   //   clearTimeout(timer); // 응답 도착하면 타이머 취소
  //   //   if (xhr.status >= 200 && xhr.status < 300) {
  //   //     console.log(xhr.response);
  //   //     alert('할 일이 추가되었습니다.');
  //   //     setFocus('title');
  //   //     reset();
  //   //     // 할일 추가 완료 후 해당 할일 상세 페이지로 리다이렉트
  //   //     navigate(`/list/${xhr.response.item._id}`);
  //   //   } else {
  //   //     // 400 ~ 500번대 응답
  //   //     console.error('서버에서 에러 응답', xhr.status, xhr.response);
  //   //     alert(xhr.response.error?.message || '할 일 추가에 실패했습니다.');
  //   //   }
  //   // };

  //   // xhr.onabort = () => {
  //   //   alert('타임 아웃');
  //   // };

  //   // // 네트워크 이벤트가 발생했을 때 에러처리
  //   // xhr.onerror = () => {
  //   //   console.error('네트워크 에러');
  //   //   alert('할 일 추가에 실패했습니다.');
  //   // };

  //   // xhr.send(JSON.stringify(item));
  // };

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
