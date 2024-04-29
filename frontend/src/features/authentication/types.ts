export interface AuthState {
  isLoggedIn: boolean;
  userInfo: LoggedUserInfo;
}

export interface LoggedUserInfo {
  id: string | null;
  email: string | null;
  accessToken: string | null;
}
