import { UserContextProvider } from "@/context/user/user-context";
import ReactQueryProvider from "@/query/react-query-provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

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
          <UserContextProvider>
            <div>{children}</div>
          </UserContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
