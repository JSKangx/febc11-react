import Layout from './Layout';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 라우팅 규칙
// createBrowserRouter([{라우팅 규칙 객체}], {})
const router = createBrowserRouter(
  [
    {
      path: '/',
      // '/'까지 일치하면 Layout을 렌더링
      // 그 다음 세부 경로가 뭐냐에 따라서 Outlet 들어갈 자리에 아래 엘리먼트를 쓴다.
      element: <Layout />,
      children: [
        // index: true - 해당 라우팅 규칙이 부모 경로의 기본 경로를 담당한다.
        { index: true, element: <Navigate to='/home' /> },
        { path: 'home', element: <Home /> },
        { path: 'page1', element: <Page1 /> },
        { path: 'page2', element: <Page2 /> },
      ],
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시되기에 임시로 옵션 적용
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
