import { AxiosInstance } from "axios";
import { BASE_URL } from "shared/constants";
import { Author } from "shared/interfaces";
import { createAxiosInstance } from "utils/axios";

interface IProfileService {
  getProfile: (id: string) => Promise<Author>;
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
}
