import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useApi } from "../api/api";
import AmountCard from "../components/AmountCard";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import { useMonth } from "../context/MonthContext";
import { Transaction } from "../types/transactions";

interface Props {}

const Home: FunctionComponent<Props> = (props: Props) => {
  const { month } = useMonth();
  const { isLoading, data: transactionData } = useApi<Transaction>(
    "transactions",
    {
      month,
    }
  );
  const [totalBalance, setTotalBalance] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [totalSavings, setTotalSavings] = useState();

  console.log(month);
  console.log(transactionData);

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
          <AmountCard title="Balance" amount="$0.00" />
          <AmountCard title="Income" amount="$0.00" />
          <AmountCard title="Expenses" amount="$0.00" />
          <AmountCard title="Savings" amount="$0.00" />
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
