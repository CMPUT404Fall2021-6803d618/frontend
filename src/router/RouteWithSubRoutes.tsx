import Loading from "components/common/components/Loading";
import { useAuth } from "hooks/AuthHook";
import React, { Suspense, FC, useEffect, useCallback } from "react";
import { Redirect, Route } from "react-router-dom";
import { IRoute } from "./routes";

interface IProps extends IRoute {
  onRouteChange: (newPath: string, url: string) => void;
  computedMatch?: {
    path: string;
    url: string;
  };
}

const RouteWithSubRoutes: FC<IProps> = (props) => {
  const { isAuthenticated } = useAuth();
  const { onRouteChange } = props;

  useEffect(() => {
    onRouteChange(props.computedMatch?.path ?? "", props.computedMatch?.url ?? "/");
  }, [onRouteChange, props.computedMatch?.path, props.computedMatch?.url]);

  const render = useCallback(() => {
    if (props.redirect) {
      return <Redirect to={props.redirect} />;
    } else {
      if (props.private) {
        if (isAuthenticated === null) {
          return <Loading />;
        } else if (isAuthenticated === true) {
          return props.component && <props.component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      } else {
        return props.component && <props.component {...props} />;
      }
    }
  }, [isAuthenticated, props]);

  return (
    <Suspense fallback={props.fallback}>
      <Route path={props.path} exact={props.exact} render={render} />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
