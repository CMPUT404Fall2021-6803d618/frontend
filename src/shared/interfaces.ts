import { ContentType, Visibility } from "./enums";

export interface Author {
  id: string;
  host: string;
  displayName: string;
  url: string;
  github?: string;
  profileImage?: string;
}

export interface User extends Author {
  username: string;
}

export interface Post {
  id: string;
  title: string;
  source: string;
  origin: string;
  description: string;
  contentType: ContentType;
  content: string;
  author: Author;
  categories: string[];
  count: number;
  comments: string;
  published: string;
  visibility: Visibility;
  unlisted: boolean;
}
