import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  title: string;
  amount: string;
}

const AmountCard: FunctionComponent<Props> = (props: Props) => {
  const { title, amount } = props;
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundColor: "white",
        padding: "18px 60px",
        border: "1px solid lightgray",
        borderRadius: "8px",
      }}
      width={"10%"}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h6">{amount}</Typography>
    </Stack>
  );
};

export default AmountCard;
