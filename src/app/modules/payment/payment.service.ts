import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";
import { generateObjectId } from "../../../utils/generateObjectId";
import { config } from "../../../config";
import SSLCommerzPayment from "sslcommerz-lts";
import { sendMail } from "../auth/auth.service";
import { TUser } from "../auth/auth.interface";
import { JwtPayload } from "jsonwebtoken";
import { UserRoles } from "../../../../prisma/generated/client";

const createPaymentIntoBD = async (payload: any) => {
  const { courseSlug, batchNo, userId, transactionId, phoneNumber } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (isUserExist.role !== UserRoles.USER) {
    throw new ApiError(httpStatus.NOT_FOUND, "You are not have a valid role");
  }

  const isPaymentExist = await prisma.payment.findFirst({
    where: {
      courseSlug,
      batchNo,
      userId,
    },
  });

  if (isPaymentExist) {
    return isPaymentExist;
  }

  const createPayment = await prisma.payment.create({
    data: {
      courseSlug,
      batchNo,
      transactionId,
      phoneNumber,
      userId,
    },
    select: {
      courseSlug: true,
      batchNo: true,
      transactionId: true,
      phoneNumber: true,
      status: true,
    },
  });

  if (!createPayment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment create unsuccessful!");
  }

  return createPayment;
};

const createSSLPaymentIntoBD = async (
  courseSlug: string,
  user: TUser | JwtPayload,
) => {
  // const {
  //   courseSlug,
  //   batchNo,
  //   userId,
  //   amount,
  //   address,
  //   name,
  //   email,
  //   phoneNumber,
  // } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  // const isCourseExist = await prisma.course.findFirst({
  //   where: {
  //     slug: courseSlug,
  //   },
  // });

  // if (!isCourseExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }

  const transaction_id = generateObjectId();

  // const data = {
  //   total_amount: isCourseExist.offerPrice || 10,
  //   currency: "BDT",
  //   tran_id: transaction_id, // use unique tran_id for each api call
  //   success_url: `${config.server_url}/api/payment/success/${user.id}/${transaction_id}/${courseSlug}/${isCourseExist.batchNo}`,
  //   fail_url: `${config.client_url}/payment/error`,
  //   cancel_url: `${config.client_url}/payment/error`,
  //   ipn_url: `${config.server_url}/ipn`,
  //   shipping_method: "Courier",
  //   product_name: courseSlug || "Computer",
  //   product_category: "Online Course",
  //   product_profile: "general",
  //   cus_name: isUserExist.name || "Customer Name",
  //   cus_email: isUserExist.email || "customer@example.com",
  //   cus_add1: "Dhaka", //isUserExist?.profile?.address ||
  //   cus_add2: "Dhaka", //address ||
  //   cus_city: "Dhaka", //address ||
  //   cus_state: "Dhaka", //address ||
  //   cus_postcode: "1000",
  //   cus_country: "Bangladesh",
  //   cus_phone: "112233", //isCourseExist.profile.phoneNo ||
  //   cus_fax: "112233", //isCourseExist.profile.phoneNo ||
  //   ship_name: isUserExist.name || "Customer Name",
  //   ship_add1: "Dhaka", //address ||
  //   ship_add2: "Dhaka", //address ||
  //   ship_city: "Dhaka", //address ||
  //   ship_state: "Dhaka", //address ||
  //   ship_postcode: 1000,
  //   ship_country: "Bangladesh",
  // };
  console.log("asdf");
  const isLive = false; //true for live, false for sandbox
  const sslcz = new SSLCommerzPayment(
    config.store_id,
    config.store_password,
    isLive,
  );

  // const sslPaymentUrl = await sslcz
  //   .init(data)
  //   .then(async (apiResponse: { GatewayPageURL: string }) => {
  //     const GatewayPageURL = apiResponse.GatewayPageURL;

  //     const payment = await prisma.payment.findFirst({
  //       where: {
  //         courseSlug,
  //         batchNo: isCourseExist.batchNo,
  //         userId: isUserExist.id,
  //       },
  //     });

  //     if (payment) {
  //       const updatePayment = await prisma.payment.update({
  //         where: {
  //           id: payment.id,
  //         },
  //         data: {
  //           courseSlug,
  //           batchNo: isCourseExist.batchNo,
  //           transactionId: transaction_id,
  //           phoneNumber: "01700000001",
  //           userId: isUserExist.id,
  //         },
  //       });

  //       if (!updatePayment) {
  //         throw new ApiError(
  //           httpStatus.BAD_REQUEST,
  //           "Payment update unsuccessful!"
  //         );
  //       }
  //     } else {
  //       const createPayment = await prisma.payment.create({
  //         data: {
  //           courseSlug,
  //           batchNo: isCourseExist.batchNo,
  //           transactionId: transaction_id,
  //           phoneNumber: "01700000001",
  //           userId: isUserExist.id,
  //         },
  //       });

  //       if (!createPayment) {
  //         throw new ApiError(
  //           httpStatus.BAD_REQUEST,
  //           "Payment create unsuccessful!"
  //         );
  //       }
  //     }

  //     return {
  //       url: GatewayPageURL,
  //     };
  //   });
  // return sslPaymentUrl;
};

const paymentSuccessfulFromDB = async (params: any) => {
  // const { userId, transactionId, courseSlug, batchNo } = params;
  // const user = await prisma.user.findFirst({
  //   where: {
  //     id: userId,
  //   },
  // });
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  // }
  // const course = await prisma.course.findFirst({
  //   where: {
  //     slug: courseSlug,
  //     batchNo: parseInt(batchNo),
  //   },
  // });
  // if (!course) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }
  // const payment = await prisma.payment.findFirst({
  //   where: {
  //     courseSlug,
  //     batchNo: parseInt(batchNo),
  //     transactionId,
  //     userId,
  //   },
  // });
  // if (!payment) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Payment info not found!");
  // }
  // const paymentUpdate = await prisma.payment.update({
  //   where: {
  //     id: payment.id,
  //   },
  //   data: {
  //     status: "paid",
  //   },
  // });
  // if (!paymentUpdate) {
  //   throw new ApiError(httpStatus.FORBIDDEN, "Payment Update unsuccessful!");
  // }
  // const getEnrolledCourses = await prisma.contentAccess.findFirst({
  //   where: {
  //     userId,
  //     email: user.email,
  //   },
  //   include: {
  //     enrolledCourses: true,
  //   },
  // });
  // if (getEnrolledCourses) {
  //   // Check if the course is already in the enrolled courses
  //   const isCourseEnrolled = getEnrolledCourses.enrolledCourses.some(
  //     (course) => course.courseSlug === courseSlug && course.batchNo === batchNo
  //   );
  //   if (isCourseEnrolled) {
  //     return {
  //       success: true,
  //       message: "User is already enrolled in this course.",
  //     };
  //   }
  // }
  // const updateUser = await prisma.user.update({
  //   where: {
  //     id: user.id,
  //   },
  //   data: {
  //     role: UserRoles.STUDENT,
  //   },
  // });
  // if (updateUser.role === UserRoles.STUDENT) {
  //   const createContentAccess = await prisma.contentAccess.create({
  //     data: {
  //       userId,
  //       email: user.email,
  //     },
  //   });
  //   const newEnrolledCourse = await prisma.enrolledCourse.create({
  //     data: {
  //       courseSlug: courseSlug,
  //       batchNo: parseInt(batchNo),
  //       contentAccessId: createContentAccess.id,
  //     },
  //   });
  //   const data = {
  //     order: {
  //       id: course.id.toString().slice(0, 6),
  //       name: course.name,
  //       price: course.price,
  //       date: new Date().toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "long",
  //         day: "numeric",
  //       }),
  //     },
  //   };
  //   await sendMail({
  //     email: user.email,
  //     subject:
  //       "অভিনন্দন! আপনি সফলভাবে হাবলু-প্রোগ্রামার এর ওয়েব ডেভেলপমেন্ট কোর্সে এনরোলমেন্ট করেছেন।",
  //     template: "order-confirmation.ejs",
  //     data,
  //   });
  //   if (newEnrolledCourse) {
  //     return {
  //       url: `${config.client_url}/`,
  //     };
  //   }
  // }
};

const getPaymentsFromDB = async (query: any) => {
  const payments = await prisma.payment.findMany({
    select: {
      courseSlug: true,
      batchNo: true,
      transactionId: true,
      phoneNumber: true,
      status: true,
    },
  });

  if (!payments) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payments not found!");
  }
  return payments;
};

const updatePaymentIntoDB = async (id: string, payload: any) => {
  const { status, courseSlug, batchNo, userId } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (isUserExist.role !== UserRoles.USER) {
    throw new ApiError(httpStatus.NOT_FOUND, "You are not have a valid role");
  }

  const isPaymentExist = await prisma.payment.findFirst({
    where: { id, courseSlug, batchNo, userId },
  });

  if (!isPaymentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment not found!");
  }

  const updatePayment = await prisma.payment.update({
    where: {
      id: isPaymentExist.id,
    },
    data: {
      status,
    },
    select: {
      courseSlug: true,
      batchNo: true,
      transactionId: true,
      phoneNumber: true,
      status: true,
    },
  });

  if (!updatePayment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment update unsuccessful!");
  }

  // const updateUser = await prisma.user.update({
  //   where: {
  //     id: isUserExist.id,
  //   },
  //   data: {
  //     role: UserRoles.STUDENT,
  //   },
  // });

  // if (updateUser.role === UserRoles.STUDENT) {
  //   const createContentAccess = await prisma.contentAccess.create({
  //     data: {
  //       userId,
  //       email: updateUser.email,
  //     },
  //   });

  //   await prisma.enrolledCourse.create({
  //     data: {
  //       courseSlug: courseSlug,
  //       batchNo: batchNo,
  //       contentAccessId: createContentAccess.id,
  //     },
  //   });
  // }

  return updatePayment;
};

const getPaymentFromDB = async (user: any) => {
  const payment = await prisma.payment.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      courseSlug: true,
      batchNo: true,
      transactionId: true,
      phoneNumber: true,
      status: true,
    },
  });

  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Payment not found!");
  }
  return payment;
};

export const PaymentService = {
  createPaymentIntoBD,
  getPaymentsFromDB,
  updatePaymentIntoDB,
  getPaymentFromDB,
  createSSLPaymentIntoBD,
  paymentSuccessfulFromDB,
};
