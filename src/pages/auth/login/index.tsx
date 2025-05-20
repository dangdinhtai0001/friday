import { useNavigate } from "react-router";
import { useAuthStore, type User, type Tokens } from "@/store";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleQuickLogin = () => {
    const fakeUser: User = {
      id: "123456789",
      profile: {
        name: "John Doe",
        avatarUrl: "https://i.pravatar.cc",
        roles: ["user", "admin"],
      },
      authDetails: {
        method: "google",
        identifier: "johndoe@gmail.com",
        metadata: {
          phoneNumber: "+1234567890",
          socialId: "9876543210987654321",
          provider: "google",
        },
      },
    };

    const fakeTokens: Tokens = {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "def50200ae5f4e8dabaa6b...",
      expiresAt: Date.now() + 3600000, // Hết hạn sau 1 giờ
    };

    login(fakeUser, fakeTokens);
    navigate("/"); // Chuyển hướng về trang chủ sau khi đăng nhập nhanh
  };

  return (
    <div>
      <div>login page nè</div>
      <button onClick={handleQuickLogin} className="border-1">
        Đăng nhập nhanh
      </button>
    </div>
  );
}

export default LoginPage;
