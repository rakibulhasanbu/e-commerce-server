import { Request, Response } from "express";
import { CourseService } from "./course.service";
import { CatchAsyncError } from "../../../utils/CatchAsyncError";
import sendResponse from "../../../utils/sendResponse";

const createCourse = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await CourseService.createCourseIntoBD(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getCourses = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await CourseService.getCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getSelectCourses = CatchAsyncError(
  async (req: Request, res: Response) => {
    const result = await CourseService.getSelectCoursesFromDB(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Select courses retrieved successfully",
      data: result,
    });
  }
);

const getMyCourses = CatchAsyncError(async (req: Request, res: Response) => {
  const user = req?.user;
  const result = await CourseService.getMyCourseFromDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My Courses retrieved successfully",
    data: result,
  });
});

const getCourseBySlug = CatchAsyncError(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const result = await CourseService.getCourseBySlugFromDB(slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course information retrieved successfully",
    data: result,
  });
});

const getCourseContentByCourseSlug = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { courseSlug, batchNo } = req.params;
    const result = await CourseService.getCourseContentByCourseSlugFromDB(
      courseSlug,
      batchNo
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course information retrieved successfully",
      data: result,
    });
  }
);

const updateCourseBySlug = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const result = await CourseService.UpdateCourseBySlugIntoDB(slug, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course information updated successfully",
      data: result,
    });
  }
);

const deleteCourseBySlug = CatchAsyncError(
  async (req: Request, res: Response) => {
    await CourseService.deleteCourseBySlugIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course deleted successfully",
      data: "",
    });
  }
);

export const CourseController = {
  createCourse,
  getCourses,
  updateCourseBySlug,
  getCourseContentByCourseSlug,
  getCourseBySlug,
  getMyCourses,
  deleteCourseBySlug,
  getSelectCourses,
};
