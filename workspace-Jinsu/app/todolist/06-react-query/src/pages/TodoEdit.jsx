import useAxiosInstance from '@hooks/useAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  const { item } = useOutletContext();

  // 프로그래밍 방식으로 페이지 이동에 사용
  // 페이지를 이동할 수 있는 navigate 함수 반환
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  });

  // 미리 만들어 놓은 커스텀 axios instance를 받아온다.
  const axios = useAxiosInstance();

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  // 수정 작업
  const onUpdateItem = useMutation({
    mutationFn: (formData) => {
      const ok = confirm('수정하시겠습니까?');
      if (ok) {
        axios.patch(`/todolist/${item._id}`, formData);
      }
    },
    onSuccess: () => {
      alert('할 일이 수정되었습니다.');
      navigate(`/list/${item._id}`);
      // useQuery에서 설정한 키. todolist로 시작하는 키를 가진 캐시를 무효화.
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
    onError: (err) => {
      alert('할 일 수정에 실패했습니다.');
      console.error(err);
    },
  });

  return (
    <div id='main'>
      <h2>할일 수정</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(onUpdateItem.mutate)}>
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
          <label htmlFor='done'>완료 :</label>
          <input type='checkbox' id='done' {...register('done')} />
          <br />
          <button type='submit'>수정</button>
          <Link to={`/list/${item._id}`}>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoEdit;
