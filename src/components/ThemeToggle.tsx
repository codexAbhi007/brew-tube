"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon , CoffeeIcon, MoonIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import {Mug, Coffee} from "tabler-icons-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
   <Button
  
  size="icon"
  onClick={() => setTheme(isDark ? "light" : "dark")}
  aria-label="Toggle theme"
  className=""
  variant="secondary"
>
  {isDark ? <MoonIcon className="h-10 w-10" /> : <Sun className="text-orange-950" />}
</Button>

  );
}
