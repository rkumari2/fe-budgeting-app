import { Box, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface Props {}

const Layout: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          height: "100vh",
          width: "100vw",
        }}
        gap={0}
      >
        <Box
          sx={{
            width: "15%",
            height: "100%",
          }}
        >
          <Navbar />
        </Box>
        <Box
          sx={{
            width: "85%",
            padding: 4,
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default Layout;
