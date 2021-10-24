import { useCallback, useMemo } from "react";
import { AuthService, RegisterPayload } from "services/AuthService";
import { useAuthStore } from "./AuthStoreHook";

interface IAuthHook {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
}

export const useAuth = (): IAuthHook => {
  const authService = useMemo(() => new AuthService(), []);
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthStore();

  const login = useCallback(
    async (username: string, password: string) => {
      const user = await authService.login(username, password);
      setIsAuthenticated(true);
      setUser(user);
    },
    [authService, setIsAuthenticated, setUser]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const { username, password, displayName, githubUrl } = payload;
      const user = await authService.register({
        username,
        password,
        displayName: displayName?.length ? displayName : undefined,
        githubUrl: githubUrl?.length ? githubUrl : undefined,
      });
      setIsAuthenticated(true);
      setUser(user);
    },
    [authService, setIsAuthenticated, setUser]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, [authService, setIsAuthenticated, setUser]);

  const renewToken = useCallback(async () => {
    const user = await authService.renewToken();
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, [authService, setIsAuthenticated, setUser]);

  return {
    isAuthenticated,
    login,
    register,
    logout,
    renewToken,
  };
};
