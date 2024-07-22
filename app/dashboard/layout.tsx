import { NavbarDashboard } from "@/components/navbar";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-[100vh] border border-black">
      <div className="flex gap-h p-h bg-bg-primary h-full w-full">
        <div className="flex-col gap-default justify-between items-center w-1/5 h-full hidden md:flex border-r-2">
          <NavbarDashboard />
        </div>
        <div className="flex flex-col flex-1 border border-black">
          <div className="flex flex-row justify-start items-center h-1/6 border border-gray-700 w-full"></div>
          <div className="flex flex-1 border border-black p-h">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
