import { createEffect, createEvent, createStore, sample } from "effector";
import { loginUser } from "./authService.api";
import { LoginResponse } from "@/api/types";
import { AxiosError } from "axios";

const handleSecretRecieved = createEvent<string>();

const fetchAuthTokenFx = createEffect<string, LoginResponse, AxiosError>(
  loginUser
);

const setAuthToken = createEvent<string>();

export const DEFAULT_TOKEN = null;

const $authToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.token;
  })
  .on(setAuthToken, (_, token) => token);

sample({
  source: $authToken,
  clock: handleSecretRecieved,
  filter: (token, telegramUserInitData) =>
    !token && Boolean(telegramUserInitData),
  fn: (_, telegramUserInitData) => telegramUserInitData,
  target: fetchAuthTokenFx,
});

fetchAuthTokenFx.failData.watch((e) => {
  const isForbidden = e.response?.status === 403 || e.response?.status === 401;

  if (isForbidden) Telegram.WebApp.close();
});

const $isAuth = $authToken.map(Boolean);

export const authService = {
  inputs: { handleSecretRecieved, setAuthToken },
  outputs: { $authToken, $isAuth },
};
