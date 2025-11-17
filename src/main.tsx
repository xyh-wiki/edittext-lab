/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 应用入口文件，挂载 React 根组件并加载全局样式
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
