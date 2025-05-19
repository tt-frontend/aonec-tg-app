import { useUnit } from "effector-react";
import { authService } from "../authService";
import { LoginPage } from "./LoginPage";
import { useEffect } from "react";
import useMessage from "antd/es/message/useMessage";

export const LoginContainer = () => {
  const { handleLogin, isLoading, isAuth } = useUnit({
    handleLogin: authService.inputs.handleLoginUser,
    isLoading: authService.outputs.$isLoginLoading,
    isAuth: authService.outputs.$isAuth,
  });

  const [messageApi, contextHolder] = useMessage();

  useEffect(() => {
    return authService.effect.fetchAuthTokenFx.failData.watch((e) => {
      messageApi.error(e?.response?.data?.error?.Text);
    }).unsubscribe;
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      {isAuth && "Logged in"}
      <LoginPage handleLogin={handleLogin} isLoading={isLoading} />
    </>
  );
};
