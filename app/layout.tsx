import type { Metadata } from "next";

import { getTheme } from "@/lib/sanity/queries";
import { themeToCssVars } from "@/lib/theme/css-vars";
import { display, sans } from "@/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Band Site",
  description: "Official band website, powered by Sanity CMS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} h-full antialiased`}
      style={themeToCssVars(theme)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
