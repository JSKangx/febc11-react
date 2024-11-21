import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ type = 'button', onClick, children, color }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      type={type}
      onClick={onClick}
      className='rounded-button'
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default Button;
