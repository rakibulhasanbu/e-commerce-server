import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { paymentValidationSchemas } from "./payment.validation";
import { PaymentController } from "./payment.controller";
import { UserRoles } from "../../../../prisma/generated/client";

const router = Router();

router.post(
  "/payment",
  auth(UserRoles.SUPER_ADMIN, UserRoles.USER, UserRoles.SELLER),
  validateRequest(paymentValidationSchemas.createPaymentSchema),
  PaymentController.createPayment,
);

router.get(
  "/ssl-payment/:courseSlug",
  auth(UserRoles.USER, UserRoles.SELLER),
  // validateRequest(paymentValidationSchemas.createSSLPaymentSchema),
  PaymentController.createSSLPayment,
);

router.post(
  "/payment/success/:userId/:transactionId/:courseSlug/:batchNo",
  // auth(UserRoles.USER, UserRoles.STUDENT),
  PaymentController.paymentSuccessful,
);

router.get(
  "/payments",
  auth(UserRoles.SUPER_ADMIN),
  PaymentController.getPayments,
);

router.get(
  "/payment",
  auth(UserRoles.SUPER_ADMIN),
  PaymentController.getPayment,
);

router.put(
  "/payment/:id",
  auth(UserRoles.SUPER_ADMIN),
  validateRequest(paymentValidationSchemas.updatePaymentSchema),
  PaymentController.updatePayment,
);

export const PaymentsRoutes = router;
