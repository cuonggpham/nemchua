import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nemchua - Học từ vựng tiếng Nhật",
  description: "Ứng dụng học từ vựng tiếng Nhật với hệ thống flashcard và thuật toán SRS (Spaced Repetition System)",
  keywords: "học tiếng Nhật, từ vựng tiếng Nhật, flashcard, SRS, spaced repetition, Japanese vocabulary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30 text-secondary-900 min-h-screen`}>
        <div className="min-h-screen backdrop-blur-sm">
          {children}
        </div>
      </body>
    </html>
  );
}
