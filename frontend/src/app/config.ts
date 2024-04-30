import { SnackbarOrigin } from "notistack";
import * as Yup from "yup";
import { HeaderLoginForm, LoginForm, SignUpForm } from "../features/authentication";
import { VideoShareForm } from "../features/videos";

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
  RULES: {
    FORM: {
      HEADER_LOGIN: {
        constrains: Yup.ObjectSchema<HeaderLoginForm>;
        initValues: HeaderLoginForm;
      };
      LOGIN: {
        constrains: Yup.ObjectSchema<LoginForm>;
        initValues: LoginForm;
      };
      REGISTER: {
        constrains: Yup.ObjectSchema<SignUpForm>;
        initValues: SignUpForm;
      };
      VIDEO_SHARE: {
        constrains: Yup.ObjectSchema<VideoShareForm>;
        initValues: VideoShareForm;
      };
    };
  };
}

const config: AppConfig = {
  API_BASE_URL: "https://api.mockfly.dev/mocks/18c35e0a-722f-45b4-a39b-3ce07a02b646",
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/sign-up",
    VIDEO_SHARE: "/video-share",
  },
  ALERT: {
    ANCHOR: {
      vertical: "top",
      horizontal: "right",
    },
  },
  RULES: {
    FORM: {
      HEADER_LOGIN: {
        constrains: Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        }),
        initValues: { email: "", password: "" },
      },
      LOGIN: {
        constrains: Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        }),
        initValues: { email: "", password: "", confirmPassword: "" },
      },
      REGISTER: {
        constrains: Yup.object({
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        }),
        initValues: { email: "", password: "", confirmPassword: "" },
      },
      VIDEO_SHARE: {
        constrains: Yup.object({
          youtubeUrl: Yup.string().required("Required").url("youtube link"),
        }),
        initValues: { youtubeUrl: "" },
      },
    },
  },
};

export default config;
