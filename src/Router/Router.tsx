import { useEffect, useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useUnit } from "effector-react";
import { authService } from "@/services/authService";
import { useBackButton } from "@/services/backButton/backButtonService.hook";

export const Router = () => {
  useBackButton();

  const { handleSecretRecieved, isAuth } = useUnit({
    isAuth: authService.outputs.$isAuth,
    handleSecretRecieved: authService.inputs.handleSecretRecieved,
  });

  useEffect(() => {
    const telegramUserInitData = Telegram.WebApp.initData;

    if (telegramUserInitData) handleSecretRecieved(telegramUserInitData);
  }, [handleSecretRecieved]);

  const routes = useMemo(() => getRoutes(isAuth), [isAuth]);

  const router = useRoutes(routes);

  return router;
};
