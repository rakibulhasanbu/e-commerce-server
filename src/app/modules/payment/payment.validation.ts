import { z } from "zod";

const createPaymentSchema = z.object({
  body: z.object({
    courseSlug: z.string(),
    batchNo: z.number(),
    userId: z.string(),
    transactionId: z.string(),
    phoneNumber: z.string(),
  }),
});

const createSSLPaymentSchema = z.object({
  body: z.object({
    courseSlug: z.string(),
    batchNo: z.number(),
    amount: z.number(),
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
  }),
});

export const updatePaymentSchema = z.object({
  body: z.object({
    courseSlug: z.string(),
    batchNo: z.number(),
    userId: z.string(),
    status: z.enum(["paid", "unpaid"]),
  }),
});

export const paymentValidationSchemas = {
  createPaymentSchema,
  updatePaymentSchema,
  createSSLPaymentSchema,
};
