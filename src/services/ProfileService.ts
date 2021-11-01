import { AxiosInstance } from "axios";
import { BASE_URL } from "shared/constants";
import { Author } from "shared/interfaces";
import { createAxiosInstance } from "utils/axios";

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
    const { data } = await this.axios.get(`${BASE_URL}/author/${id}`);
    return data;
  }
  public async updateProfile(id: string, payload: UpdateAuthor): Promise<Author> {
    const { data } = await this.axios.post(`${BASE_URL}/author/${id}`, payload);
    return data;
  }
}
