import axios, { AxiosInstance } from "axios";
import config from "./config";
import { store } from "./store";
import _ from "lodash";

const apiClient: AxiosInstance = axios.create({
  baseURL: config.CLIENT.BASE_URL,
  timeout: config.CLIENT.TIMEOUT,
  headers: {
    "User-Agent": "Apidog/1.0.0 (https://apidog.com)",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const { isLoggedIn, userInfo: { accessToken } } = store.getState().auth
  if (isLoggedIn && _.isEmpty(config.headers["Authorization"])) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

export default apiClient;
