import { countState } from '@recoil/atoms';
import { countStateKor } from '@recoil/selectors';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  // const count = useRecoilValue(countState); // atom에서 읽기
  const count = useRecoilValue(countStateKor); // seletor에서 읽기 (가공된 값 반환)

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
