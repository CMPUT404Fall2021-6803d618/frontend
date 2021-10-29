import { ContentType } from "shared/enums";
import { Author, Comment } from "shared/interfaces";
import { formatId } from "utils";
import { axios } from "utils/axios";

interface ICommentService {
  getComments: (postId: string) => Promise<Comment[]>;
}

export default class CommentService implements ICommentService {
  public async getComments(postId: string): Promise<Comment[]> {
    const id = decodeURIComponent(postId);
    const { data } = await axios.get(`${formatId(id)}/comments/`);
    return data.comments;
  }

  public async sendComment(postId: string, author: Author, comment: string): Promise<Comment> {
    const id = decodeURIComponent(postId);
    const { data } = await axios.post(`${formatId(id)}/comments/`, {
      author,
      comment,
      contentType: ContentType.PLAIN_TEXT,
    });
    return data;
  }
}
