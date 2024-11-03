import React from "react";

const RentCardSkeleton: React.FC = () => {
  return (
    <div className="h-full min-h-[25vh] mb-2 w-full border-1 rounded-default animate-pulse gap-default">
      <div className="flex w-full h-1/2 bg-skeleton rounded-md" />
      <div className={`flex flex-col border-red-500 p-default gap-default`}>
        <div className="flex justify-between items-start">
          <div className="flex w-1/2 h-4 bg-skeleton rounded-md" />
        </div>
        <div className="flex w-3/5 h-4 bg-skeleton rounded-md" />
        <div className="flex w-full h-4 bg-skeleton rounded-md" />
        <div className="flex flex-row justify-start items-center gap-default">
          <div className="flex w-8 h-8 rounded-lg bg-skeleton" />
          <div className="flex w-8 h-8 rounded-lg bg-skeleton" />
          <div className="flex w-8 h-8 rounded-lg bg-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default RentCardSkeleton;
