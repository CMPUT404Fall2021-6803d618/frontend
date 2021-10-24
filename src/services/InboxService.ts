import { Author } from "shared/interfaces";
import { axios } from "utils/axios";

interface IInboxService {
  getInbox: (authorId: string) => Promise<Record<string, string>[]>;
  sendLike: (authorId: string, payload: LikePayload) => Promise<void>;
}

interface LikePayload {
  summary: string;
  author: Author;
  object: string;
}

export class InboxService implements IInboxService {
  public async getInbox(authorId: string): Promise<Record<string, string>[]> {
    const { data } = await axios.get(`${authorId}inbox`);
    return data.items;
  }

  public async sendLike(authorId: string, payload: LikePayload): Promise<void> {
    const { author, summary, object } = payload;

    await axios.post(`${authorId}inbox`, {
      summary,
      object,
      author: {
        ...author,
        type: "author",
      },
      type: "like",
    });
  }
}
