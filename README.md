# hooksy

[demo](https://pie6k.github.io/hooksy/)

Create custom `useState` hook that can be used inside multiple components and will share state across all of them (and will update all of them if state is changed)

## API

```ts
import { createSharedStateHook } from 'hooksy';

// create custom `useState` hook and set default value only once.
export const customUseState = createSharedStateHook(0);

// later import `customUseState` anywhere in the app

// use the same way as `useState` inside multiple different components.

// `currentState` will be always synced between all of them.
// changing it in any component will cause change in every component using it with updated value
const [currentState, setState] = customUseState();
```

## Example

```tsx
import { createSharedStateHook } from 'hooksy';

// create custom state hook with some initial value
// such hook can be created in some separated file and imported to many different components
const useGlobalCount = createSharedStateHook(0);
const useAnotherGlobalCount = createSharedStateHook(0);

function ComponentA() {
  const [globalCount, setGlobalCount] = useGlobalCount();
  const [anotherGlobalCount] = useAnotherGlobalCount();

  return (
    <div>
      I'm first component and count is {globalCount}. 2nd count is{' '}
      {anotherGlobalCount}.
      <button onClick={() => setGlobalCount(globalCount + 1)}>Increase</button>
    </div>
  );
}

function ComponentB() {
  const [globalCount, setGlobalCount] = useGlobalCount();
  const [anotherGlobalCount, setAnotherGlobalCount] = useAnotherGlobalCount();

  return (
    <div>
      I'm second component. Count is {globalCount}. This count will always be
      synced with ComponentA count.
      <button onClick={() => setGlobalCount(globalCount - 1)}>Decrease</button>
      <button onClick={() => setAnotherGlobalCount(anotherGlobalCount + 1)}>
        Increase 2nd count
      </button>
    </div>
  );
}
```
