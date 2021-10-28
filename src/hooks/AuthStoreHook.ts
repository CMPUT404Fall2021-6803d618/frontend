import { useCallback } from "react";
import { User } from "shared/interfaces";
import { AuthStore } from "stores/AuthStore";

interface IAuthStoreHook {
  isAuthenticated: boolean | null;
  user: User | null;
  setIsAuthenticated: (newState: boolean | null) => void;
  setUser: (newUser: User | null) => void;
}

export const useAuthStore = (): IAuthStoreHook => {
  const authStore = AuthStore.useStore();
  const isAuthenticated = authStore.get("isAuthenticated");
  const user = authStore.get("user");

  const setIsAuthenticated = useCallback(
    (newState: boolean | null) => {
      authStore.set("isAuthenticated")(newState);
    },
    [authStore]
  );

  const setUser = useCallback(
    (newUser: User | null) => {
      authStore.set("user")(newUser);
    },
    [authStore]
  );

  return {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
  };
};
