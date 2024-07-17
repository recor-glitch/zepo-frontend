import { UserContextProvider } from "@/context/user/user-context";
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/container/react-query-provider";
import NextAuthSessionProvider from "@/container/session-provider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <ReactQueryProvider>
          <NextAuthSessionProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </NextAuthSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
