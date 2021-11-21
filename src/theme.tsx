import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    colors: {
      black?: string;
      red?: string;
      green?: string;
      yellow?: string;
      blue?: string;
      purple?: string;
      cyan?: string;
      white?: string;
    };
  }

  interface Palette {
    colors: {
      black?: string;
      red?: string;
      green?: string;
      yellow?: string;
      blue?: string;
      purple?: string;
      cyan?: string;
      white?: string;
    };
  }
}

export default createTheme({
  palette: {
    mode: "dark",
    colors: {
      black: "#282c34",
      red: "#e06c75",
      green: "#98c379",
      yellow: "#e5c07b",
      blue: "#61afef",
      purple: "#c678dd",
      cyan: "#56b6c2",
      white: "#abb2bf",
    },
    background: {
      paper: "#282c34",
      default: "#282c34",
    },
    primary: {
      light: "#282c34",
      dark: "#e06c75",
      main: "#e06c75",
    },
    secondary: {
      light: "#61afef",
      dark: "#61afef",
      main: "#61afef",
    },
    warning: {
      main: "#e5c07b",
    },
    error: {
      main: "#e06c75",
    },
    text: {
      primary: "#abb2bf",
      secondary: "#abb2bf",
    },
  },
});
