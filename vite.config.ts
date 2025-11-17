/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: Vite 配置文件，配置 React 插件等基础构建信息
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
