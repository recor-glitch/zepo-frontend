"use client";

import { BarGraph } from "@/components/graph";
import { IconCaretDownFilled } from "@tabler/icons-react";

const BarChartWrapper = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full p-sm-h">
      <div className="flex w-full justify-between items-center">
        <p className="text-white font-bold">Income statistics</p>
        <span className="flex  justify-between items-center gap-2 rounded-lg p-2 bg-ascent self-end">
          <p className="text-text-primary font-medium text-sm">Last month</p>
          <IconCaretDownFilled className="bg-ascent text-text-secondary" />
        </span>
      </div>
      <BarGraph />
    </div>
  );
};

export default BarChartWrapper;
