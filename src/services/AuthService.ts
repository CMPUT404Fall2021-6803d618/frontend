import { OAuthType } from "shared/enums";
import { User } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";

interface AuthService {
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  oAuthLogin: (payload: any, type: OAuthType) => Promise<User>;
  renewToken: () => Promise<User>;
}

export const authService: AuthService = class {
  public static async login(email: string, password: string): Promise<User> {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log("success");
      this.updateAuthHeader(res.data.accessToken);
      return res.data.user;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async register(username: string, email: string, password: string) {
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      this.updateAuthHeader(res.data.accessToken);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async logout() {
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

  private static updateAuthHeader(accessToken: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
};
