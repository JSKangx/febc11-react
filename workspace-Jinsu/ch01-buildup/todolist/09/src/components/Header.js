import kang from '../../../kang.js';

function Header() {
  return kang.createElement(
    'header',
    null,
    kang.createElement('h1', null, 'Todo List - 컴포넌트 모듈화 :)'),
    kang.createElement(
      'p',
      null,
      '파일 경로: ',
      kang.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`),
    ),
  );
}

export default Header;
