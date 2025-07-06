import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const Layout: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0f0f0",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
