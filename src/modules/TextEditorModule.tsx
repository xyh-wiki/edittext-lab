/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 首页主编辑器模块，包含文本输入区、工具栏以及统计信息展示
 */
import React, { useEffect, useState } from 'react';
import { countTextStats } from './TextTools';
import { useToast } from '../../hooks/useToast';

const STORAGE_KEY = 'edittext-home-editor';

const TextEditorModule: React.FC = () => {
  const [text, setText] = useState('');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const { words, characters, lines } = countTextStats(text);
  const { showToast } = useToast();

  // 初始化时从 localStorage 恢复内容
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setText(saved);
    }
  }, []);

  // 文本变更时自动保存
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, text);
  }, [text]);

  const handleChange = (value: string) => {
    setUndoStack((prev) => [...prev, text]);
    setRedoStack([]);
    setText(value);
  };

  const handleUndo = () => {
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((r) => [text, ...r]);
      setText(last);
      return prev.slice(0, -1);
    });
  };

  const handleRedo = () => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      setUndoStack((u) => [...u, text]);
      setText(first);
      return rest;
    });
  };

  const handleClear = () => {
    if (!text) return;
    setUndoStack((prev) => [...prev, text]);
    setRedoStack([]);
    setText('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('success', 'Text copied to clipboard.');
    } catch {
      showToast('error', 'Failed to copy text.');
    }
  };

  return (
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      {/* 工具栏区域 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button className="btn btn-outline" type="button" onClick={handleUndo} disabled={undoStack.length === 0}>
            Undo
          </button>
          <button className="btn btn-outline" type="button" onClick={handleRedo} disabled={redoStack.length === 0}>
            Redo
          </button>
          <button className="btn btn-outline" type="button" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-primary" type="button" onClick={handleCopy}>
            Copy all
          </button>
        </div>
        {/* 统计信息区域 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
          <span>
            <strong>{words}</strong> words
          </span>
          <span>
            <strong>{characters}</strong> chars
          </span>
          <span>
            <strong>{lines}</strong> lines
          </span>
        </div>
      </div>

      {/* 文本输入区域 */}
      <textarea
        className="textarea"
        style={{ minHeight: 260, fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6 }}
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default TextEditorModule;
