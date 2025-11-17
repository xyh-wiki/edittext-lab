/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 网站地图页面，列出全部页面与工具链接。
 */
import React from 'react';
import Seo from '../components/common/Seo';
import { tools } from '../modules/tools/config';
import { Link } from 'react-router-dom';

const SitemapPage: React.FC = () => {
    return (
        <div className="container">
            <Seo title="Sitemap - EditText Lab" description="Sitemap of all pages and tools." />

            <h1 className="section-title">Sitemap</h1>

            <div className="card" style={{ padding: 16 }}>
                <h2 style={{ marginBottom: 8 }}>Main Pages</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tools">Tools</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy">Privacy</Link></li>
                    <li><Link to="/terms">Terms</Link></li>
                </ul>

                <h2 style={{ marginTop: 20, marginBottom: 8 }}>Tools</h2>
                <ul>
                    {tools.map((t) => (
                        <li key={t.slug}>
                            <Link to={`/tools/${t.slug}`}>{t.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SitemapPage;