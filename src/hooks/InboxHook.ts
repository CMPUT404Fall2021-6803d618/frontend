/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, useEffect } from "react";
import { InboxService } from "services/InboxService";
import { useAuthStore } from "./AuthStoreHook";

interface IInboxHook {
  items: Record<string, any>[] | null;
}

const useInbox = (): IInboxHook => {
  const inboxService = useMemo(() => new InboxService(), []);
  const { user } = useAuthStore();
  const [items, setItems] = useState<Record<string, any>[] | null>(null);

  const loadData = useCallback(async () => {
    if (user) {
      const data = await inboxService.getInbox(user.id);
      setItems(data);
    }
  }, [inboxService, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { items };
};

export default useInbox;
