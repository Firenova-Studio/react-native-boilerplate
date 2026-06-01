import type { PropsWithChildren } from 'react';

import { createContext, useCallback, useMemo, useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { storage } from '@/shared/lib/storage';

import { appThemes } from '../createTheme';
import type { Variant } from '../types/config';
import type { Theme } from '../types/theme';
import { getInitialTheme, THEME_STORAGE_KEY } from '../unistyles';

type Context = {
  changeTheme: (variant: Variant) => void;
} & Theme;

export const ThemeContext = createContext<Context | undefined>(undefined);

function ThemeProvider({ children = false }: PropsWithChildren) {
  const [variant, setVariant] = useState<Variant>(getInitialTheme);

  const changeTheme = useCallback(
    (nextVariant: Variant) => {
      setVariant(nextVariant);
      storage.set(THEME_STORAGE_KEY, nextVariant);
      UnistylesRuntime.setTheme(nextVariant);
    },
    [],
  );

  const value = useMemo(() => {
    return { ...appThemes[variant], changeTheme };
  }, [variant, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
