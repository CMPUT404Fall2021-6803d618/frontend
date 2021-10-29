import React, { FC } from "react";
import { Author } from "shared/interfaces";

export interface LikeInbox {
  summary: string;
  author: Author;
  object: string;
}

interface IProps {
  item: LikeInbox;
}

const LikeInboxItem: FC<IProps> = (props) => {
  const { item } = props;
  return (
    <div>
      <span>Type: Like</span>
      <span>Liked by {item.author.displayName}</span>
      <span>{item.object}</span>
    </div>
  );
};

export default LikeInboxItem;
