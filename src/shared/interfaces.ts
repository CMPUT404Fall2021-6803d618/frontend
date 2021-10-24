export interface Author {
  id: string;
  host: string;
  displayName: string;
  url: string;
  github?: string;
}

export interface User extends Author {
  username: string;
}
