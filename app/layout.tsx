import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display-inactive",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Takeout Media | Visionary Creative Laboratory",
  description: "We are a technology driven full-service communications and advertising company.",
  icons: {
    icon: [
      { url: "/pictures/takeout-media-logomark/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/pictures/takeout-media-logomark/favicon.png" },
    ],
  },
};

import { Footer, Header, SmoothScroll } from "@/shared/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Search-engine-compliant multi-format favicon fallbacks */}
        <link rel="icon" href="/pictures/takeout-media-logomark/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/pictures/takeout-media-logomark/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${bricolageGrotesque.variable} antialiased flex flex-col min-h-screen`}
      >
        <SmoothScroll>
          <Header />
          <div className="flex-1">
              {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
