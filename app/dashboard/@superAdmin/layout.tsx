import React from "react";
import DummyRentImage from "@/public/dummy-rent-admin-1.svg";
import Image from "next/image";

const SuperDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
      <div className="flex justify-between items-center col-span-2 w-full h-full bg-dashboard-header-bg relative">
        <div className="flex flex-1"></div>
        <Image
          src={DummyRentImage}
          alt="Dummy Rent house image"
          className="absolute bottom-0 right-0"
        />
      </div>
      <div className="flex col-span-1 border border-yellow-500 w-full h-full"></div>
      <div className="flex col-span-1 border border-gray-500 w-full h-full"></div>
      <div className="flex col-span-2 border border-blue-500 w-full h-full"></div>
      <div className="flex col-span-2 border border-stone-500 w-full h-full"></div>
      <div className="flex col-span-1 border border-y-blue-800 w-full h-full"></div>
    </div>
  );
};

export default SuperDashboardLayout;
