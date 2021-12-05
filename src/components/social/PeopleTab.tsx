import React, { FC, useCallback } from "react";
import { Person } from "hooks/SocialHook";
import UserCard from "./UserCard";
import Loading from "components/common/components/Loading";
import ListContainer from "../common/components/ListContainer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Node } from "shared/interfaces";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

interface IProps {
  nodes: Node[];
  currentNode: Node;
  people: Person[] | null;
  onFollow: (id: string) => Promise<void>;
  onUnfollow: (id: string) => Promise<void>;
  onNodeChange: (nodeId: number) => Promise<void>;
}

const PeopleTab: FC<IProps> = (props) => {
  const { people, onFollow, onUnfollow, nodes, currentNode, onNodeChange } = props;

  const render = useCallback(() => {
    if (people?.length === 0) {
      return <div>No people</div>;
    } else {
      return people?.map(({ id, url, displayName, followStatus, profileImage, profileColor }) => (
        <UserCard
          id={id}
          url={url}
          displayName={displayName}
          followStatus={followStatus}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          key={id}
          profileImage={profileImage}
          profileColor={profileColor}
        />
      ));
    }
  }, [people, onFollow, onUnfollow]);

  const handleNodeChange = useCallback(
    async (e: SelectChangeEvent<string>) => {
      const newId = parseInt((e.target as HTMLInputElement).value, 10);
      if (newId !== currentNode.id) {
        await onNodeChange(newId);
      }
    },
    [currentNode.id, onNodeChange]
  );

  return (
    <ListContainer>
      <FormControl>
        <InputLabel id="node-selects-label">Current Node</InputLabel>
        <Select
          labelId="node-selects-label"
          value={currentNode.id.toString()}
          label="Current Node"
          onChange={handleNodeChange}
        >
          {nodes.map((node) => (
            <MenuItem value={node.id} key={`node-${node.id}`}>
              {node.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {people ? render() : <Loading />}
    </ListContainer>
  );
};

export default PeopleTab;
