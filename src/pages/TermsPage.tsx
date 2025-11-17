/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 服务条款页面。
 */
import React from 'react';
import Seo from '../components/common/Seo';

const TermsPage: React.FC = () => {
    return (
        <div className="container">
            <Seo title="Terms of Service - EditText Lab" description="Terms of service for EditText Lab." />

            <h1 className="section-title">Terms of Service</h1>
            <div className="card" style={{ padding: 16, lineHeight: 1.7 }}>
                <p>本网站提供的所有工具均按“现状”提供，不保证适用于任何专业用途。</p>
                <p>使用过程中造成的任何数据损失由用户自行承担。</p>
                <p>如不接受以上条款，请立即停止使用。</p>
            </div>
        </div>
    );
};

export default TermsPage;