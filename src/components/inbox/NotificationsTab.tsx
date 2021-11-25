import ListContainer from "components/common/components/ListContainer";
import Loading from "components/common/components/Loading";
import React, { FC, useCallback } from "react";
import { InboxItemType } from "shared/enums";
import { Post } from "shared/interfaces";
import LikeInboxItem, { LikeInbox } from "./LikeInboxItem";
import PostInboxItem from "./PostInboxItem";

interface IProps {
  items: Record<string, any>[] | null;
}

const NotificationsTab: FC<IProps> = (props) => {
  const { items } = props;

  const render = useCallback(() => {
    if (items === null) {
      return <Loading />;
    } else if (items?.length === 0) {
      return <div>No new notifications</div>;
    } else {
      return items.map((item, index) => {
        let type: string = item.type;
        type = type?.toLowerCase?.();
        if (type) {
          if (type === InboxItemType.LIKE) {
            return <LikeInboxItem item={item as LikeInbox} index={index} />;
          } else if (type === InboxItemType.POST) {
            return <PostInboxItem item={item as Post} index={index} />;
          } else {
            return <div>Invalid inbox item</div>;
          }
        } else {
          return <div>Invalid inbox item</div>;
        }
      });
    }
  }, [items]);

  return <ListContainer>{render()}</ListContainer>;
};

export default NotificationsTab;
