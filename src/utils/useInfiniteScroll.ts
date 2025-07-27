import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  isActive: boolean = true,
  offset: number = 100
): void => {
  const isThrottled = useRef<boolean>(false);
  const isMounted = useRef<boolean>(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isMounted.current = true;

    const onScroll = () => {
      if (!isActive || isThrottled.current || !isMounted.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight >= fullHeight - offset) {
        isThrottled.current = true;
        callback();

        timeoutRef.current = setTimeout(() => {
          if (isMounted.current) {
            isThrottled.current = false;
          }
        }, 500);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, offset, isActive]);
};
