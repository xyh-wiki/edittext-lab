/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description:
 *  Toast 容器组件，只负责在页面右下角展示所有正在显示的 Toast 列表。
 *  Provider 已经在 main.tsx 中全局包裹，这里不再创建新的 Provider。
 */
import React from 'react';
import { useToast } from '../../hooks/useToast';

/**
 * ToastContainer 组件：
 *  - 通过 useToast() 获取当前的 toast 列表
 *  - 渲染在右下角的提示框 UI
 *  - 放在 App 根组件里即可，全局共用同一个 ToastProvider
 */
const ToastContainer: React.FC = () => {
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

export default ToastContainer;