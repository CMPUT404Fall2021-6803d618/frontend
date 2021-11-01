/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";
import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";
import { BASE_URL } from "shared/constants";

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
  is_active: boolean;
}

interface IAuthService {
  login: (email: string, password: string) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  renewToken: () => Promise<User | null>;
}

export class AuthService implements IAuthService {
  private async processUserData(response: AxiosResponse<UserData>): Promise<User> {
    const { data } = response;
    const { access_token: accessToken, refresh_token: refreshToken, author, username, is_active: isActive } = data;
    if (process.env.REACT_APP_ADMIN_ACTIVE_TOGGLE === "true") {
      if (isActive) {
        this.updateAuthHeader(accessToken);
        cookies.remove("refreshToken");
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: new Date("9999-12-31T12:00:00"),
        });
        return {
          username,
          ...author,
        };
      } else {
        throw new Error("Account is not activated. Please contact server admin.");
      }
    } else {
      this.updateAuthHeader(accessToken);
      cookies.remove("refreshToken");
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        expires: new Date("9999-12-31T12:00:00"),
      });
      return {
        username,
        ...author,
      };
    }
  }

  public async login(username: string, password: string): Promise<User> {
    try {
      const res = await axios.post(`${BASE_URL}/login/`, {
        username,
        password,
      });
      return this.processUserData(res);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public async register(payload: RegisterPayload): Promise<User> {
    try {
      const { username, password, displayName: display_name, githubUrl: github_url } = payload;
      const res = await axios.post(`${BASE_URL}/register/`, {
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

  public logout(): void {
    try {
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("refreshToken", { path: "/" });
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public async renewToken(): Promise<User | null> {
    try {
      const token = cookies.get("refreshToken");
      if (token) {
        delete axios.defaults.headers.common["Authorization"];
        const res = await axios.post(`${BASE_URL}/token-refresh/`, {
          refresh: cookies.get("refreshToken"),
        });
        return this.processUserData(res);
      } else {
        console.log("No refresh token in cookie");
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private updateAuthHeader(accessToken: string): void {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}
