import React, { FC, MouseEvent, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { FollowStatus } from "hooks/SocialHook";

// Styling Card/CardContent/CardActions
const StyledCard = styled(Card)`
  height: fit-content;
  margin-bottom: 10px;
`;

const StyledCardContent = styled(CardContent)`
  text-align: center;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-evenly;
`;

interface UserCardProps {
  id: string;
  displayName: string;
  followStatus: FollowStatus;
  onFollowerRemove?: (id: string) => Promise<void>;
  onFollow?: (id: string) => Promise<void>;
  onUnfollow?: (id: string) => Promise<void>;
}

const UserCard: FC<UserCardProps> = (props) => {
  const { id, displayName, followStatus, onFollowerRemove, onFollow, onUnfollow } = props;

  const handleRemoveFollower = useCallback(
    async (_e: MouseEvent<HTMLButtonElement>) => {
      await onFollowerRemove?.(id);
    },
    [id, onFollowerRemove]
  );

  const handleFollowClick = useCallback(
    async (_e: MouseEvent<HTMLButtonElement>) => {
      if (followStatus === FollowStatus.FOLLOWED) {
        await onUnfollow?.(id);
      } else if (followStatus === FollowStatus.NOT_FOLLOWED) {
        await onFollow?.(id);
      }
    },
    [id, followStatus, onFollow, onUnfollow]
  );

  const getFollowText = useCallback(() => {
    if (followStatus === FollowStatus.FOLLOWED) {
      return "Unfollow";
    } else if (followStatus === FollowStatus.NOT_FOLLOWED) {
      return "Follow";
    } else {
      return "Pending";
    }
  }, [followStatus]);

  return (
    <div className="w-full p-2 flex flex-row rounded-md bg-gray-900 text-white shadow-sm text-xs sm:text-sm" key={id}>
      <img
        className="flex-0 h-4 w-4 sm:w-16 sm:h-16 rounded-full my-auto"
        src="https://via.placeholder.com/500?text=User+Profile+Image"
        alt="test"
      />
      {/* information */}
      <div className="flex-1 flex flex-col items-start sm:ml-3">
        <span>{displayName}</span>
        <span>github: https://github.com/TODO</span>
      </div>
      {/* action buttons */}
      <div className="flex-0 flex sm:py-2 flex-row sm:space-x-2">
        <button
          className="text-xs sm:text-sm bg-purple-800 hover:bg-purple-700 text-white
          font-bold py-1 sm:px-2 rounded disabled:opacity-50"
          onClick={handleFollowClick}
          disabled={followStatus === FollowStatus.PENDING}
        >
          {getFollowText()}
        </button>
        <button
          className="text-xs sm:text-sm bg-gray-800 hover:bg-gray-700 text-white font-bold py-1 sm:px-2 rounded"
          onClick={handleRemoveFollower}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default UserCard;
