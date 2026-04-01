import { useEffect, useState } from "react";
import type { TelegramWebApps } from "telegram-webapps-types-new";

type TelegramSdk = TelegramWebApps.SDK;
type TelegramWebApp = TelegramSdk["WebApp"];

declare global {
  interface Window {
    Telegram?: TelegramSdk;
  }
}

const TELEGRAM_SDK_URL = "https://telegram.org/js/telegram-web-app.js";
const TELEGRAM_SCRIPT_ID = "telegram-web-app-sdk";

let telegramWebAppPromise: Promise<TelegramWebApp | null> | null = null;

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.Telegram?.WebApp ?? null;
};

const attachScriptListeners = (
  script: HTMLScriptElement,
  resolve: (webApp: TelegramWebApp | null) => void
) => {
  const handleLoad = () => {
    script.dataset.telegramSdkStatus = "loaded";
    resolve(getTelegramWebApp());
  };

  const handleError = () => {
    script.dataset.telegramSdkStatus = "failed";
    telegramWebAppPromise = null;
    resolve(null);
  };

  script.addEventListener("load", handleLoad, { once: true });
  script.addEventListener("error", handleError, { once: true });
};

const createTelegramScript = () => {
  const script = document.createElement("script");

  script.id = TELEGRAM_SCRIPT_ID;
  script.src = TELEGRAM_SDK_URL;
  script.async = true;
  script.defer = true;
  script.dataset.telegramSdkStatus = "loading";

  return script;
};

export const loadTelegramWebApp = (): Promise<TelegramWebApp | null> => {
  const telegramWebApp = getTelegramWebApp();

  if (telegramWebApp) {
    return Promise.resolve(telegramWebApp);
  }

  if (typeof document === "undefined") {
    return Promise.resolve(null);
  }

  if (telegramWebAppPromise) {
    return telegramWebAppPromise;
  }

  telegramWebAppPromise = new Promise((resolve) => {
    const existingScript = document.getElementById(
      TELEGRAM_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript?.dataset.telegramSdkStatus === "loaded") {
      resolve(getTelegramWebApp());
      return;
    }

    if (existingScript?.dataset.telegramSdkStatus === "failed") {
      existingScript.remove();
    }

    const script =
      existingScript?.dataset.telegramSdkStatus === "loading"
        ? existingScript
        : createTelegramScript();

    attachScriptListeners(script, resolve);

    if (!script.isConnected) {
      document.head.append(script);
    }
  });

  return telegramWebAppPromise;
};

export const useTelegramWebApp = () => {
  const [telegramWebApp, setTelegramWebApp] = useState<TelegramWebApp | null>(
    () => getTelegramWebApp()
  );

  useEffect(() => {
    if (telegramWebApp) {
      return;
    }

    let isCancelled = false;

    void loadTelegramWebApp().then((loadedTelegramWebApp) => {
      if (!isCancelled && loadedTelegramWebApp) {
        setTelegramWebApp(loadedTelegramWebApp);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [telegramWebApp]);

  return telegramWebApp;
};
