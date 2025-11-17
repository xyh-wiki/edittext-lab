/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 工具列表页面，提供搜索与分类浏览能力
 */
import React, { useMemo, useState } from 'react';
import Seo from '../components/common/Seo';
import { tools, ToolCategory } from '../modules/tools/config';
import { Link } from 'react-router-dom';

const ToolsPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'all'>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchKeyword =
        !keyword ||
        tool.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = category === 'all' || tool.category === category;
      return matchKeyword && matchCategory;
    });
  }, [keyword, category]);

  return (
    <div className="container">
      <Seo
        title="Text Tools - EditText Lab"
        description="Browse all online text tools at EditText Lab including word counter, case converter, JSON formatter, HTML cleaner and more."
      />
      <section style={{ marginTop: 8 }}>
        <h1 className="section-title">All text tools</h1>
        <p className="section-subtitle">
          Explore a growing collection of focused text utilities designed to help writers, students and developers.
        </p>

        {/* 搜索与分类筛选区域 */}
        <div
          className="card"
          style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}
        >
          <input
            className="input"
            placeholder="Search tools by name or description..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'basic', label: 'Basic' },
              { id: 'cleanup', label: 'Cleanup' },
              { id: 'developer', label: 'Developer' }
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                className="btn btn-outline"
                style={{
                  paddingInline: 12,
                  fontSize: 12,
                  backgroundColor: category === c.id ? 'var(--primary-light)' : 'transparent'
                }}
                onClick={() => setCategory(c.id as any)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid grid-3">
          {filteredTools.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{tool.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted-text)', marginBottom: 8 }}>
                {tool.shortDescription}
              </div>
              <div className="badge" style={{ fontSize: 11 }}>
                Open tool
              </div>
            </Link>
          ))}
        </div>
        {filteredTools.length === 0 && (
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted-text)' }}>
            No tools match your search. Try a different keyword.
          </p>
        )}
      </section>
    </div>
  );
};

export default ToolsPage;
