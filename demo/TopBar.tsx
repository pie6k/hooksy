import React from 'react';

import { useUser, useNotifications } from './stores';

export function TopBar() {
  const { user } = useUser();
  const { notificationsCount, clearNotifications } = useNotifications();

  return (
    <div className="topbar">
      {user && (
        <>
          <div>
            Logged as <strong>{user.username}</strong>
          </div>
          {notificationsCount > 0 && (
            <div>
              You have{' '}
              <span className="notificationsCount">{notificationsCount}</span>{' '}
              notifications.&nbsp;
              <button onClick={clearNotifications}>Clear all</button>
            </div>
          )}
          {notificationsCount == 0 && <div>No notifications</div>}
        </>
      )}
      {!user && <strong>You're logged out</strong>}
    </div>
  );
}
