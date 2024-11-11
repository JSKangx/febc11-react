import Kang from '../kang.js';
import Header from './Header.js';
import Counter from './Counter.js';

// 애플리케이션의 시작점. UI를 리턴받고 화면에 뿌린다.
function App() {
  return Kang.createElement('div', { id: 'app' }, Header, Counter);
}

export default App;
