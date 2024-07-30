"use client";

import { DoughnutChart } from "@/components/graph";
import { colorPalette, dollar, pieData } from "@/constants";
import React from "react";
import { IconCaretDownFilled } from "@tabler/icons-react";

const DoughnutChartSection = () => {
  return (
    <div className="flex h-full w-full justify-between items-center p-sm-h">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <p className="text-text-secondary font-bold">Sales Analytics</p>
        <DoughnutChart data={pieData} />
      </div>
      <div className="flex flex-col h-full w-full justify-between items-center gap-4">
        <span className="flex  justify-between items-center gap-2 rounded-lg p-2 bg-ascent self-end">
          <p className="text-text-primary font-medium text-sm">JAN 2024</p>
          <IconCaretDownFilled className="bg-ascent text-text-secondary" />
        </span>
        <div className="h-full w-full grid grid-cols-2 grid-rows-2 items-center justify-center">
          {pieData?.map((data, index) => {
            const color = colorPalette[index % (colorPalette.length - 1)];

            return (
              <div className="flex gap-2 justify-center items-center">
                <div
                  className={`rounded-full h-3 w-3`}
                  style={{
                    backgroundColor: color,
                  }}
                />
                <div className="flex flex-col gap-2 items-start justify-center">
                  <p className="text-md-subtitle-secondary font-medium">
                    {data.name}
                  </p>
                  <span className="flex justify-between items-center text-md-subtitle-main font-bold">
                    {dollar}
                    {data.value.toLocaleString()}
                    <p className="text-md-subtitle-primary">k</p>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChartSection;
