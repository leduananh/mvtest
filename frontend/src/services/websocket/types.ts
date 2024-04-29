export interface ChannelSubscription {
  channelName: string;
  connectedCb: () => void;
  disconnectedCb: () => void;
  receivedCb: (data: NotificationData) => void;
}

export interface NotificationData {
  title: string;
  body: string;
}

export interface ChannelSubscriptionData {
  channelName: string | null;
  socketUrl: string | null;
  userAgent: string | null;
  accessToken: string | null;
  deviceFingerPrint: string | null;
}
