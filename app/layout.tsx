import DrawerWrapper from "@/components/drawer/drawer-wrapper";
import { FooterHome } from "@/components/footer-home";
import { NavbarHome } from "@/components/navbar-home";
import { UseDrawerContextProvider } from "@/context";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

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
  properties,
  testimonial,
  reachout,
}: Readonly<{
  children: React.ReactNode;
  landing: React.ReactNode;
  tour: React.ReactNode;
  stats: React.ReactNode;
  properties: React.ReactNode;
  testimonial: React.ReactNode;
  reachout: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <UseDrawerContextProvider>
          <DrawerWrapper />
          <NavbarHome />
          {landing}
          {tour}
          {stats}
          {properties}
          {testimonial}
          {reachout}
          {children}
          <FooterHome />
        </UseDrawerContextProvider>
      </body>
    </html>
  );
}
