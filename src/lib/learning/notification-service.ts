import { prisma } from "@/lib/prisma";

export type NotificationPayload = {
  userId: string;
  title: string;
  message: string;
};

export async function createNotification(
  payload: NotificationPayload
): Promise<void> {
  await prisma.notification.create({ data: payload });
}

export async function getUserNotifications(userId: string, limit = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

export async function markNotificationRead(
  userId: string,
  notificationId: string
): Promise<boolean> {
  const result = await prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
  return result.count > 0;
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
