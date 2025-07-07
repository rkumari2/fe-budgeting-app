import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import AmountCard from "../components/AmountCard";
import TransactionList from "../components/TransactionList";

interface Props {}

const Home: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="start"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            padding: "18px 60px",
            border: "1px solid lightgray",
            borderRadius: "8px",
            width: "80%",
            marginTop: "20px",
          }}
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
          sx={{
            backgroundColor: "white",
            padding: "18px 60px",
            border: "1px solid lightgray",
            borderRadius: "8px",
            width: "80%",
            marginTop: "20px",
          }}
        >
          <TransactionList />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
