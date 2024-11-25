import Layout from '@components/Layout';
import About from '@pages/About';
import ErrorPage from '@pages/ErrorPage';
import Home from '@pages/Home';
import TodoAdd from '@pages/TodoAdd';
import TodoDetail from '@pages/TodoDetail';
import TodoEdit from '@pages/TodoEdit';
import TodoList from '@pages/TodoList';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to='/home' /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'list', element: <TodoList /> },
        { path: 'todoadd', element: <TodoAdd /> },
        { path: 'list/:_id', element: <TodoDetail /> },
        { path: 'todoedit', element: <TodoEdit /> },
        { path: '*', element: <ErrorPage /> },
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
