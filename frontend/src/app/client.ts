import axios, { AxiosInstance } from "axios";
import config from "./config";
import { store } from "./store";
import _ from "lodash";

class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: config.CLIENT.BASE_URL,
        timeout: config.CLIENT.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.instance.interceptors.request.use((config) => {
        const { isLoggedIn, userInfo: { accessToken } } = store.getState().auth
        if (isLoggedIn && _.isEmpty(config.headers["Authorization"])) {
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config
      }, (error) => {
        return Promise.reject(error);
      })

    }
    return this.instance
  }
}

export default ApiClient;
