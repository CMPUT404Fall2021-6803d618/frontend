import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "shared/constants";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const config: AxiosRequestConfig = {
  timeout: parseInt(process.env.REACT_APP_NETWORK_TIMEOUT ?? "60000"),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const createAxiosInstance = (): AxiosInstance => axios.create(config);

const instance = createAxiosInstance();

// retry to fetch access token
instance.interceptors.response.use(undefined, (error: AxiosError) => {
  // do not retry for any auth request
  if (
    error.config.url?.match("register") ||
    error.config.url?.match("login") ||
    error.config.url?.match("token-refresh")
  ) {
    return Promise.reject(error);
  }
  if (error.config && error.response?.status === 401) {
    delete instance.defaults.headers.common["Authorization"];
    return instance.post(`${BASE_URL}/token-refresh/`, { refresh: cookies.get("refreshToken") }).then((res) => {
      const AuthHeader = `Bearer ${res.data.access_token}`;
      instance.defaults.headers.common["Authorization"] = AuthHeader;
      error.config.headers["Authorization"] = AuthHeader;
      return axios.request(error.config);
    });
  }

  return Promise.reject(error);
});

export { instance as axios, createAxiosInstance };
