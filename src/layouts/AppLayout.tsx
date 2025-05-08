import { Outlet, useLocation, useNavigation } from "react-router";
import useRequireAuth from "@/composables/hooks/useRequireAuth";

function AppLayout() {
  useRequireAuth();
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>
      <div>main layout nè</div>
      {isNavigating && <div>Đang navigating nè ...</div>}
      <div>location: {location.pathname}</div>
      <Outlet />
    </>
  );
}

export default AppLayout;
