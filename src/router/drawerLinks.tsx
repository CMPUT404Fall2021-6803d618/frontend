import { paths } from "./paths";

export interface DrawerLink {
  path: string;
  name: string;
  subpath?: string[];
  wip?: boolean;
}

export const HOME: DrawerLink = {
  path: paths.HOME,
  name: "Home",
};

export const SOCIAL: DrawerLink = {
  path: paths.SOCIAL_PEOPLE,
  name: "Social",
  subpath: [paths.SOCIAL_PEOPLE, paths.SOCIAL_FOLLOWERS, paths.SOCIAL_FOLLOWINGS, paths.SOCIAL_FRIENDS],
};

export const INBOX: DrawerLink = {
  path: paths.INBOX,
  name: "Inbox",
};

export const MAIN_LIST: DrawerLink[] = [HOME, SOCIAL, INBOX];

export const LINK_LIST: DrawerLink[][] = [MAIN_LIST];
