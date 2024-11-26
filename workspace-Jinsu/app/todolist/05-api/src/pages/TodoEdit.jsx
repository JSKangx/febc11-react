import useAxiosInstance from '@hooks/useAxiosInstance';
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
  const myAxios = useAxiosInstance();

  // 수정 작업
  const onSubmit = async (formData) => {
    // 서버에 변경을 발생시키는 것이기 때문에 사용자에게 결과를 정확히 고지해줘야 한다.
    try {
      // 사용자의 액션(이벤트 핸들러)을 필요로 하는 서버 통신은 훅으로는 못 쓴다.
      // 액시오스 커스텀 인스턴스로 서버 요청
      await myAxios.patch(`/todolist/${item._id}`, formData);

      alert('할일이 수정되었습니다.');
      // 할일 상세보기로 이동
      navigate(-1); // 수정 버튼 누르면 뒤로가기
    } catch (err) {
      console.error(err);
      alert('할일 수정에 실패했습니다.');
    }
  };

  return (
    <div id='main'>
      <h2>할일 수정</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
