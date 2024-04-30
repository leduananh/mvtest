import { createConsumer, Consumer, Subscriptions } from "@rails/actioncable";
import { ChannelSubscription, ChannelSubscriptionData } from "./types";
import { commonHelper } from "../../utils/commonHelper";
import _ from "lodash";

class WebSocketService {
  cable: Consumer | null;
  channelMap: Map<string, Subscriptions>;

  constructor() {
    this.cable = null;
    this.channelMap = new Map();
  }

  connect(channelSubscriptionData: ChannelSubscriptionData): boolean {
    try {
      this.cable = createConsumer(`${channelSubscriptionData.socketUrl}`);

      // `${channelSubscriptionData.socketUrl}?userAgent=${channelSubscriptionData.userAgent}&token=${channelSubscriptionData.accessToken}&deviceFingerPrint=${channelSubscriptionData.deviceFingerPrint}`,
      // );
    } catch (err: Error | any) {
      commonHelper.wsErrorLog(err.message);
      return false;
    }
    return !_.isNull(this.cable) || !_.isUndefined(this.cable);
  }

  subscribeToChannel(channelSubscription: ChannelSubscription): boolean {
    if (_.isNull(this.cable) || _.isUndefined(this.cable)) {
      commonHelper.wsErrorLog("Socket connection not establish yet!");

      return false;
    }
    try {
      const channel: Subscriptions = this.cable.subscriptions.create(
        channelSubscription.channelName,
        {
          connected: channelSubscription.connectedCb,
          disconnected: channelSubscription.disconnectedCb,
          received: channelSubscription.receivedCb,
        },
      );

      this.channelMap.set(channelSubscription.channelName, channel);
    } catch (err: Error | any) {
      commonHelper.wsErrorLog(err.message);
      return false;
    }

    return true;
  }

  unSubscribeToChannel(channelName: string): boolean {
    try {
      this.channelMap.get(channelName)?.unsubscribe();
    } catch (err: Error | any) {
      commonHelper.wsErrorLog(err.message);
      return false;
    }
    return true;
  }

  socketDisconnect(): Boolean {
    if (_.isNil(this.cable)) {
      commonHelper.wsErrorLog("Socket connection not establish yet!");
      return false;
    }
    try {
      this.cable.disconnect();
    } catch (err: Error | any) {
      commonHelper.wsErrorLog(err.message);
      return false;
    }
    return true;
  }
}

export const webSocketService = new WebSocketService();
