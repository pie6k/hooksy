import { useState, useEffect, useCallback } from 'react';

export function useForceUpdate() {
  const [, updateComponent] = useState<{}>({});

  return useCallback(() => {
    updateComponent({});
  }, []);
}

export function removeArrayElement<T>(arr: T[], elem: T) {
  const index = arr.indexOf(elem);

  if (index === -1) {
    return;
  }

  arr.splice(index, 1);
}
