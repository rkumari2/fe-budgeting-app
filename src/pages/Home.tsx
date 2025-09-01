import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useApi } from "../api/api";
import AmountCard from "../components/AmountCard";
import InsightsBarChart from "../components/InsightsBarChart";
import MonthCalendar from "../components/MonthCalendar";
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
          <Typography variant="h6" fontWeight={"bold"}>
            Dashboard
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          gap={"24px"}
        >
          <AmountCard title="Balance" amount={totalBalance} />
          <AmountCard title="Income" amount={totalIncome} />
          <AmountCard title="Expenses" amount={totalExpenses} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          width={"100%"}
          gap={"24px"}
        >
          <Stack
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="start"
            sx={{
              backgroundColor: "white",
              padding: "18px 20px",
              border: "1px solid lightgray",
              borderRadius: "8px",
            }}
            flex={2}
            minHeight={320}
            maxHeight={320}
          >
            <TransactionList transactionData={transactionData} />
          </Stack>

          <Stack
            display="flex"
            direction="column"
            justifyContent="start"
            alignItems="center"
            sx={{
              backgroundColor: "white",
              padding: "18px 20px",
              border: "1px solid lightgray",
              borderRadius: "8px",
            }}
            flex={0.9}
            minHeight={320}
            maxHeight={320}
          >
            <Typography variant="body1" align="center" gutterBottom>
              Expenses by Category
            </Typography>
            <TransactionPieChart transactionData={transactionData} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          gap={"24px"}
        >
          <Stack
            display="flex"
            direction="column"
            justifyContent="start"
            alignItems="center"
            sx={{
              backgroundColor: "white",
              padding: "18px 20px",
              border: "1px solid lightgray",
              borderRadius: "8px",
            }}
            flex={1}
            minHeight={320}
            maxHeight={320}
          >
            <Typography variant="body1" align="center" gutterBottom>
              Expense vs Income by category
            </Typography>
            <InsightsBarChart transactionData={transactionData} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
