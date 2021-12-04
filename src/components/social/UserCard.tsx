import React, { FC, MouseEvent, useCallback } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { FollowStatus } from "hooks/SocialHook";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ProfileImage from "components/common/components/ProfileImage";

const ProfileImageDiv = styled.div`
  margin-right: 8px;
`;

interface UserCardProps {
  id: string;
  displayName: string;
  followStatus: FollowStatus;
  profileImage?: string;
  profileColor?: string;
  onFollowerRemove?: (id: string) => Promise<void>;
  onFollow?: (id: string) => Promise<void>;
  onUnfollow?: (id: string) => Promise<void>;
}

const UserCard: FC<UserCardProps> = (props) => {
  const {
    id,
    displayName,
    profileImage,
    profileColor,
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
            <ProfileImageDiv>
              <ProfileImage src={profileImage} size={40} name={displayName} color={profileColor} />
            </ProfileImageDiv>
            <span>{displayName}</span>
          </Stack>
        </Grid>

        <Grid xs sm="auto">
          <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ m: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFollowClick}
              disabled={followStatus === FollowStatus.PENDING}
            >
              {getFollowText()}
            </Button>
            {onFollowerRemove && (
              <Button variant="outlined" onClick={handleRemoveFollower}>
                Remove
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
