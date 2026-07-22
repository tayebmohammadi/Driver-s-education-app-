import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { InvalidSessionGuard } from "@/components/invalid-session-guard";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMV Study",
  description: "California DMV permit study — pass your test with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InvalidSessionGuard />
        {children}
        <AppBottomNav />
      </body>
    </html>
  );
}
