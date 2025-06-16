"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
   <Button
  variant="ghost"
  size="icon"
  onClick={() => setTheme(isDark ? "light" : "dark")}
  aria-label="Toggle theme"
  className="
    bg-gray-100 dark:bg-gray-800    /* light bg + dark bg */
    text-gray-900 dark:text-gray-100 /* ensure icon is visible */
    hover:bg-gray-200 dark:hover:bg-gray-700
    transition-all
  "
>
  {isDark ? <Sun size={20} /> : <Moon size={20} />}
</Button>

  );
}
