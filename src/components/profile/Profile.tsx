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
import Post from "../home/Post";
import useSocial, { FollowStatus } from "hooks/SocialHook";
import { useAuthStore } from "hooks/AuthStoreHook";
import { withParamId } from "decorators/withParamId";
import { ProfileService } from "services/ProfileService";
import { Author, Post as IPost } from "shared/interfaces";
import Loading from "components/common/components/Loading";
import { Visibility } from "shared/enums";
import { Button, Container } from "@mui/material";
import useImage from "hooks/ImageHook";
import theme from "theme";
import FileUploader from "components/home/FileUploader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileImage from "components/common/components/ProfileImage";

const ProfileDiv = styled.div`
  display: flex;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const ProfileImageDiv = styled.div`
  margin: 0 2rem;
  flex: 1;
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
  const { user } = useAuthStore();
  // const { followers, followings } = useSocial();
  const profileService = useMemo(() => new ProfileService(), []);
  const [profile, setProfile] = useState<Author | null>(null);
  const { getPosts } = usePost(profile);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const { uploadImage } = useImage(user);

  const [editing, setEditing] = useState(false);
  const [editGithub, setEditGithub] = useState("");
  const [editImageProfile, setEditImageProfile] = useState("");

  const [editDisplayName, setEditDisplayName] = useState("");

  const isUser = user?.id === profile?.id;

  useEffect(() => {
    profileService.getProfile(id).then((data) => {
      setProfile(data);
    });
  }, [id, profileService]);

  useEffect(() => {
    if (user?.id === profile?.id) {
      getPosts().then((data) => setPosts(data.map((d) => ({ ...d, liked: false }))));
    } else {
      getPosts().then((data) =>
        setPosts(
          data
            .filter((d) => d.visibility === Visibility.PUBLIC)
            .map((d) => ({ ...d, liked: false }))
        )
      );
    }
  }, [getPosts, profile?.id, user?.id]);

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
          console.log(editGithub);
          await profileService.updateProfile(id, {
            github: editGithub,
            displayName: editDisplayName,
            profileImage: editImageProfile,
          });
          setProfile({
            ...profile,
            github: editGithub,
            displayName: editDisplayName,
            profileImage: editImageProfile,
          });
        }
        setEditing(false);
      } else {
        setEditing(true);
      }
    },
    [editDisplayName, editGithub, editing, id, profile, profileService, editImageProfile]
  );

  const handleDisplayNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditDisplayName(e.target.value);
  }, []);

  const handleGithubChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditGithub(e.target.value);
  }, []);

  const handleFileSelectError = useCallback((e: any) => {
    alert(e.error);
  }, []);

  const handleFileSelectSuccess = useCallback(
    async (file: File) => {
      const form = new FormData();
      form.append("image", file);
      form.append("visibility", "PUBLIC");
      form.append("unlisted", "true");
      const url = await uploadImage(form);
      if (url != null) {
        setEditImageProfile(url);
      }
    },
    [uploadImage]
  );

  return (
    <Container className="container">
      {profile ? (
        <ProfileDiv>
          {isUser && <button onClick={handleToggle}>{editing ? "Update" : "Edit"}</button>}
          <ProfileImageDiv>
            <ProfileImage
              src={profile?.profileImage}
              size={150}
              name={profile?.displayName}
              color={profile?.profileColor}
            />
          </ProfileImageDiv>
          <ProfileInfoDiv>
            {editing ? (
              <input type="text" onChange={handleDisplayNameChange} value={editDisplayName} />
            ) : (
              <DisplayName>{profile?.displayName}</DisplayName>
            )}
            <SocialStats>
              <div>
                <span>{posts?.length ?? 0} </span>
                <span>posts</span>
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
                <input style={{ flex: 1 }} onChange={handleGithubChange} value={editGithub} />
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
          {editing ? (
            <FileUploader
              onFileSelectError={handleFileSelectError}
              onFileSelectSuccess={handleFileSelectSuccess}
            />
          ) : (
            <div></div>
          )}
        </ProfileDiv>
      ) : (
        <Loading />
      )}
      {posts && posts.length > 0 && posts?.map((post) => <Post key={post.id} post={post} />)}
    </Container>
  );
};

export default withParamId(Profile);
