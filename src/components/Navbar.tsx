import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

interface Props {}

const NavigationBar: FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          backgroundColor: "black",
          padding: "18px 60px",
        }}
      >
        <Stack direction={"row"} flex={1} spacing={4}>
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
            <Typography>Add</Typography>
          </Box>
        </Stack>

        <Stack flex={1}>
          <SearchBar placeholder="Search" value="" onChange={() => null} />
        </Stack>
      </Stack>
    </>
  );
};

export default NavigationBar;
