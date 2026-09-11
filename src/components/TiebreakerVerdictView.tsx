import React, { useState } from 'react';
import {
  Trophy,
  Compass,
  AlertCircle,
  HelpCircle,
  Coins,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  RotateCw,
} from 'lucide-react';
import { TiebreakerVerdict, OptionAnalysis } from '../types';

interface TiebreakerVerdictViewProps {
  verdict: TiebreakerVerdict;
  options: OptionAnalysis[];
}

export const TiebreakerVerdictView: React.FC<TiebreakerVerdictViewProps> = ({ verdict, options }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState<string | null>(null);

  const handleFlipCoin = () => {
    if (isFlipping || options.length < 2) return;
    setIsFlipping(true);
    setCoinResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * Math.min(2, options.length));
      setCoinResult(options[randomIndex]?.name || options[0].name);
      setIsFlipping(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Prime Recommendation Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950/30 via-stone-900 to-stone-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Path</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 tracking-tight">
              {verdict.headline}
            </h2>
            <div className="flex items-center space-x-2 text-stone-300">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Strategic Choice:
              </span>
              <span className="text-base sm:text-lg font-extrabold text-amber-400">
                {verdict.recommendedOption}
              </span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed pt-1">
              {verdict.reasoning}
            </p>
          </div>

          {/* Confidence Score Dial */}
          <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-5 flex flex-col items-center justify-center shrink-0 w-full md:w-56 text-center shadow-inner">
            <div className="relative w-24 h-24 flex items-center justify-center mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400"
                  strokeDasharray={`${verdict.confidenceScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-stone-100">{verdict.confidenceScore}%</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Certainty</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-300">High Conviction</span>
            <span className="text-[11px] text-stone-400 mt-0.5">Based on weighted criteria</span>
          </div>
        </div>
      </div>

      {/* The Fork in the Road (Conditional Decision Boundary) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center space-x-2.5 mb-4">
          <Compass className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-stone-100">The Decision Boundary (Fork in the Road)</h3>
        </div>
        <p className="text-xs text-stone-400 mb-5">
          No two lives or circumstances are identical. Validate your ultimate decision against these two threshold conditions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Condition */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Choose {verdict.recommendedOption} IF:
              </span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {verdict.conditionalRule.choosePrimaryIf}
            </p>
          </div>

          {/* Alternative Condition */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Choose Alternative Path IF:
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {verdict.conditionalRule.chooseAlternativeIf}
            </p>
          </div>
        </div>
      </div>

      {/* Cognitive Blind Spots & Biases */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center space-x-2.5 mb-4">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <div>
            <h3 className="text-lg font-bold text-stone-100">Potential Blind Spots & Biases</h3>
            <p className="text-xs text-stone-400">Psychological traps commonly associated with this dilemma</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {verdict.blindSpots.map((spot, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start space-x-3"
            >
              <span className="text-xs font-black text-rose-400/80 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 shrink-0">
                0{idx + 1}
              </span>
              <p className="text-xs text-stone-300 leading-relaxed">{spot}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Thought Experiments & Gut Check */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thought Experiments (2 columns) */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center space-x-2.5">
            <BrainCircuit className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-stone-100">Mental Models & Thought Experiments</h3>
          </div>

          <div className="space-y-3.5">
            {verdict.thoughtExperiments.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2 hover:border-stone-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wide">
                    {exp.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-300 font-medium italic">
                  "{exp.prompt}"
                </p>
                <p className="text-xs text-stone-400 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/60">
                  <strong className="text-stone-300">Strategic Insight: </strong>
                  {exp.insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Coin-Flip Subconscious Gut Check (1 column) */}
        <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Coins className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-stone-100">The Coin-Flip Gut Check</h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Freud noted that flipping a coin works not because it decides for you, but because in the brief moment the coin is in the air, you suddenly realize which outcome you are hoping for.
            </p>

            <div className="my-6 flex flex-col items-center justify-center p-4 bg-stone-950/80 rounded-2xl border border-stone-800">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-stone-950 font-black shadow-xl shadow-amber-500/20 text-center p-2 text-xs border-2 border-amber-300 transition-all ${
                  isFlipping ? 'animate-spin scale-110' : ''
                }`}
              >
                {isFlipping ? (
                  <RotateCw className="w-8 h-8 animate-spin text-stone-950" />
                ) : coinResult ? (
                  <span className="line-clamp-2 leading-tight font-extrabold">{coinResult}</span>
                ) : (
                  <span>FLIP ME</span>
                )}
              </div>

              {coinResult && !isFlipping && (
                <div className="mt-4 text-center">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Coin Landed On:
                  </div>
                  <div className="text-sm font-extrabold text-stone-100 mt-0.5">{coinResult}</div>
                  <p className="text-[11px] text-stone-400 mt-2 bg-stone-900 p-2 rounded-lg border border-stone-800">
                    Did you feel a micro-surge of relief, or a twinge of disappointment? Trust that visceral sensation.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleFlipCoin}
            disabled={isFlipping}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Coins className="w-4 h-4 text-stone-950" />
            <span>{isFlipping ? 'Coin in Flight...' : 'Flip Digital Coin'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
