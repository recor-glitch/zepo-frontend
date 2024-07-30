import { colorPalette, pieData } from "@/constants";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface pieChartProps {
  data: typeof pieData;
}

const DoughnutChart = ({ data }: pieChartProps) => {
  return (
    <div className="flex justify-between items-center h-full w-full">
      <ResponsiveContainer>
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey={"value"} innerRadius={50}>
            {data.map((entry, index) => (
              <Cell
                key={entry.name + index}
                fill={colorPalette[index % (colorPalette.length - 1)]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
