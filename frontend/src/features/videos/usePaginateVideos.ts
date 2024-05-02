import { useCallback, useState } from "react";
import { ApiError } from "../../shared/error";
import _ from "lodash";
import { videoService, PaginateVideosRequestParams, PaginateVideosResponse } from "../../services/videos";

type GetVideoPageFn = (params: PaginateVideosRequestParams) => Promise<void>

interface UsePaginateVideos {
    isLoading: boolean;
    apiError: ApiError | null;
    paginateVideo: PaginateVideosResponse | null;
    setVideoPage: GetVideoPageFn;
}

const usePaginateVideos = (): UsePaginateVideos => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<ApiError | null>(null);
    const [paginateVideo, setPaginateVideo] = useState<PaginateVideosResponse | null>(null);

    const setVideoPage: GetVideoPageFn = useCallback(async (params) => {
        try {
            setIsLoading(true)
            setPaginateVideo(await videoService.getVideosPaginate(params))
            setIsLoading(false)
        } catch (error: ApiError | any) {
            setIsLoading(false)
            setApiError(error);
        }
    }, [])

    return { isLoading, setVideoPage, apiError, paginateVideo }
}

export default usePaginateVideos;
