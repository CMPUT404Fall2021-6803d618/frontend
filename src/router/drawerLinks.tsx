import { paths } from "./paths";

export interface DrawerLink {
  path: string;
  name: string;
  wip?: boolean;
}

export const HOME: DrawerLink = {
  path: paths.HOME,
  name: "Home",
};

export const MAIN_LIST: DrawerLink[] = [HOME];

export const LINK_LIST: DrawerLink[][] = [MAIN_LIST];
