import TabsNav from "components/common/components/TabsNav";
import { withParamId } from "decorators/withParamId";
import useInbox from "hooks/InboxHook";
import React, { FC, useMemo } from "react";
import { InboxItemType } from "shared/enums";
import { FollowingData } from "shared/interfaces";
import FollowRequestsTab from "./FollowRequestsTab";
import NotificationsTab from "./NotificationsTab";

interface IProps {
  id: string;
}

const Inbox: FC<IProps> = (props) => {
  const { id } = props;
  const { items, handleAcceptFollowRequest } = useInbox();
  const notificationItems = useMemo(
    () => (items ? items.filter((i) => i.type?.toLowerCase() !== InboxItemType.FOLLOW) : []),
    [items]
  );
  const followRequestItems = useMemo(
    () => (items ? items.filter((i) => i.type?.toLowerCase() === InboxItemType.FOLLOW) : []),
    [items]
  );

  const tabs = useMemo(
    () => [
      {
        id: "notifications",
        label: "Notifications",
        render: () => <NotificationsTab items={notificationItems} />,
      },
      {
        id: "follow-requests",
        label: "Follow Requests",
        render: () => (
          <FollowRequestsTab items={followRequestItems as FollowingData[]} onAccept={handleAcceptFollowRequest} />
        ),
      },
    ],
    [followRequestItems, handleAcceptFollowRequest, notificationItems]
  );

  return <TabsNav tabs={tabs} id={id} />;
};

export default withParamId(Inbox);
