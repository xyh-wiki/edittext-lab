/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 全局 FAQ 页面，展示常见问题。
 */
import React from 'react';
import Seo from '../components/common/Seo';
import FAQAccordion from '../components/common/FAQAccordion';

const FAQPage: React.FC = () => {
    return (
        <div className="container">
            <Seo
                title="FAQ - EditText Lab"
                description="Frequently asked questions about EditText Lab and text tools."
            />

            <h1 className="section-title">Frequently Asked Questions</h1>

            <FAQAccordion
                items={[
                    {
                        question: '我的文本会上传到服务器吗？',
                        answer: '不会。所有处理逻辑均在浏览器端本地执行，不会与服务器通信。',
                    },
                    {
                        question: 'EditText Lab 是否完全免费？',
                        answer: '是的。所有工具完全免费使用，无需登录或订阅。',
                    },
                    {
                        question: '是否支持手机访问？',
                        answer: '支持。本项目的布局完全自适应，可在任何设备上运行。',
                    },
                ]}
            />
        </div>
    );
};

export default FAQPage;