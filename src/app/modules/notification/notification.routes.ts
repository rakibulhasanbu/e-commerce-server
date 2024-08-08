import { Router } from "express";
import auth from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";
import validateRequest from "../../middlewares/validateRequest";
import { notificationValidationSchemas } from "./notification.validation";
import { UserRoles } from "../../../../prisma/generated/client";

const router = Router();

router.post(
  "/notification",
  auth(UserRoles.SUPER_ADMIN),
  validateRequest(notificationValidationSchemas.createNotificationSchema),
  NotificationController.createNotification,
);

router.post(
  "/notifications-for-user",
  auth(UserRoles.SELLER),
  validateRequest(notificationValidationSchemas.notificationForUserSchema),
  NotificationController.getNotificationsForUserByEmail,
);

router.get(
  "/notification/:id",
  auth(UserRoles.SUPER_ADMIN),
  NotificationController.getNotificationById,
);

router.put(
  "/notification/:id",
  auth(UserRoles.SUPER_ADMIN),
  validateRequest(notificationValidationSchemas.updateNotificationSchema),
  NotificationController.updateNotificationById,
);

router.delete(
  "/notification/:id",
  auth(UserRoles.SUPER_ADMIN),
  NotificationController.deleteNotificationById,
);

export const NotificationsRoutes = router;
