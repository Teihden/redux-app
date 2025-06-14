import { useEffect } from "react";
import classnames from "classnames";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { TimeAgo } from "@/components/TimeAgo";
import { PostAuthor } from "@/features/posts/PostAuthor";
import { allNotificationsRead, selectMetadataEntities, useGetNotificationsQuery } from "./notificationsSlice";

export const NotificationsList = () => {
  const dispatch = useAppDispatch();
  const { data: notifications = [] } = useGetNotificationsQuery();
  const notificationsMetadata = useAppSelector(selectMetadataEntities);

  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const metadata = notificationsMetadata[notification.id];
    const notificationClassname = classnames("notification", {
      new: metadata.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>
            <PostAuthor userId={notification.user} showPrefix={false}/>
          </b>{" "}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date}/>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
