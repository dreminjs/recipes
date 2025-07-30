import { FC } from 'react';
import { INotification } from '../model/notifications.interface';

interface IProps {
  onClose: () => void;
  notification: INotification;
}

export const NotificationItem: FC<IProps> = ({ notification, onClose }) => {
  const bgColor = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }[notification.type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-between min-w-[250px]`}
    >
      <span>{notification.message}</span>
      <button onClick={onClose} className="ml-2 text-lg">
        &times;
      </button>
    </div>
  );
};
