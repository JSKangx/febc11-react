import PropTypes from 'prop-types';
import styles from './Button.module.css';
import classNames from 'classnames';

const Button = ({ type = 'button', onClick, children, color, bg }) => {
  // 클래스 이름 만들기 복잡해서 classnames 라이브러리 사용
  const colorStyle = classNames(styles.button, styles[`color-${bg}-${color}`]);

  return (
    <button type={type} onClick={onClick} className={colorStyle}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'red', 'yellow', 'white']), // (글자 색상) 배열값중 하나만 받아야 한다.
  bg: PropTypes.oneOf(['blue', 'red', 'yellow', 'gray']), // 배경 색상
  onClick: PropTypes.func,
};

export default Button;
