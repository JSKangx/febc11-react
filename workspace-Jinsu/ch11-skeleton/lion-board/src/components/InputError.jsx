import PropTypes from 'prop-types';

InputError.propTypes = {
  // 에러가 없으면 target이 안 넘어오는 게 아니라 undefined가 넘어온다. 필수로 받지 않아도 된다.
  target: PropTypes.object,
};

export default function InputError({ target }) {
  if (!target) return;
  return <p className='ml-2 mt-1 text-sm text-yellow-500 dark:text-yellow-400'>{target.message}</p>;
}
