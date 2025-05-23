"use client";
import * as React from "react";

import { ThemeProvider } from "test-package";
import { ThemeToggle } from "./ThemeToggle";

export function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [colorScheme, setColorScheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.documentElement.style.colorScheme = colorScheme;
  }, [colorScheme]);

  return (
    <ThemeProvider
      render={<main />}
      colorScheme={colorScheme}
      style={{ backgroundColor: "var(--surface)", minHeight: "100dvh" }}
    >
      <ThemeToggle
        colorScheme={colorScheme}
        toggle={() => {
          setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
        }}
      />
      {children}
    </ThemeProvider>
  );
}
