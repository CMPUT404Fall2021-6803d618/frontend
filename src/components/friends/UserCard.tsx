import React, { FC, MouseEvent, useCallback } from "react";

interface UserCardProps {
  id: string;
  userName: string;
  displayName: string;
  isFollowed: boolean;
  onFollowerRemove?: (id: string) => Promise<void>;
  onFollow?: (id: string) => Promise<void>;
  onUnfollow?: (id: string) => Promise<void>;
}

const UserCard: FC<UserCardProps> = (props) => {
  const {
    id,
    userName,
    displayName,
    isFollowed,
    onFollowerRemove,
    onFollow,
    onUnfollow,
  } = props;

  const handleRemoveFollower = useCallback(
    async (_e: MouseEvent<HTMLButtonElement>) => {
      await onFollowerRemove?.(id);
    },
    [id, onFollowerRemove]
  );

  const handleFollowClick = useCallback(
    async (_e: MouseEvent<HTMLButtonElement>) => {
      if (isFollowed) {
        await onUnfollow?.(id);
      } else {
        await onFollow?.(id);
      }
    },
    [id, isFollowed, onFollow, onUnfollow]
  );

  return (
    <div className="col-4" key={id}>
      <div>
        <div>{userName}</div>
        <div>{displayName}</div>
      </div>
      <button onClick={handleFollowClick}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
      {onFollowerRemove && (
        <button onClick={handleRemoveFollower}>Remove</button>
      )}
    </div>
  );
};

export default UserCard;
