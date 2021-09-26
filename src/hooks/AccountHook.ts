import { useCallback } from "react";
import { accountService } from "services/AccountService";
import { FormattedUsername, Username } from "shared/interfaces";
import { useAuthStore } from "./AuthStoreHook";

interface IAccountHook {
  username: Username | null;
  updateUsername: (username: Username) => Promise<void>;
  getFormattedUsername: () => FormattedUsername;
}

export const useAccount = (): IAccountHook => {
  const { username, setUsername } = useAuthStore();

  const updateUsername = async (newUsername: Username) => {
    if (newUsername.name === username?.name && newUsername.tag === username?.tag) {
      return;
    }
    await accountService.updateUsername(newUsername);
    setUsername(newUsername);
  };

  const getFormattedUsername = useCallback(() => {
    return {
      name: username?.name ?? "",
      tag: username?.tag.toString().padStart(4, "0") ?? "",
    };
  }, [username]);

  return {
    username,
    updateUsername,
    getFormattedUsername,
  };
};
