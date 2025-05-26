import { create } from 'zustand';
import { Theme } from './theme.d';

interface ThemeState {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

// Lấy theme từ localStorage hoặc mặc định
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') { // Kiểm tra để đảm bảo chạy được trên server (SSR) nếu có
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme === 'pastel-light' || storedTheme === 'pastel-dark')
      ? storedTheme
      : 'pastel-light';
  }
  return 'pastel-light'; // Mặc định nếu không có localStorage (ví dụ: trong môi trường server)
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'pastel-light' ? 'pastel-dark' : 'pastel-light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return { theme: newTheme };
    });
  },
}));

// Cập nhật data-theme ngay khi ứng dụng load lần đầu
// Đảm bảo document.documentElement.setAttribute('data-theme', theme); được gọi một lần khi app load
if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
}