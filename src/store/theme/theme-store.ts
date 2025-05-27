// src/store/theme-store.ts
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Theme, ThemeStore } from "./theme.d"; // Import từ file định nghĩa kiểu

// Define the store creator with explicit types
const createThemeSlice: StateCreator<ThemeStore> = (set): ThemeStore => ({
  theme: 'pastel-light', // Giá trị mặc định ban đầu. Sẽ được ghi đè bởi persist.
  setTheme: (newTheme: Theme) => {
    set({ theme: newTheme });
    // Cập nhật thuộc tính data-theme trên thẻ html
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'pastel-light' ? 'pastel-dark' : 'pastel-light';
      // Cập nhật thuộc tính data-theme trên thẻ html
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return { theme: newTheme };
    });
  },
});

// Tạo Zustand store cho việc quản lý theme
export const useThemeStore = create<ThemeStore>()(
  persist<ThemeStore>(
    createThemeSlice, // Store creator đã được định kiểu
    {
      name: "theme-storage", // Key name sẽ được sử dụng trong Local Storage (ví dụ: 'theme-storage')
      storage: createJSONStorage<ThemeStore>(() => localStorage), // Sử dụng Local Storage API
      onRehydrateStorage: (state) => {
        if (state && typeof window !== 'undefined') {
          // Áp dụng theme ngay lập tức sau khi store được tải từ localStorage
          document.documentElement.setAttribute('data-theme', state.theme);
        }
        // Trả về hàm cleanup nếu cần
        return () => {
          // console.log('Rehydration finished');
        };
      },
    },
  ),
);

// Quan trọng: Áp dụng theme ban đầu ngay khi script tải
// Điều này giúp tránh "flash of unstyled content" (FOUC)
// khi trang được tải lần đầu trước khi React render
// và trước khi persist middleware kịp rehydrate hoàn toàn.
if (typeof window !== 'undefined') {
  const localStorageKey = 'theme-storage'; // Key của persist middleware
  const storedData = localStorage.getItem(localStorageKey);
  let initialThemeFromStorage: Theme = 'pastel-light'; // Mặc định nếu không tìm thấy hoặc lỗi

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      // Kiểm tra xem dữ liệu có phải là từ persist không và có chứa trạng thái theme không
      if (parsedData && parsedData.state && (parsedData.state.theme === 'pastel-light' || parsedData.state.theme === 'pastel-dark')) {
        initialThemeFromStorage = parsedData.state.theme;
      }
    } catch (e) {
      console.error("Failed to parse initial theme from localStorage for FOUC prevention:", e);
    }
  }
  document.documentElement.setAttribute('data-theme', initialThemeFromStorage);
}
