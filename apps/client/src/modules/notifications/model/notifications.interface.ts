export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface INotification {
  id: string;
  message?: string;
  type: NotificationType;
  duration?: number | null;
  callbackFn?: () => void
}

export type IAddNotificationDto = Omit<INotification, 'id' | 'type'>;

export interface INotificationStore {
  notifications: INotification[];
  addNotification: (data: Omit<INotification, 'id'>) => void;
  removeNotification: (data: NotificationType) => void;
  clearNotifications: () => void;
  addSuccessNotification: (dto?: IAddNotificationDto) => void;
  addInfoNotification: (
    dto?: Omit<IAddNotificationDto, 'duration'>
  ) => void;
  addErrorNotification: (dto?: IAddNotificationDto) => void;
}
