import React from 'react';
import { X, Clock, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { DecisionAnalysis } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDecisions: DecisionAnalysis[];
  onSelectDecision: (decision: DecisionAnalysis) => void;
  onDeleteDecision: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedDecisions,
  onSelectDecision,
  onDeleteDecision,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-800 h-full p-6 flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-stone-100">Saved Dilemmas</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Decisions List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedDecisions.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-stone-600" />
              <p className="text-sm">No saved deliberations yet.</p>
              <p className="text-xs text-stone-600">
                Any dilemma you analyze or adjust is stored locally in your browser.
              </p>
            </div>
          ) : (
            savedDecisions.map((dec) => (
              <div
                key={dec.id}
                onClick={() => {
                  onSelectDecision(dec);
                  onClose();
                }}
                className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all group relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-stone-200 group-hover:text-amber-300 line-clamp-2">
                    {dec.title}
                  </h4>
                  <button
                    onClick={(e) => onDeleteDecision(dec.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded transition-all shrink-0"
                    title="Delete saved dilemma"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mt-2 text-[11px] text-stone-400">
                  <span className="truncate">{dec.options.map((o) => o.name).join(' vs ')}</span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/60 text-[10px] text-stone-500">
                  <span>{new Date(dec.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center space-x-1 text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>Reopen</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedDecisions.length > 0 && (
          <div className="pt-4 border-t border-stone-800 flex justify-end">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-rose-400 transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
