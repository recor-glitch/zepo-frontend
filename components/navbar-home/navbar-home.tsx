"use client";

import React from "react";
import ZepoLogo from "@/public/zepo-logo.svg";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@/public/menu.svg";
import { INavItems } from "@/type/app";
import { HomeDrawer } from "../drawer";
import { useDrawerContext } from "@/context";
import { navItems } from "@/constants";

function NavbarHome() {
  const { trigger } = useDrawerContext();

  return (
    <div className="h-24 flex flex-row gap-h justify-between items-center px-h py-v">
      <Image src={ZepoLogo} alt="Website logo" className="w-logo" />
      <div className="flex flex-row items-center xs:hidden md:flex gap-h h-full max-w-[34.75rem]">
        <ul className="flex justify-evenly gap-h items-center w-full">
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
      </div>
      <div className="flex justify-between items-center gap-4 ml-nav-l xs:hidden md:flex">
        <button className="outlinedBtn">Login</button>
        <button className="filledBtn">Signup</button>
      </div>
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
