import { Selector, createSelector } from '@reduxjs/toolkit';
import { RootState } from "../../app/store.ts";
import { AuthState, LoggedUserInfo } from './types.ts';

const authState: Selector<RootState, AuthState> = (state: RootState) => state.auth;

const selectAuthState = createSelector(
    authState,
    (state: AuthState): AuthState => state
);
const selectIsLoggedIn = createSelector(
    authState,
    (state: AuthState): boolean => state.isLoggedIn
);

const selectUserInfo = createSelector(
    authState,
    (state: AuthState): LoggedUserInfo => state.userInfo
);

export { selectAuthState, selectIsLoggedIn, selectUserInfo }