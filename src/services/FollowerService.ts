import { Author } from "shared/interfaces";
import { axios } from "utils/axios";

interface IFollowService {
  getFollowers: (authorId: string) => Promise<Author[]>;
  getFollowStatus: (authorId: string, foreignAuthorId: string) => Promise<boolean>;
  addFollower: (authorId: string, data: Author) => Promise<void>;
  removeFollower: (authorId: string, foreignAuthorId: string) => Promise<void>;
  getSentFollowRequests: (authorId: string) => Promise<Author[]>;
}

interface Endpoints {
  LIST_FOLLOWERS: (authorId: string) => string;
  FOLLOWERS: (authorId: string, foreignAuthorId: string) => string;
  LIST_FOLLOW_REQUESTS: (authorId: string) => string;
  FOLLOW_REQUESTS: (authorId: string, foreignAuthorId: string) => string;
}

export class FollowService implements IFollowService {
  private endpoints: Endpoints;
  constructor() {
    this.endpoints = {
      LIST_FOLLOWERS: (authorId: string) => `${authorId}followers/`,
      FOLLOWERS: (authorId: string, foreignAuthorId: string) => `${authorId}followers/${foreignAuthorId}`,
      LIST_FOLLOW_REQUESTS: (authorId: string) => `${authorId}friend-requests/`,
      FOLLOW_REQUESTS: (authorId: string, foreignAuthorId: string) => `${authorId}friend-request/${foreignAuthorId}`,
    };
  }

  public async getFollowers(authorId: string): Promise<Author[]> {
    const { data } = await axios.get(this.endpoints.LIST_FOLLOWERS(authorId));
    return data.items;
  }

  public async getFollowStatus(authorId: string, foreignAuthorId: string): Promise<boolean> {
    try {
      await axios.get(this.endpoints.FOLLOWERS(authorId, foreignAuthorId));
      return true;
    } catch (err) {
      return false;
    }
  }

  public async addFollower(authorId: string, data: Author): Promise<void> {
    await axios.post(this.endpoints.FOLLOWERS(authorId, data.id), {
      type: "author",
      ...data,
    });
  }

  public async removeFollower(authorId: string, foreignAuthorId: string): Promise<void> {
    await axios.delete(this.endpoints.FOLLOWERS(authorId, foreignAuthorId));
  }

  public async sendFollowRequest(authorId: string, foreignAuthorId: string): Promise<void> {
    await axios.post(this.endpoints.FOLLOW_REQUESTS(authorId, foreignAuthorId));
  }

  public async getSentFollowRequests(authorId: string): Promise<Author[]> {
    const { data } = await axios.get(this.endpoints.LIST_FOLLOW_REQUESTS(authorId));
    return data.items;
  }
}
