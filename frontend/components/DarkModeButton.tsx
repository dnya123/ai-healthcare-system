"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="bg-gray-800 dark:bg-yellow-400
      dark:text-black text-white
      px-5 py-2 rounded-xl"
    >
      {theme === "dark"
        ? "☀️ "
        : "🌙 "}
    </button>
  );
}