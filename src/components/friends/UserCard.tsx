import React, { FC, MouseEvent, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import UserPic from "./donaldTrump.jpeg";

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
    <div className="col-3" key={id}>
      <Card
        style={{
          height: "fit-content",
          marginBottom: "10px",
        }}
      >
        <CardMedia component="img" image={UserPic} alt="test" />
        <CardContent style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {userName}
          </div>
          <div>{displayName}</div>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFollowClick}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
          {onFollowerRemove && (
            <Button
              variant="contained"
              size="large"
              onClick={handleRemoveFollower}
            >
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default UserCard;
