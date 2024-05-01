import { useCallback, useState } from "react";
import { LoginResponse, authService } from "../../services/auth";
import LoginForm from "./loginForm";
import { ApiError } from "../../shared/error";

export enum AlertType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

type SendLoginRqFn = (rqPayLoad: LoginForm) => Promise<void>;

interface UseLogin {
  sendLoginRequest: SendLoginRqFn;
  apiError: ApiError;
  loginResponse: LoginResponse;
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

  return { sendLoginRequest, apiError, loginResponse };
};

export default useLogin;
