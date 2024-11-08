import { FooterHome } from "@/components/footer-home";
import { BrowseNavBar } from "@/components/navbar";
import HomeRedirectProvider from "@/container/home-redirect-provider";
import { LayoutProvider } from "@/context";
import { UsePropertyFilterContextProvider } from "@/context/property/property-filter/property-filter-content";
import React from "react";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HomeRedirectProvider>
      <UsePropertyFilterContextProvider>
        <LayoutProvider>
          <BrowseNavBar />
          {children}
          <FooterHome />
        </LayoutProvider>
      </UsePropertyFilterContextProvider>
    </HomeRedirectProvider>
  );
};

export default BrowseLayout;
