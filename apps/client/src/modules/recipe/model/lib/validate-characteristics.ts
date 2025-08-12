import { NotificationActions } from '@/modules/notifications/model/notifications.interface';

interface IArgs {
  typeId?: string;
  hasSteps: boolean;
  hasIngredients: boolean
}

export const validateCharacteristics = (
  args: IArgs,
  notificationActions: NotificationActions
): boolean => {
  if (!args.typeId) {
    notificationActions.addError({ message: 'Добавте Тип рецепта!' });
    return false;
  } else if (!args.hasSteps) {
    notificationActions.addError({ message: 'Добавте Шаги в рецепт!' });
    return false;
  }

  return true;
};
