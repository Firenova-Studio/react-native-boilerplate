import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import {
  generateBackgrounds,
  staticBackgroundStyles,
} from '@/shared/lib/theme/backgrounds';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
  staticBorderStyles,
} from '@/shared/lib/theme/borders';
import componentsGenerator from '@/shared/lib/theme/components';
import {
  generateFontColors,
  generateFontSizes,
  staticFontStyles,
} from '@/shared/lib/theme/fonts';
import { generateGutters, staticGutterStyles } from '@/shared/lib/theme/gutters';
import layout from '@/shared/lib/theme/layout';
import generateConfig from '@/shared/lib/theme/ThemeProvider/generateConfig';
import type {
  FulfilledThemeConfiguration,
  Variant,
} from '@/shared/lib/theme/types/config';
import type { ComponentTheme, Theme } from '@/shared/lib/theme/types/theme';

export const buildTheme = (variant: Variant): Theme => {
  const fullConfig = generateConfig(variant) satisfies FulfilledThemeConfiguration;

  const fonts = {
    ...generateFontSizes(),
    ...generateFontColors(fullConfig),
    ...staticFontStyles,
  };

  const backgrounds = {
    ...generateBackgrounds(fullConfig),
    ...staticBackgroundStyles,
  };

  const gutters = {
    ...generateGutters(fullConfig),
    ...staticGutterStyles,
  };

  const borders = {
    ...generateBorderColors(fullConfig),
    ...generateBorderRadius(),
    ...generateBorderWidths(),
    ...staticBorderStyles,
  };

  const navigationTheme =
    variant === 'dark'
      ? {
          ...DarkTheme,
          colors: fullConfig.navigationColors,
          dark: true,
        }
      : {
          ...DefaultTheme,
          colors: fullConfig.navigationColors,
          dark: false,
        };

  const theme = {
    backgrounds,
    borders,
    colors: fullConfig.colors,
    fonts,
    gutters,
    layout,
    variant,
  } satisfies ComponentTheme;

  return {
    ...theme,
    components: componentsGenerator(theme),
    navigationTheme,
  };
};

export const appThemes = {
  dark: buildTheme('dark'),
  default: buildTheme('default'),
} as const satisfies Record<Variant, Theme>;
