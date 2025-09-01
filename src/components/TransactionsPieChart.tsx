import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction } from "../types/transactions";

interface Props {
  transactionData: Transaction[] | undefined;
}

const aggregateByCategory = (data: Transaction[]) => {
  const totals: Record<string, number> = {};
  data.forEach(({ category, amount, type }) => {
    if (type !== "expense") return;
    if (!totals[category]) totals[category] = 0;
    totals[category] += amount;
  });
  return Object.entries(totals).map(([name, value]) => ({ name, value }));
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EFF",
  "#FF6E6E",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
  name: string;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
    </text>
  );
};

const TransactionPieChart: React.FC<Props> = ({ transactionData }) => {
  if (!transactionData || transactionData.length === 0) {
    return <div>No transaction data available</div>;
  }

  const data = aggregateByCategory(transactionData);

  console.log("Pie Chart Data", data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionPieChart;
