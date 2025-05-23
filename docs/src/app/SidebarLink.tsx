"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "test-package";

import styles from "./SidebarLink.module.css";

export function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive =
    pathname?.startsWith(href) &&
    (href === "/" || pathname === href || pathname.startsWith(`${href}/`));

  return (
    <NextLink href={href} className={`${styles.SidebarLink} ${isActive ? styles.active : ""}`}>
      <Text size="2">{children}</Text>
    </NextLink>
  );
}
