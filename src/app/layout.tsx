import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maldives Portals Directory",
  description:
    "Search-first directory for official and commonly used Maldives portals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://github.com/MvDevsUnion/portals-directory"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              MvDevsUnion
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
