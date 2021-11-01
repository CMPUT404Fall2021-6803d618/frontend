/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, useEffect } from "react";
import { InboxService } from "services/InboxService";
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
      setItems(data);
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
