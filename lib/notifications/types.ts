export type NotificationCategory = "bar" | "popup";

export type NotificationType = {
  id: string;
  category: NotificationCategory;
  title: string;
  message?: string;
  url?: string;
  created_at?: string;
  image_url?: string;
};

export type NotificationsResponse = {
  notifications: NotificationType[];
};
