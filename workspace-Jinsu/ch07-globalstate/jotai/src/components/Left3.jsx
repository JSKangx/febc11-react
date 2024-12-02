import { countAtom } from '@jotai/countAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  const [count] = useAtom(countAtom);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
