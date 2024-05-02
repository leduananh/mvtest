import { useCallback, useState } from "react";
import { authService } from "../../services/auth";
import { ApiError } from "../../shared/error";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "./authSelector";
import _ from "lodash";
import { logoutAction } from ".";

interface UseLogout {
    isLoading: boolean;
    apiError: ApiError | null;
    sendLogOut: () => Promise<void>;
}

const useLogOut = (): UseLogout => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<ApiError | null>(null);
    const isLogin: boolean = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const sendLogOut = useCallback(async () => {
        try {
            if (isLogin) {
                setIsLoading(true)
                await authService.logout()
                dispatch(logoutAction())
                setIsLoading(false)
            }
        } catch (error: ApiError | any) {
            setIsLoading(false)
            setApiError(error);
        }
    }, [isLogin])

    return { isLoading, sendLogOut, apiError }
}

export default useLogOut;
