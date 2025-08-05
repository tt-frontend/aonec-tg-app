import { IS_DEV_MODE } from "@/constants/devMode";
import { authService } from "@/services/authService";
import { checkUrl } from "@/utils";
import axios from "axios";

export const PROD_API_URL = "https://prod.aonec-bot.ru/api";
export const STAGE_API_URL = "https://stage.aonec-bot.ru/api";

export const BASE_API_URL = IS_DEV_MODE ? STAGE_API_URL : PROD_API_URL;

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${
    authService.outputs.$authToken.getState() ||
    authService.outputs.$initToken.getState()
  }`;
  req.headers["x-user-path"] = window.location.pathname || "none";
  req.params = {
    ...(req.params || {}),
  };

  if (req.url && checkUrl("Auth/refreshToken", req.url)) {
    req.data = {
      token: authService.outputs.$authToken.getState(),
      refreshToken: authService.outputs.$refreshToken.getState(),
    };
  }

  return req;
});

let refreshPromise: Promise<unknown> | null = null;
const clearPromise = () => (refreshPromise = null);

axios.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    const { url } = config;

    if (url && checkUrl("Auth/login|Auth/refreshToken", url)) {
      authService.inputs.setTokens(data);
    }

    return data;
  },
  async (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;

    if (status === 401 && checkUrl("Auth/refreshToken", url)) {
      authService.inputs.logoutUser();
      return;
    }

    if (status === 401 && checkUrl("Auth/initialization", url)) {
      Telegram.WebApp.close();
      return;
    }

    if (status === 401 && checkUrl("Auth/logout", url)) {
      return;
    }

    if (
      status === 401 &&
      !checkUrl("Auth/login|Auth/confirm", error.config.url)
    ) {
      const { config } = error;

      config._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios.post("/Auth/refreshToken").finally(clearPromise);
      }

      const token = await refreshPromise;
      config.headers.authorization = `Bearer ${token}`;

      return axios(config);
    }

    return Promise.reject(error);
  }
);

export const api = axios;
