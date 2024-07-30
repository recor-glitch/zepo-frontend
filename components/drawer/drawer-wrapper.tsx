"use client";

import { navItems } from "@/constants";
import { useDrawerContext } from "@/context";
import ZepoLogo from "@/public/zepo-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HomeDrawer } from "./home-drawer";

const DrawerWrapper = () => {
  const { isOpen, trigger } = useDrawerContext();
  const ref = useRef(null);

  return (
    <HomeDrawer
      ref={ref}
      header={<Image src={ZepoLogo} alt="Website logo" className="w-logo" />}
      content={
        <div className="flex flex-col flex-1 gap-h justify-between items-center py-v">
          <ul className="flex flex-col justify-evenly gap-h items-center w-full">
            {navItems.map((item, index) => {
              if (item.type === "SELECT") {
                return (
                  <select className="text-md-subtitle-primary font-medium" key={index}>
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
          <div className="flex flex-col w-full justify-between items-center gap-4 ">
            <button className="outlinedBtn w-full">Login</button>
            <button className="filledBtn w-full">Signup</button>
          </div>
        </div>
      }
      isOpen={isOpen}
      triggerHandler={trigger}
    />
  );
};

export default DrawerWrapper;
