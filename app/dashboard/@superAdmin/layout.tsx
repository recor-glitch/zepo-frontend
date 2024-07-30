import React from "react";
import DummyRentImage from "@/public/dummy-rent-admin-1.svg";
import CloudImage from "@/public/cloud.svg";
import Image from "next/image";
import { DoughnutChart } from "@/components/graph";

const SuperDashboardLayout = ({
  children,
  stats,
  saleAnalytics,
  incomeStatistics,
  saleReports,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  saleAnalytics: React.ReactNode;
  incomeStatistics: React.ReactNode;
  saleReports: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:grid grid-cols-6 grid-rows-5 w-full h-full gap-h py-sm-v">
      {/* BANNER */}
      <div className="flex justify-between items-center col-span-2 row-span-1 w-full h-full relative rounded-xl">
        <div className="flex flex-col gap-4 pl-h">
          <p className="text-md-title font-medium line-clamp-2">
            Enjoy your first home sale
          </p>
          <button className="filledBtn w-2/3">Explore Now</button>
        </div>
      </div>
      {/* STATS CARD */}
      {stats}
      <div className="flex col-span-3 row-span-2 w-full h-full rounded-xl border-2">
        {saleAnalytics}
      </div>
      <div className="flex col-span-3 row-span-2 w-full h-full bg-black rounded-xl">
        {incomeStatistics}
      </div>
      <div className="flex col-span-4 row-span-2 w-full h-full rounded-xl border-2 py-sm-v">
        {saleReports}
      </div>
      <div className="flex col-span-2 row-span-2 w-full h-full"></div>
    </div>
  );
};

export default SuperDashboardLayout;
