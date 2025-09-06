import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Transaction } from "../types/transactions";

interface Props {
  transactionData: Transaction[] | undefined;
}

interface AggregatedData {
  name: string;
  income: number;
  expense: number;
}

const ThemedTooltip = (props: any) => {
  const theme = useTheme();
  return (
    <Tooltip
      {...props}
      contentStyle={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: 8,
        border: `1px solid ${theme.palette.divider}`,
      }}
      itemStyle={{
        color: theme.palette.text.primary,
      }}
      labelStyle={{
        color: theme.palette.text.primary,
        fontWeight: "bold",
      }}
    />
  );
};

const InsightsBarChart: React.FC<Props> = ({ transactionData }) => {
  const theme = useTheme();

  const aggregateIncomeExpenseByCategory = (
    data: Transaction[]
  ): AggregatedData[] => {
    const totals: Record<string, { income: number; expense: number }> = {};

    data.forEach(({ category, amount, type }) => {
      if (!totals[category]) totals[category] = { income: 0, expense: 0 };
      totals[category][type] += amount;
    });

    return Object.entries(totals).map(([name, { income, expense }]) => ({
      name,
      income,
      expense,
    }));
  };

  const data = aggregateIncomeExpenseByCategory(transactionData ?? []);

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ThemedTooltip
            formatter={(value: number, key: string) => [
              `£${value}`,
              key.charAt(0).toUpperCase() + key.slice(1),
            ]}
            cursor={{
              fill: theme.palette.customColors.pink,
              opacity: 0.2,
            }}
          />
          <Legend
            formatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
          <Bar
            dataKey="income"
            fill={theme.palette.customColors.teal}
            activeBar={
              <Rectangle
                fill={theme.palette.customColors.lightBlue}
                stroke={theme.palette.customColors.teal}
              />
            }
          />
          <Bar
            dataKey="expense"
            fill={theme.palette.customColors.coral}
            activeBar={
              <Rectangle
                fill={theme.palette.customColors.pink}
                stroke={theme.palette.customColors.coral}
              />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InsightsBarChart;
