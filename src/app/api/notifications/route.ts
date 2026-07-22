import { requireAuth } from "@/lib/auth/require-auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/learning/notification-service";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const notifications = await getUserNotifications(session!.userId);
    return jsonSuccess({ notifications });
  } catch (err) {
    console.error("[api/notifications]", err);
    return jsonError("Internal server error", 500);
  }
}

export async function PATCH(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const body = (await request.json()) as {
      notificationId?: string;
      markAll?: boolean;
    };

    if (body.markAll) {
      await markAllNotificationsRead(session!.userId);
      return jsonSuccess({ message: "All marked as read" });
    }

    if (body.notificationId) {
      const ok = await markNotificationRead(
        session!.userId,
        body.notificationId
      );
      if (!ok) return jsonError("Notification not found", 404);
      return jsonSuccess({ message: "Marked as read" });
    }

    return jsonError("notificationId or markAll required", 400);
  } catch (err) {
    console.error("[api/notifications PATCH]", err);
    return jsonError("Internal server error", 500);
  }
}
