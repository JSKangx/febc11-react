import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type = 'button', onClick, children, color, bg }) => {
  return (
    <button type={type} onClick={onClick} className={`button color-${bg}-${color}`}>
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
