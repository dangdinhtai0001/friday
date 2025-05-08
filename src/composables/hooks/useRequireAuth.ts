import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthStore, type AuthState } from "@/store"; 

const useRequireAuth = () => {
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated,
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);
};

export default useRequireAuth;
