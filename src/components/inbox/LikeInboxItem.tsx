import React, { FC } from "react";
import { Author } from "shared/interfaces";
import NotificationCard from "./NotificationCard";
import FavoriteIcon from "@mui/icons-material/Favorite";

export interface LikeInbox {
  summary: string;
  author: Author;
  object: string;
}

interface IProps {
  item: LikeInbox;
  index: number;
}

const LikeInboxItem: FC<IProps> = (props) => {
  const { item, index } = props;
  const isPost = item.object.includes("posts");
  return (
    <NotificationCard
      index={index}
      text={`${item.author.displayName} liked your ${isPost ? "post" : "comment"}`}
      Icon={FavoriteIcon}
      buttons={[
        {
          text: isPost ? "Go to post" : "Go to comment",
          onClick: () => {
            return;
          },
          variant: "contained",
        },
        {
          text: "Clear",
          onClick: () => {
            return;
          },
          variant: "outlined",
        },
      ]}
    />
  );
};

export default LikeInboxItem;
