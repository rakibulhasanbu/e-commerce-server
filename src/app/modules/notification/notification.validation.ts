import { z } from "zod";

const createNotificationSchema = z.object({
  body: z.object({
    title: z.string(),
    message: z.string(),
    courseSlug: z.string(),
    batchNo: z.number(),
  }),
});

const notificationForUserSchema = z.object({
  body: z.object({
    courseSlug: z.string(),
    batchNo: z.number(),
  }),
});

export const updateNotificationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
  }),
});

export const notificationValidationSchemas = {
  createNotificationSchema,
  updateNotificationSchema,
  notificationForUserSchema,
};
