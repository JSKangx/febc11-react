import { useSetAtom } from 'jotai';
import { countActionsAtom } from '../jotai/countAtom';
import { useEffect, useRef, useState } from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  const [step, setStep] = useState(1);

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  const dispatch = useSetAtom(countActionsAtom);

  return (
    <div>
      <h3>Right3</h3>
      <label htmlFor='quantity'>step:</label>
      <input type='number' step='1' value={step} onChange={handleStepChange} />
      <br />

      <button onClick={() => dispatch({ type: 'DECREMENT', payload: step })}>-{step}</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>0</button>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: step })}>+{step}</button>
    </div>
  );
}

export default Right3;
