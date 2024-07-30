import { barData } from "@/constants";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const BarGraph = () => {
  const formatYAxis = (tickItem: any, i: number) => {
    if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(0)}k`;
    }
    return tickItem;
  };
  return (
    <ResponsiveContainer>
      <BarChart width={730} height={250} data={barData}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickFormatter={formatYAxis}
        />
        <Bar dataKey="value" fill="#A7E0DA" radius={5} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
