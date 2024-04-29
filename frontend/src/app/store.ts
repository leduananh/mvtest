import { configureStore } from "@reduxjs/toolkit";
import { webSocketRdc, wsNotiChannelRdc } from "../features/websocket";
import webSocketMiddleware from "../features/websocket/authMiddleware";
import { authReducer } from "../features/authentication";

export const store: any = configureStore({
  reducer: {
    websocket: webSocketRdc,
    notiChannel: wsNotiChannelRdc,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(webSocketMiddleware as any),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
