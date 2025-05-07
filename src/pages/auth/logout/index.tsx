import { useNavigate } from 'react-router';
import { useAuthStore } from '@/store'; // Đảm bảo đường dẫn này đúng

function LogoutPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true }); // Chuyển hướng về trang login sau khi đăng xuất
  };

  return (
    <div>
      <div>Trang đăng xuất</div>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default LogoutPage;