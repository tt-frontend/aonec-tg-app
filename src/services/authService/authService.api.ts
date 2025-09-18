import { api } from "@/api";
import {
  LoginRequest,
  LogoutRequest,
  TokenResponse,
} from "@/api/types";
import { createMutation } from "@farfetched/core";

export const loginUser = (payload: LoginRequest): Promise<TokenResponse> =>
  api.post("Auth/login", payload);

export const logoutUserMutation = createMutation<LogoutRequest, void>({
  handler: (payload): Promise<void> => api.post("Auth/logout", payload),
});
