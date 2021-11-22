import React, { FC, MouseEvent, useCallback } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { FollowStatus } from "hooks/SocialHook";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";

interface UserCardProps {
  id: string;
  displayName: string;
  followStatus: FollowStatus;
  onFollowerRemove?: (id: string) => Promise<void>;
  onFollow?: (id: string) => Promise<void>;
  onUnfollow?: (id: string) => Promise<void>;
}

const UserCard: FC<UserCardProps> = (props) => {
  const {
    id,
    displayName,
    followStatus,
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
    <Card
      sx={{
        width: "100%",
        p: 1,
        paddingLeft: 2,
        typography: "body2",
      }}
      key={id}
    >
      <Grid container spacing={0} alignItems="center">
        <Grid xs sm>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src="https://via.placeholder.com/500?text=User+Profile+Image"
              alt=""
            />
            <span>{displayName}</span>
          </Stack>
        </Grid>

        <Grid xs sm="auto">
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ m: 1 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleFollowClick}
              disabled={followStatus === FollowStatus.PENDING}
            >
              {getFollowText()}
            </Button>
            <Button
              variant="outlined"
              onClick={handleRemoveFollower}
              disabled={!onFollowerRemove}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
