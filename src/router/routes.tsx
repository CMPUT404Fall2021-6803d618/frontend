/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, LazyExoticComponent } from "react";
import { views } from "./views";
import { paths } from "./paths";
import Loading from "components/common/components/Loading";

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
    fallback: <Loading />,
  },
  {
    path: paths.HOME,
    component: views.HomeView,
    exact: true,
    private: true,
    fallback: <Loading />,
    appBarTitle: "Home",
  },
  {
    path: paths.SOCIAL,
    component: views.SocialView,
    exact: true,
    private: true,
    fallback: <Loading />,
    appBarTitle: "Social",
  },
  {
    path: paths.INBOX,
    component: views.InboxView,
    exact: true,
    private: true,
    fallback: <Loading />,
    appBarTitle: "Inbox",
  },
  {
    path: paths.POST_CREATE,
    component: views.CreatePostView,
    exact: true,
    private: true,
    fallback: <Loading />,
    appBarTitle: "Create Post",
  },
  // {
  //   path: paths.POST_DETAIL,
  //   component: views.PostDetailView,
  //   exact: true,
  //   private: false,
  //   fallback: <Loading />,
  //   appBarTitle: "Posts",
  // },
  {
    path: paths.PROFILE,
    component: views.ProfileView,
    exact: true,
    private: false,
    fallback: <Loading />,
    appBarTitle: "Profile",
  },
];
