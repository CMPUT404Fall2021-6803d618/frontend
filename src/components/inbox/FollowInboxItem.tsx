import React, { FC, useCallback } from "react";
import { FollowingData } from "shared/interfaces";

interface IProps {
  item: FollowingData;
  onAccept: (item: FollowingData) => Promise<void>;
}

const FollowInboxItem: FC<IProps> = (props) => {
  const { item, onAccept } = props;

  const handleAccept = useCallback(async () => {
    await onAccept(item);
  }, [item, onAccept]);

  return (
    <div>
      <span>Type: Follow Request</span>
      <span>{item.actor.displayName} wants to follow you</span>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

export default FollowInboxItem;
