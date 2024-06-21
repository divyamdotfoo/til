"use client";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
export function ThemeBtn() {
  const { setTheme, theme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <MoonStar className=" hidden dark:block w-5 h-5" />
      <Sun className=" w-5 h-5 dark:hidden" />
    </button>
  );
}
