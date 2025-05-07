import React from "react";
import { Await } from "react-router";
import { Outlet } from "react-router";

const a = await new Promise((resolve) => setTimeout(resolve, 3000));
function AppLayout() {
  return (
    <>
      <div>main layout nè</div>
      <Outlet />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={a}>hehehe</Await>
      </React.Suspense>
    </>
  );
}

export default AppLayout;
