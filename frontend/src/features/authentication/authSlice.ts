import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { SliceNames } from "../../app/sliceNames";
import { commonHelper } from "../../utils/commonHelper";
import { LoginResponse } from "../../services/auth";
import config from "../../app/config";

const authInitialState: AuthState = {
  isLoggedIn: false,
  userInfo: {
    id: null,
    email: null,
    accessToken: null,
  },
};

export const authSlice = createSlice({
  name: SliceNames.Auth,
  initialState: authInitialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginResponse>) => {
      commonHelper.reduxInfoLog("Setting auth login state");
      state.isLoggedIn = true;
      state.userInfo = { accessToken: action.payload.accessToken, email: action.payload.user.email, id: action.payload.user.id };
      localStorage.setItem(config.LOCAL_STORAGE.AUTH_TOKEN.KEY, action.payload.refreshToken)
      commonHelper.reduxInfoLog("Setted auth login state");
    },
    logout: (state: AuthState) => {
      commonHelper.reduxInfoLog("Setting auth logout state");
      state.isLoggedIn = authInitialState.isLoggedIn;
      state.userInfo = authInitialState.userInfo
      localStorage.removeItem(config.LOCAL_STORAGE.AUTH_TOKEN.KEY)
      commonHelper.reduxInfoLog("Setted auth logout state");
    },
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
