import { AxiosInstance } from "axios";
import { BASE_URL } from "shared/constants";
import { Author } from "shared/interfaces";
import { axios, createAxiosInstance } from "utils/axios";

interface IProfileService {
  getProfile: (id: string) => Promise<Author>;
}

interface UpdateAuthor {
  displayName?: string;
  github?: string;
  profileImage?: string;
}

export class ProfileService implements IProfileService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = createAxiosInstance();
  }
  public async getProfile(id: string): Promise<Author> {
    const decoded = decodeURIComponent(id);
    const url = new URL(decoded);
    if (url.origin === BASE_URL) {
      const { data } = await this.axios.get(decoded);
      return data;
    } else {
      const { data } = await this.axios.get(`${BASE_URL}/proxy/${id}/`);
      return data;
    }
  }
  public async updateProfile(id: string, payload: UpdateAuthor): Promise<Author> {
    const { data } = await axios.post(`${BASE_URL}/author/${id}/`, payload);
    return data;
  }
}
