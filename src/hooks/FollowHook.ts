import { useCallback, useEffect, useMemo, useState } from "react";
import faker from "faker";
import { FollowService } from "services/FollowerService";
import { useAuthStore } from "./AuthStoreHook";
import { Author } from "shared/interfaces";

export enum FollowStatus {
  FOLLOWED,
  NOT_FOLLOWED,
  PENDING,
}

export interface Peer extends Author {
  followStatus: FollowStatus;
}

faker.seed(100);

// function generateData(count: number, isFollowed?: boolean): Peer[] {
//   const list = [];
//   for (let i = 0; i < count; i++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();

//     const data: Peer = {
//       id: faker.datatype.string(10),
//       userName: (firstName + lastName).toLowerCase(),
//       displayName: `${firstName} ${lastName}`,
//       isFollowed: isFollowed ?? faker.datatype.boolean(),
//     };
//     list.push(data);
//   }
//   return list;
// }

// const friends = generateData(faker.datatype.number({ min: 10, max: 20 }), true);
// const followers = generateData(faker.datatype.number({ min: 10, max: 20 }));
// const followings = generateData(
//   faker.datatype.number({ min: 10, max: 20 }),
//   true
// );

interface IFollowHook {
  followers: null | Peer[];
  followings: null | Peer[];
  friends: null | Peer[];
  handleFollow: (id: string) => Promise<void>;
  handleUnfollow: (id: string) => Promise<void>;
  handleRemoveFollower: (id: string) => Promise<void>;
}

export default function useFollow(): IFollowHook {
  const { user } = useAuthStore();
  const followService = useMemo(() => new FollowService(), []);
  const [followers, setFollowers] = useState<Peer[] | null>(null);
  const [friends, setFriends] = useState<Peer[] | null>(null);
  const [followings, setFollowings] = useState<Peer[] | null>(null);

  const loadData = useCallback(async () => {
    if (user) {
      const { id } = user;
      const followersData = await followService.getFollowers(id);
      const sentFollowRequests = await followService.getSentFollowRequests(id);
      const newFollowings: Peer[] = await Promise.all(
        sentFollowRequests.map(async (request) => {
          const status = await followService.getFollowStatus(request.id, id);
          return {
            ...request,
            followStatus: status ? FollowStatus.FOLLOWED : FollowStatus.PENDING,
          };
        })
      );
      const newFollowers: Peer[] = followersData.map((follower) => {
        const following = newFollowings.find((f) => f.id === follower.id);
        return following ? { ...following } : { ...follower, followStatus: FollowStatus.NOT_FOLLOWED };
      });
      const newFriends: Peer[] = newFollowers.filter((f) => f.followStatus === FollowStatus.FOLLOWED);
      setFollowings(newFollowings);
      setFollowers(newFollowers);
      setFriends(newFriends);
    }
  }, [followService, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // send friend request
  const handleFollow = useCallback(
    async (id: string) => {
      if (user && followers && followings && friends) {
        await followService.sendFollowRequest(user.id, id);
        const followerIndex = followers.findIndex((f) => f.id === id);
        if (followerIndex !== -1) {
          const newFollowers = [...followers];
          const newFollower = {
            ...followers[followerIndex],
            followStatus: FollowStatus.PENDING,
          };
          newFollowers[followerIndex] = { ...newFollower };
          setFollowers(newFollowers);
          setFollowings([...followings, { ...newFollower }]);
        }
      }
    },
    [followService, followers, followings, friends, user]
  );

  // cancel friend request
  const handleUnfollow = useCallback(
    async (id: string) => {
      try {
        if (user && followers && followings && friends) {
          await followService.removeFollower(id, user.id);
          const followerIndex = followers.findIndex((f) => f.id === id);
          if (followerIndex !== -1) {
            const newFollowers = [...followers];
            const newFollower = {
              ...followers[followerIndex],
              followStatus: FollowStatus.NOT_FOLLOWED,
            };
            newFollowers[followerIndex] = { ...newFollower };
            setFollowers(newFollowers);
            setFollowings(followings.filter((f) => f.id !== id));
            setFriends(friends.filter((f) => f.id !== id));
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [followService, followers, followings, friends, user]
  );

  // delete friend request
  const handleRemoveFollower = useCallback(
    async (id: string) => {
      if (user && followers && followings && friends) {
        await followService.removeFollower(user.id, id);
        setFollowers(followers.filter((f) => f.id !== id));
        setFriends(friends.filter((f) => f.id !== id));
      }
    },
    [followService, followers, followings, friends, user]
  );

  return {
    followers,
    followings,
    friends,
    handleFollow,
    handleUnfollow,
    handleRemoveFollower,
  };
}
