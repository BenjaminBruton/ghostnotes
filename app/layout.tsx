import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ghost Notes - Indie Short Film",
  description: "An indie short film by [Your Name]",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-primary-black border-b border-primary-blue">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary-red transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/casting"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary-red transition-colors"
                >
                  Casting
                </Link>
                <Link
                  href="/crew"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary-red transition-colors"
                >
                  Crew
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <Analytics />
        <footer className="bg-primary-black border-t border-primary-blue mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-400 text-sm">
              © 2026 Ghost Notes. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
