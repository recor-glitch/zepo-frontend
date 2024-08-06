import { NavbarDashboard } from "@/components/navbar";
import DashboardRedirectProvider from "@/container/dashboard-redirect-provider";
import { IconNotification, IconSearch } from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import React from "react";
import { nextAuthOptions } from "../auth/auth";

async function DashboardLayout({
  admin,
  superAdmin,
}: {
  children: React.ReactNode;
  superAdmin: React.ReactNode;
  admin: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  return (
    <DashboardRedirectProvider>
      <div className="flex flex-col w-full h-[100vh]">
        <div className="flex gap-h p-h bg-bg-primary h-full w-full">
          <div className="flex-col gap-default justify-between items-center w-1/6 h-full hidden md:flex border-r-2">
            <NavbarDashboard />
          </div>
          <div className="flex flex-col flex-1">
            {session ? (
              session?.profile?.role === "admin" ? (
                admin
              ) : (
                superAdmin
              )
            ) : (
              <div>loading...</div>
            )}
          </div>
        </div>
      </div>
    </DashboardRedirectProvider>
  );
}

export default DashboardLayout;
