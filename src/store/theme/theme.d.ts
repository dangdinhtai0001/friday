// src/store/theme.d.ts
export type Theme = "pastel-light" | "pastel-dark";

export interface ThemeStore {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}
