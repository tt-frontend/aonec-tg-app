import { api } from "@/api";
import {
  InitializeResponse,
  LoginRequest,
  LogoutRequest,
  TokenResponse,
} from "@/api/types";
import { createMutation } from "@farfetched/core";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/login", payload);

export const initializeUser = async (): Promise<InitializeResponse> => {
  const res: InitializeResponse = await api.post("Auth/initialization", {
    telegramUserInitData: Telegram.WebApp.initData,
  });

  return res;
};

export const logoutUserMutation = createMutation<LogoutRequest, void>({
  handler: (payload): Promise<void> => api.post("Auth/logout", payload),
});
