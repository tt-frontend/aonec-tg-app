import { api } from "@/api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";
import { createMutation } from "@farfetched/core";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/login", payload);

export const initializeUser = async (): Promise<InitializeResponse> => {
  const res: InitializeResponse = await api.post("Auth/initialization", {
    telegramUserInitData: Telegram.WebApp.initData,
  });

  return res;
};

export const logoutUserMutation = createMutation({
  handler: () => api.post("Auth/logout"),
});
