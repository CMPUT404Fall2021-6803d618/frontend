import { ContentType, Visibility } from "./enums";

export interface BaseObject {
  id: string;
  type: string;
  url: string;
}

export interface Likeable {
  liked: boolean;
  likeCount?: number;
}

export interface Author {
  id: string;
  host: string;
  displayName: string;
  url: string;
  github?: string;
  profileImage?: string;
  profileColor?: string;
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
  is_github: boolean;
}

export interface Post extends PostObject, Likeable {}

export interface FollowingData {
  object: Author;
  status: "PENDING" | "ACCEPTED";
  actor: Author;
  summary: string;
  inbox_object: string;
}

export interface CommentObject extends BaseObject {
  author: Author;
  comment: string;
  contentType: ContentType.PLAIN_TEXT | ContentType.MARKDOWN;
  published: string;
}

export interface Comment extends CommentObject, Likeable {}

export interface Like {
  summary: string;
  author: Author;
  object: string;
}

export interface Node {
  id: number;
  name: string;
}
