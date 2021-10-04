import React, { FC, MouseEvent, useCallback } from "react";

interface UserCardProps {
  id: string;
  userName: string;
  displayName: string;
  isFollowed: boolean;
  onFollowerRemove?: (id: string) => Promise<void>;
}

const UserCard: FC<UserCardProps> = (props) => {
  const { id, userName, displayName, isFollowed, onFollowerRemove } = props;

  const handleRemoveFollower = useCallback(
    async (_e: MouseEvent<HTMLButtonElement>) => {
      await onFollowerRemove?.(id);
    },
    [id, onFollowerRemove]
  );

  return (
    <div className="col-4" key={id}>
      <div>
        <div>{userName}</div>
        <div>{displayName}</div>
      </div>
      <button disabled={isFollowed}>
        {isFollowed ? "Followed" : "Follow"}
      </button>
      {onFollowerRemove && (
        <button onClick={handleRemoveFollower}>Remove</button>
      )}
    </div>
  );
};

export default UserCard;
