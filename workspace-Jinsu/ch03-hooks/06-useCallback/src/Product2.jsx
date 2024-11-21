import PropTypes from 'prop-types';
import { memo } from 'react';

const Product2 = memo(function Product({ product: { name, price, mainImage, content } }) {
  console.log('Product2 렌더링');
  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: {name}</p>
      <p>가격: {price.toLocaleString()}원</p>
      <p>상품 설명</p>
      <div>
        <img src={`https://11.fesp.shop/${mainImage}`} width='600' />
        <p>{content}</p>
      </div>
    </>
  );
});

// 함수 표현식으로 컴포넌트를 선언하면 Product에 접근하려면 함수 선언 다음에 써야 한다.
Product2.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product2;
