import { PATH_LOGOUT } from "@/composables/constants/paths";
import { useAuthStore } from "../../store";
import { Link, useMatches } from "react-router";
import { useEffect } from "react";

function HomePage() {
  const { isAuthenticated, user, tokens } = useAuthStore();
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1]; // Lấy route cuối cùng khớp

  useEffect(() => {
    if (currentRoute && currentRoute.handle) {
      document.title = currentRoute.handle.title || "Ứng dụng của tôi";
      // Bạn có thể sử dụng metadata khác ở đây, ví dụ: cập nhật meta tags
      console.log("Metadata của trang chủ:", currentRoute.handle);
    }
  }, [currentRoute]);
  return (
    <div>
      <div>Home page ne</div>
      <p>Đã đăng nhập: {isAuthenticated ? "Có" : "Không"}</p>
      {user && <p>Tên người dùng: {user.profile.name}</p>}
      {tokens && <p>Access Token: {tokens.accessToken.substring(0, 10)}...</p>}

      {isAuthenticated && (
        <Link to={PATH_LOGOUT}>
          <button>Đăng xuất</button>
        </Link>
      )}

      <Link to={"/components/button"}>
        <button>/components/button</button>
      </Link>
      <Link to={"/components/form-control"}>
        <button>/components/form-control</button>
      </Link>
    </div>
  );
}

export default HomePage;
