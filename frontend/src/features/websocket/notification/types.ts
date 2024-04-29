import { NotificationData } from "../../../services/websocket";

export interface WSChannel {
  channelName: string | null; // Connection status
  isConnected: boolean | null; // Array of messages received
  messages: NotificationData[]; // Array of messages received
  channelError: string | null;
}
