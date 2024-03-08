import React, { useEffect, useRef } from "react";

export const useWindowResize = (threshold, messageHandler, sidebarHandler) => {
  const prevWidth = useRef(window.innerWidth);

  const setDesktopLayout = () => {
    messageHandler(true);
    sidebarHandler((prev) => {
      if (!prev.chats && !prev.people) {
        return { chats: true, people: false };
      } else {
        return prev;
      }
    });
  }

  const setMobileLayout = () => {
    messageHandler(true);
    sidebarHandler({ chats: false, people: false });
  }

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
