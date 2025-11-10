import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/lib/analytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/lib/gtm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "빼빼로 하우 머치 | 내 얼굴은 빼빼로 몇 개?",
  description: "AI로 분석하는 재미있는 빼빼로 관상 서비스. 내 얼굴을 빼빼로로 환산해보세요!",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gtmId && (
          <>
            <GoogleTagManagerHead gtmId={gtmId} />
            <GoogleTagManagerBody gtmId={gtmId} />
          </>
        )}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}
      </body>
    </html>
  );
}
