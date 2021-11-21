import React, {
  FC,
  useMemo,
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  ChangeEvent,
} from "react";
import usePost from "hooks/PostHook";
import styled from "styled-components";
import useSocial, { FollowStatus } from "hooks/SocialHook";
import { withParamId } from "decorators/withParamId";
import { ProfileService } from "services/ProfileService";
import { Author, Post } from "shared/interfaces";
import Loading from "components/common/components/Loading";
import { Container } from "@mui/material";
import theme from "theme";

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
  // const { isAuthenticated } = useAuthStore();
  const { followers, followings } = useSocial();
  const profileService = useMemo(() => new ProfileService(), []);
  const [profile, setProfile] = useState<Author | null>(null);
  const { getPosts } = usePost(profile);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [editing, setEditing] = useState(false);
  const [editGithub, setEditGithub] = useState("");
  const [editDisplayName, setEditDisplayName] = useState("");

  useEffect(() => {
    profileService.getProfile(id).then((data) => {
      setProfile(data);
    });
  }, [id, profileService]);

  useEffect(() => {
    getPosts().then((data) =>
      setPosts(data.map((d) => ({ ...d, liked: false })))
    );
  }, [getPosts]);

  useEffect(() => {
    if (profile) {
      setEditGithub(profile.github ?? "");
      setEditDisplayName(profile.displayName ?? "");
    }
  }, [profile]);

  const handleToggle = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (editing) {
        if (profile) {
          await profileService.updateProfile(id, {
            github: editGithub === "" ? undefined : editGithub,
            displayName: editDisplayName,
          });
          setProfile({
            ...profile,
            github: editGithub,
            displayName: editDisplayName,
          });
        }
        setEditing(false);
      } else {
        setEditing(true);
      }
    },
    [editDisplayName, editGithub, editing, id, profile, profileService]
  );

  const handleDisplayNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditDisplayName(e.target.value);
    },
    []
  );

  const handleGithubChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditGithub(e.target.value);
  }, []);

  return (
    <Container className="container">
      {profile ? (
        <ProfileDiv>
          <button onClick={handleToggle}>{editing ? "Update" : "Edit"}</button>
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
            {editing ? (
              <input
                type="text"
                onChange={handleDisplayNameChange}
                value={editDisplayName}
              />
            ) : (
              <DisplayName>{profile?.displayName}</DisplayName>
            )}
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
                <span>
                  {followings?.filter(
                    (f) => f.followStatus === FollowStatus.FOLLOWED
                  ).length ?? 0}{" "}
                </span>
                <span>followings</span>
              </div>
            </SocialStats>
            {editing ? (
              <div
                className="info"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "2rem",
                }}
              >
                Github:{" "}
                <input
                  style={{ flex: 1 }}
                  onChange={handleGithubChange}
                  value={editGithub}
                />
              </div>
            ) : (
              <div
                className="info"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "2rem",
                }}
              >
                <span style={{ flex: 1 }}>Github: {profile?.github}</span>
              </div>
            )}
          </ProfileInfoDiv>
        </ProfileDiv>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default withParamId(Profile);
