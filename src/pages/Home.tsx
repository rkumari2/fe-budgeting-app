import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useApi } from "../api/api";
import AmountCard from "../components/AmountCard";
import MonthCalendar from "../components/MonthCalendar";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
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
  // const [totalSavings, setTotalSavings] = useState<number>();

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
      // const savings = balance > 0 ? balance : 0;

      setTotalIncome(income);
      setTotalExpenses(expenses);
      setTotalBalance(balance);
      // setTotalSavings(savings);
    }
  }, [transactionData]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="start"
        alignItems="center"
        height={"100%"}
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
          {/* <AmountCard title="Savings" amount={totalSavings} /> */}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
        >
          <TransactionList />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
