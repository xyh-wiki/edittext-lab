/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 文本处理工具函数集合，所有纯逻辑在这里实现，方便复用与单元测试
 */

/**
 * 统计文本中的单词数、字符数和行数。
 * 这里对英文文本通过空格分词，对于中文则根据非空字符数近似统计。
 */
export const countTextStats = (text: string) => {
  const characters = text.length;
  const lines = text.length === 0 ? 0 : text.split(/\r?\n/).length;

  // 通过正则匹配单词，适用于英文场景；其他语言则退化为以空白分隔的 token 数
  const wordMatches = text.trim().match(/\S+/g);
  const words = wordMatches ? wordMatches.length : 0;

  return { words, characters, lines };
};

/**
 * 移除文本中的换行符，将所有行合并为一个段落。
 */
export const removeLineBreaks = (text: string): string => {
  return text.replace(/\r?\n+/g, ' ');
};

/**
 * 移除多余空格，仅保留单个空格。
 */
export const removeExtraSpaces = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

export type CaseMode = 'upper' | 'lower' | 'title' | 'sentence';

/**
 * 将文本转换为不同大小写形式。
 */
export const convertCase = (text: string, mode: CaseMode): string => {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence': {
      const lower = text.toLowerCase();
      return lower.replace(/(^\s*[a-z])|([\.\!\?]\s*[a-z])/g, (c) => c.toUpperCase());
    }
    default:
      return text;
  }
};

/**
 * 文本差异比较的简单实现：
 * 按行拆分后，对比每一行是否相同，返回带有前缀标记的结果。
 */
export const diffTexts = (a: string, b: string): string => {
  const aLines = a.split(/\r?\n/);
  const bLines = b.split(/\r?\n/);
  const maxLen = Math.max(aLines.length, bLines.length);
  const result: string[] = [];
  for (let i = 0; i < maxLen; i++) {
    const left = aLines[i] ?? '';
    const right = bLines[i] ?? '';
    if (left === right) {
      result.push('  ' + left);
    } else {
      if (left) {
        result.push('- ' + left);
      }
      if (right) {
        result.push('+ ' + right);
      }
    }
  }
  return result.join('\n');
};

/**
 * JSON 格式化和校验，如果无效则返回错误信息字符串。
 */
export const formatJson = (text: string): { ok: boolean; output: string } => {
  if (!text.trim()) {
    return { ok: true, output: '' };
  }
  try {
    const obj = JSON.parse(text);
    const pretty = JSON.stringify(obj, null, 2);
    return { ok: true, output: pretty };
  } catch (e: any) {
    return { ok: false, output: 'Invalid JSON: ' + (e?.message || String(e)) };
  }
};

/**
 * HTML 清理：简单移除所有标签，仅保留纯文本。
 */
export const cleanHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};
