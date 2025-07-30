import { selectAllNotifications } from "../model/selectors";
import { useNotificationStore } from "../model/store";
import { NotificationItem } from "./notifaction-item"

export const NotificationProvider = () => {

  const notifactions = useNotificationStore(selectAllNotifications)

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {notifactions.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => console.log("")}
        />
      ))}
    </div>
  );
};