import { ContentType, Visibility } from "shared/enums";
import { PostObject } from "shared/interfaces";
import { axios } from "utils/axios";

export interface PostPayload {
  title: string;
  description: string;
  contentType: ContentType;
  content: string;
  visibility: Visibility;
  unlisted: boolean;
}

interface IPostService {
  createPost: (authorId: string, payload: PostPayload) => Promise<PostObject>;
  getPosts: (authorId: string) => Promise<PostObject[]>;
  getPostById: (postId: string) => Promise<PostObject>;
  updatePost: (postId: string, payload: PostPayload) => Promise<PostObject>;
  deletePost: (postId: string) => Promise<void>;
}

export class PostService implements IPostService {
  public async getPosts(authorId: string): Promise<PostObject[]> {
    const { data } = await axios.get(`${authorId}posts/`);
    return data.items;
  }

  public async createPost(authorId: string, payload: PostPayload): Promise<PostObject> {
    const { data } = await axios.post(`${authorId}posts/`, {
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
    const { data } = await axios.post(`${authorId}posts/${postId}`, {
      ...payload,
    });
    return data;
  }
}
