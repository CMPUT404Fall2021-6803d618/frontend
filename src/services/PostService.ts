import { ContentType, Visibility } from "shared/enums";
import { Author, PostObject } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";
import { BaseService, PaginateResponse } from "./BaseService";

export interface PostPayload {
  title: string;
  description: string;
  contentType: ContentType;
  content: string;
  visibility: Visibility;
  unlisted: boolean;
  friends?: Author[];
}

interface IPostService {
  createPost: (authorId: string, payload: PostPayload) => Promise<PostObject>;
  getPosts: (authorId: string) => Promise<PostObject[]>;
  getPostById: (postId: string) => Promise<PostObject>;
  updatePost: (postId: string, payload: PostPayload) => Promise<PostObject>;
  deletePost: (postId: string) => Promise<void>;
  getStreamPosts: (authorId: string, page: number) => Promise<Pick<PaginateResponse<PostObject>, "count" | "items">>;
}

export class PostService extends BaseService<PostObject> implements IPostService {
  // private getPostId(id: string): string {
  //   const decoded = decodeURIComponent(id);
  //   const url = new URL(decoded);
  //   const baseUrl = new URL(BASE_URL);

  //   if (url.host === baseUrl.host) {
  //     return extractIdFromUrl(url.pathname);
  //   } else {
  //     return encodeURIComponent(decoded);
  //   }
  // }

  public async getPosts(authorId: string): Promise<PostObject[]> {
    const { data } = await axios.get(`${formatId(authorId)}/posts/`);
    return data.items;
  }

  public async createPost(authorId: string, payload: PostPayload): Promise<PostObject> {
    const { data } = await axios.post(`${formatId(authorId)}/posts/`, {
      ...payload,
    });
    return data;
  }

  public async getPostById(postId: string): Promise<PostObject> {
    const { data } = await axios.get(decodeURIComponent(postId));
    return data;
  }

  public async updatePost(postId: string, payload: PostPayload): Promise<PostObject> {
    const { data } = await axios.post(postId, {
      ...payload,
    });
    return data;
  }

  public async deletePost(postId: string): Promise<void> {
    await axios.delete(postId);
  }

  public async createPostWithId(authorId: string, postId: string, payload: PostPayload): Promise<PostObject> {
    const { data } = await axios.post(`${authorId}posts/${formatId(postId)}/`, {
      ...payload,
    });
    return data;
  }

  public async sharePostToFriends(postId: string, friends: Author[]): Promise<void> {
    await axios.post(`${formatId(postId)}/share/friends/`, {
      friends,
    });
  }

  public async sharePostToFollowers(postId: string): Promise<void> {
    await axios.post(`${formatId(postId)}/share/followers/`);
  }

  public async getStreamPosts(
    authorId: string,
    page: number
  ): Promise<Pick<PaginateResponse<PostObject>, "count" | "items">> {
    const { count, items } = await this.getPaginate(`${authorId}stream/`, page);
    return { count, items };
  }
}
