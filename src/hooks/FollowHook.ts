import { useCallback } from "react";
import faker from "faker";

export interface Peer {
  id: string;
  userName: string;
  displayName: string;
  isFollowed: boolean;
}

faker.seed(100);

function generateData(count: number, isFollowed?: boolean): Peer[] {
  const list = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const data: Peer = {
      id: faker.datatype.string(10),
      userName: (firstName + lastName).toLowerCase(),
      displayName: `${firstName} ${lastName}`,
      isFollowed: isFollowed ?? faker.datatype.boolean(),
    };
    list.push(data);
  }
  return list;
}

const friends = generateData(faker.datatype.number({ min: 10, max: 20 }), true);
const followers = generateData(faker.datatype.number({ min: 10, max: 20 }));
const followings = generateData(
  faker.datatype.number({ min: 10, max: 20 }),
  true
);

interface IFollowHook {
  getFriends: () => Promise<Peer[]>;
  getFollowings: () => Promise<Peer[]>;
  getFollowers: () => Promise<Peer[]>;
  follow: () => void;
  unfollow: () => void;
  removeFollower: (id: string) => Promise<boolean>;
}

export default function useFollow(): IFollowHook {
  const getFriends = useCallback(() => {
    return Promise.resolve(friends);
  }, []);

  const getFollowings = useCallback(() => {
    return Promise.resolve(followings);
  }, []);

  const getFollowers = useCallback(() => {
    return Promise.resolve(followers);
  }, []);

  // send friend request
  const follow = useCallback(() => {
    return;
  }, []);

  // cancel friend request
  const unfollow = useCallback(() => {
    return;
  }, []);

  // delete friend request
  const removeFollower = useCallback((_id: string) => {
    return Promise.resolve(true);
  }, []);

  return {
    getFriends,
    getFollowings,
    getFollowers,
    follow,
    unfollow,
    removeFollower,
  };
}
