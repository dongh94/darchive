"use client";

import { useEffect } from "react";

let lockCount = 0;
let lockedScrollY = 0;
let previousBodyStyles: Partial<Record<keyof CSSStyleDeclaration, string>> = {};
let previousHtmlOverscrollBehavior = "";

export function useBodyScrollLock() {
  useEffect(() => {
    lockCount += 1;

    if (lockCount === 1) {
      lockedScrollY = window.scrollY;
      previousBodyStyles = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
      };
      previousHtmlOverscrollBehavior =
        document.documentElement.style.overscrollBehavior;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overscrollBehavior = "none";
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount !== 0) {
        return;
      }

      document.body.style.overflow = previousBodyStyles.overflow ?? "";
      document.body.style.position = previousBodyStyles.position ?? "";
      document.body.style.top = previousBodyStyles.top ?? "";
      document.body.style.width = previousBodyStyles.width ?? "";
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior;
      window.scrollTo(0, lockedScrollY);
    };
  }, []);
}
