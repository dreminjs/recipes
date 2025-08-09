import { NotificationActions } from '@/modules/notifications/model/notifications.interface';

interface IArgs {
  nationalCuisineId?: string;
  typeId?: string;
  holidayId?: string;
}

export const validateCharacteristics = (
  args: IArgs,
  notificationActions: NotificationActions
): boolean => {
  if (!args.typeId) {
    notificationActions.addError({ message: 'Добавте Тип рецепта!' });
    return false;
  } else if (!args.nationalCuisineId) {
    notificationActions.addError({ message: 'Добавте Кухню рецепта!' });
    return false;
  } else if (!args.holidayId) {
    notificationActions.addError({ message: 'Добавте Праздник рецепта!' });
    return false;
  }

  return true;
};
