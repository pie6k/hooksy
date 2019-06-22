import { useCallback } from 'react';

import { createStore } from '../../src';

interface UserData {
  username: string;
}

export const [useUserStore] = createStore<UserData>(null);

export function useUser() {
  const [user, setUser] = useUserStore();

  const logout = useCallback(() => {
    if (!confirm('Are you sure?')) {
      return;
    }
    setUser(null);
  }, [setUser]);

  return {
    user,
    logout,
    login: setUser,
  };
}
