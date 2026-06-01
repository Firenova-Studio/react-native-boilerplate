import { StyleSheet as UnistylesStyleSheet } from 'react-native-unistyles';

import { storage } from '@/shared/lib/storage';

import type { Variant } from './types/config';
import { appThemes } from './createTheme';

export const THEME_STORAGE_KEY = 'theme';

export const getInitialTheme = (): Variant => {
  const storedTheme = storage.getString(THEME_STORAGE_KEY);

  if (storedTheme === 'dark') {
    return 'dark';
  }

  if (storedTheme !== 'default') {
    storage.set(THEME_STORAGE_KEY, 'default');
  }

  return 'default';
};

UnistylesStyleSheet.configure({
  settings: {
    initialTheme: getInitialTheme(),
  },
  themes: appThemes,
});

type AppThemes = typeof appThemes;

/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type */
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
/* eslint-enable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type */

export { StyleSheet } from 'react-native-unistyles';
