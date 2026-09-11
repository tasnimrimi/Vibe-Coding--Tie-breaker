import React from 'react';
import { Scale, History, PlusCircle, Sparkles, Download } from 'lucide-react';
import { DecisionAnalysis } from '../types';

interface HeaderProps {
  currentDecision: DecisionAnalysis | null;
  historyCount: number;
  onOpenHistory: () => void;
  onNewDecision: () => void;
  onOpenExport: () => void;
  onLoadPreset: (preset: DecisionAnalysis) => void;
  presets: DecisionAnalysis[];
}

export const Header: React.FC<HeaderProps> = ({
  currentDecision,
  historyCount,
  onOpenHistory,
  onNewDecision,
  onOpenExport,
  onLoadPreset,
  presets,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onNewDecision}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-900/20 text-stone-950 font-bold">
            <Scale className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-stone-50">The Tiebreaker</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Decision Intelligence
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden md:block">
              Weigh trade-offs, compare matrices & break deadlocks
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Presets Dropdown */}
          <div className="relative group hidden lg:block">
            <button
              type="button"
              className="px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700/60 rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Example Dilemmas</span>
            </button>
            <div className="absolute right-0 mt-1 w-72 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="text-[11px] font-semibold text-stone-400 px-2 py-1 uppercase tracking-wider">
                Pre-Computed Case Studies
              </div>
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onLoadPreset(preset)}
                  className="w-full text-left px-2.5 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200 transition-colors flex flex-col space-y-0.5"
                >
                  <span className="font-medium truncate text-stone-100">{preset.title}</span>
                  <span className="text-[11px] text-stone-400 truncate">
                    {preset.options.map((o) => o.name).join(' vs ')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Export / Share Button */}
          {currentDecision && (
            <button
              onClick={onOpenExport}
              title="Export & Share Decision"
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700/60 rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-stone-300" />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}

          {/* History Drawer Toggle */}
          <button
            onClick={onOpenHistory}
            className="relative p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700/60 rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <History className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {historyCount}
              </span>
            )}
          </button>

          {/* New Decision Button */}
          <button
            onClick={onNewDecision}
            className="px-3 py-1.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-stone-950" />
            <span>New Dilemma</span>
          </button>
        </div>
      </div>
    </header>
  );
};
