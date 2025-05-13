import { api } from "@/api";
import { InitializeResponse, TokenResponse } from "@/api/types";

export const loginUser = (
  telegramUserInitData: string
): Promise<TokenResponse> => api.post("Auth/Login", { telegramUserInitData });

export const initializeUser = (
  telegramUserInitData: string
): Promise<InitializeResponse> =>
  api.post("Auth/Initialization", { telegramUserInitData });
