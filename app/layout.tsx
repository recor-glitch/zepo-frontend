import ReactQueryProvider from "@/container/react-query-provider";
import NextAuthSessionProvider from "@/container/session-provider";
import { UserContextProvider } from "@/context/user/user-context";
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zepo",
  description: "Find yourself a home",
  openGraph: {
    siteName: "Zepo Rental",
    url: "https://ik.imagekit.io/zeporental/zepo-logo.png?updatedAt=1725130099698",
    images: [
      {
        url: "https://ik.imagekit.io/zeporental/zepo-logo.png?updatedAt=1725130099698",
        alt: "zepo rental logo",
      },
    ],
    title: "Zepo",
    description: "Find yourself a home",
  },
  twitter: {
    images: [
      {
        url: "https://ik.imagekit.io/zeporental/zepo-logo.png?updatedAt=1725130099698",
        alt: "zepo rental logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ThemeModeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <NextAuthSessionProvider>
            <UserContextProvider>
              <Toaster position="top-right" />
              {children}
            </UserContextProvider>
          </NextAuthSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
