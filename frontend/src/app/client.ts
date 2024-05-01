import axios, { AxiosInstance } from "axios";
import config from "./config";

const apiClient: AxiosInstance = axios.create({
  baseURL: config.CLIENT.BASE_URL,
  timeout: config.CLIENT.TIMEOUT,
  headers: {
    "User-Agent": "Apidog/1.0.0 (https://apidog.com)",
    "Content-Type": "application/json",
  },
});

export default apiClient;
