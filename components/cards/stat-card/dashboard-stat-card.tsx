import React from "react";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";

interface dashboardProps {
  title: string;
  value: number;
  percentage: string;
  bgColor: string;
  className?: string;
}

const DashboardStatCard = ({
  bgColor,
  percentage,
  title,
  value,
  className,
}: dashboardProps) => {
  return (
    <div
      className={`flex flex-col justify-between items-center flex-1  h-full rounded-xl p-sm-h ${className} ${bgColor}`}
    >
      <p className="text-lg-subtitle font-medium">{title}</p>
      <div className="flex flex-col gap-2">
        <p className="text-md-title font-bold">$ {value}K</p>
        <span className="flex text-sm font-bold">
          {value > 0 ? (
            <IconArrowUp className="h-4 w-4" />
          ) : (
            <IconArrowDown className="h-4 w-4" />
          )}
          {percentage} %
        </span>
      </div>
    </div>
  );
};

export default DashboardStatCard;
