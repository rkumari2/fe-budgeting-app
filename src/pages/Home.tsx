import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useApi } from "../api/api";
import AmountCard from "../components/AmountCard";
import InsightsBarChart from "../components/InsightsBarChart";
import MonthCalendar from "../components/MonthCalendar";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import TransactionPieChart from "../components/TransactionsPieChart";
import { useMonth } from "../context/MonthContext";
import { Transaction } from "../types/transactions";

interface Props {}

const Home: FunctionComponent<Props> = (props: Props) => {
  const { month } = useMonth();
  const { isLoading, data: transactionData } = useApi<Transaction[]>(
    "transactions",
    {
      month,
    }
  );
  const [totalBalance, setTotalBalance] = useState<number>();
  const [totalIncome, setTotalIncome] = useState<number>();
  const [totalExpenses, setTotalExpenses] = useState<number>();

  console.log("Month", month);
  console.log(transactionData);

  useEffect(() => {
    if (transactionData) {
      const income = transactionData
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expenses = transactionData
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);
      const balance = income - expenses;

      setTotalIncome(income);
      setTotalExpenses(expenses);
      setTotalBalance(balance);
    }
  }, [transactionData]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="start"
        alignItems="center"
        width={"100%"}
        padding={0}
        gap={4}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <MonthCalendar />
          <Typography variant="h6">Dashboard</Typography>
          <Box>
            <SearchBar placeholder="Search..." value="" onChange={() => {}} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
        >
          <AmountCard title="Balance" amount={totalBalance} />
          <AmountCard title="Income" amount={totalIncome} />
          <AmountCard title="Expenses" amount={totalExpenses} />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
        >
          <TransactionList transactionData={transactionData} />
          <TransactionPieChart transactionData={transactionData} />
        </Stack>
        <InsightsBarChart transactionData={transactionData} />
      </Stack>
    </>
  );
};

export default Home;
