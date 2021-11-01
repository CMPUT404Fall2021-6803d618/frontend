import Loading from "components/common/components/Loading";
import useInbox from "hooks/InboxHook";
import React, { FC, useCallback } from "react";
import { FollowingData, Post } from "shared/interfaces";
import FollowInboxItem from "./FollowInboxItem";
import LikeInboxItem, { LikeInbox } from "./LikeInboxItem";
import PostInboxItem from "./PostInboxItem";

enum InboxItemType {
  FOLLOW = "follow",
  LIKE = "like",
  POST = "post",
}

const Inbox: FC = () => {
  const { items, handleAcceptFollowRequest } = useInbox();

  const render = useCallback(() => {
    if (items === null) {
      return <Loading />;
    } else if (items?.length === 0) {
      return <div>No inbox</div>;
    } else {
      return items?.map((item) => {
        let type: string = item.type;
        type = type?.toLowerCase?.();
        if (type) {
          if (type === InboxItemType.FOLLOW) {
            return <FollowInboxItem item={item as FollowingData} onAccept={handleAcceptFollowRequest} />;
          } else if (type === InboxItemType.LIKE) {
            return <LikeInboxItem item={item as LikeInbox} />;
          } else if (type === InboxItemType.POST) {
            return <PostInboxItem item={item as Post} />;
          } else {
            return <div>Invalid inbox item</div>;
          }
        } else {
          return <div>Invalid inbox item</div>;
        }
      });
    }
  }, [handleAcceptFollowRequest, items]);

  return <div>{render()}</div>;
};

export default Inbox;
