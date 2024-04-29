import webSocketRdc, { connected, disconnected, setError } from "./websocketSlice.ts";
import wsNotiChannelRdc, {
  notiSubscribed,
  notiDisconnected,
  setNotiError,
  recievedNotiMsg,
} from "./notification/wsNotiChannelSlice.ts";
import useWebSocketWithAuth from "./webSocketHooks.ts";

export {
  webSocketRdc,
  wsNotiChannelRdc,
  connected,
  disconnected,
  setError,
  notiSubscribed,
  notiDisconnected,
  setNotiError,
  recievedNotiMsg,
  useWebSocketWithAuth,
};
