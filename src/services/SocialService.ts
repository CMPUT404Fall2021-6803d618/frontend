import { BASE_URL } from "shared/constants";
import { Author, FollowingData } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";

interface ISocialService {
  getFollowers: (authorId: string) => Promise<Author[]>;
  addFollower: (authorId: string, data: Author) => Promise<void>;
  removeFollower: (authorId: string, foreignAuthorId: string) => Promise<void>;
  sendFollowRequest: (authorId: string, foreignAuthorId: string) => Promise<void>;
  getFollowings: (authorId: string) => Promise<Following[]>;
  getAuthors: () => Promise<Author[]>;
}

interface Endpoints {
  LIST_AUTHORS: () => string;
  LIST_FOLLOWERS: (authorId: string) => string;
  FOLLOWERS: (authorId: string, foreignAuthorId: string) => string;
  LIST_FOLLOWINGS: (authorId: string) => string;
  FOLLOWINGS: (authorId: string, foreignAuthorId: string) => string;
}

interface Following extends Author {
  status: "PENDING" | "ACCEPTED";
}

export class SocialService implements ISocialService {
  private endpoints: Endpoints;
  constructor() {
    this.endpoints = {
      LIST_AUTHORS: () => `${BASE_URL}/authors/`,
      LIST_FOLLOWERS: (authorId: string) => `${formatId(authorId)}/followers/`,
      FOLLOWERS: (authorId: string, foreignAuthorId: string) =>
        `${formatId(authorId)}/followers/${encodeURIComponent(foreignAuthorId)}`,
      LIST_FOLLOWINGS: (authorId: string) => `${formatId(authorId)}/followings/`,
      FOLLOWINGS: (authorId: string, foreignAuthorId: string) =>
        `${formatId(authorId)}/followings/${encodeURIComponent(foreignAuthorId)}`,
    };
  }

  public async getFollowers(authorId: string): Promise<Author[]> {
    const { data } = await axios.get(this.endpoints.LIST_FOLLOWERS(authorId));
    return data.items;
  }

  public async addFollower(authorId: string, data: Author): Promise<void> {
    await axios.put(this.endpoints.FOLLOWERS(authorId, data.id), {
      type: "author",
      ...data,
    });
  }

  public async removeFollower(authorId: string, foreignAuthorId: string): Promise<void> {
    await axios.delete(this.endpoints.FOLLOWERS(authorId, foreignAuthorId));
  }

  public async sendFollowRequest(authorId: string, foreignAuthorId: string): Promise<void> {
    await axios.post(this.endpoints.FOLLOWINGS(authorId, foreignAuthorId));
  }

  public async getFollowings(authorId: string): Promise<Following[]> {
    const { data } = await axios.get(this.endpoints.LIST_FOLLOWINGS(authorId));
    return data.items.map((item: FollowingData) => {
      const { object, status } = item;
      const { id, host, displayName, url, github } = object;
      return {
        id,
        host,
        displayName,
        url,
        github,
        status,
      };
    });
  }

  public async unfollow(authorId: string, foreignAuthorId: string): Promise<void> {
    await axios.delete(this.endpoints.FOLLOWINGS(authorId, foreignAuthorId));
  }

  public async getAuthors(): Promise<Author[]> {
    const { data } = await axios.get(this.endpoints.LIST_AUTHORS());
    return data.items;
  }
}
