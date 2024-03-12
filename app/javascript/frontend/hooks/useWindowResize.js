import { useEffect, useRef } from "react";

export const useWindowResize = (threshold, visibilityHandler) => {
  const prevWidth = useRef(window.innerWidth);

  const setDesktopLayout = () => {
    visibilityHandler((prev) => {
      if (!prev.chats && !prev.people) {
        return { messages: true, chats: true, people: false };
      }
      return { messages: true, chats: prev.chats, people: prev.people };
    });
  };

  const setMobileLayout = () => {
    visibilityHandler({ messages: true, chats: false, people: false });
  };

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth;
      if (currWidth <= threshold && prevWidth.current > threshold) {
        setMobileLayout();
      } else if (currWidth > threshold && prevWidth.current <= threshold) {
        setDesktopLayout();
      }
      prevWidth.current = currWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};
