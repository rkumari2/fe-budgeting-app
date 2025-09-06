import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      coral: string;
      pink: string;
      lightPurple: string;
      purple: string;
      lightBlue: string;
      darkBlue: string;
      teal: string;
      yellow: string;
      blue: string;
      white: string;
      green: string;
      red: string;
      buttonText: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      coral: string;
      pink: string;
      purple: string;
      lightBlue: string;
      darkBlue: string;
      teal: string;
      yellow: string;
      blue: string;
      white: string;
      green: string;
      red: string;
      buttonText: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#FFFEFE", paper: "#35005D" },
    text: { primary: "#222222", secondary: "#FFFEFE" },
    primary: { main: "#FB6F92" },
    customColors: {
      coral: "#E7585F",
      pink: "#AF1D60",
      purple: "#944BBB",
      lightBlue: "#3F37C9",
      darkBlue: "#000174",
      teal: "#00737D",
      yellow: "#F9DC5C",
      blue: "#0077B6",
      white: "#FFFFFF",
      green: "#0A7E0A",
      red: "#A90101",
      buttonText: "#222222",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#222222",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#A885D8" },
    text: { primary: "#F5F5F5", secondary: "#121212" },
    primary: { main: "#FAC2CC" },
    customColors: {
      coral: "#FF9AA2",
      pink: "#F284B7",
      purple: "#C77DFF",
      lightBlue: "#758BFF",
      darkBlue: "#4A4AFF",
      teal: "#5DD6D0",
      yellow: "#FFD166",
      blue: "#4CC9F0",
      white: "#FFFFFF",
      green: "#58E558",
      red: "#EC6E6E",
      buttonText: "#222222",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#F5F5F5", // force dark label color
        },
      },
    },
  },
});
