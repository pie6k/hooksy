import React, { useState } from 'react';

import { useUser, useNotifications } from './stores';

export function Content() {
  const { user, login, logout } = useUser();
  const {
    notifications,
    addNotification,
    removeNotificationByIndex,
    notificationsCount,
  } = useNotifications();

  const [newNotificationContent, setNewNotificationContent] = useState('');

  function addNewNotification() {
    addNotification({ content: newNotificationContent });
    setNewNotificationContent('');
  }

  return (
    <div className="content">
      <div>
        {user && (
          <div>
            <strong>Hello, {user.username} </strong>
            <button onClick={logout}>Logout</button>
          </div>
        )}
        {!user && (
          <button onClick={() => login({ username: `ReactUser` })}>
            Login
          </button>
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        {user && (
          <div>
            {notificationsCount > 0 && (
              <h2>
                Notifications&nbsp;
                <span className="notificationsCount">{notificationsCount}</span>
              </h2>
            )}
            {notifications.map((notification, index) => {
              return (
                <div
                  className="notification"
                  key={notification.content}
                  onClick={() => {
                    removeNotificationByIndex(index);
                  }}
                >
                  {notification.content}
                </div>
              );
            })}
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <h3>New notification</h3>
              <input
                placeholder="Notification content"
                value={newNotificationContent}
                onChange={(event) =>
                  setNewNotificationContent(event.target.value)
                }
              />
              <button onClick={addNewNotification}>Add notification</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
