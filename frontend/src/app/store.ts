import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Import combineReducers
import { webSocketRdc, wsNotiChannelRdc } from "../features/websocket";
import webSocketMiddleware from "../features/websocket/authMiddleware";
import { authReducer } from "../features/authentication";

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  websocket: webSocketRdc,
  notiChannel: wsNotiChannelRdc,
  auth: authReducer,
});

// Use the combined rootReducer when configuring the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(webSocketMiddleware as any),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
