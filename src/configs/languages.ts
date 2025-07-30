import { Language } from "src/types";

export const LANGUAGES: Language[] = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'he',
        name: 'עברית',
        default: true,
    },
    {
        code: 'ar',
        name: 'العربية',
    },
    {
        code: 'ru',
        name: 'Русский',
    },
    {
        code: 'es',
        name: 'Español',
    },
];

const RTLCodeLanguages = [
    'ar',
    'he',
];

export const DEFAULT_LANGUAGE = LANGUAGES.find(lang => lang.default);

export const getDirection = (languageCode: Language['code']) => RTLCodeLanguages.includes(languageCode) 
    ? 'rtl' 
    : 'ltr';