"use client";

import DefaultPopoverComponent from "@/components/popover/default-popover/default-popover";
import { navItems } from "@/constants";
import { useDrawerContext } from "@/context";
import DummyAvatar from "@/public/dummy-avatar.svg";
import MenuIcon from "@/public/menu.svg";
import ZepoLogo from "@/public/zepo-logo.svg";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenuContent from "./profile-menu-content";
import { useRouter } from "next/navigation";
import { NavbarSelectComponent } from "@/components/select";

function NavbarHome() {
  const { trigger } = useDrawerContext();

  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    await signIn("google", { redirect: true });
  };

  const router = useRouter();

  return (
    <div className="h-24 flex flex-row gap-h justify-between items-center px-h py-v sticky top-0 z-50 bg-bg-primary">
      <Image
        src={ZepoLogo}
        alt="Website logo"
        className="w-logo h-logo cursor-pointer"
        onClick={() => router.replace("/home")}
      />
      <NavbarSelectComponent />
      {status === "unauthenticated" && session === null ? (
        <div className="flex justify-between items-center gap-4 ml-nav-l xs:hidden lg:flex">
          <button className="outlinedBtn" onClick={handleSignIn}>
            Login
          </button>
          <button className="filledBtn" onClick={handleSignIn}>
            Signup
          </button>
        </div>
      ) : status === "loading" ? (
        "Loading..."
      ) : (
        <DefaultPopoverComponent
          triggerElement={
            <div className="circle-div hidden lg:flex">
              <Image
                src={session?.user?.image ?? DummyAvatar}
                alt="profile Image"
                height={200}
                width={200}
              />
            </div>
          }
          content={
            <ProfileMenuContent
              title={session?.user?.name || ""}
              subtitle={session?.user?.email || ""}
            />
          }
        />
      )}
      <Image
        className="flex flex-row items-center lg:hidden cursor-pointer"
        src={MenuIcon}
        alt="Menu"
        onClick={() => trigger((prev) => !prev)}
      />
    </div>
  );
}

export default NavbarHome;
