'use client';

import { Sun as IconSun, Moon as IconMoon } from 'lucide-react';

import styles from './ThemeToggle.module.css';

function ThemeToggle({
  toggle,
  colorScheme,
}: {
  toggle: () => void;
  colorScheme: 'light' | 'dark';
}) {
  return (
    <button
      className={styles.ThemeToggle}
      onClick={toggle}
      type="button"
      aria-label="Toggle theme"
    >
      {colorScheme === 'light' ? (
        <IconSun size={16} strokeWidth={1.5} />
      ) : (
        <IconMoon size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}

export { ThemeToggle };
