import { RouteObject } from "react-router";
import { Applayout, AuthLayout, FallbackLayout } from "@/layouts";
import { NotFound } from "@/pages/fallback";
import { PATH_PROFILE } from "@/composables/constants/paths";

const routes: RouteObject[] = [
  {
    Component: Applayout,
    children: [
      {
        index: true,
        lazy: async () => {
          // await new Promise((resolve) => setTimeout(resolve, 3000));
          const [component] = await Promise.all([import("@/pages/home")]);
          return { Component: component.default };
        },
      },
      {
        path: PATH_PROFILE,
        lazy: async () => {
          const component = await import("@/pages/profile");
          return { Component: component.default };
        },
      },
      {
        path: "/components/button",
        lazy: async () => {
          const component = await import("@/pages/components/button");
          return { Component: component.default };
        },
      },
      {
        path: "/components/form-control",
        lazy: async () => {
          const component = await import("@/pages/components/form-control");
          return { Component: component.default };
        },
      },
    ],
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
      },
      {
        path: "unauthorized",
        lazy: async () => {
          const component = await import("@/pages/auth/unauthorized");
          return { Component: component.default };
        },
      },
      {
        path: "logout",
        lazy: async () => {
          const component = await import("@/pages/auth/logout");
          return { Component: component.default };
        },
      },
    ],
  },
  {
    Component: FallbackLayout,
    children: [{ path: "*", Component: NotFound }],
  },
];

export default routes;
