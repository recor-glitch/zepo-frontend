import { NavbarDashboard } from "@/components/navbar";
import React from "react";
import { IconSearch, IconNotification } from "@tabler/icons-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-[100vh]">
      <div className="flex gap-h p-h bg-bg-primary h-full w-full">
        <div className="flex-col gap-default justify-between items-center w-1/6 h-full hidden md:flex border-r-2">
          <NavbarDashboard />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row justify-between px-h items-center h-1/6 w-full">
            <p className="text-text-primary font-bold text-md-title">
              Dashboard
            </p>
            <div className="flex gap-md justify-between items-center">
              <IconSearch />
              <IconNotification />
            </div>
          </div>
          <div className="flex flex-1 border border-black p-h">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
