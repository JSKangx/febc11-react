import Layout from '@components/Layout';
import About from '@pages/About';
import Home from '@pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
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
