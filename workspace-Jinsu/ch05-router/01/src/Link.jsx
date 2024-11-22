import PropTypes from 'prop-types';

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

function Link({ children, to }) {
  const handleClick = (e) => {
    // js로 이동 처리할 거니까, 브라우저는 이동 동작 하지마.
    e.preventDefault();
    // 새로운 페이지를 history API에 추가.
    // pushState(state, title, url)
    // pathname = 도메인을 제외한 나머지 뒷부분
    window.history.pushState(null, '', e.target.pathname);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
