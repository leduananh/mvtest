import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { NOTI_SUBCRIPTION_ACTION_TYPE, WEBSOCKET_DISCONNECT_ACTION_TYPE } from "./action";

function useWebSocketWithAuth() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch({
        type: NOTI_SUBCRIPTION_ACTION_TYPE,
      });

      return () => {
        dispatch({
          type: WEBSOCKET_DISCONNECT_ACTION_TYPE,
        });
      };
    }
  }, [isLoggedIn, dispatch]);
}

export default useWebSocketWithAuth;
