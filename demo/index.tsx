import React from 'react';
import { render } from 'react-dom';

import { createSharedStateHook } from '../src';

export const useGlobalCount = createSharedStateHook(0);

function Increaser() {
  const [count, setCount] = useGlobalCount();

  return (
    <div>
      <strong>I'm first component and count is {count}</strong>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

function Decreaser() {
  const [count, setCount] = useGlobalCount();

  return (
    <div>
      <strong>
        I'm totally differenct component and {count} is the count now or{' '}
        {count * 2} is count*2
      </strong>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <Increaser />
      <Decreaser />
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
