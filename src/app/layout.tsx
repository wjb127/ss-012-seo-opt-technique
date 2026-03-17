import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: {
    default: "SEO 최적화 노하우",
    template: "%s | SEO 최적화 노하우",
  },
  description: "실전 SEO 최적화 노하우를 체계적으로 정리한 지식 베이스",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "SEO 최적화 노하우",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
