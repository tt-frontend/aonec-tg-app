import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useUnit } from "effector-react";
import { authService } from "@/services/authService";
import { useBackButton } from "@/services/backButton/backButtonService.hook";

const { AuthGate } = authService.gates;

export const Router = () => {
  useBackButton();

  const { isAuth, initToken } = useUnit({
    isAuth: authService.outputs.$isAuth,
    initToken: authService.outputs.$initToken,
  });

  const routes = useMemo(() => getRoutes(isAuth), [isAuth]);

  const router = useRoutes(routes);

  return (
    <>
      <AuthGate />
      {initToken && router}
    </>
  );
};
