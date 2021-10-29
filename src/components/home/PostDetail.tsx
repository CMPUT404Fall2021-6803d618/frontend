import { Divider } from "@material-ui/core";
import Loading from "components/common/components/Loading";
import { withParamId } from "decorators/withParamId";
import { useAuthStore } from "hooks/AuthStoreHook";
import useComment from "hooks/CommentHook";
import usePost from "hooks/PostHook";
import React, { FC, useState, useEffect, useCallback, ChangeEvent } from "react";
import { Comment, Post } from "shared/interfaces";
import styled from "styled-components";
import { formatDate } from "utils";

const Container = styled.div`
  display: flex;
  flex: 1;

  & > div {
    flex: 1;
  }
`;

const Description = styled.h3`
  font-style: italic;
`;

const Content = styled.div`
  margin: 2rem 0;
`;

const StatsContainer = styled.div`
  margin: 2rem 0;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    margin-left: 0.5rem;
  }
`;

const CommentsContainer = styled.div`
  margin: 2rem 0;
`;

interface IProps {
  id: string;
}

const PostDetail: FC<IProps> = (props) => {
  const { id } = props;
  const { user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState<Comment[] | null>(null);
  const { getPostById } = usePost(user);
  const { getComments, sendComment } = useComment(user);
  const isPostAuthor = user?.id === post?.author.id;

  useEffect(() => {
    getPostById(id).then((data) => setPost(data));
  }, [getPostById, id]);

  useEffect(() => {
    getComments(id).then((data) => setComments(data));
  }, [getComments, id]);

  const handleSendComment = useCallback(async () => {
    if (commentValue !== "" && post !== null && comments !== null) {
      const comment = await sendComment(post.id, commentValue);
      comment && setComments([comment, ...comments]);
    }
  }, [commentValue, comments, post, sendComment]);

  const handleCommentValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.currentTarget.value);
  }, []);

  const renderComments = useCallback(() => {
    if (comments === null) {
      return <Loading />;
    } else if (comments.length === 0) {
      return <span>No comments</span>;
    } else {
      return comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.author.displayName}</div>
          <div>{comment.comment}</div>
        </div>
      ));
    }
  }, [comments]);

  const render = useCallback(() => {
    if (post === null) {
      return <Loading />;
    } else {
      return (
        <div>
          {user && <span>Logged in as {user.displayName}</span>}
          <h1>{post.title}</h1>
          <Description>{post.description}</Description>
          <div>
            By {post.author.displayName} on {formatDate(post.published)}
          </div>
          <Content>{post.content}</Content>
          <Divider />
          <StatsContainer>
            <LikeContainer>
              <button>Like</button>
              <div>0</div>
            </LikeContainer>
          </StatsContainer>
          <Divider />
          <CommentsContainer>
            <h3>Comments</h3>
            {isPostAuthor && (
              <div>
                <input type="text" value={commentValue} onChange={handleCommentValueChange} />
                <button onClick={handleSendComment} disabled={commentValue === ""}>
                  Send
                </button>
              </div>
            )}
            {renderComments()}
          </CommentsContainer>
        </div>
      );
    }
  }, [commentValue, handleCommentValueChange, handleSendComment, isPostAuthor, post, renderComments, user]);

  return <Container className="container">{render()}</Container>;
};

export default withParamId(PostDetail);