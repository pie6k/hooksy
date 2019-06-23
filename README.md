# Hooksy

Hooksy is state managment solution based on react hooks

- extremly easy to use
- no boilerplate
- works great with typescript
- composable 
- injectable to any component with 1 line of code
- allows creating complex data solutions (like actions, selectors) intuitively

[demo](https://pie6k.github.io/hooksy/)

# Tutorial

The best way to show how it works would be by example.

Let's assume we've got user store that is used by many components across the page. You can log in and out.

First - let's create the store:

```ts
// userStore.ts
import { createStore } from 'hooksy';

interface UserData {
  username: string;
}

const defaultUser: UserData = { username: 'Foo' };

export const [useUserStore] = createStore(defaultUser); // we've created store with initial value.
// useUserStore has the same signature like react useState hook, but the state will be shared across all components using it
```

Our store is ready and can be used inside any react component. If any component will modify user store state - all components using it will be re-rednered.

Let's see how we can use the store now:

```ts
import React from 'react';

import { useUserStore } from './userStore';

export function UserInfo() {
  const [user, setUser] = useUserStore();
  
  function login() {
    setUser({ username: 'Foo' })
  }

  return (
    <div>
      {!user && <strong>You're logged out<button onPress={login}>Login</button></strong>}
      {user && <strong>Logged as <strong>{user.username}</strong></strong>}
    </div>
  );
}
```

Now, we can also use the same store in totally different component:

```ts
import React from 'react';

import { useUserStore } from './userStore';

export function Footer() {
  const [user, setUser] = useUserStore();
  
  function logout() {
    setUser(null)
  }

  return (
    <div>
      {user && <strong>Press this button to log out: <button onPress={logout}>Log out</button></strong>}
    </div>
  );
}
```

If the button is pressed, both first and 2nd component will get updated.

As you might notice - we've implemented login and logout actions inside components which might not be good idea. We can easily avoid that by creating custom hooks with all needed actions (and selectors or anything javascript will allow you to write)

Let's modify our user store definition

```ts
import { useCallback } from 'react';

import { createStore } from '../../src';

interface UserData {
  username: string;
}

export const [useUserStore] = createStore<UserData>(null); // user store is defined the same way as before

// custom hook 
export function useUser() {
  const [user, setUser] = useUserStore();

  // let's define custom actions (we can - and should - use useCallback hooks - later on)
  function logout() {
    setUser(null);
  }

  function login(username: string) {
    setUser({username})
  }

  return {
    user,
    logout,
    login,
  };
}
```

Now, we can modify our components eg:

```ts
import React from 'react';

import { useUser } from './userStore';

export function UserInfo() {
  const { user, login } = useUser();

  return (
    <div>
      {!user && <strong>You're logged out<button onPress={() => login({ username: 'Foo' })}>Login</button></strong>}
      {user && <strong>Logged as <strong>{user.username}</strong></strong>}
    </div>
  );
}
```

etc.
