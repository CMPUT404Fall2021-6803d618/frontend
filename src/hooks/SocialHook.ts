import { useCallback, useEffect, useMemo, useState } from "react";
import faker from "faker";
import { SocialService } from "services/SocialService";
import { useAuthStore } from "./AuthStoreHook";
import { Author, Node } from "shared/interfaces";
import { InboxService } from "services/InboxService";
import { NodeService } from "services/NodeService";

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
  currentNode: Node;
  nodes: Node[];
  people: null | Person[];
  followers: null | Person[];
  followings: null | Person[];
  friends: null | Person[];
  handleFollow: (id: string) => Promise<void>;
  handleUnfollow: (id: string) => Promise<void>;
  handleRemoveFollower: (id: string) => Promise<void>;
  handleAddFollower: (author: Author, inboxId: string) => Promise<void>;
  handleNodeChange: (nodeId: number) => Promise<void>;
}

const DEFAULT_NODE = { id: -1, name: "Social Distance" };

export default function useSocial(shouldLoadData = true): ISocialHook {
  const { user } = useAuthStore();
  const socialService = useMemo(() => new SocialService(), []);
  const inboxService = useMemo(() => new InboxService(), []);
  const nodeService = useMemo(() => new NodeService(), []);
  const [nodes, setNodes] = useState<Node[]>([DEFAULT_NODE]);
  const [currentNode, setCurrentNode] = useState<Node>(nodes[0]);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [followers, setFollowers] = useState<Person[] | null>(null);
  const [friends, setFriends] = useState<Person[] | null>(null);
  const [followings, setFollowings] = useState<Person[] | null>(null);
  const [isNodeChanged, setIsNodeChanged] = useState(false);

  const parsePeopleData = useCallback((userId: string, peopleData: Author[], followingsData: Person[]) => {
    return peopleData
      .filter((person) => person.id !== userId)
      .map((person) => {
        const following = followingsData.find((f) => f.id === person.id);
        return following ? { ...following } : { ...person, followStatus: FollowStatus.NOT_FOLLOWED };
      });
  }, []);

  const loadData = useCallback(async () => {
    if (user && shouldLoadData) {
      const { id } = user;
      const [followersData, followingsData, peopleData, nodesData] = await Promise.all([
        socialService.getFollowers(id),
        socialService.getFollowings(id),
        socialService.getAuthors(),
        nodeService.getNodes(),
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
      const newPeople: Person[] = parsePeopleData(id, peopleData, newFollowings);
      const newFriends: Person[] = newFollowers.filter((f) => f.followStatus === FollowStatus.FOLLOWED);
      setFollowings(newFollowings);
      setFollowers(newFollowers);
      setPeople(newPeople);
      setFriends(newFriends);
      setNodes([DEFAULT_NODE, ...nodesData]);
    }
  }, [nodeService, parsePeopleData, shouldLoadData, socialService, user]);

  const loadNewNodeData = useCallback(async () => {
    try {
      if (user?.id && followings) {
        let authorsData: Author[];
        if (currentNode.id === -1) {
          authorsData = await socialService.getAuthors();
        } else {
          authorsData = await socialService.getForeignAuthors(currentNode.id);
        }
        return parsePeopleData(user.id, authorsData, followings);
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }, [currentNode.id, followings, parsePeopleData, socialService, user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (isNodeChanged) {
      loadNewNodeData().then((data) => {
        setPeople(data);
        setIsNodeChanged(false);
      });
    }
  }, [isNodeChanged, loadNewNodeData]);

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
          const newPeopleStatus = getNewStatusData(people, id, FollowStatus.NOT_FOLLOWED);
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
    async (author: Author, inboxId: string) => {
      if (user) {
        await socialService.addFollower(user.id, author);
        await inboxService.deleteInboxItem(user.id, inboxId);
      }
    },
    [inboxService, socialService, user]
  );

  const handleNodeChange = useCallback(
    async (nodeId: number) => {
      if (nodeId !== currentNode.id) {
        const newNode = nodes.find((n) => n.id === nodeId);
        if (newNode) {
          setCurrentNode(newNode);
          setIsNodeChanged(true);
          setPeople(null);
        }
      }
    },
    [currentNode.id, nodes]
  );

  return {
    nodes,
    currentNode,
    people,
    followers,
    followings,
    friends,
    handleFollow,
    handleUnfollow,
    handleRemoveFollower,
    handleAddFollower,
    handleNodeChange,
  };
}
