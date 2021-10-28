import React, { FC, useMemo, useEffect, useState } from "react";
import { useAuthStore } from "hooks/AuthStoreHook";
import usePost from "hooks/PostHook";
import styled from "styled-components";
import useSocial from "hooks/SocialHook";
import { withParamId } from "decorators/withParamId";
import { ProfileService } from "services/ProfileService";
import { Author } from "shared/interfaces";
import Loading from "components/common/components/Loading";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ProfileDiv = styled.div`
  display: flex;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const ProfileImageDiv = styled.div`
  margin: 0 2rem;
  flex: 1;
  div {
    width: 150px;
    height: 150px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 50%;
    }
  }
`;

const ProfileInfoDiv = styled.div`
  flex: 2;
`;

const DisplayName = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;

const SocialStats = styled.div`
  display: flex;

  div {
    margin-right: 3rem;

    span:nth-child(1) {
      font-weight: bold;
    }
  }
`;

interface IProps {
  id: string;
}

const Profile: FC<IProps> = (props) => {
  const { id } = props;
  const { isAuthenticated } = useAuthStore();
  const { followers, followings } = useSocial();
  const profileService = useMemo(() => new ProfileService(), []);
  const [profile, setProfile] = useState<Author | null>(null);
  const { posts } = usePost(profile);

  useEffect(() => {
    profileService.getProfile(id).then((data) => {
      setProfile(data);
    });
  }, [id, profileService]);

  return (
    <Container className="container">
      {profile ? (
        <ProfileDiv>
          <ProfileImageDiv>
            <div>
              <img
                src={
                  profile?.profileImage ??
                  "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
              />
            </div>
          </ProfileImageDiv>
          <ProfileInfoDiv>
            <DisplayName>{profile?.displayName}</DisplayName>
            <SocialStats>
              <div>
                <span>{posts?.length ?? 0} </span>
                <span>posts</span>
              </div>
              <div>
                <span>{followers?.length ?? 0} </span>
                <span>followers</span>
              </div>
              <div>
                <span>{followings?.length ?? 0} </span>
                <span>followings</span>
              </div>
            </SocialStats>
          </ProfileInfoDiv>
        </ProfileDiv>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default withParamId(Profile);
