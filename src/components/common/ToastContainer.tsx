/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: Toast 容器组件，负责在页面右下角展示所有正在显示的 Toast
 */
import React from 'react';
import { ToastProvider, useToast } from '../../hooks/useToast';

/**
 * 实际渲染 Toast 列表的内部组件。
 */
const ToastList: React.FC = () => {
  const { toasts } = useToast();
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

/**
 * ToastContainer 组件放置在 App 根组件中，
 * 通过内部再包裹一个 ToastProvider 来确保全局可用。
 */
const ToastContainer: React.FC = () => {
  return (
    <ToastProvider>
      <ToastList />
    </ToastProvider>
  );
};

export default ToastContainer;
