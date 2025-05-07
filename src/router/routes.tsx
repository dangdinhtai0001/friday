import { RouteObject } from "react-router";
import { Applayout, AuthLayout, FallbackLayout } from "@/layouts";
import { NotFound } from "@/pages/fallback";

const routes: RouteObject[] = [
  {
    Component: Applayout,
    children: [
      {
        index: true,
        lazy: async () => {
          // await new Promise((resolve) => setTimeout(resolve, 3000));
          const component = await import("@/pages/home");

          return { Component: component.default };
        },
      },
    ],
  },
  {
    Component: AuthLayout,
  },
  {
    Component: FallbackLayout,
    children: [{ path: "*", Component: NotFound }],
  },
];

export default routes;
