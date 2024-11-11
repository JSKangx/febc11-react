import Kang from '../kang.js';

function Header() {
  return Kang.createElement(
    'header',
    null,
    Kang.createElement('h1', null, 'Counter - 컴포넌트 모듈화'),
    Kang.createElement(
      'p',
      null,
      '파일 경로: ',
      Kang.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`),
    ),
  );
}

export default Header;
