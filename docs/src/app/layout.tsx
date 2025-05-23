import "test-package/index.css";

import "./reset.css";

import * as React from "react";
import { Instrument_Sans } from "next/font/google";
import type { Metadata } from "next";

import { Shell } from "./Shell";
import { Navigation } from "./Navigation";

export const metadata: Metadata = {
  title: {
    template: "%s · Test Package",
    default: "Test Package",
  },
  description: "⚠️ Test Package is experimental, do not use in production ⚠️",
};

const font = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`joy ${font.className}`}>
        <Shell>
          <Navigation />
          <div style={{ padding: "16px 250px" }}>{children}</div>
        </Shell>
      </body>
    </html>
  );
}
