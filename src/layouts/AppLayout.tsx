import { Outlet } from "react-router";
import useRequireAuth from "@/composables/hooks/useRequireAuth";

function AppLayout() {
  useRequireAuth();

  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
