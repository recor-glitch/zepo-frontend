import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NavbarHome } from "@/components/navbar-home";
import { FooterHome } from "@/components/footer-home";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zepo",
  description: "Find yourself a home",
};

export default function RootLayout({
  children,
  landing,
  tour,
  stats,
}: Readonly<{
  children: React.ReactNode;
  landing: React.ReactNode;
  tour: React.ReactNode;
  stats: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <NavbarHome />
        {landing}
        {tour}
        {stats}
        {children}
        <FooterHome />
      </body>
    </html>
  );
}
