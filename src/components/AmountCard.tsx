import { Stack, Typography, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  title: string;
  amount: number | undefined;
}

const AmountCard: FunctionComponent<Props> = (props: Props) => {
  const { title, amount } = props;
  const theme = useTheme();

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: "18px 60px",
        border: `1px solid ${theme.palette.background.paper}`,
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
