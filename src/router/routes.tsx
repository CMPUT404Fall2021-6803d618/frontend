import React, { ReactNode, LazyExoticComponent } from "react";
import { views } from "./views";
import { paths } from "./paths";

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<any>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
  // App bar title
  appBarTitle?: string;
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    redirect: paths.HOME,
    fallback: <div> Loading... </div>,
  },
  {
    path: paths.HOME,
    component: views.HomeView,
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
    appBarTitle: "Home",
  },
];
