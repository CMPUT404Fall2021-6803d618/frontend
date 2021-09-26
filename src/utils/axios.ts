import axios, { AxiosError, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3001/",
  timeout: parseInt(process.env.REACT_APP_NETWORK_TIMEOUT ?? "60000"),
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

// retry to fetch access token
instance.interceptors.response.use(undefined, (error: AxiosError) => {
  // do not retry for any auth request
  if (error.config.url?.match("auth")) {
    return Promise.reject(error);
  }
  if (error.config && error.response?.status === 401) {
    return instance.post("/auth/renew-token").then((res) => {
      const AuthHeader = `Bearer ${res.data.accessToken}`;
      instance.defaults.headers.common["Authorization"] = AuthHeader;
      error.config.headers["Authorization"] = AuthHeader;
      return axios.request(error.config);
    });
  }

  return Promise.reject(error);
});

export { instance as axios };
