/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 404 页面。
 */
import React from 'react';
import Seo from '../components/common/Seo';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="container">
            <Seo title="Page Not Found - EditText Lab" />

            <h1 className="section-title">Page Not Found</h1>
            <p className="section-subtitle">The page you are looking for does not exist or has been moved.</p>

            <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;