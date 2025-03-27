import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthsSession from "./_component/AuthSession";
import AuthSession from "./_component/AuthSession";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z. 무슨 일이 일어나고 있나요? / Z",
  description: "Z.com inspired by X.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthSession>
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
