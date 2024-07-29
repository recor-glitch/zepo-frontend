"use client";

import { colorPalette, pieData } from "@/constants";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

interface pieChartProps {
  data: typeof pieData;
}

const DoughnutChart = ({ data }: pieChartProps) => {
  return (
    <div className="flex justify-between items-center">
      <PieChart width={250} height={250}>
        <Pie data={data} dataKey={"value"} innerRadius={50}>
          {data.map((entry, index) => (
            <Cell key={entry.name + index} fill={colorPalette[index % 12]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DoughnutChart;
