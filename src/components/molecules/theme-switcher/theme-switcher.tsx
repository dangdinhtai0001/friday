import { useThemeStore } from "@/store";

function ThemeSwitcher() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'pastel-light' | 'pastel-dark');
  };

  return (
    <div>
      <h1>Theme Switcher</h1>
      <div>{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <select onChange={handleChange} value={theme}>
        <option value="pastel-light">Pastel Light</option>
        <option value="pastel-dark">Pastel Dark</option>
      </select>
    </div>
  );
}

export default ThemeSwitcher;
