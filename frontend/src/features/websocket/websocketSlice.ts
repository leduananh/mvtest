import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WebSocketState } from "./types";
import { SliceNames } from "../../app/sliceNames";
import _ from "lodash";

const wsInitialState: WebSocketState = {
  isConnected: false,
  error: null,
};

export const websocketSlice = createSlice({
  name: SliceNames.WebSocket,
  initialState: wsInitialState,
  reducers: {
    connected: (state) => {
      state.isConnected = true;
    },
    disconnected: (state) => {
      state.isConnected = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
    },
  },
});

export const { connected, disconnected, setError } = websocketSlice.actions;

export default websocketSlice.reducer;
