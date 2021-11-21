import { createTheme } from "@material-ui/core";

declare module "@material-ui/styles" {
  interface Theme {
    palette: {
      red?: string;
      green?: string;
      orange?: string;
      blue?: string;
      purple?: string;
      cyan?: string;
      white?: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette: {
      red?: string;
      green?: string;
      orange?: string;
      blue?: string;
      purple?: string;
      cyan?: string;
      white?: string;
    };
  }
}

export default createTheme({
  palette: {
    red: "e06c75",
    mode: "dark",
    background: {
      paper: "#282c34",
      default: "#282c34",
    },
    primary: {
      light: "#282c34",
      dark: "#3E4452",
      main: "#3E4452",
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
      secondary: "#282c34",
    },
  },
});
