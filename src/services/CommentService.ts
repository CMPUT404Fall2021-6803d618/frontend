import { ContentType } from "shared/enums";
import { Author, CommentObject } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";
import { BaseService } from "./BaseService";

interface ICommentService {
  getComments: (postId: string) => Promise<CommentObject[]>;
  sendComment: (postId: string, author: Author, comment: string) => Promise<CommentObject>;
}

export default class CommentService extends BaseService<CommentObject> implements ICommentService {
  public async getComments(postId: string): Promise<CommentObject[]> {
    const id = decodeURIComponent(postId);
    const data = await this.getAll(`${formatId(id)}/comments/`, "comments");
    return data;
  }

  public async sendComment(
    postId: string,
    author: Author,
    comment: string
  ): Promise<CommentObject> {
    const id = decodeURIComponent(postId);
    const { data } = await axios.post(`${formatId(id)}/comments/`, {
      author,
      comment,
      contentType: ContentType.PLAIN_TEXT,
    });
    return data;
  }
}
