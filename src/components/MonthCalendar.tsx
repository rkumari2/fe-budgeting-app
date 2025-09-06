import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  useTheme,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { FunctionComponent, JSX, useState } from "react";
import { useMonth } from "../context/MonthContext";

interface Props {}

const MonthCalendar: FunctionComponent<Props> = (): JSX.Element => {
  const { month, setMonth } = useMonth();
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(
    dayjs.isDayjs(month) ? month : dayjs(month)
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSetPreviousMonth = () => {
    const newMonth = selectedMonth.subtract(1, "month");
    setSelectedMonth(newMonth);
    setMonth(newMonth.format("YYYY-MM"));
  };

  const handleSetNextMonth = () => {
    const newMonth = selectedMonth.add(1, "month");
    setSelectedMonth(newMonth);
    setMonth(newMonth.format("YYYY-MM"));
  };

  const handleOpenCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCalendarClose = () => {
    setAnchorEl(null);
  };

  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  return (
    <>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={handleSetPreviousMonth}
          sx={{ color: theme.palette.primary.main }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Button
          variant="text"
          startIcon={<CalendarMonthIcon />}
          onClick={handleOpenCalendar}
          sx={{ color: theme.palette.primary.main }}
        >
          {selectedMonth.format("MMMM YYYY")}
        </Button>

        <IconButton
          onClick={handleSetNextMonth}
          sx={{ color: theme.palette.primary.main }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCalendarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="month"
          views={["year", "month"]}
          value={selectedMonth}
          onChange={(newMonth) => {
            if (newMonth) {
              setSelectedMonth(newMonth);
              setMonth(newMonth.format("YYYY-MM"));
              setAnchorEl(null);
            }
          }}
          slots={{ actionBar: () => null }}
          sx={{ backgroundColor: theme.palette.background.default }}
        />
        {/* </LocalizationProvider> */}

        <Box
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <button
            onClick={() => {
              const current = dayjs();
              setSelectedMonth(current);
              setMonth(current.format("YYYY-MM"));
              setAnchorEl(null);
            }}
            style={{
              background: "none",
              border: "none",
              color: theme.palette.primary.main,
              cursor: "pointer",
              textDecoration: "underline",
              margin: "10px auto",
            }}
          >
            Current Month
          </button>
        </Box>
      </Popover>
    </>
  );
};

export default MonthCalendar;
