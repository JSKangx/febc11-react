import Product from './Product';
import Shipping from './Shipping';
import { useCallback, useEffect, useState } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { SyncLoader } from 'react-spinners';
// toast 메시지를 보여줄 영역만 지정함. toast는 useAxiosInstance에서 사용할 예정
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';

function App() {
  // custom axios instance 사용
  const axios = useAxiosInstance();

  // useQuery는 조회작업 할 때 사용하는 훅.
  // useQuery는 data, isLoading, error를 상태관리하고 리턴해준다.
  // refetch는 다시 get 요청을 보낼 때 사용하는 함수.
  // 이 외에도 여러가지 함수를 반환해줌.
  const { data, isLoading, error, refetch } = useQuery({
    // 리액트 쿼리는 qeuryKey를 가진 쿼리 결과를 캐싱해서, 동일한 데이터를 다시 요청하지 않고 캐시된 데이터를 반환한다.
    queryKey: ['products', 7],
    // 서버에 ajax 요청을 보내 실제 데이터를 받아올 코드 작성. axios, fetch, xhr 뭘 쓰든 Promise만 반환하면 된다(axios, fetch의 경우 await 없이 호출하면 Promise가 반환됨)
    queryFn: () => axios.get(`/products/7`), // url을 안 쓴 건, 이건 axios instance이기에
    // 응답(data) 중에서 하나만 선택해서 사용할 때 사용함. 여기서 세팅한 값이 data로 저장됨. (axios instance interceptor 같은 친구)
    select: (res) => res.data.item,
    // refetchInterval: 2000, // 2초마다 refetch 해라 (서버와 동기화하는 것과 같은 효과.)
  });

  // useMutaion : 사용자의 이벤트에 의해 등록, 수정 삭제할 때 사용하는 훅
  // 상품 구매
  const orderProduct = useMutation({
    // 구매할 때는 캐시는 따로 필요 없어서 쿼리 키 불필요.
    // useMutation을 이벤트 핸들러 안에 넣으면 좋지만, 훅이기 때문에 못 넣는다.
    // 그대신 useMutation() 이 반환한 객체(orderProduct)는 이벤트 핸들러 안에 넣을 수 있는데, orderProduct.mutate()를 호출하면, mutationFn이 호출됨.
    mutationFn: (products) => axios.post(`/orders`, products),
    // 주문이 성공적으로 완료된 후 실행할 코드
    onSuccess: () => {
      toast.success('주문이 완료되었습니다', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Flip,
      });
      refetch(); // 주문이 완료되면 상품 상세조회를 다시 호출
    },
    // 주문이 실패한 후 실행할 코드
    onError: (err) => {
      toast.error('결제에 실패했습니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Flip,
      });
      console.log(err);
    },
  });

  // mock data
  const basicShippingFees = 3000;

  const [qty, setQty] = useState(1);

  const [shippingFees, setShippingFees] = useState(basicShippingFees);

  const handleQtyChange = (e) => {
    const newQty = Number(e.target.value); // input.value는 항상 string이 넘어온다.
    // 1 ~ 5개는 * 1 / 6 ~ 10개는 * 2 / ... 올림 메서드로 배송비 계산.
    setShippingFees(basicShippingFees * Math.ceil(newQty / 5));
    setQty(newQty);
  };

  // useCallback 함수 안에 또 콜백 함수가 있기에, useCallback 함수가 생성될 당시의 'shippingFees'를 콜백함수가 기억(클로저)한다. deps를 빈배열로 두면 배송비가 바뀌어도 여전히 생성될 당시의 배송비가 저장됨.
  // 그래서 deps에 배송비를 넣어줘서 캐시된 걸 버리고 새로운 함수가 만들어지도록 해줘야 함.
  const handlePayment = () => {
    const ok = confirm(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);

    if (ok) {
      // hook은 이벤트 핸들러 안에서 호출하는 건 금지됐지만, 훅이 반환해준 값을 사용하는 건 상관없다.
      // mutate 함수를 호출하면 mutationFn이 호출된다.
      orderProduct.mutate({
        // 오픈 마켓 API 서버에서 설정한 body 형식을 따라 전달 객체 작성
        products: [{ _id: 7, quantity: qty }],
      });
    }
  };
  // 수량이 변할 때마다 이 함수는 새롭게 생성되어야 하는 게 맞기 때문에 useCallback으로 캐시하면 안 된다.

  return (
    <>
      <h1>03 Nike 상품 상세 조회 - React Query</h1>
      {isLoading && <SyncLoader color='#6cda7f' />}
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          <Product product={data} />
          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원 <br />
            남은 수량: {data.quantity - data.buyQuantity} <br />
            수량:{' '}
            <input
              type='number'
              min='1'
              max={data.quantity - data.buyQuantity}
              value={qty}
              onChange={handleQtyChange}
            />
            (배송비는 5개당 {basicShippingFees.toLocaleString()}원씩 추가됩니다.) <br />
            상품 금액: {(data.price * qty).toLocaleString()}원
          </div>

          <Shipping handlePayment={handlePayment} fees={shippingFees} />
        </div>
      )}
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Flip}
      />
    </>
  );
}

export default App;
