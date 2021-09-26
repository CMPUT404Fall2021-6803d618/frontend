export interface User {
  id: string;
  username: Username;
  email: string;
}

export interface Username {
  name: string;
  tag: number;
}

export interface FormattedUsername {
  name: string;
  tag: string;
}
