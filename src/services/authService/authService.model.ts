import { createEffect, createEvent, createStore, sample } from "effector";
import { initializeUser, loginUser } from "./authService.api";
import { InitializeResponse, LoginRequest, TokenResponse } from "@/api/types";
import { EffectFailDataAxiosError } from "@/types";

const handleSecretRecieved = createEvent<string>();
const handleLoginUser = createEvent<LoginRequest>();

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

export const DEFAULT_INIT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUZ1VzZXJJZCI6IjE3NjcyNDIwNzMiLCJuYmYiOjE3NDcxMjY1NDgsImV4cCI6MTc0NzEyNzE0OCwiaWF0IjoxNzQ3MTI2NTQ4fQ.gzE6GJqiFz_Gaa4DQg2EhiC63HqQ6bd5aD7f0Jl9nv8";

const $initToken = createStore<string | null>(DEFAULT_INIT_TOKEN).on(
  initializeUserFx.doneData,
  (_, data) => data.token
);

const $authToken = createStore<null | string>(null).on(
  fetchAuthTokenFx.doneData,
  (_, data) => {
    return data.token;
  }
);

sample({
  clock: handleSecretRecieved,
  filter: (telegramUserInitData) => Boolean(telegramUserInitData),
  target: initializeUserFx,
});

sample({
  clock: handleLoginUser,
  target: fetchAuthTokenFx,
});

fetchAuthTokenFx.failData.watch((e) => {
  const isForbidden = e.response?.status === 403 || e.response?.status === 401;

  if (isForbidden) Telegram.WebApp.close();
});

const $isAuth = $authToken.map(Boolean);

const $isLoginLoading = fetchAuthTokenFx.pending;

export const authService = {
  inputs: { handleSecretRecieved, handleLoginUser },
  outputs: { $authToken, $initToken, $isAuth, $isLoginLoading },
  effect: { fetchAuthTokenFx },
};
