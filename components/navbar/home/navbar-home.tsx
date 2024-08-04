"use client";

import { navItems } from "@/constants";
import { useDrawerContext } from "@/context";
import MenuIcon from "@/public/menu.svg";
import ZepoLogo from "@/public/zepo-logo.svg";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import DummyAvatar from "@/public/dummy-avatar.svg";

function NavbarHome() {
  const { trigger } = useDrawerContext();

  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    const response = await signIn("google", { redirect: true });
    console.log("Signin response: ", { response });
  };

  return (
    <div className="h-24 flex flex-row gap-h justify-between items-center px-h py-v">
      <Image src={ZepoLogo} alt="Website logo" className="w-logo" />
      <div className="flex flex-row items-center xs:hidden md:flex gap-h h-full max-w-[34.75rem]">
        <ul className="flex justify-evenly gap-h items-center w-full">
          {navItems.map((item, index) => {
            if (item.type === "SELECT") {
              return (
                <select
                  className="bg-bg-primary text-md-subtitle-primary font-medium"
                  key={item.title + index}
                >
                  <option>{item.title}</option>
                  {item.selectItems?.map((selectItem, idx) => (
                    <option key={idx}>{selectItem.title}</option>
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
      </div>
      {status === "unauthenticated" && session === null ? (
        <div className="flex justify-between items-center gap-4 ml-nav-l xs:hidden md:flex">
          <button className="outlinedBtn" onClick={handleSignIn}>
            Login
          </button>
          <button className="filledBtn" onClick={handleSignIn}>
            Signup
          </button>
        </div>
      ) : status === "loading" ? (
        <div />
      ) : (
        <div className="circle-div">
          <Image
            src={session?.user?.image ?? DummyAvatar}
            alt="profile Image"
            height={200}
            width={200}
          />
        </div>
      )}
      <Image
        className="flex flex-row items-center md:hidden cursor-pointer"
        src={MenuIcon}
        alt="Menu"
        onClick={() => trigger((prev) => !prev)}
      />
    </div>
  );
}

export default NavbarHome;
