import {
  INotification,
  INotificationStore,
  NotificationType,
} from './notifications.interface';
import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useNotificationStore = create<INotificationStore>((set, get) => ({
  notifications: [],

  addNotification: (data): void => {
    const id = nanoid();
    const duration = data.duration ?? 3000;
    const newNotification: INotification = {
      id,
      type: data.type,
      message: data.message,
      duration,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    if (duration && duration > 0) {
      setTimeout(() => {
        get().removeNotification(data.type);
        data.callbackFn && data.callbackFn();
      }, duration);
    }
  },

  removeNotification: (type: NotificationType): void => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.type !== type),
    }));
  },

  clearNotifications: (): void => {
    set({ notifications: [] });
  },

  addSuccessNotification: (dto = { duration: 3000 }): void => {
    get().addNotification({
      ...dto,
      message: dto.message ? dto.message : 'Успех!',
      type: 'success',
    });
  },

  addInfoNotification: (dto = {}): void => {
    get().addNotification({
      ...dto,
      message: dto.message ? dto.message : 'Загрузка...',
      type: 'info',
      duration: null,
    });
  },

  addErrorNotification: (dto = { duration: 3000 }): void => {
    get().addNotification({
      ...dto,
      message: dto.message ? dto.message : 'Что-то пошло не так!',
      type: 'error',
    });
  },
}));
