import { useState, useCallback, useMemo } from "react";
import { useEffect } from "react-router/node_modules/@types/react";
import { InboxService } from "services/InboxService";
import { useAuthStore } from "./AuthStoreHook";

interface IInboxHook {
  items: Record<string, string>[] | null;
}

const useInbox = (): IInboxHook => {
  const inboxService = useMemo(() => new InboxService(), []);
  const { user } = useAuthStore();
  const [items, setItems] = useState<Record<string, string>[] | null>(null);

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
