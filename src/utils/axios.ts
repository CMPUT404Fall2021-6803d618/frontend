import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const config: AxiosRequestConfig = {
  timeout: parseInt(process.env.REACT_APP_NETWORK_TIMEOUT ?? "60000"),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

// retry to fetch access token
instance.interceptors.response.use(undefined, (error: AxiosError) => {
  // do not retry for any auth request
  if (error.config.url?.match("register") || error.config.url?.match("login")) {
    return Promise.reject(error);
  }
  if (error.config && error.response?.status === 401) {
    const baseUrl = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8000/";
    return instance.post(`${baseUrl}/token-refresh/`, { refresh: cookies.get("refreshToken") }).then((res) => {
      const AuthHeader = `Bearer ${res.data.access_token}`;
      instance.defaults.headers.common["Authorization"] = AuthHeader;
      error.config.headers["Authorization"] = AuthHeader;
      return axios.request(error.config);
    });
  }

  return Promise.reject(error);
});

export { instance as axios };
