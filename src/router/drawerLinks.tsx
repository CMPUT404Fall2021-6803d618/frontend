import { paths } from "./paths";

export interface DrawerLink {
  path: string;
  name: string;
  subpath?: string[];
  wip?: boolean;
  private: boolean;
}

export const HOME: DrawerLink = {
  path: paths.HOME,
  name: "Home",
  private: true,
};

export const SOCIAL: DrawerLink = {
  path: paths.SOCIAL_PEOPLE,
  name: "Social",
  subpath: [paths.SOCIAL_PEOPLE, paths.SOCIAL_FOLLOWERS, paths.SOCIAL_FOLLOWINGS, paths.SOCIAL_FRIENDS],
  private: true,
};

export const INBOX: DrawerLink = {
  path: paths.INBOX_NOTIFICATIONS,
  name: "Inbox",
  subpath: [paths.INBOX_NOTIFICATIONS, paths.INBOX_FOLLOW_REQUESTS],
  private: true,
};

export const MAIN_LIST: DrawerLink[] = [HOME, SOCIAL, INBOX];

export const LINK_LIST: DrawerLink[][] = [MAIN_LIST];
