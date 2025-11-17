/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 关于页面，用于介绍 EditText Lab 的背景、用途与目标。
 */
import React from 'react';
import Seo from '../components/common/Seo';

const AboutPage: React.FC = () => {
    return (
        <div className="container">
            <Seo title="About - EditText Lab" description="Learn about the purpose and design of EditText Lab." />

            <h1 className="section-title">About</h1>
            <p className="section-subtitle">
                EditText Lab 是一个纯前端开发的在线文本工具集合网站，提供编辑、转换、清洗与分析文本的便捷功能。
            </p>

            <div className="card" style={{ padding: 16, lineHeight: 1.7 }}>
                <p>
                    EditText Lab 的设计目标是让用户无需安装软件、无需登录账号，也能快速完成各种常见的文本处理任务。所有操作均在浏览器本地完成，不上传、不存储用户数据。
                </p>
                <p>
                    未来将持续扩展更多文本工具，包括：语言检测、文本相似度分析、字符替换、Markdown 工具等。
                </p>
            </div>
        </div>
    );
};

export default AboutPage;