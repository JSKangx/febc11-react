import { useRef, useState } from 'react';

const errorStyle = {
  fontSize: '12px',
  color: 'red',
  fontWeight: 'bold',
};

const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  // (1) 각각 이벤트 핸들러로 상태관리하는 법
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [cellPhone, setCellPhone] = useState('010');

  // const handleNameChange = e => {
  //   setName(e.target.value);
  // };

  // const handleEmailChange = e => {
  //   setEmail(e.target.value);
  // };

  // const handleCellPhoneChange = e => {
  //   setCellPhone(e.target.value);
  // };

  // (2) 이벤트 핸들러를 객체로 한꺼번에 등록하여 관리하는 법
  const [user, setUser] = useState({
    name: '',
    email: '',
    cellPhone: '010',
  });

  // 검증 실패 메시지 상태 관리
  const [errors, setErrors] = useState({});

  // 포커스 추가하기 위한 DOM 노드 획득
  const nameElem = useRef(null);
  const emailElem = useRef(null);
  const cellPhoneElem = useRef(null);

  const handleInputChange = e => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };

  // 이름, 이메일, 휴대폰 검증 작업
  const onSubmit = e => {
    e.preventDefault(); // 기본 submit 동작 취소

    // 초기 에러 객체 정의
    let newErrors;
    if (user.name.trim() === '') {
      newErrors = {
        name: { message: '이름을 입력하세요.' },
      };
      nameElem.current.focus();
    } else if (user.name.trim().length < 2) {
      newErrors = {
        name: { message: '이름을 2글자 이상 입력하세요.' },
      };
      nameElem.current.focus();
    } else if (user.email.trim() === '') {
      newErrors = {
        email: { message: '이메일을 입력하세요.' },
      };
      emailElem.current.focus();
    } else if (user.cellPhone.trim().length < 2) {
      newErrors = {
        cellPhone: { message: '휴대폰 번호를 입력하세요.' },
      };
      cellPhoneElem.current.focus();
    } else if (!emailExp.test(user.email)) {
      newErrors = {
        email: { message: '이메일 형식에 맞지 않습니다.' },
      };
      emailElem.current.focus();
    } else if (!cellphoneExp.test(user.cellPhone)) {
      newErrors = {
        cellPhone: { message: '휴대폰 번호 형식에 맞지 않습니다.' },
      };
      cellPhoneElem.current.focus();
    }

    if (newErrors) {
      // 검증 실패
      setErrors(newErrors);
    } else {
      // 검증 통과
      setErrors({});
    }
  };

  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor='name'>이름</label>
        <input
          id='name'
          name='name'
          value={user.name}
          onChange={handleInputChange}
          ref={nameElem}
        />
        <br />
        <div style={errorStyle}>{errors.name?.message}</div>

        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          name='email'
          value={user.email}
          onChange={handleInputChange}
          ref={emailElem}
        />
        <br />
        <div style={errorStyle}>{errors.email?.message}</div>

        <label htmlFor='cellphone'>휴대폰</label>
        <input
          id='cellphone'
          name='cellPhone'
          value={user.cellPhone}
          onChange={handleInputChange}
          ref={cellPhoneElem}
        />
        <br />
        <div style={errorStyle}>{errors.cellPhone?.message}</div>

        <button type='submit'>가입</button>
      </form>

      <p>
        이름: {user.name}
        <br />
        이메일: {user.email}
        <br />
        휴대폰: {user.cellPhone}
        <br />
      </p>
    </>
  );
}

export default App;
