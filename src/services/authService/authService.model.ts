import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import {
  loginUser,
  logoutUserMutation,
} from "./authService.api";
import {
  LoginRequest,
  LogoutRequest,
  TokenResponse,
} from "@/api/types";
import { EffectFailDataAxiosError } from "@/types";
import { persist } from "effector-storage/local";
import { createGate } from "effector-react";

const handleLoginUser = createEvent<LoginRequest>();
const logoutUser = createEvent<void>();
const setTokens = createEvent<TokenResponse>();

const AuthGate = createGate();

const fetchAuthTokenFx = createEffect<
  LoginRequest,
  TokenResponse,
  EffectFailDataAxiosError
>(loginUser);

export const DEFAULT_INIT_TOKEN = null;

const $authToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.token;
  })
  .on(setTokens, (_, { token }) => token)
  .reset(logoutUserMutation.finished.finally);

const $refreshToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.refreshToken;
  })
  .on(setTokens, (_, { refreshToken }) => refreshToken)
  .reset(logoutUserMutation.finished.finally);

persist({
  store: $authToken,
  key: "accessToken",
});

persist({
  store: $refreshToken,
  key: "refreshToken",
});

sample({
  clock: handleLoginUser,
  target: fetchAuthTokenFx,
});

const $logoutRequest = combine(
  $authToken,
  $refreshToken,
  (token, refreshToken) =>
    ({
      token: token as string,
      refreshToken: refreshToken as string,
    } as LogoutRequest)
);

logoutUserMutation.finished.finally.watch(() => {
  setTimeout(() => {
    window.location.reload();
  }, 10);
});

sample({
  source: $logoutRequest,
  clock: logoutUser,
  target: logoutUserMutation.start,
});

const $isAuth = $authToken.map(Boolean);

const $isLoginLoading = fetchAuthTokenFx.pending;

export const authService = {
  inputs: { handleLoginUser, logoutUser, setTokens },
  outputs: { $authToken, $refreshToken, $isAuth, $isLoginLoading },
  effect: { fetchAuthTokenFx },
  gates: { AuthGate },
};
