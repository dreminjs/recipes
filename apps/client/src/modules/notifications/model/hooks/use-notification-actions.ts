import { NotificationActions } from "../notifications.interface";
import { useNotificationStore } from "../store";

export const useNotificationActions = (): NotificationActions => {
  return {
    addSuccess: useNotificationStore(state => state.addSuccessNotification),
    addError: useNotificationStore(state => state.addErrorNotification),
    addInfo: useNotificationStore(state => state.addInfoNotification),
    remove: useNotificationStore(state => state.removeNotification),
  };
};
