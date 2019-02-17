import { useState, useEffect } from 'react';
import { removeArrayElement } from './services';

type ValueUpdater<T> = (newValue: T) => void;
type ForceUpdateFunction = () => void;

function useForceUpdate(): ForceUpdateFunction {
  const [, updateComponent] = useState<{}>({});

  return () => {
    updateComponent({});
  };
}

export function createSharedStateHook<T>(defaultValue: T) {
  let sharedStateValue = defaultValue;
  const registeredForceUpdateHooks: ForceUpdateFunction[] = [];

  function updateSharedState(newValue: T) {
    sharedStateValue = newValue;
    registeredForceUpdateHooks.forEach((forceUpdateSingleComponent) => {
      forceUpdateSingleComponent();
    });
  }

  return function useSharedState(): [T, ValueUpdater<T>] {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
      registeredForceUpdateHooks.push(forceUpdate);

      return () => {
        removeArrayElement(registeredForceUpdateHooks, forceUpdate);
      };
    });

    return [sharedStateValue, updateSharedState];
  };
}

export default createSharedStateHook;
