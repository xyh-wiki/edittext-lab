/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 文本工具配置列表，定义每个工具的路由、名称、描述以及处理函数类型
 */
export type ToolCategory = 'basic' | 'cleanup' | 'developer';

export interface ToolConfig {
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  seoTitle: string;
  seoDescription: string;
}

/**
 * tools 列表为后续 Tools 页面和站点地图等提供统一数据来源，
 * 同时也便于在工具详情页中通过 slug 查找对应的配置。
 */
export const tools: ToolConfig[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    shortDescription: 'Count words, characters and lines in your text.',
    category: 'basic',
    seoTitle: 'Word Counter - Count Words & Characters Online',
    seoDescription: 'Free online word counter that counts words, characters and lines in your text instantly.'
  },
  {
    slug: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    shortDescription: 'Remove line breaks and merge text into a single paragraph.',
    category: 'cleanup',
    seoTitle: 'Remove Line Breaks from Text',
    seoDescription: 'Quickly remove all line breaks and join text into one continuous paragraph.'
  },
  {
    slug: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    shortDescription: 'Clean up extra spaces and keep only single spaces.',
    category: 'cleanup',
    seoTitle: 'Remove Extra Spaces from Text',
    seoDescription: 'Clean up messy spacing and keep just one space between words or sentences.'
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Convert text to UPPERCASE, lowercase, Title Case or Sentence case.',
    category: 'basic',
    seoTitle: 'Text Case Converter Online',
    seoDescription: 'Convert your text to uppercase, lowercase, title case or sentence case with one click.'
  },
  {
    slug: 'text-diff',
    name: 'Text Diff',
    shortDescription: 'Compare two pieces of text and highlight differences.',
    category: 'developer',
    seoTitle: 'Text Diff Checker',
    seoDescription: 'Compare two texts side by side and find their differences quickly.'
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format and validate JSON strings.',
    category: 'developer',
    seoTitle: 'Online JSON Formatter & Validator',
    seoDescription: 'Format, beautify and validate your JSON data directly in the browser.'
  },
  {
    slug: 'html-cleaner',
    name: 'HTML Cleaner',
    shortDescription: 'Clean HTML tags or beautify HTML markup.',
    category: 'developer',
    seoTitle: 'HTML Cleaner & Beautifier',
    seoDescription: 'Clean unwanted HTML tags or format your HTML for better readability.'
  }
];

/**
 * 为首页展示常用工具预留一个列表，方便后续调整排序。
 */
export const popularToolSlugs: string[] = [
  'word-counter',
  'case-converter',
  'remove-line-breaks',
  'json-formatter'
];

export const findToolBySlug = (slug: string): ToolConfig | undefined =>
  tools.find((tool) => tool.slug === slug);
