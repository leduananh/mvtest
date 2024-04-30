import { SnackbarOrigin } from "notistack";

export interface AppConfig {
  API_BASE_URL: string;
  ROUTES: {
    HOME: string;
    LOGIN: string;
    REGISTER: string;
    VIDEO_SHARE: string;
  };
  ALERT: {
    ANCHOR: SnackbarOrigin;
  };
}

const config: AppConfig = {
  API_BASE_URL: "https://example.com/api",
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/signup",
    VIDEO_SHARE: "/video-share",
  },
  ALERT: {
    ANCHOR: {
      vertical: "top",
      horizontal: "right",
    },
  },
};

export default config;
