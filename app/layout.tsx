"use client";

import { FooterHome } from "@/components/footer-home";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NavbarHome } from "@/components/navbar-home";
import { useDrawerContext, UseDrawerContextProvider } from "@/context";
import { HomeDrawer } from "@/components/drawer";
import ZepoLogo from "@/public/zepo-logo.svg";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Zepo",
//   description: "Find yourself a home",
// };

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
  const { isOpen, trigger } = useDrawerContext();
  return (
    <html lang="en">
      <UseDrawerContextProvider>
        <body className={jakarta.className}>
          <HomeDrawer
            isOpen={isOpen}
            triggerHandler={trigger}
            header={
              <Image src={ZepoLogo} alt="Website logo" className="w-logo" />
            }
            content={
              <div className="flex flex-col flex-1 gap-h justify-between items-center py-v">
                <ul className="flex flex-col justify-evenly gap-h items-center w-full">
                  {navItems.map((item, index) => {
                    if (item.type === "SELECT") {
                      return (
                        <select className="bg-bg-primary text-md-subtitle-primary font-medium">
                          <option>{item.title}</option>
                          {item.selectItems?.map((selectItem, index) => (
                            <option>{selectItem.title}</option>
                          ))}
                        </select>
                      );
                    } else
                      return (
                        <Link
                          href={item.link}
                          className="text-md-subtitle-primary font-medium"
                          key={`${item.title} + ${index}`}
                        >
                          {item.title}
                        </Link>
                      );
                  })}
                </ul>
                <div className="flex flex-col w-full justify-between items-center gap-4 ">
                  <button className="outlinedBtn w-full">Login</button>
                  <button className="filledBtn w-full">Signup</button>
                </div>
              </div>
            }
          />
          <NavbarHome />
          {landing}
          {tour}
          {stats}
          {properties}
          {testimonial}
          {reachout}
          {children}
          <FooterHome />
        </body>
      </UseDrawerContextProvider>
    </html>
  );
}
