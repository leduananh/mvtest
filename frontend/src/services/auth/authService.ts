import _ from "lodash";
import { AxiosError, AxiosInstance } from "axios";
import apiClient from "../../app/client";
import { LoginForm } from "../../features/authentication";
import config from "../../app/config";
import { commonHelper } from "../../utils/commonHelper";
import { apiHelper } from "../../utils/apiHelper";
import { ApiError } from "../../shared/error";

/**
 * RenewAccessTokenResponse
 */
export interface RenewAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  [property: string]: any;
}

/**
 * RenewAccessTokenRequest
 */
export interface RenewAccessTokenRequest {
  refreshToken: string;
  [property: string]: any;
}

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
      throw this.#handleAxiosError(err)
    }
  }

  async getUserProfile(accessToken: string): Promise<User> {
    try {
      const {
        data: { email, id },
      } = await this.#client.get(
        `${this.#resourcePathSingularName}/profile`,
        { headers: { 'Authorization': 'Bearer ' + accessToken } }
      );
      return { email, id };
    } catch (err: AxiosError | any) {
      throw this.#handleAxiosError(err)
    }
  }

  async renewAccessToken(refreshToken: string): Promise<RenewAccessTokenResponse> {
    try {
      const rqPayLoad: RenewAccessTokenRequest = {
        refreshToken: refreshToken
      }

      const {
        data: { access_token, expires_in, token_type },
      } = await this.#client.post(
        `/auth/token/renew`, JSON.stringify(rqPayLoad)
      );

      return { access_token, expires_in, token_type };
    } catch (err: AxiosError | any) {
      throw this.#handleAxiosError(err)
    }
  }

  async logout(): Promise<void> {
    try {
      await this.#client.post(
        `${this.#resourcePathPluralName}/sign_out`
      );
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

export const authService = new AuthService(
  apiClient,
  config.CLIENT.RESOURCE.USER.PATH.plural,
  config.CLIENT.RESOURCE.USER.PATH.singular,
);
