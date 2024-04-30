import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoggedUserInfo } from "./types";
import { SliceNames } from "../../app/sliceNames";
import { commonHelper } from "../../utils/commonHelper";

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
    login: (state: AuthState, action: PayloadAction<LoggedUserInfo>) => {
      commonHelper.reduxInfoLog("Setting auth login state");
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      commonHelper.reduxInfoLog("Setted auth login state");
    },
    logout: (state: AuthState) => {
      commonHelper.reduxInfoLog("Setting auth logout state");
      state = authInitialState;
      commonHelper.reduxInfoLog("Setted auth logout state");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
