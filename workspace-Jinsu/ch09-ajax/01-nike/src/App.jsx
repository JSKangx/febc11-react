import { useCallback, useEffect, useMemo, useState } from 'react';
import Product from './Product';
import Shipping from './Shipping';

function App() {
  console.log('App 렌더링');
  // 아래 data가 API 서버로부터 조회해 온 결과라고 가정
  // const data = {
  //   _id: 2,
  //   price: 125000,
  //   shippingFees: 3000, // 배송비
  //   name: '나이키 잼',
  //   quantity: 35, // 총 판매수량
  //   buyQuantity: 10, // 이미 판매된 수량
  //   mainImage: '/files/00-nike/NIKE_JAM_01.jpg',
  //   content:
  //     '나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.',
  // };

  // 상태 관리
  const [data, setData] = useState();

  // data 가져오는 함수
  const fetchData = async (_targetId) => {
    // fetch(url, option)
    const res = await fetch(`https://11.fesp.shop/products/${_targetId}`, {
      headers: {
        'client-id': '00-nike',
      },
    });
    const jsonData = await res.json();
    console.log(jsonData);
    setData(jsonData.item);
  };

  // 마운트 이후에 최초 한 번만 실행
  useEffect(() => {
    fetchData(7);
  }, []);

  // mock data
  const basicShippingFees = 3000;

  const returnData = () => {
    return data;
  };

  const memoizedData = useMemo(() => {
    return returnData();
  }, []);

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
  const handlePayment = useCallback(() => {
    alert(`배송비 ${shippingFees}원이 추가됩니다. 상품을 결제하시겠습니까?`);
  }, [shippingFees]);

  return (
    <>
      <h1>01 Nike 상품 상세 조회</h1>

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
