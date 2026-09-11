import React, { useState } from 'react';
import { X, Copy, Check, FileText } from 'lucide-react';
import { DecisionAnalysis } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  decision: DecisionAnalysis | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, decision }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !decision) return null;

  const generateMarkdown = () => {
    let md = `# Decision Breakdown: ${decision.title}\n`;
    if (decision.context) md += `**Context:** ${decision.context}\n\n`;
    if (decision.priority) md += `**Primary Deciding Priority:** ${decision.priority}\n\n`;

    md += `## 🏆 The Tiebreaker Recommendation\n`;
    md += `**Verdict:** ${decision.tiebreakerVerdict.headline}\n`;
    md += `**Recommended Option:** ${decision.tiebreakerVerdict.recommendedOption} (${decision.tiebreakerVerdict.confidenceScore}% Confidence)\n\n`;
    md += `**Reasoning:** ${decision.tiebreakerVerdict.reasoning}\n\n`;
    md += `### Conditional Thresholds:\n`;
    md += `- **Choose ${decision.tiebreakerVerdict.recommendedOption} IF:** ${decision.tiebreakerVerdict.conditionalRule.choosePrimaryIf}\n`;
    md += `- **Choose Alternative IF:** ${decision.tiebreakerVerdict.conditionalRule.chooseAlternativeIf}\n\n`;

    md += `## ⚖️ Options & Pros/Cons\n\n`;
    decision.options.forEach((opt) => {
      md += `### ${opt.name} (${opt.tagline})\n`;
      md += `#### Pros:\n`;
      opt.pros.forEach((p) => {
        md += `- **[+${p.weight} / 5] ${p.point}** (${p.category}): ${p.detail}\n`;
      });
      md += `\n#### Cons:\n`;
      opt.cons.forEach((c) => {
        md += `- **[-${c.weight} / 5] ${c.point}** (${c.category}): ${c.detail}\n`;
      });
      md += `\n`;
    });

    md += `## 📊 Comparison Matrix\n\n`;
    md += `| Criteria | Importance | ${decision.options.map((o) => o.name).join(' | ')} | Takeaway |\n`;
    md += `| --- | --- | ${decision.options.map(() => '---').join(' | ')} | --- |\n`;
    decision.comparisonMatrix.forEach((row) => {
      const scores = decision.options.map((opt) => {
        const rating = row.ratings.find((r) => r.optionName === opt.name);
        return rating ? `${rating.score}/10` : '-';
      });
      md += `| ${row.criteria} | ${row.importance} | ${scores.join(' | ')} | ${row.verdictInsight} |\n`;
    });
    md += `\n`;

    md += `## 🧭 SWOT Highlights\n\n`;
    decision.options.forEach((opt) => {
      md += `### SWOT: ${opt.name}\n`;
      md += `- **Strengths:** ${opt.swot.strengths.join('; ')}\n`;
      md += `- **Weaknesses:** ${opt.swot.weaknesses.join('; ')}\n`;
      md += `- **Opportunities:** ${opt.swot.opportunities.join('; ')}\n`;
      md += `- **Threats:** ${opt.swot.threats.join('; ')}\n\n`;
    });

    return md;
  };

  const markdownText = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-6 z-10 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-stone-100">Export Decision Analysis</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-400 py-3">
          Copy structured Markdown to paste into Notion, Google Docs, Slack, or Obsidian.
        </p>

        <div className="flex-1 overflow-y-auto bg-stone-950 p-4 rounded-xl border border-stone-800/80 font-mono text-xs text-stone-300 whitespace-pre-wrap select-all">
          {markdownText}
        </div>

        <div className="pt-4 border-t border-stone-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-300 hover:bg-stone-800 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg flex items-center space-x-1.5 shadow-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-950" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
