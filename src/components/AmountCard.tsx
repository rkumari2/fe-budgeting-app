import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  title: string;
  amount: number | undefined;
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
      flex={1}
    >
      <Typography variant="body1">{title}</Typography>
      <Typography variant="body1">£{amount?.toFixed(2)}</Typography>
    </Stack>
  );
};

export default AmountCard;
