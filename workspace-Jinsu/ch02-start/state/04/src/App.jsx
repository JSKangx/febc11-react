import { useState } from 'react';
import EditAddress from './components/EditAddress';
import { produce } from 'immer';

function App() {
  const [user, setUser] = useState({
    _id: 4,
    email: 'u1@market.com',
    name: '데이지',
    phone: '01044445555',
    address: '서울시 강남구 논현동 222',
    type: 'user',
    createdAt: '2024.01.25 21:08:14',
    updatedAt: '2024.02.04 09:38:14',
    extra: {
      birthday: '11-30',
      membershipClass: 'MC02',
      addressBook: [
        {
          id: 1,
          name: '회사',
          value: '서울시 강동구 천호동 123',
        },
        {
          id: 2,
          name: '집',
          value: '서울시 강동구 성내동 234',
        },
      ],
    },
  });

  const handleAddressChange = event => {
    // immer 라이브러리를 사용하여 상태 불변성 유지
    // produce(복사할 객체, 복사할 객체가 인수로 전달되는 콜백 함수 : 수정할 값 입력)
    // immer가 draft에 수정된 값을 체크해보고, 라인을 따라 계속 부모 객체를 새로운 객체로 교체해주고, 최상위 객체를 새롭게 만들어 리턴해준다.
    const newState = produce(user, draft => {
      const address = draft.extra.addressBook.find(
        address => address.id === Number(event.target.name)
      );
      address.value = event.target.value;
    });

    // 회사 주소가 변경될 경우에 기대하는 값
    console.log('user', user === newState); // false
    console.log('user.extra', user.extra === newState.extra); // false
    console.log('user.extra.addressBook', user.extra.addressBook === newState.extra.addressBook);
    console.log('회사 객체', user.extra.addressBook[0] === newState.extra.addressBook[0]); // false
    console.log('집 객체', user.extra.addressBook[1] === newState.extra.addressBook[1]);
    console.log(
      '회사 주소',
      user.extra.addressBook[0].value === newState.extra.addressBook[0].value
    ); // false (만약 true라면 newState의 주소를 바꿨을 때 user의 주소도 바뀐다는 말이다)
    console.log('집 주소', user.extra.addressBook[1].value === newState.extra.addressBook[1].value);
    console.log('기존 회사 주소', user.extra.addressBook[0].value);
    console.log('기존 집 주소', user.extra.addressBook[1].value);

    // setter 함수를 사용해 user 객체를 아예 새것으로 교체 해준다.
    setUser(newState);
  };

  return (
    <>
      <h2>04 상태관리 대상이 복합 객체일 경우 불변성 관리</h2>
      <p>
        이메일 : {user.email}
        <br />
        이름 : {user.name}
        <br />
        전화번호 : {user.phone}
        <br />
      </p>
      <ul>
        {user.extra.addressBook?.map(address => (
          <li key={address.id}>
            {address.name}: {address.value}
          </li>
        ))}
      </ul>
      <p>
        <EditAddress
          addressBook={user.extra.addressBook}
          handleAddressChange={handleAddressChange}
        />
      </p>
    </>
  );
}

export default App;
