/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";
import { BaseService } from "./BaseService";

interface IInboxService {
  getInbox: (authorId: string) => Promise<Record<string, any>[]>;
  sendLike: (authorId: string, payload: LikePayload) => Promise<void>;
  deleteInboxItem: (authorId: string, id: string) => Promise<void>;
}

interface LikePayload {
  summary: string;
  author: Author;
  object: string;
}

export class InboxService extends BaseService<Record<string, any>> implements IInboxService {
  public async getInbox(authorId: string): Promise<Record<string, any>[]> {
    return this.getAll(`${formatId(authorId)}/inbox/`);
  }

  public async sendLike(authorId: string, payload: LikePayload): Promise<void> {
    const { author, summary, object } = payload;

    await axios.post(`${formatId(authorId)}/inbox`, {
      summary,
      object,
      author: {
        ...author,
        type: "author",
      },
      type: "like",
    });
  }

  public async deleteInboxItem(authorId: string, id: string): Promise<void> {
    await axios.delete(`${formatId(authorId)}/inbox/${id}/`);
  }
}
