import { useCallback, useEffect, useMemo, useState } from 'react';
import Product from './Product';
import Shipping from './Shipping';
import { SyncLoader } from 'react-spinners';
function App() {
  console.log('App 렌더링');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 상태 관리
  const [data, setData] = useState();

  // data 가져오는 함수
  const fetchData = async (_targetId) => {
    setIsLoading(true);

    try {
      // fetch(url, option)
      const res = await fetch(`https://11.fesp.shop/111123products/${_targetId}?delay=2000`, {
        headers: {
          'client-id': '00-nike',
        },
      });
      const jsonData = await res.json();

      if (res.ok) {
        // 응답 상태코드가 200, 300번대일 경우
        setData(jsonData.item);
        setError(null);
      } else {
        // 응답 상태 코드가 400, 500번대일 경우
        setError(jsonData);
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setError({ message: '잠시 후 다시 요청하세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 마운트 이후에 최초 한 번만 실행
  useEffect(() => {
    fetchData(7);
  }, []);

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
  // 그래서 deps에 배송비를 넣어줘서 배송비가 바뀔 때마다 캐시된 걸 버리고 새로운 useCallback 함수가 만들어지도록 해줘야 함.
  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  return (
    <>
      <h1>01 Nike 상품 상세 조회 - Fetch API</h1>
      {isLoading && <SyncLoader color='#6cda7f' />}
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          <Product product={data} />
          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원 <br />
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
    </>
  );
}

export default App;
