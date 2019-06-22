import { useCallback } from 'react';

import { createStore } from '../../src';

interface Notification {
  content: string;
}

export const [useNotificationsStore] = createStore<Notification[]>([]);

export function useNotifications() {
  const [notifications, setNotifications] = useNotificationsStore();

  const addNotification = useCallback(
    (notification: Notification) => {
      if (!notification || !notification.content) {
        alert('No notification content');
        return;
      }
      setNotifications([...notifications, notification]);
    },
    [setNotifications, notifications],
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const notificationsCount = notifications.length;

  const removeNotificationByIndex = useCallback(
    (indexToRemove: number) => {
      setNotifications(
        notifications.filter((_, index) => index !== indexToRemove),
      );
    },
    [setNotifications, notifications],
  );

  return {
    notifications,
    addNotification,
    clearNotifications,
    notificationsCount,
    removeNotificationByIndex,
  };
}
