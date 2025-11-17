/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 主题上下文，负责全局明暗主题状态管理与持久化
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * ThemeProvider 组件用于包裹应用根节点，提供 theme 上下文。
 * 通过 localStorage 实现主题持久化，并同步到 body 的 className 上，
 * 便于全局 CSS 使用变量控制不同主题的样式。
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  // 初始化时从 localStorage 或系统偏好中读取主题
  useEffect(() => {
    const saved = window.localStorage.getItem('edittext-theme') as ThemeType | null;
    if (saved) {
      setTheme(saved);
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(saved === 'dark' ? 'theme-dark' : 'theme-light');
      return;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = prefersDark ? 'dark' : 'light';
    setTheme(initial);
    document.body.classList.add(initial === 'dark' ? 'theme-dark' : 'theme-light');
  }, []);

  // 当 theme 变化时同步到 body 与 localStorage
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    window.localStorage.setItem('edittext-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * 自定义 Hook 简化主题上下文的使用。
 */
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
