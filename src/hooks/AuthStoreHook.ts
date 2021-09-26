import { useCallback } from "react";
import { Username } from "shared/interfaces";
import { AuthStore } from "stores/AuthStore";

interface IAuthStoreHook {
  isAuthenticated: boolean;
  username: Username | null;
  setIsAuthenticated: (newState: boolean) => void;
  setUsername: (newUsername: Username | null) => void;
}

export const useAuthStore = (): IAuthStoreHook => {
  const authStore = AuthStore.useStore();
  const isAuthenticated = authStore.get("isAuthenticated");
  const username = authStore.get("username");

  const setIsAuthenticated = useCallback(
    (newState: boolean) => {
      authStore.set("isAuthenticated")(newState);
    },
    [authStore]
  );

  const setUsername = useCallback(
    (newUsername: Username | null) => {
      authStore.set("username")(newUsername);
    },
    [authStore]
  );

  return {
    isAuthenticated,
    username,
    setIsAuthenticated,
    setUsername,
  };
};
