import { useAuth } from "hooks/AuthHook";
import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { IRoute } from "./routes";
const RouteWithSubRoutes = (route: IRoute) => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props: any) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            isAuthenticated ? (
              route.component && <route.component {...props} routes={route.routes} />
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            route.component && <route.component {...props} routes={route.routes} />
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
