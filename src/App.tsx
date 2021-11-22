import React, { FunctionComponent, useEffect, useState } from "react";
import Shell from "components/shell/Shell";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "hooks/AuthHook";
import Login from "components/login/Login";
import Register from "components/login/Register";
import Profile from "components/profile/Profile";
import Loading from "components/common/components/Loading";
import NotFound from "components/404/NotFound";
import { paths } from "router/paths";
import PostDetail from "components/home/PostDetail";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";
import { CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

const ResponsiveContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0 0",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 8rem",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 12rem",
  },
}));

const App: FunctionComponent = () => {
  const { renewToken, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    renewToken()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAuthenticated) {
      // eslint-disable-next-line prefer-const
      intervalId = setInterval(renewToken, 1000 * 60 * 14);
    }

    return () => {
      isAuthenticated && clearInterval(intervalId);
    };
  }, [renewToken, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route path={paths.LOGIN} exact component={Login} />
          <Route path={paths.REGISTER} exact component={Register} />
          <Route path={paths.PROFILE} exact component={Profile} />
          <Route path={paths.POST_DETAIL} exact component={PostDetail} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={Shell} />
        </Switch>
      )}
    </ThemeProvider>
  );
};

export default App;
