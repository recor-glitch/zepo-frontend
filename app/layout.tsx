import ReactQueryProvider from "@/container/react-query-provider";
import NextAuthSessionProvider from "@/container/session-provider";
import { UserContextProvider } from "@/context/user/user-context";
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ThemeModeScript />
      </head>
      <body className={jakarta.className}>
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
