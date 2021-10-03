import { lazy } from "react";

const LoginView = lazy(() => import("components/login/Login"));
const RegisterView = lazy(() => import("components/login/Register"));
const HomeView = lazy(() => import("components/home/Home"));
const FriendView = lazy(() => import("components/friends/Friends"));

export const views = {
  LoginView,
  RegisterView,
  HomeView,
  FriendView,
};
