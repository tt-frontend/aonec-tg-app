import { api } from "@/api";
import { TokenResponse } from "@/api/types";

export const loginUser = (telegramUserInitData: string): Promise<TokenResponse> =>
  api.post("Auth/Login", { telegramUserInitData });
