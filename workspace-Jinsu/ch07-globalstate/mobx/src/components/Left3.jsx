import counterStore from '@mobx/counterStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// 스토어의 상태 변경 여부를 구독해서 상태가 변경될 때 리렌더링되도록 observer() 사용
const Left3 = observer(function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });
  return (
    <div>
      <h3>Left3</h3>
      <span>{counterStore.count}</span>
    </div>
  );
});

export default Left3;
