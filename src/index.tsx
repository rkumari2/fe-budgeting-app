import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MonthProvider } from "./context/MonthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import "./index.css";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MonthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProviderWrapper>
            <App />
          </ThemeProviderWrapper>
        </LocalizationProvider>
      </MonthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
