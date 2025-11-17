/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 顶部导航栏组件，包含站点 LOGO、主导航菜单、语言切换与主题切换
 */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';

/**
 * Header 组件采用响应式布局，在移动端会简化为上下两行结构。
 */
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, switchLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleSwitchLang = () => {
    switchLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(248, 250, 252, 0.85)'
      }}
    >
      <div className="container" style={{ padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        {/* 左侧 LOGO 与标题区域 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1a73e8, #34a853)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 18
              }}
            >
              E
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, fontSize: 18 }}>{t('common.siteName')}</span>
              <span style={{ fontSize: 11, color: 'var(--muted-text)' }}>{t('common.tagline')}</span>
            </div>
          </Link>
        </div>

        {/* 右侧导航与操作区域 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 桌面端导航菜单 */}
          <nav className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: 16 }}>
            <NavLink to="/" end style={{ fontSize: 14 }}>
              {t('common.nav.home')}
            </NavLink>
            <NavLink to="/tools" style={{ fontSize: 14 }}>
              {t('common.nav.tools')}
            </NavLink>
            <NavLink to="/faq" style={{ fontSize: 14 }}>
              {t('common.nav.faq')}
            </NavLink>
            <NavLink to="/about" style={{ fontSize: 14 }}>
              {t('common.nav.about')}
            </NavLink>
            <NavLink to="/contact" style={{ fontSize: 14 }}>
              {t('common.nav.contact')}
            </NavLink>
          </nav>

          {/* 主题与语言切换按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ paddingInline: 10, fontSize: 12 }}
              onClick={handleSwitchLang}
            >
              {lang === 'en' ? 'EN' : '中'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ paddingInline: 10, fontSize: 12 }}
              onClick={toggleTheme}
            >
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
            {/* 移动端菜单按钮 */}
            <button
              type="button"
              className="btn btn-outline"
              style={{ paddingInline: 10, fontSize: 12, display: 'inline-flex' }}
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
          <div className="container" style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <NavLink to="/" end style={{ fontSize: 14 }} onClick={() => setMenuOpen(false)}>
              {t('common.nav.home')}
            </NavLink>
            <NavLink to="/tools" style={{ fontSize: 14 }} onClick={() => setMenuOpen(false)}>
              {t('common.nav.tools')}
            </NavLink>
            <NavLink to="/faq" style={{ fontSize: 14 }} onClick={() => setMenuOpen(false)}>
              {t('common.nav.faq')}
            </NavLink>
            <NavLink to="/about" style={{ fontSize: 14 }} onClick={() => setMenuOpen(false)}>
              {t('common.nav.about')}
            </NavLink>
            <NavLink to="/contact" style={{ fontSize: 14 }} onClick={() => setMenuOpen(false)}>
              {t('common.nav.contact')}
            </NavLink>
          </div>
        </div>
      )}

      <style>
        {`
          @media (min-width: 768px) {
            .nav-desktop {
              display: flex !important;
            }
          }
          @media (min-width: 768px) {
            .nav-mobile-toggle {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
