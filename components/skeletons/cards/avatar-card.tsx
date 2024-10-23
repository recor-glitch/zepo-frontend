import React from "react";

const AvatarCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-sm w-full items-center">
      <div className="circle-div h-dashboard-avatar w-dashboard-avatar bg-skeleton" />
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="w-2/4 h-3 rounded-full bg-skeleton" />
        <div className="w-2/3 h-4 rounded-full bg-skeleton" />
      </div>
    </div>
  );
};

export default AvatarCardSkeleton;
