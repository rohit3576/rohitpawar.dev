import { useEffect, useState } from "react";

function getViewport() {
  if (typeof window === "undefined") {
    return { width: 1280, height: 720 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useResponsive() {
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    const onResize = () => setViewport(getViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { width, height } = viewport;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width <= 1024;
  const isDesktop = width > 1024;

  return { width, height, isMobile, isTablet, isDesktop };
}
