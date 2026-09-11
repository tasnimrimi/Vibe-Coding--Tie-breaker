import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingUp, Zap, Sparkles } from 'lucide-react';
import { OptionAnalysis } from '../types';

interface SwotViewProps {
  options: OptionAnalysis[];
}

export const SwotView: React.FC<SwotViewProps> = ({ options }) => {
  const [activeOptionId, setActiveOptionId] = useState<string>(options[0]?.id || '');

  const activeOption = options.find((o) => o.id === activeOptionId) || options[0];

  if (!activeOption) {
    return null;
  }

  const { swot } = activeOption;

  return (
    <div className="space-y-6">
      {/* Option Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/60 border border-stone-800 p-3 rounded-2xl">
        <div className="flex items-center space-x-2 text-xs font-semibold text-stone-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Select Option for Strategic SWOT Grid:</span>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveOptionId(opt.id)}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeOption.id === opt.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700/80 border border-stone-700/60'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Option Overview Headline */}
      <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Strategic Assessment
          </span>
          <h3 className="text-xl font-extrabold text-stone-100">{activeOption.name}</h3>
          <p className="text-xs text-stone-400 mt-0.5">{activeOption.tagline}</p>
        </div>
        <div className="text-xs text-stone-400 max-w-sm">
          Internal Capabilities (Strengths & Weaknesses) paired with External Dynamics (Opportunities & Threats).
        </div>
      </div>

      {/* 2x2 SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths (Internal Positive) */}
        <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center space-x-2.5 mb-3.5 pb-2.5 border-b border-emerald-800/30">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-300">Strengths (Internal)</h4>
              <p className="text-[11px] text-emerald-400/80">Inherent leverage & competitive advantages</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {swot.strengths.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-stone-200 bg-stone-950/40 p-3 rounded-xl border border-emerald-800/20 flex items-start space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
            {swot.strengths.length === 0 && (
              <li className="text-xs text-stone-500 italic">No specific strengths recorded.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses (Internal Negative) */}
        <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center space-x-2.5 mb-3.5 pb-2.5 border-b border-rose-800/30">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-300">Weaknesses (Internal)</h4>
              <p className="text-[11px] text-rose-400/80">Resource gaps, bottlenecks & vulnerabilities</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {swot.weaknesses.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-stone-200 bg-stone-950/40 p-3 rounded-xl border border-rose-800/20 flex items-start space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
            {swot.weaknesses.length === 0 && (
              <li className="text-xs text-stone-500 italic">No specific weaknesses recorded.</li>
            )}
          </ul>
        </div>

        {/* Opportunities (External Positive) */}
        <div className="bg-sky-950/20 border border-sky-800/40 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center space-x-2.5 mb-3.5 pb-2.5 border-b border-sky-800/30">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-sky-300">Opportunities (External)</h4>
              <p className="text-[11px] text-sky-400/80">Favorable market trends & untapped potential</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {swot.opportunities.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-stone-200 bg-stone-950/40 p-3 rounded-xl border border-sky-800/20 flex items-start space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
            {swot.opportunities.length === 0 && (
              <li className="text-xs text-stone-500 italic">No specific opportunities recorded.</li>
            )}
          </ul>
        </div>

        {/* Threats (External Negative) */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center space-x-2.5 mb-3.5 pb-2.5 border-b border-amber-800/30">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300">Threats (External)</h4>
              <p className="text-[11px] text-amber-400/80">Macro risks, competition & systemic hazards</p>
            </div>
          </div>
          <ul className="space-y-2.5 flex-1">
            {swot.threats.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-stone-200 bg-stone-950/40 p-3 rounded-xl border border-amber-800/20 flex items-start space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
            {swot.threats.length === 0 && (
              <li className="text-xs text-stone-500 italic">No specific threats recorded.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
