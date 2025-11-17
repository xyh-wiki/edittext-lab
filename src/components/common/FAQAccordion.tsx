/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: FAQ 折叠组件，用于展示问答列表
 */
import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, idx) => {
        const opened = openIndex === idx;
        return (
          <div
            key={idx}
            className="card"
            style={{ padding: 12, cursor: 'pointer', borderRadius: 10 }}
            onClick={() => setOpenIndex(opened ? null : idx)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{item.question}</div>
              <div style={{ fontSize: 16, color: 'var(--muted-text)', transform: opened ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease-out' }}>
                ▶
              </div>
            </div>
            {opened && (
              <div style={{ marginTop: 6, fontSize: 13, color: 'var(--muted-text)', lineHeight: 1.6 }}>{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
