import { BASE_URL } from "shared/constants";
import { Author, BaseObject, Like, Post } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";

interface ILikeService {
  getLikes: (id: string) => Promise<Like[]>;
  getLiked: (authorId: string) => Promise<Like[]>;
  sendLike: (sender: Author, receiver: Author, object: string, type: string) => Promise<Like>;
}

export default class LikeService implements ILikeService {
  public async getLikes(id: string): Promise<Like[]> {
    const { data } = await axios.get(`${formatId(id)}/likes/`);
    return data;
  }

  public async getLiked(authorId: string): Promise<Like[]> {
    const { data } = await axios.get(`${formatId(authorId)}/liked/`);
    return data.items;
  }

  public async sendLike(
    sender: Author,
    receiver: Author,
    object: string,
    type: string
  ): Promise<Like> {
    const payload = {
      type: "like",
      summary: `${sender.displayName} liked ${receiver.displayName} ${type.toLowerCase()}`,
      author: sender,
      object: object,
    };
    await axios.post(`${formatId(sender.id)}/liked/`, payload);
    return {
      summary: payload.summary,
      author: payload.author,
      object: payload.object,
    };
  }
}
