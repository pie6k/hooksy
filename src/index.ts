import { useLayoutEffect } from 'react';
import { removeArrayElement, useForceUpdate } from './services';

interface StoreListeningComponentData<T> {
  update: () => void;
  options?: UseStoreStateOptions<T>;
}

export interface UseStoreStateOptions<T> {
  shouldUpdate?: (oldState: T, newState: T) => boolean;
}

export function createStore<T>(defaultValue: T) {
  let storeState = defaultValue;
  const storeListeningComponents: StoreListeningComponentData<T>[] = [];

  function updateStoreState(newStoreState: T) {
    const oldStoreState = storeState;
    storeState = newStoreState;
    storeListeningComponents.forEach(({ update, options }) => {
      const shouldUpdate =
        !options ||
        !options.shouldUpdate ||
        !options.shouldUpdate(oldStoreState, newStoreState);

      if (!shouldUpdate) {
        return;
      }

      update();
    });
  }

  function useStoreState(options?: UseStoreStateOptions<T>) {
    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
      const listeningData: StoreListeningComponentData<T> = {
        options,
        update: forceUpdate,
      };

      storeListeningComponents.push(listeningData);

      return () => {
        removeArrayElement(storeListeningComponents, listeningData);
      };
    });

    return [storeState, updateStoreState] as const;
  }

  return [useStoreState, updateStoreState] as const;
}
