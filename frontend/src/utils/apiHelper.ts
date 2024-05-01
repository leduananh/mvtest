import _ from "lodash"; // Import lodash library
import { ApiError } from "../shared/error";
import { AxiosError } from "axios";

const handleAxiosApiError = (error: AxiosError | any): ApiError => {
    let code: number = error.response?.status || 500;
    let message: string = error.response?.data?.msg || error.message || "server error";
    return new ApiError(code, message);
};

export const apiHelper = {
    handleAxiosApiError
};
