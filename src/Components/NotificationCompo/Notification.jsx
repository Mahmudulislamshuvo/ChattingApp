import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const Notification = () => {
  const auth = getAuth();
  const db = getDatabase();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const NotificationDbRef = ref(db, "Notifications/");
    onValue(NotificationDbRef, (snapshot) => {
      let notificationsArr = [];
      snapshot.forEach((items) => {
        notificationsArr.push({
          ...items.val(),
          notificationsKey: items.key,
        });
      });
      setNotifications(notificationsArr);
    });
  }, [auth, db]);

  return (
    <div className="h-[90vh] w-full overflow-y-scroll">
      {notifications.map((notification) => (
        <div
          key={notification.notificationsKey}
          className="mb-5 rounded-xl bg-[rgba(119,197,193,0.11)]"
        >
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a
              href="#"
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                <picture>
                  <img
                    className="h-11 w-11 rounded-full"
                    src={notification.notificationPhoto}
                    alt={notification.notificationPhoto}
                  />
                </picture>
              </div>
              <div className="w-full ps-3">
                <div className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                  New message from{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {notification.notificationName}
                  </span>
                  : "{notification.notificationMsg}"
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  {moment(notification.createdDate).calendar()}
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
