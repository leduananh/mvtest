// src/middleware/webSocketMiddleware.ts
import { MiddlewareAPI, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { NOTI_SUBCRIPTION_ACTION_TYPE, WEBSOCKET_DISCONNECT_ACTION_TYPE } from "./action.ts";
import { webSocketService } from "../../services/websocket/websocketService.ts";
import { connected, disconnected, setError } from "./websocketSlice.ts";
import { commonHelper } from "../../utils/commontHelper.ts";
import { NotificationData } from "../../services/websocket/types.ts";
import {
  notiDisconnected,
  notiSubscribed,
  recievedNotiMsg,
} from "./notification/wsNotiChannelSlice.ts";

const webSocketMiddleware =
  (store: MiddlewareAPI<Dispatch<PayloadAction<void | Object | string>>, RootState>) =>
  (next: Dispatch<PayloadAction<void | Object | string>>) =>
  (action: PayloadAction<void | Object | string>) => {
    switch (action.type) {
      case NOTI_SUBCRIPTION_ACTION_TYPE:
        const accessToken = store.getState().auth.userInfo.accessToken;
        const channelName = commonHelper.checkEnvVariableExist(
          "VITE_SOCKET_NOTIFICATION_CHANNEL_NAME",
        );
        const socketUrl = commonHelper.checkEnvVariableExist(
          "VITE_SOCKET_BASE_URLVITE_SOCKET_BASE_URL",
        );
        const connectedCb = () => {
          commonHelper.wsInfoLog("Connected to notification channel");
          store.dispatch(notiSubscribed());
        };

        const receivedCb = (payload: NotificationData) => {
          commonHelper.wsInfoLog("Received data notification channel: " + payload);
          store.dispatch(recievedNotiMsg(payload));
        };

        const disconnectedCb = () => {
          commonHelper.wsInfoLog("DisConnected from notification channel");
          store.dispatch(notiDisconnected());
        };

        if (
          webSocketService.connect({
            accessToken,
            channelName,
            socketUrl,
            userAgent: navigator.userAgent,
            deviceFingerPrint: "1234",
          })
        ) {
          store.dispatch(connected());

          webSocketService.subscribeToChannel({
            channelName,
            connectedCb,
            receivedCb,
            disconnectedCb,
          });
        } else {
          store.dispatch(setError("Failed to connect WebSocket"));
        }
        break;
      case WEBSOCKET_DISCONNECT_ACTION_TYPE:
        if (webSocketService.socketDisconnect()) {
          store.dispatch(disconnected());
        } else {
          store.dispatch(setError("Failed to disconnect WebSocket."));
        }
        break;
      default:
        next(action);
        break;
    }
  };

export default webSocketMiddleware;
