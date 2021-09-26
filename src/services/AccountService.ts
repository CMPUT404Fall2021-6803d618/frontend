import { Username } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";

interface AccountInfo {
  username: Username;
  email: string;
}

interface AccountService {
  getAccountInfo: () => Promise<AccountInfo>;
  updateUsername: (username: Username) => Promise<Username>;
}

export const accountService: AccountService = class {
  public static async getAccountInfo(): Promise<AccountInfo> {
    try {
      const res = await axios.get("/users/get");
      return {
        username: res.data.username,
        email: res.data.email,
      };
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }
  public static async updateUsername(username: Username): Promise<Username> {
    try {
      await axios.patch("/users/update_username", username);
      return username;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }
};
