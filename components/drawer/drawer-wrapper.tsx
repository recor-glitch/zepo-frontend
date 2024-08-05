"use client";

import { navItems } from "@/constants";
import { useDrawerContext } from "@/context";
import ZepoLogo from "@/public/zepo-logo.svg";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { HomeDrawer } from "./home-drawer";

const DrawerWrapper = () => {
  const { isOpen, trigger } = useDrawerContext();

  return (
    <HomeDrawer
      className="bg-white"
      header={
        <div className="flex justify-between items-center">
          <Image src={ZepoLogo} alt="Website logo" className="w-20" />
          <IconX onClick={() => trigger((prev) => !prev)} />
        </div>
      }
      content={
        <div className="flex flex-col flex-1 gap-h justify-between items-center">
          <ul className="flex flex-col justify-evenly gap-h items-center w-full">
            {navItems.map((item, index) => {
              if (item.type === "SELECT") {
                return (
                  <select
                    className="text-md-subtitle-primary font-medium"
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
      }
      footer={
        <div className="flex flex-col w-full justify-between items-center gap-4 ">
          <button className="outlinedBtn w-full">Login</button>
          <button className="filledBtn w-full">Signup</button>
        </div>
      }
      isOpen={isOpen}
      triggerHandler={trigger}
      fixed
    />
  );
};

export default DrawerWrapper;
