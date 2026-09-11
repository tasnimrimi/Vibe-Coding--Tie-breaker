import React from 'react';
import { Trophy, HelpCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MatrixRow, OptionAnalysis } from '../types';

interface ComparisonMatrixViewProps {
  matrix: MatrixRow[];
  options: OptionAnalysis[];
}

export const ComparisonMatrixView: React.FC<ComparisonMatrixViewProps> = ({ matrix, options }) => {
  // Calculate average rating score for each option
  const optionScores: Record<string, { total: number; count: number; average: number }> = {};

  options.forEach((opt) => {
    optionScores[opt.name] = { total: 0, count: 0, average: 0 };
  });

  matrix.forEach((row) => {
    const weightMultiplier = row.importance === 'High' ? 1.5 : row.importance === 'Medium' ? 1.0 : 0.75;
    row.ratings.forEach((r) => {
      if (optionScores[r.optionName]) {
        optionScores[r.optionName].total += r.score * weightMultiplier;
        optionScores[r.optionName].count += weightMultiplier;
      }
    });
  });

  Object.keys(optionScores).forEach((name) => {
    const data = optionScores[name];
    data.average = data.count > 0 ? parseFloat((data.total / data.count).toFixed(1)) : 0;
  });

  // Find overall highest scoring option in matrix
  let topScorer = '';
  let topScoreVal = -1;
  Object.entries(optionScores).forEach(([name, data]) => {
    if (data.average > topScoreVal) {
      topScoreVal = data.average;
      topScorer = name;
    }
  });

  return (
    <div className="space-y-6">
      {/* Matrix Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt) => {
          const stats = optionScores[opt.name] || { average: 0 };
          const isLeader = opt.name === topScorer;
          return (
            <div
              key={opt.id}
              className={`p-4 rounded-2xl border transition-all ${
                isLeader
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-950/20'
                  : 'bg-stone-900/80 border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  {opt.name}
                </span>
                {isLeader && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>Matrix Leader</span>
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-stone-100">{stats.average}</span>
                <span className="text-xs text-stone-400">/ 10 weighted rating</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 line-clamp-1">{opt.tagline}</p>
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Matrix Table */}
      <div className="hidden md:block bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-950/80 border-b border-stone-800 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                <th className="p-4 w-1/4">Evaluation Criterion</th>
                {options.map((opt) => (
                  <th key={opt.id} className="p-4 w-1/4">
                    <div className="text-stone-200 font-bold">{opt.name}</div>
                    <div className="text-[10px] font-normal text-stone-400 truncate max-w-[180px]">
                      {opt.tagline}
                    </div>
                  </th>
                ))}
                <th className="p-4 w-1/4">Comparative Takeaway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-sm">
              {matrix.map((row, idx) => {
                // Find highest score in this row
                let maxScoreInRow = -1;
                row.ratings.forEach((r) => {
                  if (r.score > maxScoreInRow) maxScoreInRow = r.score;
                });

                return (
                  <tr key={idx} className="hover:bg-stone-800/30 transition-colors">
                    {/* Criterion */}
                    <td className="p-4 align-top">
                      <div className="font-semibold text-stone-200">{row.criteria}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[11px] text-stone-400">{row.category}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${
                            row.importance === 'High'
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                              : row.importance === 'Medium'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                              : 'bg-stone-800 text-stone-400 border-stone-700'
                          }`}
                        >
                          {row.importance} Priority
                        </span>
                      </div>
                    </td>

                    {/* Options Ratings */}
                    {options.map((opt) => {
                      const rating = row.ratings.find((r) => r.optionName === opt.name) || {
                        score: 5,
                        notes: 'N/A',
                      };
                      const isWinner = rating.score === maxScoreInRow && rating.score > 0;

                      return (
                        <td key={opt.id} className="p-4 align-top">
                          <div className="flex items-center space-x-2 mb-1.5">
                            <span
                              className={`text-base font-extrabold ${
                                isWinner ? 'text-amber-400' : 'text-stone-300'
                              }`}
                            >
                              {rating.score}/10
                            </span>
                            {isWinner && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                                Advantage
                              </span>
                            )}
                          </div>
                          {/* Score Bar */}
                          <div className="w-full h-1.5 rounded-full bg-stone-800 mb-2 overflow-hidden">
                            <div
                              style={{ width: `${rating.score * 10}%` }}
                              className={`h-full rounded-full transition-all ${
                                isWinner ? 'bg-amber-400' : 'bg-stone-600'
                              }`}
                            />
                          </div>
                          <p className="text-xs text-stone-300/80 leading-relaxed">{rating.notes}</p>
                        </td>
                      );
                    })}

                    {/* Verdict Takeaway */}
                    <td className="p-4 align-top bg-stone-950/30 border-l border-stone-800/60">
                      <div className="flex items-start space-x-1.5 text-xs text-stone-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{row.verdictInsight}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Matrix Card Stack */}
      <div className="md:hidden space-y-4">
        {matrix.map((row, idx) => (
          <div key={idx} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-100">{row.criteria}</h4>
                <span className="text-xs text-stone-400">{row.category}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                  row.importance === 'High'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}
              >
                {row.importance} Priority
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {row.ratings.map((r, rIdx) => (
                <div key={rIdx} className="bg-stone-950/70 p-2.5 rounded-xl border border-stone-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-300">{r.optionName}</span>
                    <span className="text-xs font-extrabold text-amber-400">{r.score}/10</span>
                  </div>
                  <p className="text-xs text-stone-400">{r.notes}</p>
                </div>
              ))}
            </div>

            <div className="text-xs text-stone-300 bg-stone-950/40 p-2.5 rounded-xl border border-stone-800/60 flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{row.verdictInsight}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
