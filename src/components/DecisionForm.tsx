import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ArrowRight, Lightbulb, Compass, Loader2 } from 'lucide-react';
import { DecisionRequest, DecisionAnalysis } from '../types';

interface DecisionFormProps {
  onSubmit: (request: DecisionRequest) => Promise<void>;
  isLoading: boolean;
  onLoadPreset: (preset: DecisionAnalysis) => void;
  presets: DecisionAnalysis[];
}

const COMMON_PRIORITIES = [
  'Long-Term Upside',
  'Financial Security',
  'Work-Life Balance',
  'Rapid Career Growth',
  'Creative Autonomy',
  'Stress & Risk Reduction',
];

const TIME_HORIZONS = ['Immediate (1 Year)', 'Medium-Term (2-3 Years)', 'Long-Term (5+ Years)'];

export const DecisionForm: React.FC<DecisionFormProps> = ({
  onSubmit,
  isLoading,
  onLoadPreset,
  presets,
}) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [context, setContext] = useState('');
  const [priority, setPriority] = useState('Long-Term Upside');
  const [timeHorizon, setTimeHorizon] = useState('Medium-Term (2-3 Years)');
  const [error, setError] = useState<string | null>(null);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please state the decision you need to make.');
      return;
    }
    setError(null);

    const validOptions = options.map((o) => o.trim()).filter((o) => o.length > 0);

    await onSubmit({
      title: title.trim(),
      options: validOptions,
      context: context.trim() || undefined,
      priority,
      timeHorizon,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Structured Trade-Off Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
          Break the deadlock on your next big move
        </h1>
        <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-2xl mx-auto">
          Provide your dilemma. The Tiebreaker models multi-dimensional pros & cons, side-by-side matrices, and SWOT breakdowns to clarify your verdict.
        </p>
      </div>

      {/* Preset Quick Starters */}
      <div className="mb-8 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-300">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Or explore instant pre-computed case studies:</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onLoadPreset(preset)}
              type="button"
              className="text-left p-3 rounded-xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 line-clamp-1">
                  {preset.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
              </div>
              <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                {preset.options.map((o) => o.name).join(' vs ')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
      >
        {/* Dilemma Title */}
        <div>
          <label htmlFor="decision-title" className="block text-sm font-semibold text-stone-200 mb-2">
            What is the decision you need to make? <span className="text-amber-400">*</span>
          </label>
          <textarea
            id="decision-title"
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Should I accept the senior startup offer or stay at my current corporate tech company?"
            className="w-full bg-stone-950 border border-stone-700/80 rounded-xl p-3.5 text-sm sm:text-base text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
          />
          {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
        </div>

        {/* Options to Compare */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-stone-200">
              Specific Options Being Considered{' '}
              <span className="text-xs font-normal text-stone-400">(Optional — leave blank to let AI deduce contrasting paths)</span>
            </label>
            {options.length < 4 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Option</span>
              </button>
            )}
          </div>
          <div className="space-y-2.5">
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-stone-400 w-16 shrink-0">
                  Option {idx + 1}:
                </span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={
                    idx === 0
                      ? 'e.g., Take the Seed-Stage Startup Offer'
                      : idx === 1
                      ? 'e.g., Stay at Big Tech Corporate Job'
                      : `e.g., Alternative Option ${idx + 1}`
                  }
                  className="flex-1 bg-stone-950 border border-stone-700/80 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="p-2 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Remove option"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Context / Background */}
        <div>
          <label htmlFor="context" className="block text-sm font-semibold text-stone-200 mb-2">
            Context, Stakes, & Personal Constraints{' '}
            <span className="text-xs font-normal text-stone-400">(Optional but highly recommended)</span>
          </label>
          <textarea
            id="context"
            rows={3}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., I have 5 years experience, a 1-year-old child, $40k emergency savings, and want to accelerate my leadership trajectory without burning out."
            className="w-full bg-stone-950 border border-stone-700/80 rounded-xl p-3.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Priority & Time Horizon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Top Priority */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Primary Deciding Factor
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    priority === p
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700/60'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Time Horizon */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Evaluation Timeframe
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_HORIZONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeHorizon(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeHorizon === t
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-stone-400">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Generates Pros & Cons, Side-by-Side Matrix, and SWOT in seconds</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                <span>Synthesizing Decision Models...</span>
              </>
            ) : (
              <>
                <span>Run Decision Breakdown</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
