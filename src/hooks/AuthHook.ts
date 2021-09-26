import { useCallback } from "react";
import { authService } from "services/AuthService";
import { OAuthType } from "shared/enums";
import { useAuthStore } from "./AuthStoreHook";

interface IAuthHook {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
  googleLogin: (googleAccessToken: string) => Promise<void>;
}

export const useAuth = (): IAuthHook => {
  const { isAuthenticated, setIsAuthenticated, setUsername } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { username } = await authService.login(email, password);
        setIsAuthenticated(true);
        setUsername(username);
      } catch (err) {
        throw err;
      }
    },
    [setIsAuthenticated, setUsername]
  );

  const register = async (username: string, email: string, password: string) => {
    try {
      await authService.register(username, email, password);
    } catch (err) {
      throw err;
    }
  };

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUsername(null);
    } catch (err) {
      throw err;
    }
  }, [setIsAuthenticated, setUsername]);

  const googleLogin = useCallback(
    async (googleAccessToken: string) => {
      try {
        const { username } = await authService.oAuthLogin({ googleAccessToken }, OAuthType.GOOGLE);
        setIsAuthenticated(true);
        setUsername(username);
      } catch (err) {
        throw err;
      }
    },
    [setIsAuthenticated, setUsername]
  );

  const renewToken = useCallback(async () => {
    try {
      const { username } = await authService.renewToken();
      setIsAuthenticated(true);
      setUsername(username);
    } catch (err) {
      throw err;
    }
  }, [setIsAuthenticated, setUsername]);

  return {
    isAuthenticated,
    login,
    register,
    logout,
    googleLogin,
    renewToken,
  };
};
