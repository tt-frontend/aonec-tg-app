import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { excludedRoutes } from "./backButtonService.constants";
import { backButtonService } from "./backButtonService.model";
import { useUnit } from "effector-react";

const { inputs } = backButtonService;

export function useBackButton() {
  const { handleBack } = useUnit({
    handleBack: inputs.handleBack,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const backButton = Telegram.WebApp.BackButton;

  useEffect(() => {
    if (!excludedRoutes.includes(location.pathname)) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [location.pathname, backButton]);

  useEffect(() => {
    return inputs.goBack.watch(() => navigate(-1)).unsubscribe;
  }, [navigate]);

  useEffect(() => {
    backButton.onClick(handleBack);
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
