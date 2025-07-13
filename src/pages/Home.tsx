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
        bgcolor={"pink"}
        height={"100%"}
        width={"100%"}
        padding={0}
        gap={4}
      >
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
          sx={{
            backgroundColor: "white",
            border: "1px solid lightgray",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <TransactionList />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
