// src/hooks/useLanguage.ts
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    currentLanguage,
    changeLanguage,
    t: i18n.t,
  };
};
