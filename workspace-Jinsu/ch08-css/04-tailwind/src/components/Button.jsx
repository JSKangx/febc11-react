import PropTypes from 'prop-types';

// onClick, type은 받아서 무언갈 하는 게 아니기 때문에 그냥 ...rest로 받고, 그대로 사용.
const Button = ({ children, color = 'black', bg = 'gray', size = 'md', ...rest }) => {
  let bgColor = {
    gray: 'bg-slate-300',
    blue: 'bg-blue-300',
    red: 'bg-red-300',
    yellow: 'bg-yellow-300',
  };

  let textColor = {
    black: 'text-black',
    white: 'text-white',
    blue: 'text-blue-600',
    red: 'text-red-600',
  };

  let btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
  };

  return (
    <button
      className={`${bgColor[bg]} ${textColor[color]} ${btnSize[size]} m-1 rounded-md shadow-md `}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'red', 'black', 'white']), // (글자 색상) 배열값중 하나만 받아야 한다.
  bg: PropTypes.oneOf(['blue', 'red', 'yellow', 'gray']), // 배경 색상
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};

export default Button;
