import './Button.css';

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

export default Button;
