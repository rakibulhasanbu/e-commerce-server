import { Router } from "express";

import auth from "../../middlewares/auth";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidationSchemas } from "./course.validation";
import { UserRoles } from "../../../../prisma/generated/client";

const router = Router();

router.post(
  "/course",
  auth(UserRoles.SUPER_ADMIN),
  validateRequest(CourseValidationSchemas.createCourseSchema),
  CourseController.createCourse,
);

router.get(
  "/courses",
  auth(UserRoles.SUPER_ADMIN),
  CourseController.getCourses,
);

router.get(
  "/select-courses",
  auth(UserRoles.SUPER_ADMIN),
  CourseController.getSelectCourses,
);

router.get(
  "/course/:slug",
  // auth(UserRoles.SUPER_ADMIN),
  CourseController.getCourseBySlug,
);

router.get(
  "/course-content/:courseSlug/:batchNo",
  auth(UserRoles.SELLER),
  CourseController.getCourseContentByCourseSlug,
);

router.put(
  "/course/:slug",
  auth(UserRoles.SUPER_ADMIN),
  validateRequest(CourseValidationSchemas.updateCourseSchema),
  CourseController.updateCourseBySlug,
);

router.delete(
  "/course",
  auth(UserRoles.SUPER_ADMIN),
  CourseController.deleteCourseBySlug,
);

export const coursesRoutes = router;
