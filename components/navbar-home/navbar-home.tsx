import React from "react";
import ZepoLogo from "@/public/zepo-logo.svg";
import Link from "next/link";
import MenuIcon from "@/public/menu.svg";
import Image from "next/image";
import { INavItems } from "@/type/app";

const navItems: INavItems[] = [
  {
    title: "Rent",
    link: "/rent",
    type: "LINK",
  },
  {
    title: "Buy",
    link: "/buy",
    type: "LINK",
  },
  {
    title: "Sell",
    link: "/sell",
    type: "LINK",
  },
  {
    title: "Manage Property",
    link: "/manage",
    type: "SELECT",
    selectItems: [
      {
        link: "#",
        title: "1",
      },
      {
        link: "#",
        title: "2",
      },
    ],
  },
  {
    title: "Resources",
    link: "/resource",
    type: "SELECT",
    selectItems: [
      {
        link: "#",
        title: "1",
      },
      {
        link: "#",
        title: "2",
      },
    ],
  },
];

function NavbarHome() {
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
        className="flex flex-row items-center md:hidden"
        src={MenuIcon}
        alt="Menu"
      ></Image>
    </div>
  );
}

export default NavbarHome;
