"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import DummyAvatar from "@/public/dummy-avatar.svg";
import AvatarCardSkeleton from "@/components/skeletons/cards/avatar-card";
import DashboardItems from "@/components/skeletons/cards/dashboard-items";
import { dashboardAdminNavItems } from "@/constants";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";

const NavbarDashboard = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col px-h py-v justify-between items-center w-full">
      {status === "authenticated" && session.user ? (
        <div className="flex flex-col gap-20 w-full items-center">
          <div className="flex flex-col w-full items-center gap-6">
            <div className="circle-div h-dashboard-avatar w-dashboard-avatar">
              <Image
                src={session.user.image ?? DummyAvatar}
                alt="Profile Avatar"
                height={250}
                width={250}
              />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
              <p className="text-sm-subtitle font-medium">Welcome back!</p>
              <p className="text-md-subtitle-main font-bold">
                {session.user.name}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-8 w-full">
            {dashboardAdminNavItems.map((item) => (
              <Link href={item.link}>
                <div className="flex w-full gap-8 justify-start items-center">
                  <item.icon />
                  <p className="text-md-subtitle-main font-bold text-text-secondary">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="divider-h" />
          <div className="flex w-full gap-8 justify-start items-center">
            <IconLogout />
            <p className="text-md-subtitle-main font-bold text-text-secondary">
              Logout
            </p>
          </div>
        </div>
      ) : (
        // SKELETON
        <div className="flex flex-col gap-12 w-full">
          <AvatarCardSkeleton />
          <div className="flex flex-col gap-8 w-full">
            {[...new Array(7)].map((item) => (
              <DashboardItems />
            ))}
          </div>
          <div className="divider-h" />
          <DashboardItems />
        </div>
      )}
    </div>
  );
};

export default NavbarDashboard;
