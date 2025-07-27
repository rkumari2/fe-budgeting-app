import { PureComponent } from "react";
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

export default class InsightsBarChart extends PureComponent<Props> {
  aggregateIncomeExpenseByCategory(data: Transaction[]): AggregatedData[] {
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
  }

  render() {
    const data = this.aggregateIncomeExpenseByCategory(
      this.props.transactionData ?? []
    );

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="income"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="expense"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
