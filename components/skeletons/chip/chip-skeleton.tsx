import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChipSkeleton = () => {
  return (
    <div className="rounded-full flex gap-default border-2 p-sm justify-center items-center">
      <Skeleton className="w-5 h-5 rounded-full bg-slate-200" />
      <Skeleton className="w-10 rounded-full h-5 bg-slate-200" />
    </div>
  );
};

export default ChipSkeleton;
