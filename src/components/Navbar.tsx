import { Box, Divider, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const NavigationBar: FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        sx={{
          backgroundColor: "black",
          padding: "32px 16px",
          height: "100%",
        }}
        gap={2}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: "bold", marginBottom: 2 }}
        >
          Budgeting App
        </Typography>
        <Stack direction={"column"} spacing={4}>
          <Box
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            <Typography>Home</Typography>
          </Box>

          <Box
            onClick={() => navigate("/add")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            <Typography>Add Transaction</Typography>
          </Box>
          <Divider sx={{ backgroundColor: "white" }} />
        </Stack>
        <Stack
          direction={"column"}
          spacing={4}
          justifyContent={"end"}
          alignItems={"start"}
          flex={0.8}
        >
          <Typography sx={{ cursor: "pointer", color: "white" }}>
            Dark Mode
          </Typography>
          <Box
            onClick={() => navigate("/profile")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            <Typography>Profile</Typography>
          </Box>
        </Stack>

        {/* <Stack flex={1}>
          <SearchBar placeholder="Search" value="" onChange={() => null} />
        </Stack> */}
      </Stack>
    </>
  );
};

export default NavigationBar;
