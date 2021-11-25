import ListContainer from "components/common/components/ListContainer";
import React, { FC } from "react";
import { FollowingData } from "shared/interfaces";
import FollowInboxItem from "./FollowInboxItem";

interface IProps {
  items: FollowingData[];
  onAccept: (item: FollowingData) => Promise<void>;
}

const FollowRequestsTab: FC<IProps> = (props) => {
  const { items, onAccept } = props;

  return (
    <ListContainer>
      {items.length > 0 ? (
        items.map((item, index) => (
          <FollowInboxItem key={`follow-request-${index}`} item={item} index={index} onAccept={onAccept} />
        ))
      ) : (
        <div>No follow requests</div>
      )}
    </ListContainer>
  );
};

export default FollowRequestsTab;
