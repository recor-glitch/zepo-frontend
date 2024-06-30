import React from "react";
import ZepoLogo from "@/public/zepo-logo.svg";
import Link from "next/link";
import MenuIcon from "@/public/menu.svg";
import Image from "next/image";

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
    <div className="h-24 flex justify-between items-center pl-h pr-h pt-v pb-v gap-12">
      <Image src={ZepoLogo} alt="Website logo" />
      <div className="flex flex-row items-center xs:hidden md:inline-flex">
        <ul className="flex flex-row justify-between items-center">
          {navItems.map((item, index) => {
            if (item.type === "SELECT") {
              return (
                <select className="m-h">
                  <option>{item.title}</option>
                  {item.selectItems?.map((selectItem, index) => (
                    <option>{selectItem.title}</option>
                  ))}
                </select>
              );
            }
            return (
              <Link
                href={item.link}
                className="p-h text-md-subtitle-primary font-medium"
                key={`${item.title} + ${index}`}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
        <div className="flex flex-row justify-between items-center gap-4 ml-nav-l">
          <button className="outlinedBtn">Login</button>
          <button className="filledBtn">Signup</button>
        </div>
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
