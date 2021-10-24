import { useAuth } from "hooks/AuthHook";
import React, { Suspense, FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { IRoute } from "./routes";

const RouteWithSubRoutes: FC<IRoute> = (props) => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={props.fallback}>
      <Route
        path={props.path}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        render={() =>
          props.redirect ? (
            <Redirect to={props.redirect} />
          ) : props.private ? (
            isAuthenticated ? (
              props.component && <props.component {...props} routes={props.routes} />
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            props.component && <props.component {...props} routes={props.routes} />
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
