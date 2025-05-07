import { useNavigate } from "react-router";
import { useAuthStore } from "@/store"; // Đảm bảo đường dẫn này đúng

interface User {
  id: string;
  profile: {
    name: string;
    roles: string[];
  };
  authDetails: {
    method: string;
    identifier: string;
  };
}

interface Tokens {
  accessToken: string;
  expiresAt: number;
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleQuickLogin = () => {
    const fakeUser: User = {
      id: "fakeUserId",
      profile: {
        name: "Người dùng thử",
        roles: ["user"],
      },
      authDetails: {
        method: "quick",
        identifier: "test",
      },
    };

    const fakeTokens: Tokens = {
      accessToken: "fakeAccessToken123",
      expiresAt: Date.now() + 3600000, // Hết hạn sau 1 giờ
    };

    login(fakeUser, fakeTokens);
    navigate("/"); // Chuyển hướng về trang chủ sau khi đăng nhập nhanh
  };

  return (
    <div>
      <div>login page nè</div>
      <button onClick={handleQuickLogin} className="border-1">Đăng nhập nhanh</button>
    </div>
  );
}

export default LoginPage;
