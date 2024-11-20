import Counter from '@components/Counter';
import Header from '@components/Header';

function App() {
  return (
    <>
      <div id='app' style={{ margin: '0 auto', maxWidth: '500px' }}>
        <Header />
        <Counter>5</Counter>
      </div>
    </>
  );
}

export default App;
