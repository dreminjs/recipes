import { INotificationStore } from './notifications.interface';

export const selectAllNotifications = (store: INotificationStore) =>
  store.notifications;

export const selectAddNotification = (store: INotificationStore) =>
  store.addNotification;

export const selectAddInfoNotification = (store: INotificationStore) =>
  store.addInfoNotification;

export const selectAddSuccessNotification = (store: INotificationStore) =>
  store.addSuccessNotification;
export const selectAddErrorNotification = (store: INotificationStore) =>
  store.addErrorNotification;

export const selectRemoveNotification = (store: INotificationStore) =>
  store.removeNotification;
