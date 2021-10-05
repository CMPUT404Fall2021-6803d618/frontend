/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OAuthType } from "shared/enums";
import { User } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";

interface AuthService {
  login: (email: string, password: string) => Promise<User>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  oAuthLogin: (payload: any, type: OAuthType) => Promise<User>;
  renewToken: () => Promise<User>;
}

export const authService: AuthService = class {
  public static async login(username: string, password: string): Promise<User> {
    try {
      const res = await axios.post("/token", {
        username,
        password,
      });
      console.log("success");
      this.updateAuthHeader(res.data.accessToken);
      return res.data.user;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async register(
    username: string,
    password: string,
    displayName?: string,
    githubUrl?: string
  ): Promise<void> {
    try {
      const res = await axios.post("/auth/register", {
        username,
        password,
        display_name: displayName,
        github_url: githubUrl,
      });
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await axios.post("/auth/logout");
      this.updateAuthHeader("");
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async oAuthLogin(payLoad: any, type: OAuthType): Promise<User> {
    try {
      const res = await axios.post(`/auth/${type}`, payLoad);
      this.updateAuthHeader(res.data.accessToken);
      return res.data.user;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async renewToken(): Promise<User> {
    try {
      const res = await axios.post("/auth/renew-token");
      this.updateAuthHeader(res.data.accessToken);
      return res.data.user;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  private static updateAuthHeader(accessToken: string): void {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};
