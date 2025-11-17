/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 首页页面组件，包含 Hero、主编辑器、常用工具区域与简要 FAQ
 */
import React from 'react';
import Seo from '../components/common/Seo';
import TextEditorModule from '../modules/TextEditorModule';
import { popularToolSlugs, tools } from '../modules/tools/config';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/common/FAQAccordion';
import { useI18n } from '../context/I18nContext';

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const popularTools = tools.filter((tool) => popularToolSlugs.includes(tool.slug));

  return (
    <div className="container">
      <Seo
        title="EditText Lab - Online Text Editor & Text Tools"
        description="EditText Lab provides a clean online text editor along with word counter, case converter, JSON formatter and more text tools."
      />
      {/* Hero 区域 */}
      <section
        style={{
          marginTop: 8,
          padding: 16,
          borderRadius: 16,
          background:
            'radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(52,211,153,0.16), transparent 55%)'
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t('home.heroTitle')}</h1>
        <p style={{ fontSize: 14, color: 'var(--muted-text)', maxWidth: 640 }}>{t('home.heroSubtitle')}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          <a href="#editor" className="btn btn-primary">
            {t('common.actions.startEditing')}
          </a>
          <Link to="/tools" className="btn btn-outline">
            {t('common.actions.viewAllTools')}
          </Link>
        </div>
      </section>

      {/* 主编辑器区域 */}
      <section id="editor" style={{ marginTop: 32 }}>
        <h2 className="section-title">{t('home.editorTitle')}</h2>
        <p className="section-subtitle">{t('home.editorSubtitle')}</p>
        <TextEditorModule />
      </section>

      {/* 常用工具区域 */}
      <section style={{ marginTop: 40 }}>
        <h2 className="section-title">{t('home.popularToolsTitle')}</h2>
        <p className="section-subtitle">
          Quickly jump into the most used tools for counting words, cleaning text and formatting content.
        </p>
        <div className="grid grid-3">
          {popularTools.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{tool.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted-text)' }}>{tool.shortDescription}</div>
              <div style={{ marginTop: 8, fontSize: 12 }} className="badge">
                Open tool
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ 简版 */}
      <section style={{ marginTop: 40, marginBottom: 16 }}>
        <h2 className="section-title">{t('home.faqTitle')}</h2>
        <p className="section-subtitle">
          Answers to a few common questions about how your text is handled and what this site does.
        </p>
        <FAQAccordion
          items={[
            {
              question: 'Is my text uploaded to any server?',
              answer:
                'No. All text processing happens directly in your browser. Your content is not uploaded to any backend by default.'
            },
            {
              question: 'Is EditText Lab free to use?',
              answer: 'Yes. All tools on this website are free to use without creating an account.'
            },
            {
              question: 'Can I use these tools on my phone?',
              answer:
                'Yes. The interface is fully responsive and works on modern mobile browsers, tablets and desktops.'
            }
          ]}
        />
      </section>
    </div>
  );
};

export default HomePage;
