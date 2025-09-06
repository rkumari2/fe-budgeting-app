import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import DarkModeSwitch from "./DarkModeSwitch";

interface Props {}

const NavigationBar: FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();

  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        sx={{
          backgroundColor: theme.palette.background.paper,
          // borderRight: `4px solid ${theme.palette.background.paper}`,
          padding: "32px 16px",
          height: "100%",
        }}
        gap={2}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Budgeting App
        </Typography>
        <Stack direction={"column"} spacing={4}>
          <Box
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "underline",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <Typography>Home</Typography>
          </Box>

          <Box
            onClick={() => navigate("/add")}
            sx={{
              cursor: "pointer",
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "underline",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <Typography>Add Transaction</Typography>
          </Box>
          <Divider sx={{ backgroundColor: theme.palette.text.secondary }} />
        </Stack>
        <Stack
          direction={"column"}
          spacing={4}
          justifyContent={"end"}
          alignItems={"start"}
          flex={0.8}
        >
          <DarkModeSwitch checked={mode === "dark"} onChange={toggleMode} />
          <Box
            onClick={() => navigate("/profile")}
            sx={{
              cursor: "pointer",
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "underline",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <Typography>Profile</Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default NavigationBar;
