import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";

const createCourseIntoBD = async (payload: TCourse) => {
  // const {
  //   demoUrl,
  //   description,
  //   name,
  //   batchNo = 1,
  //   price,
  //   schedule,
  //   thumbnail,
  //   offerPrice = 0,
  //   isPremium = true,
  //   purchased = 0,
  // } = payload;
  // const slug = name
  //   .replace(/[^a-zA-Z0-9]/g, " ")
  //   .replace(/\s+/g, "-")
  //   .trim()
  //   .toLowerCase();
  // const alreadyHaveSlug = await prisma.course.findUnique({
  //   where: {
  //     slug,
  //   },
  // });
  // if (alreadyHaveSlug) {
  //   throw new ApiError(httpStatus.FORBIDDEN, "Course name not unique!");
  // }
  // return await prisma.$transaction(async (prisma) => {
  //   try {
  //     const createCourse = await prisma.course.create({
  //       data: {
  //         demoUrl,
  //         description,
  //         name,
  //         batchNo,
  //         price,
  //         slug,
  //         thumbnail,
  //         offerPrice,
  //         schedule,
  //         isPremium,
  //         purchased,
  //       },
  //       select: {
  //         slug: true,
  //         batchNo: true,
  //         isPremium: true,
  //         purchased: true,
  //         schedule: true,
  //         thumbnail: true,
  //         offerPrice: true,
  //         name: true,
  //         description: true,
  //         demoUrl: true,
  //       },
  //     });
  //     const alreadyHaveCourseContent = await prisma.courseContent.findFirst({
  //       where: {
  //         courseSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     if (alreadyHaveCourseContent) {
  //       throw new ApiError(
  //         httpStatus.FORBIDDEN,
  //         "Course content already exists."
  //       );
  //     }
  //     await prisma.courseContent.create({
  //       data: {
  //         courseSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     return createCourse;
  //   } catch (error) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, "Course creation failed");
  //   }
  // });
};

const getCoursesFromDB = async (query: any) => {
  const {} = query;

  // const courses = await prisma.course.findMany({
  //   where: {
  //     isPremium: true,
  //   },
  //   select: {
  //     slug: true,
  //     name: true,
  //     batchNo: true,
  //     description: true,
  //     thumbnail: true,
  //     price: true,
  //     offerPrice: true,
  //     isPremium: true,
  //     purchased: true,
  //   },
  // });

  // return courses;
};

const getSelectCoursesFromDB = async (query: any) => {
  // const {} = query;
  // const courses = await prisma.course.findMany({
  //   select: {
  //     slug: true,
  //     name: true,
  //   },
  // });
  // return courses;
};

const getMyCourseFromDB = async (user: any) => {
  // const course = await prisma.course.findMany({
  //   where: {
  //     slug: user?.enrolledCourses,
  //   },
  // });
  // return course;
};

const UpdateCourseBySlugIntoDB = async (slug: string, payload: TCourse) => {
  // let {
  //   description,
  //   price,
  //   offerPrice,
  //   thumbnail,
  //   schedule,
  //   batchNo,
  //   demoUrl,
  //   isPremium = true,
  //   isPublish = true,
  // } = payload;
  // if (payload.name || payload.slug) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "This data is not updatable!");
  // }
  // if (
  //   !demoUrl &&
  //   !description &&
  //   !offerPrice &&
  //   !price &&
  //   !schedule &&
  //   !thumbnail &&
  //   !batchNo
  // ) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     "There is no data to update this course!"
  //   );
  // }
  // const course = await prisma.course.findUnique({
  //   where: {
  //     slug,
  //   },
  // });
  // if (!course) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }
  // if (batchNo) {
  //   if (course.batchNo + 1 !== batchNo) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Batch number not valid!");
  //   }
  //   const alreadyHaveCourseContent = await prisma.courseContent.findFirst({
  //     where: {
  //       courseSlug: slug,
  //       batchNo,
  //     },
  //   });
  //   if (alreadyHaveCourseContent) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Course Batch already exists.");
  //   }
  //   const createCourseAccess = await prisma.courseContent.create({
  //     data: {
  //       courseSlug: slug,
  //       batchNo,
  //     },
  //   });
  //   if (!createCourseAccess) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "Course update failed!");
  //   }
  // }
  // // Update the Course status
  // const updatedCourse = await prisma.course.update({
  //   where: {
  //     slug,
  //   },
  //   data: {
  //     demoUrl,
  //     description,
  //     offerPrice,
  //     price,
  //     schedule,
  //     thumbnail,
  //     batchNo,
  //     isPremium,
  //     isPublish,
  //   },
  //   select: {
  //     slug: true,
  //     name: true,
  //     batchNo: true,
  //     description: true,
  //     thumbnail: true,
  //     price: true,
  //     offerPrice: true,
  //     isPremium: true,
  //     purchased: true,
  //   },
  // });
  // return updatedCourse;
};

const getCourseBySlugFromDB = async (slug: string) => {
  // const course = await prisma.course.findUnique({
  //   where: {
  //     slug,
  //   },
  // });
  // if (!course) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }
  // return course;
};

const getCourseContentByCourseSlugFromDB = async (
  courseSlug: string,
  batchNo: string,
) => {
  // if (!courseSlug || !batchNo) {
  //   throw new ApiError(
  //     httpStatus.FORBIDDEN,
  //     "Please provide course slug and batch number to get course content"
  //   );
  // }
  // const isCourseContent = await prisma.courseContent.findUnique({
  //   where: {
  //     courseSlug,
  //     batchNo: parseInt(batchNo),
  //   },
  // });
  // if (!isCourseContent) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course content not found!");
  // }
  // const courseContent = await prisma.courseContent.findFirst({
  //   where: {
  //     courseSlug,
  //     batchNo: parseInt(batchNo),
  //     // isPublish: true,
  //   },
  //   select: {
  //     courseSlug: true,
  //     batchNo: true,
  //     milestones: {
  //       where: { isPublish: true },
  //       select: {
  //         slug: true,
  //         title: true,
  //         milestoneNo: true,
  //         publishTime: true,
  //         modules: {
  //           where: {
  //             isPublish: true,
  //           },
  //           select: {
  //             slug: true,
  //             title: true,
  //             moduleNo: true,
  //             publishTime: true,
  //             contents: {
  //               where: { isPublish: true },
  //               select: {
  //                 slug: true,
  //                 contentType: true,
  //                 title: true,
  //                 contentNo: true,
  //                 // video: {
  //                 //   select: {
  //                 //     videoUrl: true,
  //                 //     duration: true,
  //                 //   },
  //                 // },
  //                 // assignment: {
  //                 //   select: {
  //                 //     description: true,
  //                 //     deadline: true,
  //                 //   },
  //                 // },
  //                 // quiz: {
  //                 //   select: {
  //                 //     questions: {
  //                 //       select:{
  //                 //         question:{
  //                 //           select:{
  //                 //             title:true,
  //                 //             details:true,
  //                 //             options: {
  //                 //               select:{
  //                 //                 value:true,
  //                 //                 isCorrect
  //                 //               }
  //                 //             }
  //                 //           }
  //                 //         }
  //                 //       }
  //                 //     },
  //                 //   },
  //                 // },
  //                 // post: {
  //                 //   select: {
  //                 //     description: true,
  //                 //   },
  //                 // },
  //               },
  //               orderBy: {
  //                 contentNo: "asc",
  //               },
  //             },
  //           },
  //           orderBy: {
  //             moduleNo: "asc",
  //           },
  //         },
  //       },
  //       orderBy: {
  //         milestoneNo: "asc",
  //       },
  //     },
  //   },
  // });
  // return courseContent;
};

const deleteCourseBySlugIntoDB = async (payload: any) => {
  // const { slug, batchNo } = payload;
  // if (!slug || !batchNo) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     "Please send course slug and batch no to delete course"
  //   );
  // }
  // const course = await prisma.course.findUnique({
  //   where: {
  //     slug,
  //     batchNo,
  //   },
  // });
  // if (!course) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
  // }
  // return await prisma.$transaction(async (prisma) => {
  //   try {
  //     await prisma.courseContent.delete({
  //       where: {
  //         courseSlug: slug,
  //         batchNo,
  //       },
  //     });
  //     return await prisma.course.delete({
  //       where: {
  //         slug,
  //         batchNo,
  //       },
  //     });
  //   } catch (error) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, "Course delete failed");
  //   }
  // });
};

export const CourseService = {
  createCourseIntoBD,
  getCoursesFromDB,
  UpdateCourseBySlugIntoDB,
  deleteCourseBySlugIntoDB,
  getCourseContentByCourseSlugFromDB,
  getCourseBySlugFromDB,
  getMyCourseFromDB,
  getSelectCoursesFromDB,
};
