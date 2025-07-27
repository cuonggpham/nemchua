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
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-secondary-900`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
