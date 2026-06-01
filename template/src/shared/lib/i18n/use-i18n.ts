import i18n from '@/shared/config/i18n';

import { SupportedLanguages } from './language';

const changeLanguage = (lang: SupportedLanguages) => {
  void i18n.changeLanguage(lang);
};

const toggleLanguage = () => {
  void i18n.changeLanguage(
    i18n.language === (SupportedLanguages.EN_EN as string)
      ? SupportedLanguages.FR_FR
      : SupportedLanguages.EN_EN,
  );
};

export const useI18n = () => {
  return { changeLanguage, toggleLanguage };
};
