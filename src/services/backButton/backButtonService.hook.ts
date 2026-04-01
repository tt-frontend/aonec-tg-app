import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { excludedRoutes } from "./backButtonService.constants";
import { backButtonService } from "./backButtonService.model";
import { useUnit } from "effector-react";
import { useTelegramWebApp } from "../telegram/telegramWebApp";

const { inputs, outputs } = backButtonService;

export function useBackButton() {
  const { handleBack, goBackHandler } = useUnit({
    handleBack: inputs.handleBack,
    goBackHandler: outputs.$goBackHandler,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const telegramWebApp = useTelegramWebApp();

  const backButton = telegramWebApp?.BackButton;

  useEffect(() => {
    if (!backButton) return;

    if (!excludedRoutes.includes(location.pathname)) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [location.pathname, backButton]);

  useEffect(() => {
    return inputs.goBack.watch(() => {
      if (!goBackHandler) navigate(-1);
    }).unsubscribe;
  }, [navigate, goBackHandler]);

  useEffect(() => {
    if (!backButton) return;

    backButton.onClick(handleBack);

    return () => {
      backButton.offClick(handleBack);
    };
  }, [backButton, handleBack]);
}

export function useHandleBackButton(callback: VoidFunction | null) {
  const { setGoBackHandler } = useUnit({
    setGoBackHandler: inputs.setGoBackHandler,
  });

  useEffect(() => {
    setGoBackHandler(callback);

    return () => void setGoBackHandler(null);
  }, [callback, setGoBackHandler]);
}
