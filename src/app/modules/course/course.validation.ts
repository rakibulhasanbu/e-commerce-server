import { z } from "zod";

const createCourseSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().int().positive().min(1),
    offerPrice: z.number().int().positive().min(1),
    thumbnail: z.string(),
    schedule: z.object({}).optional(),
    demoUrl: z.string().url(),
    isPremium: z.boolean().optional(),
    purchased: z.number().int().optional(),
    specialty: z.object({}).array().optional(),
    rewards: z.object({}).array().optional(),
    topic: z.object({}).array().optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    price: z.number().int().positive().optional(),
    offerPrice: z.number().int().positive().optional(),
    thumbnail: z.string().optional(),
    batchNo: z.number().int().positive().optional(),
    schedule: z.object({}).optional(),
    demoUrl: z.string().optional(),
    isPremium: z.boolean().optional(),
    isPublish: z.boolean().optional(),
    // specialty: z.object({}).array().optional(),
    // rewards: z.object({}).array().optional(),
  }),
});

export const CourseValidationSchemas = {
  createCourseSchema,
  updateCourseSchema,
};
