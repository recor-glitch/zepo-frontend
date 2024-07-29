import { DoughnutChart } from "@/components/graph";
import { colorPalette, dollar, pieData } from "@/constants";
import React from "react";

const DoughnutChartSection = () => {
  return (
    <div className="flex h-full w-full justify-between items-center">
      <DoughnutChart data={pieData} />
      <div className="h-full w-full grid grid-cols-2 grid-rows-2 p-sm-h items-center justify-center">
        {pieData?.map((data, index) => (
          <div className="flex gap-2 justify-center items-center">
            <div
              className={`rounded-full h-3 w-3 bg-[${
                colorPalette[index === 0 ? 0 : index % 12]
              }]`}
            />
            <div className="flex flex-col gap-2 items-start justify-center">
              <p className="text-md-subtitle-secondary font-medium">
                {data.name}
              </p>
              <p className="text-md-title font-bold">
                {dollar}
                {data.value} k
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChartSection;
