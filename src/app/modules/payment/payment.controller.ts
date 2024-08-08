import { Request, Response } from "express";
import { CatchAsyncError } from "../../../utils/CatchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PaymentService.createPaymentIntoBD(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Payment created successfully",
    data: result,
  });
});

const createSSLPayment = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { courseSlug } = req.params;
    const result = await PaymentService.createSSLPaymentIntoBD(
      courseSlug,
      req.user,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "SSL Payment created successfully",
      data: result,
    });
  },
);

const paymentSuccessful = CatchAsyncError(
  async (req: Request, res: Response) => {
    const result = await PaymentService.paymentSuccessfulFromDB(req.params);

    // sendResponse(res, {
    //   statusCode: 200,
    //   success: true,
    //   message: "Payment successful ✅",
    //   data: result,
    // });
    // res.redirect(result?.url as string);
  },
);

const getPayments = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await PaymentService.getPaymentsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPayment = CatchAsyncError(async (req: Request, res: Response) => {
  const { user } = req.user;

  const result = await PaymentService.getPaymentFromDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment information retrieved successfully",
    data: result,
  });
});

const updatePayment = CatchAsyncError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.updatePaymentIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment information updated successfully",
    data: result,
  });
});

export const PaymentController = {
  createPayment,
  getPayment,
  getPayments,
  updatePayment,
  createSSLPayment,
  paymentSuccessful,
};
