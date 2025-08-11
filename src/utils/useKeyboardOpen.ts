import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        viewportHeight: number;
        viewportStableHeight: number;
        onEvent?: (event: string, cb: () => void) => void;
        offEvent?: (event: string, cb: () => void) => void;
      };
    };
  }
}

type Opts = {
  debug?: boolean;
  // пикселей — порог для определения "существенного" уменьшения viewport
  threshold?: number;
  // ms — сколько ждать стабильности после изменения, прежде чем решать open/close
  stableDelay?: number;
};

export const useKeyboardOpen = (opts?: Opts) => {
  const { debug = false, threshold = 100, stableDelay = 120 } = opts || {};
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const lastViewportRef = useRef<{ initial: number; last: number } | null>(
    null
  );
  const pollIdRef = useRef<number | null>(null);

  useEffect(() => {
    const log = (...args: unknown[]) =>
      debug && console.log("[useKeyboardOpen]", ...args);

    const isTextInput = (el: Element | null) => {
      if (!el) return false;
      const tag = (el as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return true;
      if ((el as HTMLElement).isContentEditable) return true;
      try {
        if (
          (el as HTMLElement).matches &&
          (el as HTMLElement).matches('[role="textbox"]')
        )
          return true;
      } catch {
        /* ignore */
      }
      return false;
    };

    const getViewportHeight = () =>
      window.visualViewport?.height ?? window.innerHeight;
    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const scheduleCheck = (delay = stableDelay) => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        checkKeyboard();
        timerRef.current = null;
      }, delay);
    };

    const setOpen = (v: boolean) => {
      log("setOpen ->", v);
      setIsKeyboardOpen(v);
    };

    const checkKeyboard = () => {
      const viewportHeight = getViewportHeight();
      if (!lastViewportRef.current) {
        lastViewportRef.current = {
          initial: viewportHeight,
          last: viewportHeight,
        };
      }
      const { initial } = lastViewportRef.current;
      const diff = initial - viewportHeight;
      const focused = isTextInput(document.activeElement);
      log("checkKeyboard", { initial, viewportHeight, diff, focused });

      if (focused && diff > threshold) {
        setOpen(true);
        return;
      }

      // consider closed if no focus or viewport nearly back to initial
      if (
        !focused ||
        viewportHeight >= initial - Math.min(50, Math.floor(threshold / 2))
      ) {
        setOpen(false);
      }
    };

    // handlers (named so we can remove them)
    const handleFocusIn = () => {
      log("focusin");
      lastViewportRef.current = {
        initial: getViewportHeight(),
        last: getViewportHeight(),
      };
      scheduleCheck(60);
    };
    const handleFocusOut = () => {
      log("focusout");
      clearTimer();
      setOpen(false);
    };
    const handleResize = () => {
      log("resize");
      scheduleCheck(100);
    };

    // Telegram WebApp path
    const tg = Telegram?.WebApp;
    if (tg) {
      log("Telegram.WebApp detected", {
        viewportHeight: tg.viewportHeight,
        viewportStableHeight: tg.viewportStableHeight,
      });

      // baseline: try to use stableHeight if present
      lastViewportRef.current = {
        initial: tg.viewportStableHeight || getViewportHeight(),
        last: tg.viewportHeight || getViewportHeight(),
      };

      const onViewportChanged = () => {
        log("tg.viewportChanged", {
          viewportHeight: tg.viewportHeight,
          viewportStableHeight: tg.viewportStableHeight,
        });
        // update last and schedule check
        lastViewportRef.current = lastViewportRef.current || {
          initial: tg.viewportStableHeight || getViewportHeight(),
          last: tg.viewportHeight || getViewportHeight(),
        };
        lastViewportRef.current.last = tg.viewportHeight || getViewportHeight();
        scheduleCheck(60);
      };

      // prefer onEvent/offEvent if present
      if (
        typeof tg.onEvent === "function" &&
        typeof tg.offEvent === "function"
      ) {
        tg.onEvent("viewportChanged", onViewportChanged);
      } else {
        // fallback: poll viewport values while focused
        pollIdRef.current = window.setInterval(() => {
          const vh = tg.viewportHeight;
          if (typeof vh === "number") {
            if (
              !lastViewportRef.current ||
              lastViewportRef.current.last !== vh
            ) {
              lastViewportRef.current = lastViewportRef.current || {
                initial: tg.viewportStableHeight || getViewportHeight(),
                last: vh,
              };
              lastViewportRef.current.last = vh;
              onViewportChanged();
            }
          }
        }, 150) as unknown as number;
      }

      window.addEventListener("focusin", handleFocusIn);
      window.addEventListener("focusout", handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleResize);
      } else {
        window.addEventListener("resize", handleResize);
      }

      return () => {
        if (typeof tg.offEvent === "function") {
          tg.offEvent("viewportChanged", onViewportChanged);
        } else if (pollIdRef.current) {
          window.clearInterval(pollIdRef.current);
          pollIdRef.current = null;
        }
        window.removeEventListener("focusin", handleFocusIn);
        window.removeEventListener("focusout", handleFocusOut);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener("resize", handleResize);
        } else {
          window.removeEventListener("resize", handleResize);
        }
        clearTimer();
      };
    }

    // Non-Telegram path
    lastViewportRef.current = {
      initial: getViewportHeight(),
      last: getViewportHeight(),
    };
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      } else {
        window.removeEventListener("resize", handleResize);
      }
      clearTimer();
      if (pollIdRef.current) {
        window.clearInterval(pollIdRef.current);
        pollIdRef.current = null;
      }
    };
  }, [debug, threshold, stableDelay]);

  return isKeyboardOpen;
};
