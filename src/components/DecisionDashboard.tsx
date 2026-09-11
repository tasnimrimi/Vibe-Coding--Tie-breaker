import React, { useState } from 'react';
import {
  Scale,
  TableProperties,
  Compass,
  Trophy,
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
  Download,
} from 'lucide-react';
import { DecisionAnalysis, OptionAnalysis } from '../types';
import { ProsConsView } from './ProsConsView';
import { ComparisonMatrixView } from './ComparisonMatrixView';
import { SwotView } from './SwotView';
import { TiebreakerVerdictView } from './TiebreakerVerdictView';

interface DecisionDashboardProps {
  decision: DecisionAnalysis;
  onUpdateDecision: (updated: DecisionAnalysis) => void;
  onBackToForm: () => void;
  onOpenExport: () => void;
}

type TabType = 'proscons' | 'matrix' | 'swot' | 'verdict';

export const DecisionDashboard: React.FC<DecisionDashboardProps> = ({
  decision,
  onUpdateDecision,
  onBackToForm,
  onOpenExport,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('proscons');

  const handleUpdateOptions = (updatedOptions: OptionAnalysis[]) => {
    onUpdateDecision({
      ...decision,
      options: updatedOptions,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <button
          type="button"
          onClick={onBackToForm}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-400 hover:text-stone-100 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Dilemma & Options</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-stone-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span>{new Date(decision.createdAt).toLocaleDateString()}</span>
          </div>
          {decision.priority && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              Priority: {decision.priority}
            </span>
          )}
          {decision.timeHorizon && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              Horizon: {decision.timeHorizon}
            </span>
          )}
          <button
            type="button"
            onClick={onOpenExport}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Decision Summary Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Active Deliberation
              </span>
              <span className="text-xs text-stone-400">
                Comparing {decision.options.length} Paths
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
              {decision.title}
            </h1>
            {decision.context && (
              <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
                {decision.context}
              </p>
            )}
          </div>

          {/* Quick Verdict Snippet */}
          <div
            onClick={() => setActiveTab('verdict')}
            className="cursor-pointer bg-amber-950/20 hover:bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 flex items-center space-x-3 transition-colors shrink-0 group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider">
                Tiebreaker Pick
              </div>
              <div className="text-sm font-extrabold text-stone-100 line-clamp-1">
                {decision.tiebreakerVerdict.recommendedOption}
              </div>
            </div>
          </div>
        </div>

        {/* Option Tabs Badges */}
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-stone-800/80">
          <span className="text-xs font-semibold text-stone-400 self-center mr-1">
            Contrasting Paths:
          </span>
          {decision.options.map((opt, i) => (
            <div
              key={opt.id}
              className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs font-medium text-stone-300 flex items-center space-x-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-stone-200">Option {i + 1}:</span>
              <span>{opt.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis View Tabs Navigation */}
      <div className="flex bg-stone-900/90 border border-stone-800 rounded-2xl p-1.5 shadow-md">
        <button
          type="button"
          onClick={() => setActiveTab('proscons')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'proscons'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Pros & Cons List</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'matrix'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <TableProperties className="w-4 h-4" />
          <span>Comparison Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('swot')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'swot'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>SWOT Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verdict')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'verdict'
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>The Tiebreaker Verdict</span>
        </button>
      </div>

      {/* Render Active View Tab */}
      <div className="pt-2">
        {activeTab === 'proscons' && (
          <ProsConsView options={decision.options} onUpdateOptions={handleUpdateOptions} />
        )}

        {activeTab === 'matrix' && (
          <ComparisonMatrixView
            matrix={decision.comparisonMatrix}
            options={decision.options}
          />
        )}

        {activeTab === 'swot' && <SwotView options={decision.options} />}

        {activeTab === 'verdict' && (
          <TiebreakerVerdictView
            verdict={decision.tiebreakerVerdict}
            options={decision.options}
          />
        )}
      </div>
    </div>
  );
};
