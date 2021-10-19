/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";
import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";

const cookies = new Cookies();

export interface RegisterPayload {
  username: string;
  password: string;
  displayName?: string;
  githubUrl?: string;
}

export interface UserData {
  username: string;
  access_token: string;
  refresh_token: string;
  author: {
    id: string;
    host: string;
    displayName: string;
    url: string;
    github: string;
  };
}

interface AuthService {
  login: (email: string, password: string) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  renewToken: () => Promise<User | null>;
}

export const authService: AuthService = class {
  private static async processUserData(
    response: AxiosResponse<UserData>
  ): Promise<User> {
    const { data } = response;
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      author,
      username,
    } = data;

    this.updateAuthHeader(accessToken);
    cookies.set("refreshToken", refreshToken);
    return {
      username,
      ...author,
    };
  }

  public static async login(username: string, password: string): Promise<User> {
    try {
      const res = await axios.post("/login/", {
        username,
        password,
      });
      return this.processUserData(res);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async register(payload: RegisterPayload): Promise<User> {
    try {
      const {
        username,
        password,
        displayName: display_name,
        githubUrl: github_url,
      } = payload;
      const res = await axios.post("/register/", {
        username,
        password,
        display_name,
        github_url,
      });
      return this.processUserData(res);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async logout(): Promise<void> {
    try {
      this.updateAuthHeader("");
      cookies.remove("refreshToken");
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async renewToken(): Promise<User | null> {
    try {
      const token = cookies.get("refreshToken");
      if (token) {
        const res = await axios.post("/token-refresh/", {
          refresh: cookies.get("refreshToken"),
        });
        return this.processUserData(res);
      } else {
        console.log("No refresh token in cookie");
        return null;
      }
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  private static updateAuthHeader(accessToken: string): void {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};
