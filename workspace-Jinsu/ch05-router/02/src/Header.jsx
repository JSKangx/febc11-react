import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 02 리액트 라우터 사용</h1>
        {/* Link 컴포넌트에 추가기능 제공하는 컴포넌트 */}
        <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='/home'>
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='/page1'>
          page1
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='/page2'>
          page2
        </NavLink>

        {/* 일반 Link */}
        {/* <Link to='/'>home</Link>
        <br />
        <Link to='/page1'>page1</Link>
        <br />
        <Link to='/page2'>page2</Link> */}
      </header>
    </>
  );
}

export default Header;
