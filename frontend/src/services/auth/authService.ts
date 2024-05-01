import _ from "lodash";
import { AxiosError, AxiosInstance } from "axios";
import apiClient from "../../app/client";
import { LoginForm } from "../../features/authentication";
import config from "../../app/config";
import { commonHelper } from "../../utils/commonHelper";
import { apiHelper } from "../../utils/apiHelper";
import { ApiError } from "../../shared/error";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  [property: string]: any;
}

export interface User {
  email: string;
  id: string;
  [property: string]: any;
}

class AuthService {
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

  /**
   * @throws {ApiError} The error with the specified message.
   */
  async login(payload: LoginForm): Promise<LoginResponse> {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await this.#client.post(
        `${this.#resourcePathPluralName}/sign_in`,
        JSON.stringify({ user: payload }),
      );
      return { accessToken, refreshToken, user };
    } catch (err: AxiosError | any) {
      const apiError: ApiError = apiHelper.handleAxiosApiError(err);
      commonHelper.apiErrorLog(`status: ${apiError.statusCode}, msg: ${err.message}`)
      throw apiError;
    }
  }
}

export const authService = new AuthService(
  apiClient,
  config.CLIENT.RESOURCE.USER.PATH.plural,
  config.CLIENT.RESOURCE.USER.PATH.singular,
);
