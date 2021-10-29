import React, { FC } from "react";
import { FollowingData } from "shared/interfaces";

interface IProps {
  item: FollowingData;
}

const FollowInboxItem: FC<IProps> = (props) => {
  const { item } = props;
  return (
    <div>
      <span>Type: Follow Request</span>
      <span>{item.actor.displayName} wants to follow you</span>
    </div>
  );
};

export default FollowInboxItem;
