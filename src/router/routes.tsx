import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
} from "react-router";

// Giả sử các layouts và pages của bạn
import { AppLayout } from "@/layouts/app-layout"; // Hoặc là AppLayout từ file của bạn
import AuthLayout from "@/layouts/AuthLayout";
import FallbackLayout from "@/layouts/FallbackLayout";
import NotFound from "@/pages/fallback/NotFound"; // Giả sử component NotFound

// // Các pages thực tế
// import HomePage from "@/pages/home";
// import ProfilePage from "@/pages/profile";
// import ButtonPage from "@/pages/components/button";
// import FormControlPage from "@/pages/components/form-control";
// import LoginPage from "@/pages/auth/login";
// import UnauthorizedPage from "@/pages/auth/unauthorized";
// import LogoutPage from "@/pages/auth/logout";

// Hằng số path (nếu bạn có)
const PATH_PROFILE = "/profile";

import { convertUnifiedToRouteObjects, initialUnifiedRoutes } from "@/config";

const routes2 = convertUnifiedToRouteObjects(initialUnifiedRoutes);
const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: routes2,
    // children: [
    //   {
    //     index: true,
    //     // Không cần lazy load ở đây nếu HomePage đã là mặc định
    //     lazy: async () => {
    //       const [component] = await Promise.all([import("@/pages/home")]);
    //       return { Component: component.default };
    //     },
    //     handle: {
    //       title: "Trang chủ",
    //       breadcrumb: "Home nè",
    //       displayInSidebar: true,
    //       id: "home",
    //       type: "link",
    //       icon: "home-icon",
    //     },
    //   },
    //   {
    //     path: PATH_PROFILE,
    //     lazy: async () => {
    //       const component = await import("@/pages/profile");
    //       return { Component: component.default };
    //     },
    //     handle: {
    //       breadcrumb: "Profile", // Thêm breadcrumb cho Profile nếu cần
    //     },
    //   },
    //   // --- ĐÂY LÀ PHẦN THAY ĐỔI CƠ BẢN ---
    //   {
    //     path: "/components",
    //     handle: {
    //       breadcrumb: "Components nè",
    //       displayInSidebar: true,
    //       id: "components",
    //       type: "collapsible",
    //       icon: "components-icon",
    //     },
    //     children: [
    //       {
    //         path: "button", // Đường dẫn tương đối
    //         lazy: async () => {
    //           const component = await import("@/pages/components/button");
    //           return { Component: component.default };
    //         },
    //         handle: {
    //           breadcrumb: "Button nè",
    //         },
    //       },
    //       {
    //         path: "form-control", // Đường dẫn tương đối
    //         lazy: async () => {
    //           const component = await import("@/pages/components/form-control");
    //           return { Component: component.default };
    //         },
    //         handle: {
    //           breadcrumb: "Form Control nè",
    //         },
    //       },
    //       // ... Các route con khác của /components
    //     ],
    //   },
    //   // --- KẾT THÚC PHẦN THAY ĐỔI CƠ BẢN ---
    // ],
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
