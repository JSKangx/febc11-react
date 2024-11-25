import { RouterProvider } from 'react-router-dom';
// import router from './routes';
import router from './routes-lazy';
import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

function App() {
  return (
    <>
      <Suspense fallback={<BarLoader color='#94d0ef' />}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Suspense>
    </>
  );
}

export default App;
