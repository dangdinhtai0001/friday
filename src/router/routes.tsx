import { RouteObject } from "react-router";

// Giả sử các layouts và pages của bạn
import { AppLayout } from "@/layouts/app-layout"; // Hoặc là AppLayout từ file của bạn
import AuthLayout from "@/layouts/AuthLayout";
import FallbackLayout from "@/layouts/FallbackLayout";
import NotFound from "@/pages/fallback/NotFound"; // Giả sử component NotFound

import { convertUnifiedToRouteObjects, initialUnifiedRoutes } from "@/config";

const applicationRoutes = convertUnifiedToRouteObjects(initialUnifiedRoutes);
const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: applicationRoutes,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "login",
        lazy: async () => {
          const component = await import("@/pages/auth/login");
          return { Component: component.default };
        },
        handle: { breadcrumb: "Login" }, // Thêm breadcrumb nếu muốn
      },
      {
        path: "unauthorized",
        lazy: async () => {
          const component = await import("@/pages/auth/unauthorized");
          return { Component: component.default };
        },
        handle: { breadcrumb: "Unauthorized" },
      },
      {
        path: "logout",
        lazy: async () => {
          const component = await import("@/pages/auth/logout");
          return { Component: component.default };
        },
        handle: { breadcrumb: "Logout" },
      },
    ],
  },
  {
    Component: FallbackLayout,
    children: [{ path: "*", Component: NotFound }],
  },
];

export default routes;
