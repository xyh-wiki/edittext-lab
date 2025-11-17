/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 页脚组件，展示版权信息与常用链接
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';

/**
 * Footer 组件结构简单，但通过合理的链接分组提升可导航性与 SEO 效果。
 */
const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '16px 0', marginTop: '16px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 13
          }}
        >
          <Link to="/privacy">{t('common.nav.privacy')}</Link>
          <Link to="/terms">{t('common.nav.terms')}</Link>
          <Link to="/sitemap">{t('common.nav.sitemap')}</Link>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted-text)' }}>
          © {new Date().getFullYear()} EditText Lab. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
