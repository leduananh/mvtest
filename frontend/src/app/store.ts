import { configureStore } from "@reduxjs/toolkit";
import { webSocketRdc, wsNotiChannelRdc } from "../features/websocket";
import { authReducer } from "../features/authentication";

export const store = configureStore({
  reducer: {
    websocket: webSocketRdc,
    notiChannel: wsNotiChannelRdc,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
