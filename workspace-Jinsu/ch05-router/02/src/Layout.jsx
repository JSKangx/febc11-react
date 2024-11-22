import { Outlet } from 'react-router-dom';
import Header from './Header';

// 모든 페이지에서 공통으로 사용하는 레이아웃을 정의하기 위한 컴포넌트
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
