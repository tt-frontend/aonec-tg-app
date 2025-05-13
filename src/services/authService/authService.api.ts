import { api } from "@/api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/Login", payload);

export const initializeUser = (
  telegramUserInitData: string
): Promise<InitializeResponse> =>
  api.post("Auth/Initialization", { telegramUserInitData });
