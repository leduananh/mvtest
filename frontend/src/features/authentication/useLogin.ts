import { useCallback, useState } from "react";
import { LoginResponse, authService } from "../../services/auth";
import LoginForm from "./loginForm";
import { ApiError } from "../../shared/error";
import { LoggedUserInfo } from "./types";

export enum AlertType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

type SendLoginRqFn = (rqPayLoad: LoginForm) => Promise<void>;
type ToLoginActionPayLoadFn = (loginResponse: LoginResponse) => LoggedUserInfo;

interface UseLogin {
  sendLoginRequest: SendLoginRqFn;
  apiError: ApiError;
  loginResponse: LoginResponse;
  LoginResponseToLoginActionPayLoadFn: ToLoginActionPayLoadFn;
}

const useLogin = (): UseLogin => {
  const [apiError, setApiError] = useState<ApiError | any>(null);
  const [loginResponse, setLoginResponse] = useState<LoginResponse | any>(null);

  const sendLoginRequest: SendLoginRqFn = useCallback(async (rqPayLoad: LoginForm): Promise<void> => {
    try {
      setLoginResponse(await authService.login(rqPayLoad));
    } catch (error: ApiError | any) {
      setApiError(error);
    }
  }, []);

  const LoginResponseToLoginActionPayLoadFn : ToLoginActionPayLoadFn = useCallback((loginResponse: LoginResponse): LoggedUserInfo => {
    return {
      accessToken: loginResponse.accessToken,
      email: loginResponse.user.email,
      id: loginResponse.user.id,
    };
  }, []);

  return { sendLoginRequest, apiError, loginResponse, LoginResponseToLoginActionPayLoadFn };
};

export default useLogin;
