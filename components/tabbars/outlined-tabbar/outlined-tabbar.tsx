"use client";

import React, { useState } from "react";

interface props {
  tabs: { title: string }[];
}

function OutlinedTab({ tabs }: props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleOnClick = (index: number) => setActiveTab(index);
  return (
    <div className="relative border-2 bg-primary-lighter border-primary-light w-[20.875rem] h-tab flex justify-around items-center rounded-default">
      {tabs.map((tab, index) => (
        <p
          onClick={() => handleOnClick(index)}
          className={`text-md-subtitle-main font-medium cursor-pointer ${
            activeTab === index ? "text-primary" : "text-text-secondary-dark"
          }`}
        >
          {tab.title}
        </p>
      ))}
      <div
        className={`absolute border-2 w-1/2 mx-sm rounded-default h-tab-indicator bg-white bg-opacity-70 left-0 transform transition-all duration-500 ease-in-out ${
          activeTab === 0 ? "translate-x-0" : "translate-x-[90%]"
        }`}
      />
    </div>
  );
}

export default OutlinedTab;
