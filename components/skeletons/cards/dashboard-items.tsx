import React from "react";

const DashboardItemSkeleton = () => {
  return (
    <div className="animate-pulse flex w-full gap-4 justify-start items-center">
      <div className="flex h-10 w-10 bg-slate-200 rounded-lg" />
      <div className="flex h-5 flex-1 bg-slate-200 rounded-full" />
    </div>
  );
};

export default DashboardItemSkeleton;
