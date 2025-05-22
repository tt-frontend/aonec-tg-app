import { createEffect, createEvent, createStore, sample } from "effector";
import { initializeUser, loginUser } from "./authService.api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";
import { EffectFailDataAxiosError } from "@/types";
import { persist } from "effector-storage/local";

const handleSecretRecieved = createEvent<string>();
const handleLoginUser = createEvent<LoginRequest>();
const logoutUser = createEvent<void>();
const setTokens = createEvent<TokenResponse>();

const initializeUserFx = createEffect<
  string,
  InitializeResponse,
  EffectFailDataAxiosError
>(initializeUser);

const fetchAuthTokenFx = createEffect<
  LoginRequest,
  TokenResponse,
  EffectFailDataAxiosError
>(loginUser);

export const DEFAULT_INIT_TOKEN = null;

const $initToken = createStore<string | null>(DEFAULT_INIT_TOKEN).on(
  initializeUserFx.doneData,
  (_, data) => data.token
);

const $authToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.token;
  })
  .on(setTokens, (_, { token }) => token)
  .reset(logoutUser);

const $refreshToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.refreshToken;
  })
  .on(setTokens, (_, { refreshToken }) => refreshToken)
  .reset(logoutUser);

persist({
  store: $authToken,
  key: "accessToken",
});

persist({
  store: $refreshToken,
  key: "refreshToken",
});

sample({
  clock: handleSecretRecieved,
  filter: (telegramUserInitData) => Boolean(telegramUserInitData),
  target: initializeUserFx,
});

sample({
  clock: handleLoginUser,
  target: fetchAuthTokenFx,
});

const $isAuth = $authToken.map(Boolean);

const $isLoginLoading = fetchAuthTokenFx.pending;

export const authService = {
  inputs: { handleSecretRecieved, handleLoginUser, logoutUser, setTokens },
  outputs: { $authToken, $initToken, $isAuth, $isLoginLoading },
  effect: { fetchAuthTokenFx },
};
