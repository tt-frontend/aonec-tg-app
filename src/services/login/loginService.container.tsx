import { useUnit } from "effector-react";
import { authService } from "../authService";
import { LoginPage } from "./LoginPage";
import { useEffect } from "react";
import { message } from "antd";

export const LoginContainer = () => {
  const { handleLogin, isLoading, isAuth } = useUnit({
    handleLogin: authService.inputs.handleLoginUser,
    isLoading: authService.outputs.$isLoginLoading,
    isAuth: authService.outputs.$isAuth,
  });

  useEffect(() => {
    return authService.effect.fetchAuthTokenFx.failData.watch((e) => {
      if (!e) return;

      const msg =
        e?.response?.data?.error?.Text || e?.response?.data?.error?.Message;

      if (!msg) return;

      message.error(msg);
    }).unsubscribe;
  }, []);

  return (
    <>
      {isAuth && "Logged in"}
      <LoginPage handleLogin={handleLogin} isLoading={isLoading} />
    </>
  );
};
