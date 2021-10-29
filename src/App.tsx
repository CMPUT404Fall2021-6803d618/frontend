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

const App: FunctionComponent = () => {
  const { renewToken, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <Switch>
      <Route path={paths.LOGIN} exact component={Login} />
      <Route path={paths.REGISTER} exact component={Register} />
      <Route path={paths.PROFILE} exact component={Profile} />
      <Route path={paths.POST_DETAIL} exact component={PostDetail} />
      <Route path="/404" component={NotFound} />
      <Route path="/" component={Shell} />
    </Switch>
  );
};

export default App;
