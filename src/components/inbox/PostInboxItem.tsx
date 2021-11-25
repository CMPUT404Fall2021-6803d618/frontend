import React, { FC, useCallback } from "react";
import { Post } from "shared/interfaces";
import NotificationCard from "./NotificationCard";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility } from "shared/enums";

interface IProps {
  item: Post;
  index: number;
}

const PostInboxItem: FC<IProps> = (props) => {
  const { item, index } = props;

  const getText = useCallback(() => {
    if (item.visibility === Visibility.PUBLIC) {
      return `${item.author.displayName} just posted a new post titled ${item.title}!`;
    } else {
      return `${item.author.displayName} just shared a post titled ${item.title} with you!`;
    }
  }, []);

  return (
    <NotificationCard
      index={index}
      text={getText()}
      Icon={EmailIcon}
      buttons={[
        {
          text: "Go to post",
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

export default PostInboxItem;
