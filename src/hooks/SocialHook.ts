import { useCallback, useEffect, useMemo, useState } from "react";
import faker from "faker";
import { SocialService } from "services/SocialService";
import { useAuthStore } from "./AuthStoreHook";
import { Author } from "shared/interfaces";

export enum FollowStatus {
  FOLLOWED,
  NOT_FOLLOWED,
  PENDING,
}

export interface Person extends Author {
  followStatus: FollowStatus;
}

faker.seed(100);

// function generateData(count: number, isFollowed?: boolean): Person[] {
//   const list = [];
//   for (let i = 0; i < count; i++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();

//     const data: Person = {
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

interface ISocialHook {
  people: null | Person[];
  followers: null | Person[];
  followings: null | Person[];
  friends: null | Person[];
  handleFollow: (id: string) => Promise<void>;
  handleUnfollow: (id: string) => Promise<void>;
  handleRemoveFollower: (id: string) => Promise<void>;
  handleAddFollower: (author: Author) => Promise<void>;
}

export default function useSocial(shouldLoadData = true): ISocialHook {
  const { user } = useAuthStore();
  const socialService = useMemo(() => new SocialService(), []);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [followers, setFollowers] = useState<Person[] | null>(null);
  const [friends, setFriends] = useState<Person[] | null>(null);
  const [followings, setFollowings] = useState<Person[] | null>(null);

  const loadData = useCallback(async () => {
    if (user && shouldLoadData) {
      const { id } = user;
      const [followersData, followingsData, peopleData] = await Promise.all([
        socialService.getFollowers(id),
        socialService.getFollowings(id),
        socialService.getAuthors(),
      ]);
      const newFollowings: Person[] = followingsData.map((f) => {
        const { status, ...rest } = f;
        return {
          ...rest,
          followStatus: status === "ACCEPTED" ? FollowStatus.FOLLOWED : FollowStatus.PENDING,
        };
      });
      const newFollowers: Person[] = followersData.map((follower) => {
        const following = newFollowings.find((f) => f.id === follower.id);
        return following ? { ...following } : { ...follower, followStatus: FollowStatus.NOT_FOLLOWED };
      });
      console.log(peopleData);
      const newPeople: Person[] = peopleData
        .filter((person) => person.id !== user.id)
        .map((person) => {
          const following = newFollowings.find((f) => f.id === person.id);
          return following ? { ...following } : { ...person, followStatus: FollowStatus.NOT_FOLLOWED };
        });
      const newFriends: Person[] = newFollowers.filter((f) => f.followStatus === FollowStatus.FOLLOWED);
      setFollowings(newFollowings);
      setFollowers(newFollowers);
      setPeople(newPeople);
      setFriends(newFriends);
    }
  }, [shouldLoadData, socialService, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getNewStatusData = useCallback((arr: Person[], id: string, newStatus: FollowStatus) => {
    const index = arr.findIndex((p) => p.id === id);
    if (index !== -1) {
      const newArr = [...arr];
      const newPerson = {
        ...arr[index],
        followStatus: newStatus,
      };
      newArr[index] = { ...newPerson };
      return {
        updatedArr: newArr,
        updatedPerson: newPerson,
      };
    }
  }, []);

  // send friend request
  const handleFollow = useCallback(
    async (id: string) => {
      if (user && followers && followings && people) {
        await socialService.sendFollowRequest(user.id, id);
        const newFollowerStatus = getNewStatusData(followers, id, FollowStatus.PENDING);
        const newPeopleStatus = getNewStatusData(people, id, FollowStatus.PENDING);
        if (newFollowerStatus) {
          setFollowers(newFollowerStatus.updatedArr);
          setFollowings([...followings, { ...newFollowerStatus.updatedPerson }]);
        }
        if (newPeopleStatus) {
          setPeople(newPeopleStatus.updatedArr);
          setFollowings([...followings, { ...newPeopleStatus.updatedPerson }]);
        }
      }
    },
    [followers, followings, getNewStatusData, people, socialService, user]
  );

  // cancel friend request
  const handleUnfollow = useCallback(
    async (id: string) => {
      try {
        if (user && followers && followings && friends && people) {
          await socialService.unfollow(user.id, id);
          const newFollowerStatus = getNewStatusData(followers, id, FollowStatus.NOT_FOLLOWED);
          const newPeopleStatus = getNewStatusData(people, id, FollowStatus.PENDING);
          if (newFollowerStatus) {
            setFollowers(newFollowerStatus.updatedArr);
            setFollowings(followings.filter((f) => f.id !== id));
            setFriends(friends.filter((f) => f.id !== id));
          }
          if (newPeopleStatus) {
            setPeople(newPeopleStatus.updatedArr);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [user, followers, followings, friends, people, socialService, getNewStatusData]
  );

  // delete friend request
  const handleRemoveFollower = useCallback(
    async (id: string) => {
      if (user && followers && followings && friends) {
        await socialService.removeFollower(user.id, id);
        setFollowers(followers.filter((f) => f.id !== id));
        setFriends(friends.filter((f) => f.id !== id));
      }
    },
    [socialService, followers, followings, friends, user]
  );

  const handleAddFollower = useCallback(
    async (author: Author) => {
      if (user) {
        await socialService.addFollower(user.id, author);
      }
    },
    [socialService, user]
  );

  return {
    people,
    followers,
    followings,
    friends,
    handleFollow,
    handleUnfollow,
    handleRemoveFollower,
    handleAddFollower,
  };
}
