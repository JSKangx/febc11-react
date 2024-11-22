import { useEffect, useState } from 'react';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log(path);

  // 이벤트 등록은 최초 한번만 호출
  useEffect(() => {
    // 주소창에 뭔가 바뀔 때 호출되는 함수
    const handleNavigate = (e) => {
      // localhost:5173 뒤에 나오는 것만 꺼낸다(pop)
      setPath(e.destination.url.split(location.host).pop());
    };
    window.navigation.addEventListener('navigate', handleNavigate);
    return () => {
      window.navigation.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  return (
    <>
      {(path === '/home.html' || path === '/') && <Home />}
      {path === '/page1.html' && <Page1 />}
      {path === '/page2.html' && <Page2 />}
    </>
  );
}

export default App;
