import { PATH_LOGOUT } from "@/composables/constants/paths";
import { useAuthStore } from "../../store";
import { Link } from "react-router";

function HomePage() {
  const { isAuthenticated, user, tokens } = useAuthStore();

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
