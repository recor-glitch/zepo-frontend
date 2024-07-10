import DrawerWrapper from "@/components/drawer/drawer-wrapper";
import { FooterHome } from "@/components/footer-home";
import { NavbarHome } from "@/components/navbar-home";
import { UseDrawerContextProvider } from "@/context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zepo",
  description: "Find yourself a home",
};

export default function HomeLayout({
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
  );
}
