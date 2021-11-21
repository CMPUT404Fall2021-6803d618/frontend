import React, { FC, MouseEvent, useCallback } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
    <div className="col-3" key={id}>
      <StyledCard>
        <CardMedia component="img" src="https://via.placeholder.com/500?text=User+Profile+Image" alt="test" />
        <StyledCardContent>
          <div>{displayName}</div>
        </StyledCardContent>
        <StyledCardActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFollowClick}
            disabled={followStatus === FollowStatus.PENDING}
          >
            {getFollowText()}
          </Button>
          {onFollowerRemove && (
            <Button variant="contained" size="large" onClick={handleRemoveFollower}>
              Remove
            </Button>
          )}
        </StyledCardActions>
      </StyledCard>
    </div>
  );
};

export default UserCard;
