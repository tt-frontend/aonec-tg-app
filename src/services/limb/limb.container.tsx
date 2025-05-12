import { useUnit } from "effector-react";
import { authService } from "../authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton } from "antd";

export const LimbContainer = () => {
  const { handleSecretRecieved } = useUnit({
    handleSecretRecieved: authService.inputs.handleSecretRecieved,
  });

  const [params] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const telegramUserInitData = Telegram.WebApp.initData;

    if (telegramUserInitData) handleSecretRecieved(telegramUserInitData);
  }, [handleSecretRecieved, params]);

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return <Skeleton active />;
};
