import DrawerWrapper from "@/components/drawer/drawer-wrapper";
import { FooterHome } from "@/components/footer-home";
import { NavbarHome } from "@/components/navbar";
import HomeRedirectProvider from "@/container/home-redirect-provider";
import { UseDrawerContextProvider } from "@/context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zepo",
  description: "Find yourself a home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeRedirectProvider>
      <UseDrawerContextProvider>
        <DrawerWrapper />
        <NavbarHome />
        {children}
        <FooterHome />
      </UseDrawerContextProvider>
    </HomeRedirectProvider>
  );
}
