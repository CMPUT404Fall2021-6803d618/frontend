/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, useEffect } from "react";
import { InboxService } from "services/InboxService";
import { InboxItemType } from "shared/enums";
import { FollowingData } from "shared/interfaces";
import { useAuthStore } from "./AuthStoreHook";
import useSocial from "./SocialHook";

interface IInboxHook {
  items: Record<string, any>[] | null;
  handleAcceptFollowRequest: (item: FollowingData) => Promise<void>;
}

const useInbox = (): IInboxHook => {
  const inboxService = useMemo(() => new InboxService(), []);
  const { user } = useAuthStore();
  const [items, setItems] = useState<Record<string, any>[] | null>(null);
  const { handleAddFollower } = useSocial(false);

  const loadData = useCallback(async () => {
    if (user) {
      const data = await inboxService.getInbox(user.id);
      setItems(
        data.filter((d) => {
          const type = d.type?.toLowerCase?.();
          return (
            type === InboxItemType.COMMENTS ||
            type === InboxItemType.FOLLOW ||
            type === InboxItemType.LIKE ||
            type === InboxItemType.POST
          );
        })
      );
    }
  }, [inboxService, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAcceptFollowRequest = useCallback(
    async (item: FollowingData) => {
      await handleAddFollower(item.actor, item.inbox_object);
      setItems(items?.filter((i) => i.inbox_object !== item.inbox_object) ?? []);
    },
    [handleAddFollower, items]
  );

  return { items, handleAcceptFollowRequest };
};

export default useInbox;
