import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { CatchAsyncError } from "../../../utils/CatchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createNotification = CatchAsyncError(
  async (req: Request, res: Response) => {
    const result = await NotificationService.createNotificationIntoBD(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Notification created successfully",
      data: result,
    });
  }
);

const getNotificationsForUserByEmail = CatchAsyncError(
  async (req: Request, res: Response) => {
    const result =
      await NotificationService.getNotificationsForUserByEmailFromDB(
        req.user,
        req.body
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notifications retrieved successfully",
      data: result,
    });
  }
);

const getNotificationById = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await NotificationService.getNotificationByIdFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notification information retrieved successfully",
      data: result,
    });
  }
);

const updateNotificationById = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await NotificationService.updateNotificationByIdIntoDB(
      id,
      req.body
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notification information updated successfully",
      data: result,
    });
  }
);

const deleteNotificationById = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await NotificationService.deleteNotificationByIdIntoDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notification deleted successfully",
      data: "",
    });
  }
);

export const NotificationController = {
  createNotification,
  getNotificationsForUserByEmail,
  updateNotificationById,
  getNotificationById,
  deleteNotificationById,
};
