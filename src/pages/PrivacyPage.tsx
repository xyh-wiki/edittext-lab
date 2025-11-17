/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 隐私政策页面，纯静态文本。
 */
import React from 'react';
import Seo from '../components/common/Seo';

const PrivacyPage: React.FC = () => {
    return (
        <div className="container">
            <Seo title="Privacy Policy - EditText Lab" description="Privacy policy of EditText Lab." />

            <h1 className="section-title">Privacy Policy</h1>
            <div className="card" style={{ padding: 16, lineHeight: 1.7 }}>
                <p>我们不会收集、存储或上传您在文本框中输入的任何内容。</p>
                <p>所有文本处理均在浏览器本地完成，不会通过网络传输。</p>
                <p>本网站不使用用户跟踪脚本，也不进行任何形式的数据挖掘。</p>
            </div>
        </div>
    );
};

export default PrivacyPage;