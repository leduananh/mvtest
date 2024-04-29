import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WSChannel } from "./types.ts";
import { SliceNames } from "../../../app/sliceNames";
import { NotificationData } from "../../../services/websocket";
import { commonHelper } from "../../../utils/commontHelper.ts";
import _ from "lodash";

const channelName = commonHelper.checkEnvVariableExist(
  import.meta.env.VITE_SOCKET_NOTIFICATION_CHANNEL_NAME,
);

const wsNotiChannelInitialState: WSChannel = {
  channelName,
  isConnected: false,
  messages: [],
  channelError: null,
};

export const notificationChannelSlice = createSlice({
  name: SliceNames.notiChannel,
  initialState: wsNotiChannelInitialState,
  reducers: {
    notiSubscribed: (state: WSChannel) => {
      commonHelper.reduxInfoLog("Setting noti subcribe state");
      state.isConnected = true;
      commonHelper.reduxInfoLog("Setted noti subcribe state");
    },
    notiDisconnected: (state: WSChannel) => {
      commonHelper.reduxInfoLog("Setting noti disconnect state");
      state = wsNotiChannelInitialState;
      commonHelper.reduxInfoLog("Setted noti disconnect state");
    },
    recievedNotiMsg: (state: WSChannel, action: PayloadAction<NotificationData>) => {
      commonHelper.reduxInfoLog("Setting noti message state");
      state.messages.push(action.payload);
      state.messages = _.cloneDeep(state.messages);
      commonHelper.reduxInfoLog("Setted noti message state");
    },
    setNotiError: (
      state: WSChannel,
      action: PayloadAction<{ isConnected: boolean; msg: string }, string>,
    ) => {
      commonHelper.reduxInfoLog("Setting noti error state");
      const { msg, isConnected } = action.payload;
      state.isConnected = isConnected;
      state.channelError = msg;
      commonHelper.reduxInfoLog("Setted noti error state");
    },
  },
});

export const { notiSubscribed, notiDisconnected, setNotiError, recievedNotiMsg } =
  notificationChannelSlice.actions;

export default notificationChannelSlice.reducer;
