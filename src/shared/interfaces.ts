import { ContentType, Visibility } from "./enums";

export interface BaseObject {
  id: string;
  type: string;
}

export interface Likeable {
  liked: boolean;
}

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

export interface ImageObject {
  url: string;
}

export interface PostObject extends BaseObject {
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

export interface Post extends PostObject, Likeable {}

export interface FollowingData {
  object: Author;
  status: "PENDING" | "ACCEPTED";
  actor: Author;
  summary: string;
  inbox_object: string;
}

export interface Comment extends BaseObject {
  author: Author;
  comment: string;
  contentType: ContentType.PLAIN_TEXT | ContentType.MARKDOWN;
  published: string;
}

export interface Like {
  summary: string;
  author: Author;
  object: string;
}
