import React, { FC } from "react";
import { Post } from "shared/interfaces";

interface IProps {
  item: Post;
}

const PostInboxItem: FC<IProps> = (props) => {
  const { item } = props;
  return (
    <div>
      <span>Type: Post</span>
      <span>Shared by {item.author.displayName}</span>
      <span>Post title: {item.title}</span>
    </div>
  );
};

export default PostInboxItem;
