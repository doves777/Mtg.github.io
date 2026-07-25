import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";

export const metadata: Metadata = {
  title: "Card Show Vendor Operations Platform",
  description:
    "Starter scaffold — offline-first POS, inventory, and pickup orders for card-show vendors.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RegisterServiceWorker />
        <header className="topbar">
          <span className="brand">Card Show Vendor Ops</span>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/pos">Vendor POS</Link>
            <Link href="/storefront">Storefront</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
