import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const FocusModeContext = createContext(undefined);
const FOCUS_MODE_KEY = 'omShantiFocusMode';
const FOCUS_MODE_CLASS = 'omshanti-focus-mode';

export function FocusModeProvider({ children }) {
  const [isFocusMode, setIsFocusMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(FOCUS_MODE_KEY) === 'true';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.localStorage.setItem(FOCUS_MODE_KEY, String(isFocusMode));
    document.body.classList.toggle(FOCUS_MODE_CLASS, isFocusMode);

    return () => {
      document.body.classList.remove(FOCUS_MODE_CLASS);
    };
  }, [isFocusMode]);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isFocusMode,
      setIsFocusMode,
      toggleFocusMode,
    }),
    [isFocusMode, toggleFocusMode]
  );

  return <FocusModeContext.Provider value={value}>{children}</FocusModeContext.Provider>;
}

export function useFocusMode() {
  const context = useContext(FocusModeContext);

  if (!context) {
    throw new Error('useFocusMode must be used within a FocusModeProvider.');
  }

  return context;
}
