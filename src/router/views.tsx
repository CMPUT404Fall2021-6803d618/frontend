import { lazy } from "react";

const LoginView = lazy(() => import("components/login/Login"));
const RegisterView = lazy(() => import("components/login/Register"));
const HomeView = lazy(() => import("components/home/Home"));
const SocialView = lazy(() => import("components/social/Social"));
const ProfileView = lazy(() => import("components/profile/Profile"));

export const views = {
  LoginView,
  RegisterView,
  HomeView,
  SocialView,
  ProfileView,
};
