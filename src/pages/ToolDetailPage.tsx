/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description:
 *  单个文本工具详情页面，根据路由参数 slug 渲染不同工具的界面和处理逻辑。
 *  该页面会：
 *   1. 从 URL 中解析 slug（例如 /tools/word-counter）
 *   2. 根据 slug 在工具配置中查找对应配置（名称、描述、SEO 文案等）
 *   3. 渲染输入区域、操作按钮、输出区域
 *   4. 调用 TextTools 中的纯函数完成文本处理
 *   5. 提供“复制结果”等辅助功能，并在错误时使用 Toast 提示
 */

import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { findToolBySlug, tools } from '../modules/tools/config';
import {
    CaseMode,
    cleanHtmlTags,
    convertCase,
    diffTexts,
    formatJson,
    removeExtraSpaces,
    removeLineBreaks,
    countTextStats,
} from '../modules/tools/TextTools';
import { useToast } from '../hooks/useToast';

/**
 * ToolDetailPage 组件：
 *  - 通过 useParams 获取路由参数 slug
 *  - 使用工具配置表 findToolBySlug 获取当前工具的元信息（名称 / SEO 文案等）
 *  - 根据不同的 slug 执行对应的文本处理逻辑
 */
const ToolDetailPage: React.FC = () => {
    // 1. 路由参数解析，例如 /tools/word-counter 中 slug = "word-counter"
    const params = useParams<{ slug: string }>();
    const slug = params.slug || '';

    // 2. 根据 slug 在工具配置中查找对应 ToolConfig
    const tool = findToolBySlug(slug);

    // 3. Toast 用于提示 JSON 错误、复制成功等
    const { showToast } = useToast();

    // 4. 页面内部状态：
    //    input  → 主输入文本
    //    inputB → 文本 diff 场景中的“修改后文本”
    //    output → 处理结果文本
    //    caseMode → 大小写转换工具的模式
    const [input, setInput] = useState('');
    const [inputB, setInputB] = useState('');
    const [output, setOutput] = useState('');
    const [caseMode, setCaseMode] = useState<CaseMode>('upper');

    // 5. 相关工具推荐列表（简单策略：排除当前 slug 后取前 3 个）
    const relatedTools = useMemo(
        () => tools.filter((t) => t.slug !== slug).slice(0, 3),
        [slug]
    );

    // 如果没有找到对应工具配置，直接返回“未找到工具”页面
    if (!tool) {
        return (
            <div className="container">
                <Seo title="Tool not found - EditText Lab" />
                <h1 className="section-title">Tool not found</h1>
                <p className="section-subtitle">
                    The tool you are looking for does not exist or has been moved.
                </p>
            </div>
        );
    }

    /**
     * 核心处理函数：
     * 根据当前 slug 选择对应的文本处理逻辑，
     * 输出写入 output 状态。
     */
    const handleProcess = () => {
        // 统计字数 / 字符数 / 行数
        if (slug === 'word-counter') {
            const stats = countTextStats(input);
            setOutput(
                `Words: ${stats.words}\nCharacters: ${stats.characters}\nLines: ${stats.lines}`
            );
            return;
        }

        // 移除换行
        if (slug === 'remove-line-breaks') {
            setOutput(removeLineBreaks(input));
            return;
        }

        // 移除多余空格
        if (slug === 'remove-extra-spaces') {
            setOutput(removeExtraSpaces(input));
            return;
        }

        // 大小写转换
        if (slug === 'case-converter') {
            setOutput(convertCase(input, caseMode));
            return;
        }

        // 文本 diff，比较两个文本的差异
        if (slug === 'text-diff') {
            setOutput(diffTexts(input, inputB));
            return;
        }

        // JSON 格式化与校验
        if (slug === 'json-formatter') {
            const result = formatJson(input);
            setOutput(result.output);
            if (!result.ok) {
                // JSON 无效时弹出错误提示
                showToast('error', 'Invalid JSON input');
            }
            return;
        }

        // HTML 清理，移除所有标签
        if (slug === 'html-cleaner') {
            setOutput(cleanHtmlTags(input));
            return;
        }
    };

    /**
     * 复制结果到剪贴板
     */
    const handleCopyOutput = async () => {
        try {
            await navigator.clipboard.writeText(output);
            showToast('success', 'Result copied to clipboard.');
        } catch (e) {
            showToast('error', 'Failed to copy result.');
        }
    };

    /**
     * 渲染不同工具的额外操作控件：
     *  - 大小写转换：渲染四个模式按钮
     *  - 文本 diff：展示说明文案
     *  - JSON / HTML 工具：展示简单说明
     */
    const renderExtraControls = () => {
        // 大小写转换工具
        if (slug === 'case-converter') {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginBottom: 8,
                    }}
                >
                    {[
                        { id: 'upper', label: 'UPPERCASE' },
                        { id: 'lower', label: 'lowercase' },
                        { id: 'title', label: 'Title Case' },
                        { id: 'sentence', label: 'Sentence case' },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            type="button"
                            className="btn btn-outline"
                            style={{
                                paddingInline: 10,
                                fontSize: 12,
                                backgroundColor:
                                    caseMode === mode.id ? 'var(--primary-light)' : 'transparent',
                            }}
                            onClick={() => setCaseMode(mode.id as CaseMode)}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>
            );
        }

        // 文本 diff 工具的说明
        if (slug === 'text-diff') {
            return (
                <p className="section-subtitle">
                    Paste the original text on the left and the modified text on the
                    right. Differences will be shown line by line.
                </p>
            );
        }

        // JSON 格式化工具说明
        if (slug === 'json-formatter') {
            return (
                <p className="section-subtitle">
                    Paste your raw JSON on the left. The formatter will pretty-print it
                    and report any syntax errors.
                </p>
            );
        }

        // HTML 清理工具说明
        if (slug === 'html-cleaner') {
            return (
                <p className="section-subtitle">
                    Paste HTML markup and the cleaner will remove tags, leaving only
                    readable text content.
                </p>
            );
        }

        return null;
    };

    return (
        <div className="container">
            {/* SEO 设置：从工具配置中读取标题和描述 */}
            <Seo title={tool.seoTitle} description={tool.seoDescription} />

            <section style={{ marginTop: 8 }}>
                <h1 className="section-title">{tool.name}</h1>
                <p className="section-subtitle">{tool.shortDescription}</p>

                {/* 渲染工具的额外操作控件（如大小写模式选择、说明文字等） */}
                {renderExtraControls()}

                {/* 输入区域：文本 diff 工具有双输入，其它工具单输入 */}
                {slug === 'text-diff' ? (
                    <div className="grid grid-2" style={{ marginTop: 8 }}>
                        {/* 左侧原始文本 */}
                        <div className="card" style={{ padding: 12 }}>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    marginBottom: 6,
                                }}
                            >
                                Original text
                            </div>
                            <textarea
                                className="textarea"
                                style={{ minHeight: 220 }}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        {/* 右侧修改后文本 */}
                        <div className="card" style={{ padding: 12 }}>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    marginBottom: 6,
                                }}
                            >
                                Changed text
                            </div>
                            <textarea
                                className="textarea"
                                style={{ minHeight: 220 }}
                                value={inputB}
                                onChange={(e) => setInputB(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    // 通用单输入场景
                    <div className="card" style={{ padding: 12, marginTop: 8 }}>
            <textarea
                className="textarea"
                style={{ minHeight: 220 }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste or type your text here..."
            />
                    </div>
                )}

                {/* 主操作按钮区域 */}
                <div
                    style={{
                        marginTop: 12,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleProcess}
                    >
                        Run tool
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                            setInput('');
                            setInputB('');
                            setOutput('');
                        }}
                    >
                        Clear
                    </button>
                </div>

                {/* 输出区域 */}
                <section style={{ marginTop: 20 }}>
                    <h2 className="section-title">Result</h2>
                    <div className="card" style={{ padding: 12 }}>
            <textarea
                className="textarea"
                style={{ minHeight: 200, backgroundColor: '#0206170a' }}
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="The processed result will appear here."
            />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleCopyOutput}
                            disabled={!output}
                        >
                            Copy result
                        </button>
                    </div>
                </section>

                {/* 相关工具推荐区域 */}
                <section style={{ marginTop: 32, marginBottom: 24 }}>
                    <h2 className="section-title">Related tools</h2>
                    <div className="grid grid-3">
                        {relatedTools.map((t) => (
                            <a
                                key={t.slug}
                                href={`/tools/${t.slug}`}
                                className="card"
                                style={{ padding: 12 }}
                            >
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        marginBottom: 4,
                                    }}
                                >
                                    {t.name}
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: 'var(--muted-text)',
                                    }}
                                >
                                    {t.shortDescription}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    );
};

export default ToolDetailPage;