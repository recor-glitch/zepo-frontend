import { DashboardStatCard } from "@/components/cards";
import React from "react";

const DashboardStatsSection = () => {
  return (
    <div className="flex col-span-4 row-span-1 w-full h-full gap-4">
      <DashboardStatCard
        title="Income"
        bgColor="bg-income-card-1-bg"
        value={34.1}
        percentage="105.23"
      />
      <DashboardStatCard
        title="Expense"
        bgColor="bg-income-card-2-bg"
        value={34.1}
        percentage="105.23"
      />
      <DashboardStatCard
        title="Profit"
        bgColor="bg-income-card-3-bg"
        value={34.1}
        percentage="105.23"
      />
    </div>
  );
};

export default DashboardStatsSection;
