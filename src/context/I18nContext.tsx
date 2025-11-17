/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 国际化上下文，负责当前语言状态与文案映射
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../i18n/en';
import zh from '../i18n/zh';

type LangType = 'en' | 'zh';

interface I18nContextValue {
  lang: LangType;
  t: (path: string) => string;
  switchLang: (lang: LangType) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const dictionaries: Record<LangType, any> = {
  en,
  zh
};

/**
 * 根据 'a.b.c' 形式的路径，从对应语言字典中安全地取出字符串。
 */
const getByPath = (dict: any, path: string): string => {
  const segments = path.split('.');
  let current: any = dict;
  for (const seg of segments) {
    if (current && typeof current === 'object' && seg in current) {
      current = current[seg];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LangType>('en');

  // 初始化时从 localStorage 或浏览器语言推断
  /**
   * 默认语言：固定为英文 en，不根据浏览器语言判断
   */
  useEffect(() => {
    const saved = window.localStorage.getItem('edittext-lang') as LangType | null;
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLang(saved);
    } else {
      setLang('en'); // 默认英文
    }
  }, []);

  const switchLang = (next: LangType) => {
    setLang(next);
    window.localStorage.setItem('edittext-lang', next);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      switchLang,
      t: (path: string) => getByPath(dictionaries[lang], path)
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
