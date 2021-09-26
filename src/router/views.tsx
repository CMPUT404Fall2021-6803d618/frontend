import { lazy } from "react";

const LoginView = lazy(() => import("components/login/Login"));
const RegisterView = lazy(() => import("components/login/Register"));

const HomeView = lazy(() => import("components/home/Home"));

export const views = {
  LoginView,
  RegisterView,
  HomeView,
};
