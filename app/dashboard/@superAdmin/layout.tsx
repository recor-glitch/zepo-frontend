import React from "react";
import DummyRentImage from "@/public/dummy-rent-admin-1.svg";
import CloudImage from "@/public/cloud.svg";
import Image from "next/image";
import { DoughnutChart } from "@/components/graph";

const SuperDashboardLayout = ({
  children,
  stats,
  doughnutChartWrapper,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  doughnutChartWrapper: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:grid grid-cols-5 grid-rows-3 w-full h-full">
      {/* BANNER */}
      <div className="flex justify-between items-center col-span-3 w-full h-full bg-dashboard-header-bg relative rounded-tl-xl">
        <div className="flex flex-col w-1/2 gap-4 px-h">
          <p className="text-md-primary-header font-medium line-clamp-2 w-3/4">
            Enjoy your first home sale
          </p>
          <button className="filledBtn w-1/2">Explore Now</button>
        </div>
        <Image
          src={DummyRentImage}
          alt="Dummy Rent house image"
          className="absolute bottom-0 right-5 z-20"
        />
        <Image
          src={CloudImage}
          alt="Dummy Rent house image"
          className="absolute top-0 right-[10%] transform transition-all -translate-y-0 z-30"
          height={80}
          width={100}
        />
        <Image
          src={CloudImage}
          alt="Dummy Rent house image"
          className="absolute top-0 right-[20%] transform transition-all -translate-y-8 z-10"
        />
      </div>
      {/* STATS CARD */}
      {stats}
      <div className="flex col-span-2 w-full h-full">
        {doughnutChartWrapper}
      </div>
      <div className="flex col-span-3 border border-blue-500 w-full h-full"></div>
      <div className="flex col-span-3 border border-stone-500 w-full h-full"></div>
      <div className="flex col-span-2 border border-y-blue-800 w-full h-full"></div>
    </div>
  );
};

export default SuperDashboardLayout;
