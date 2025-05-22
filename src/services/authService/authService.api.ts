import { api } from "@/api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";
import { createMutation } from "@farfetched/core";
import axios from "axios";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/login", payload);

export const initializeUser = (
  telegramUserInitData: string
): Promise<InitializeResponse> =>
  api.post("Auth/initialization", { telegramUserInitData: telegramUserInitData });

export const logoutUserMutation = createMutation({
  handler: () => axios.post("Auth/logout"),
})