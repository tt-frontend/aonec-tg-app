import { api } from "@/api";
import { LoginResponse } from "@/api/types";

export const loginUser = (telegramUserInitData: string): Promise<LoginResponse> =>
  api.post("Auth/Login", { telegramUserInitData });
