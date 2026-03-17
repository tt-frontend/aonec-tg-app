import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import {
  Actions,
  Card,
  Description,
  TextWrapper,
  Title,
  Wrapper,
} from "./InstallAppPrompt.styled";
import { BeforeInstallPromptEvent } from "./InstallAppPrompt.types";

const DISMISS_STORAGE_KEY = `pwa-install-dismissed:${__APP_VERSION__}`;

const isAndroidDevice = () => /Android/i.test(window.navigator.userAgent);

const isStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  Boolean(
    (window.navigator as Navigator & { standalone?: boolean }).standalone,
  );

const shouldHideOnRoute = (pathname: string) =>
  /^\/tasks\/[^/]+$/.test(pathname);

export const InstallAppPrompt = () => {
  const { pathname } = useLocation();

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isStandaloneMode);
  const [isInstalling, setIsInstalling] = useState(false);

  const canShowPrompt = useMemo(
    () =>
      isAndroidDevice() &&
      !isInstalled &&
      !isDismissed &&
      !shouldHideOnRoute(pathname) &&
      deferredPrompt !== null,
    [deferredPrompt, isDismissed, isInstalled, pathname],
  );

  useEffect(() => {
    setIsDismissed(window.localStorage.getItem(DISMISS_STORAGE_KEY) === "1");
    setIsInstalled(isStandaloneMode());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    const handleDisplayModeChange = () => {
      setIsInstalled(isStandaloneMode());
    };

    mediaQuery.addEventListener("change", handleDisplayModeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
    };
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      if (!isAndroidDevice() || isStandaloneMode()) {
        return;
      }

      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      window.localStorage.removeItem(DISMISS_STORAGE_KEY);
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISS_STORAGE_KEY, "1");
    setIsDismissed(true);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } finally {
      setDeferredPrompt(null);
      setIsInstalling(false);
    }
  };

  if (!canShowPrompt) {
    return null;
  }

  return (
    <Wrapper>
      <Card>
        <TextWrapper>
          <Title>Установить приложение</Title>
          <Description>
            Добавьте приложение на экран домой, чтобы открывать его как обычное
            мобильное приложение.
          </Description>
        </TextWrapper>

        <Actions>
          <Button
            style={{ border: "1px solid white" }}
            type="primary"
            size="large"
            block
            onClick={handleDismiss}
          >
            Не сейчас
          </Button>
          <Button
            size="large"
            block
            onClick={() => void handleInstall()}
            loading={isInstalling}
          >
            Установить
          </Button>
        </Actions>
      </Card>
    </Wrapper>
  );
};
