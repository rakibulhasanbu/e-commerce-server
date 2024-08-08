import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { coursesRoutes } from "../modules/course/course.routes";
import { NotificationsRoutes } from "../modules/notification/notification.routes";
import { PaymentsRoutes } from "../modules/payment/payment.route";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: coursesRoutes,
  },
  {
    path: "/",
    route: PaymentsRoutes,
  },
  {
    path: "/",
    route: NotificationsRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
