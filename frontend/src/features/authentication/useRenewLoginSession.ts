import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { authService, RenewAccessTokenResponse, User } from "../../services/auth";
import { ApiError } from "../../shared/error";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "./authSelector";
import config from "../../app/config";
import _ from "lodash";
import { AlertType, useAlert } from "../../shared/hooks";
import { loginAction } from ".";

interface UseRenewLoginSession {
    isLoading: boolean;
}

const useRenewLoginSession = (): UseRenewLoginSession => {
    const { showAlert } = useAlert()
    const [renewAccessTokenResponse, setRenewAccessTokenResponse] = useState<RenewAccessTokenResponse | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [apiError, setApiError] = useState<ApiError | null>(null);
    const isLogin: boolean = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const loadAccessToken = useCallback(async (rft: string) => {
        try {
            setRenewAccessTokenResponse(await authService.renewAccessToken(rft))
        } catch (error: ApiError | any) {
            setApiError(error);
        }
    }, [])

    const reLoadUserProfileWithAccessToken = useCallback(async (act: string) => {
        try {
            setUserProfile(await authService.getUserProfile(act))
        } catch (error: ApiError | any) {
            setApiError(error);
        }
    }, [])

    
    useLayoutEffect(() => {
        const rft: string = localStorage.getItem(config.LOCAL_STORAGE.AUTH_TOKEN.KEY) || ""
        if (!isLogin && !_.isEmpty(rft)) {
            setIsLoading(true)
            setRefreshToken(rft)
            loadAccessToken(rft)
        }
    }, [isLogin])

    useEffect(() => {
        if (!_.isNil(renewAccessTokenResponse)) {
            reLoadUserProfileWithAccessToken(renewAccessTokenResponse.access_token)
        }
    }, [renewAccessTokenResponse])

    useEffect(() => {
        if (!_.isNil(userProfile) && !_.isNil(renewAccessTokenResponse) && !_.isNil(refreshToken) && !_.isEmpty(refreshToken)) {
            dispatch(loginAction({
                accessToken: renewAccessTokenResponse.access_token,
                refreshToken,
                user: {
                    email: userProfile.email,
                    id: userProfile.id,
                }
            }))
            showAlert("Hello " + userProfile.email, {type: AlertType.Info})
            setIsLoading(false)
        }
    }, [userProfile, renewAccessTokenResponse, refreshToken])

    useEffect(() => {
        if (!_.isNil(apiError)) {
            setIsLoading(false)
            showAlert("load user session fail: " + apiError.message, { type: AlertType.Error })
        }
    }, [apiError])

    return { isLoading }
}

export default useRenewLoginSession;
