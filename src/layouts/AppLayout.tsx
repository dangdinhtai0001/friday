import { Outlet } from "react-router";
import useRequireAuth from "@/composables/hooks/useRequireAuth"; // Đảm bảo đường dẫn này đúng

interface AppLayoutProps {
  requiredRole?: string;
}

function AppLayout({ requiredRole }: AppLayoutProps) {
  useRequireAuth({ requiredRole });

  return (
    <>
      <div>main layout nè</div>
      <Outlet />
    </>
  );
}

export default AppLayout;
