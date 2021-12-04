import { lazy } from "react";

const LoginView = lazy(() => import("components/login/Login"));
const RegisterView = lazy(() => import("components/login/Register"));
const HomeView = lazy(() => import("components/home/Home"));
const SocialView = lazy(() => import("components/social/Social"));
const ProfileView = lazy(() => import("components/profile/Profile"));
const InboxView = lazy(() => import("components/inbox/Inbox"));
const CreatePostView = lazy(() => import("components/home/CreatePost"));
// const PostDetailView = lazy(() => import("components/home/PostDetail"));

export const views = {
  LoginView,
  RegisterView,
  HomeView,
  SocialView,
  ProfileView,
  InboxView,
  CreatePostView,
  // PostDetailView,
};
