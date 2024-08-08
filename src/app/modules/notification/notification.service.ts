import { UserRoles } from "../../../../prisma/generated/client";
import prisma from "../../../utils/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { TUser } from "../auth/auth.interface";
import { JwtPayload } from "jsonwebtoken";
import { AuthServices } from "../auth/auth.service";

const createNotificationIntoBD = async (payload: any) => {
  const {
    title,
    message,
    notificationFor = UserRoles.SELLER,
    courseSlug,
    batchNo,
  } = payload;

  const roleBasedUsers =
    await AuthServices.getUsersByRoleFromDB(notificationFor);

  if (!roleBasedUsers || roleBasedUsers.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No users found for the specified role",
    );
  }

  // const isCourseExist = await prisma.course.findUnique({
  //   where: {
  //     slug: courseSlug,
  //     batchNo,
  //   },
  // });

  // if (!isCourseExist) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     "Course or batch number not found!"
  //   );
  // }

  // Create the found item
  const createNotification = await prisma.notification.create({
    data: {
      title,
      message,
      notificationFor,
      courseSlug,
      batchNo,
    },
    select: {
      id: true,
      title: true,
      message: true,
      notificationFor: true,
      courseSlug: true,
      batchNo: true,
    },
  });

  // Connect users to the notification
  await prisma.userNotification.createMany({
    data: roleBasedUsers.map((user) => ({
      userId: user.id,
      notificationId: createNotification.id,
    })),
  });

  return createNotification;
};

const getNotificationsForUserByEmailFromDB = async (
  authUser: TUser | JwtPayload,
  payload: any,
) => {
  const { batchNo, courseSlug } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email: authUser.email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // const isCourseExist = await prisma.course.findUnique({
  //   where: {
  //     slug: courseSlug,
  //     batchNo,
  //   },
  // });

  // if (!isCourseExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }

  const foundNotifications = await prisma.notification.findMany({
    where: {
      courseSlug,
      batchNo,
      users: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!foundNotifications || foundNotifications.length === 0) {
    // throw new ApiError(
    //   httpStatus.NOT_FOUND,
    //   "This course slug or batch no is not correct!"
    // );
    return { message: "you have no notification." };
  }

  await prisma.userNotification.deleteMany({
    where: {
      userId: user.id,
      notificationId: {
        in: foundNotifications.map((notification) => notification.id),
      },
    },
  });

  return foundNotifications;
};

const updateNotificationByIdIntoDB = async (id: string, payload: any) => {
  const { title, message } = payload;

  if (!title && !message) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Notification title or message must be provided to update.",
    );
  }

  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found!");
  }

  const updatedNotification = await prisma.notification.update({
    where: {
      id,
    },
    data: {
      title,
      message,
    },
  });

  return updatedNotification;
};

const getNotificationByIdFromDB = async (id: string) => {
  const notification = await prisma.notification.findFirst({
    where: { id },
  });

  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found!");
  }
  return notification;
};

const deleteNotificationByIdIntoDB = async (id: any) => {
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found!");
  }

  // Delete associated UserNotification records
  await prisma.userNotification.deleteMany({
    where: {
      notificationId: id,
    },
  });

  return await prisma.notification.delete({
    where: {
      id,
    },
  });
};

export const NotificationService = {
  createNotificationIntoBD,
  getNotificationsForUserByEmailFromDB,
  updateNotificationByIdIntoDB,
  deleteNotificationByIdIntoDB,
  getNotificationByIdFromDB,
};
