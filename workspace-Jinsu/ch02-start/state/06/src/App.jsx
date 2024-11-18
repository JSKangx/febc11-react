import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const errorStyle = {
  fontSize: '12px',
  color: 'red',
  fontWeight: 'bold',
};

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  // useForm으로 상태 관리
  const {
    register,
    handleSumbit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      cellphone: '010',
    },
  });

  // react-hook-form의 handleSumbit을 통해 검증이 끝난 사용자 객체가 onSumbit의 인수로 넘어온다.
  const onSubmit = user => {
    console.log('서버에 전송', user);
  };

  return (
    <>
      <h1>06 회원가입 입력값 검증 (feat. react-hook-form)</h1>

      <form onSubmit={handleSumbit(onSubmit)}>
        <label htmlFor='name'>이름</label>
        <input
          id='name'
          {...register('name', {
            required: '이름을 입력하세요.',
            minLength: {
              value: 2,
              message: '2글자 이상 입력하세요.',
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.name?.message}</div>

        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: emailExp,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.email?.message}</div>

        <label htmlFor='cellphone'>휴대폰</label>
        <input
          id='cellphone'
          {...register('cellphone', {
            required: '전화번호를 입력하세요.',
            pattern: {
              value: cellphoneExp,
              message: '전화번호 형식에 맞지 않습니다.',
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.cellphone?.message}</div>

        <button type='submit'>가입</button>
      </form>

      <p>
        이름: {watch('name')}
        <br />
        이메일: {watch('email')}
        <br />
        휴대폰: {watch('cellphone')}
        <br />
      </p>
    </>
  );
}

export default App;
