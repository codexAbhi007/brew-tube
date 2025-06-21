"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import CoffeeSteamPlateIcon from "./coffe-steam";
import CoffeePlateIcon from "./coffe-without-steam";

export function ThemeToggle() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      {isDark ? (
        <CoffeeSteamPlateIcon className="size-5 text-amber-400" />
      ) : (
        <CoffeePlateIcon className="size-5 text-amber-950" />
      )}
    </Button>
  );
}
