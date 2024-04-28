import { useEffect } from "react";
import { cable } from "./socket";
// import { getSocket } from "./socket";

const useSocket = () => {
  useEffect(() => {
    const subscription = cable.subscriptions.create("NotificationChannel", {
      connected: () => console.log('connected'),
      disconnected: () => console.log('disconnected'),
      received: (data: any) => {
        console.log(data)
      },
    });

    return () => {
      // Clean up event listeners if component unmounts
      subscription.disconnected()
    };
  }, []);
};

export default useSocket;
