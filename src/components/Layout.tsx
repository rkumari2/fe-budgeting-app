import { Box, Stack } from "@mui/material";
import { FunctionComponent, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: FunctionComponent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.style.transform = "translateZ(0)";
    }
  }, []);

  return (
    <Stack
      direction="row"
      sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <Box
        sx={{
          width: "15%",
          height: "100%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Navbar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          ref={scrollRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingTop: 4,
            paddingBottom: 4,
            paddingX: 4,
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

export default Layout;
