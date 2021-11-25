import React, { FC, useCallback } from "react";
import { FollowingData } from "shared/interfaces";
import NotificationCard from "./NotificationCard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface IProps {
  item: FollowingData;
  onAccept: (item: FollowingData) => Promise<void>;
  index: number;
}

const FollowInboxItem: FC<IProps> = (props) => {
  const { item, onAccept, index } = props;

  const handleAccept = useCallback(async () => {
    await onAccept(item);
  }, [item, onAccept]);

  return (
    <NotificationCard
      text={`${item.actor.displayName} wants to follow you`}
      index={index}
      Icon={PersonAddIcon}
      buttons={[
        {
          text: "Accept",
          onClick: handleAccept,
          variant: "contained",
        },
        {
          text: "Reject",
          onClick: () => {
            return;
          },
          variant: "outlined",
        },
      ]}
    />
  );
};

export default FollowInboxItem;
