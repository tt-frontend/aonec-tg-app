import { api } from "@/api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";
import { createMutation } from "@farfetched/core";
import axios from "axios";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/login", payload);

export const initializeUser = (): Promise<InitializeResponse> =>
  api.post("Auth/initialization", {
    telegramUserInitData: Telegram.WebApp.initData,
  });

export const logoutUserMutation = createMutation({
  handler: () => axios.post("Auth/logout"),
});
