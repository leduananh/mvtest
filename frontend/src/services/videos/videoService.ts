import _ from "lodash";
import { AxiosError, AxiosInstance } from "axios";
import apiClient from "../../app/client";
import config from "../../app/config";
import { commonHelper } from "../../utils/commonHelper";
import { apiHelper } from "../../utils/apiHelper";
import { ApiError } from "../../shared/error";

export interface PaginateVideosRequestParams {
    page: number;
    perPage: number;
}

export interface PaginateVideosResponse {
    data: VideoDatum[];
    meta: PaginateMeta;
    [property: string]: any;
}

export interface VideoDatum {
    attributes: VideoAttributes;
    id: string;
    type: string;
    [property: string]: any;
}

export interface VideoAttributes {
    description: string;
    sharedBy: string;
    title: string;
    videoId: string;
    [property: string]: any;
}

export interface PaginateMeta {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_count: number;
    total_pages: number;
    [property: string]: any;
}

class VideoService {
    #client: AxiosInstance;
    #resourcePathPluralName: string;
    #resourcePathSingularName: string;

    constructor(
        client: AxiosInstance,
        resourcePathPluralName: string,
        resourcePathSingularName: string,
    ) {
        this.#client = client;
        this.#resourcePathPluralName = resourcePathPluralName;
        this.#resourcePathSingularName = resourcePathSingularName;
    }

    async getVideosPaginate(reqParams: PaginateVideosRequestParams): Promise<PaginateVideosResponse> {
        try {
            return await this.#client.get(
                `${this.#resourcePathPluralName}`,
                { params: reqParams });
        } catch (err: AxiosError | any) {
            throw this.#handleAxiosError(err)
        }
    }

    #handleAxiosError(err: AxiosError | any): ApiError {
        const apiError: ApiError = apiHelper.handleAxiosApiError(err);
        commonHelper.apiErrorLog(`status: ${apiError.statusCode}, msg: ${err.message}`)
        return apiError
    }
}

export const videoService = new VideoService(
    apiClient,
    config.CLIENT.RESOURCE.VIDEO.PATH.plural,
    config.CLIENT.RESOURCE.VIDEO.PATH.singular,
);
