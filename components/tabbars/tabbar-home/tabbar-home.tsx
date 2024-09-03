"use client";

import { ITabBarItems } from "@/type/app";
import React, { useState } from "react";

const TabBarItems: ITabBarItems[] = [
  {
    title: "Rent",
    link: "#",
  },
  {
    title: "Buy",
    link: "#",
  },
  {
    title: "Sell",
    link: "#",
  },
];

function TabBarHome() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleOnClick = (i: number) => setActiveTab(i);
  return (
    <div className="flex w-full lg:w-sm-container flex-col self-center lg:self-start drop-shadow-sm">
      <div className="tabbarHome">
        {TabBarItems.map((item, i) => {
          return (
            <div
              key={item.title + i}
              onClick={() => handleOnClick(i)}
              className={`font-medium text-md-subtitle-main transform transition-colors ${
                activeTab === i ? "text-primary" : "text-text-primary"
              } w-1/3 h-full flex justify-center items-center cursor-pointer`}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div
        className={`w-1/3 rounded-sm h-[3px] bg-primary transform transition-all ${
          activeTab === 0
            ? "translate-x-0"
            : activeTab === 1
            ? "translate-x-full"
            : "translate-x-[200%]"
        } ease-in-out duration-500`}
      />
    </div>
  );
}

export default TabBarHome;
