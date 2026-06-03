import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const FullscreenContext = createContext(undefined);

const getIsFullscreen = () => {
  if (typeof document === 'undefined') {
    return false;
  }

  return Boolean(document.fullscreenElement);
};

export function FullscreenProvider({ children }) {
  const [isFullscreen, setIsFullscreen] = useState(getIsFullscreen);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const handleChange = () => {
      setIsFullscreen(getIsFullscreen());
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === 'undefined') {
      return;
    }

    if (!document.fullscreenEnabled) {
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  }, []);

  const value = useMemo(
    () => ({
      isFullscreen,
      toggleFullscreen,
    }),
    [isFullscreen, toggleFullscreen]
  );

  return <FullscreenContext.Provider value={value}>{children}</FullscreenContext.Provider>;
}

export function useFullscreen() {
  const context = useContext(FullscreenContext);

  if (!context) {
    throw new Error('useFullscreen must be used within a FullscreenProvider.');
  }

  return context;
}
