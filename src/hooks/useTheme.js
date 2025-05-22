import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark(!isDark) };
}