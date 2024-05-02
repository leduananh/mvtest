import { SnackbarOrigin } from "notistack";
import * as Yup from "yup";
import { HeaderLoginForm, LoginForm, SignUpForm } from "../features/authentication";
import { VideoShareForm } from "../features/videos";

export interface AppConfig {
  CLIENT: {
    BASE_URL: string;
    TIMEOUT: number;
    RESOURCE: {
      USER: {
        PATH: {
          plural: string;
          singular: string;
        };
      };
      VIDEO: {
        PATH: {
          plural: string;
          singular: string;
        };
      };
    };
  };
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
  LOCAL_STORAGE: {
    AUTH_TOKEN: {
      KEY: string
    }
  },
  COMMON: {
    PAGINATE: {
      per_page: number
    }
  }
}

const config: AppConfig = {
  CLIENT: {
    BASE_URL: "http://127.0.0.1:3658/m1/525412-485933-default/api/v1",
    TIMEOUT: 10000,
    RESOURCE: {
      USER: {
        PATH: {
          plural: "/users",
          singular: "/user",
        },
      },
      VIDEO: {
        PATH: {
          plural: "/videos",
          singular: "/video",
        },
      }
    },
  },
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
        }),
        initValues: { email: "", password: "" },
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
          youtubeUrl: Yup.string().required("Required").url("youtube link")
        }),
        initValues: { youtubeUrl: "" },
      },
    },
  },
  LOCAL_STORAGE: {
    AUTH_TOKEN: {
      KEY: "rft",
    },
  },
  COMMON: {
    PAGINATE: {
      per_page: 10
    }
  }
};

export default config;
