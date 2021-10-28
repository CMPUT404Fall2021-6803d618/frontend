import React, { FunctionComponent, useEffect, useState } from "react";
import Shell from "components/shell/Shell";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "hooks/AuthHook";
import Login from "components/login/Login";
import Register from "components/login/Register";
import Profile from "components/profile/Profile";
import Loading from "components/common/components/Loading";
import NotFound from "components/404/NotFound";

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
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/profile/:id" exact component={Profile} />
      <Route path="/404" component={NotFound} />
      <Route path="/" component={Shell} />
    </Switch>
  );
};

export default App;
