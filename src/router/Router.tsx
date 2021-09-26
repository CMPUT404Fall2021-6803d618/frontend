import React, { FunctionComponent } from "react";
import { Switch } from "react-router";
import { IRoute } from "./routes";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

interface IProps {
  routes: IRoute[];
}

const Router: FunctionComponent<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route: IRoute) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  );
};

export default Router;
