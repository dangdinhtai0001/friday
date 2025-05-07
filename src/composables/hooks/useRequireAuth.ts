import { useEffect } from "react";
import { useAuthStore } from "../../store"; // Đảm bảo đường dẫn này đúng
import { useLocation, useNavigate } from "react-router";
import { PATH_LOGIN, PATH_UNAUTHORIZED } from "@/constants/paths";

interface UseRequireAuthProps {
  requiredRole?: string;
}

const useRequireAuth = ({ requiredRole }: UseRequireAuthProps = {}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_LOGIN, { replace: true, state: { from: location } });
    } else if (
      requiredRole &&
      (!user || !user.profile.roles.includes(requiredRole))
    ) {
      navigate(PATH_UNAUTHORIZED, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.profile.roles, requiredRole, navigate, location]);
};

export default useRequireAuth;
