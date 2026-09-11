import React, { useState } from 'react';
import { Plus, Check, X, ShieldAlert, Zap, DollarSign, Briefcase, Heart, Globe, Trash2 } from 'lucide-react';
import { OptionAnalysis, ProConItem, CategoryType } from '../types';

interface ProsConsViewProps {
  options: OptionAnalysis[];
  onUpdateOptions: (updatedOptions: OptionAnalysis[]) => void;
}

const CATEGORY_ICONS: Record<CategoryType, React.ReactNode> = {
  Financial: <DollarSign className="w-3 h-3 text-emerald-400" />,
  'Career & Growth': <Briefcase className="w-3 h-3 text-sky-400" />,
  'Well-being & Lifestyle': <Heart className="w-3 h-3 text-pink-400" />,
  'Risk & Security': <ShieldAlert className="w-3 h-3 text-amber-400" />,
  General: <Globe className="w-3 h-3 text-stone-400" />,
};

export const ProsConsView: React.FC<ProsConsViewProps> = ({ options, onUpdateOptions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addingToOptionId, setAddingToOptionId] = useState<string | null>(null);
  const [newType, setNewType] = useState<'pro' | 'con'>('pro');
  const [newPoint, setNewPoint] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('General');
  const [newWeight, setNewWeight] = useState<number>(3);

  // Compute calculated net scores for each option
  const computeScore = (option: OptionAnalysis) => {
    const totalPros = option.pros.reduce((acc, p) => acc + p.weight, 0);
    const totalCons = option.cons.reduce((acc, c) => acc + c.weight, 0);
    const net = totalPros - totalCons;
    return { totalPros, totalCons, net };
  };

  const handleWeightChange = (
    optionId: string,
    itemId: string,
    type: 'pro' | 'con',
    newWeightVal: number
  ) => {
    const updated = options.map((opt) => {
      if (opt.id !== optionId) return opt;
      if (type === 'pro') {
        return {
          ...opt,
          pros: opt.pros.map((p) => (p.id === itemId ? { ...p, weight: newWeightVal } : p)),
        };
      } else {
        return {
          ...opt,
          cons: opt.cons.map((c) => (c.id === itemId ? { ...c, weight: newWeightVal } : c)),
        };
      }
    });
    onUpdateOptions(updated);
  };

  const handleDeleteItem = (optionId: string, itemId: string, type: 'pro' | 'con') => {
    const updated = options.map((opt) => {
      if (opt.id !== optionId) return opt;
      if (type === 'pro') {
        return { ...opt, pros: opt.pros.filter((p) => p.id !== itemId) };
      } else {
        return { ...opt, cons: opt.cons.filter((c) => c.id !== itemId) };
      }
    });
    onUpdateOptions(updated);
  };

  const handleAddCustomItem = (optionId: string) => {
    if (!newPoint.trim()) return;

    const newItem: ProConItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      point: newPoint.trim(),
      detail: newDetail.trim() || 'Custom factor added by user.',
      category: newCategory,
      weight: newWeight,
    };

    const updated = options.map((opt) => {
      if (opt.id !== optionId) return opt;
      if (newType === 'pro') {
        return { ...opt, pros: [newItem, ...opt.pros] };
      } else {
        return { ...opt, cons: [newItem, ...opt.cons] };
      }
    });

    onUpdateOptions(updated);
    setNewPoint('');
    setNewDetail('');
    setAddingToOptionId(null);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 border border-stone-800 p-3 rounded-xl">
        <div className="flex items-center space-x-2 text-xs font-semibold text-stone-300">
          <span>Filter by Domain:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Financial', 'Career & Growth', 'Well-being & Lifestyle', 'Risk & Security'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Options Grid */}
      <div className={`grid grid-cols-1 ${options.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
        {options.map((option) => {
          const { totalPros, totalCons, net } = computeScore(option);
          const filteredPros =
            selectedCategory === 'All'
              ? option.pros
              : option.pros.filter((p) => p.category === selectedCategory);
          const filteredCons =
            selectedCategory === 'All'
              ? option.cons
              : option.cons.filter((c) => c.category === selectedCategory);

          return (
            <div
              key={option.id}
              className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-stone-100">{option.name}</h3>
                    <p className="text-xs text-stone-400 mt-0.5">{option.tagline}</p>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      net > 0
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : net < 0
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}
                  >
                    Net Balance: {net > 0 ? `+${net}` : net}
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mb-6 bg-stone-950/70 p-3 rounded-xl border border-stone-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-emerald-400">Pros Total: +{totalPros} pts</span>
                    <span className="text-rose-400">Cons Total: -{totalCons} pts</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden flex">
                    <div
                      style={{
                        width: `${Math.round((totalPros / (totalPros + totalCons || 1)) * 100)}%`,
                      }}
                      className="h-full bg-emerald-500 transition-all duration-300"
                    />
                    <div
                      style={{
                        width: `${Math.round((totalCons / (totalPros + totalCons || 1)) * 100)}%`,
                      }}
                      className="h-full bg-rose-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Pros Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Pros & Advantages ({filteredPros.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingToOptionId(option.id);
                        setNewType('pro');
                      }}
                      className="text-[11px] text-emerald-400/80 hover:text-emerald-300 font-medium flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Pro</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {filteredPros.map((pro) => (
                      <div
                        key={pro.id}
                        className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 hover:border-emerald-700/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-emerald-200">
                                {pro.point}
                              </span>
                              <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-900/80 text-stone-300 border border-stone-800">
                                {CATEGORY_ICONS[pro.category] || null}
                                <span>{pro.category}</span>
                              </span>
                            </div>
                            <p className="text-xs text-stone-300/80 mt-1 leading-relaxed">
                              {pro.detail}
                            </p>
                          </div>

                          {/* Weight Adjuster & Delete */}
                          <div className="flex flex-col items-end space-y-1.5 shrink-0">
                            <div className="flex items-center space-x-1" title="Impact weight (1-5)">
                              {[1, 2, 3, 4, 5].map((w) => (
                                <button
                                  key={w}
                                  type="button"
                                  onClick={() => handleWeightChange(option.id, pro.id, 'pro', w)}
                                  className={`w-2 h-2 rounded-full transition-transform hover:scale-125 ${
                                    w <= pro.weight ? 'bg-emerald-400' : 'bg-stone-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(option.id, pro.id, 'pro')}
                              className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 transition-opacity"
                              title="Delete point"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredPros.length === 0 && (
                      <p className="text-xs text-stone-500 italic py-2">No pros in this category.</p>
                    )}
                  </div>
                </div>

                {/* Cons Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                      <X className="w-3.5 h-3.5" />
                      <span>Cons & Downsides ({filteredCons.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingToOptionId(option.id);
                        setNewType('con');
                      }}
                      className="text-[11px] text-rose-400/80 hover:text-rose-300 font-medium flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Con</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {filteredCons.map((con) => (
                      <div
                        key={con.id}
                        className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 hover:border-rose-700/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-rose-200">{con.point}</span>
                              <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-900/80 text-stone-300 border border-stone-800">
                                {CATEGORY_ICONS[con.category] || null}
                                <span>{con.category}</span>
                              </span>
                            </div>
                            <p className="text-xs text-stone-300/80 mt-1 leading-relaxed">
                              {con.detail}
                            </p>
                          </div>

                          {/* Weight Adjuster & Delete */}
                          <div className="flex flex-col items-end space-y-1.5 shrink-0">
                            <div className="flex items-center space-x-1" title="Severity weight (1-5)">
                              {[1, 2, 3, 4, 5].map((w) => (
                                <button
                                  key={w}
                                  type="button"
                                  onClick={() => handleWeightChange(option.id, con.id, 'con', w)}
                                  className={`w-2 h-2 rounded-full transition-transform hover:scale-125 ${
                                    w <= con.weight ? 'bg-rose-400' : 'bg-stone-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(option.id, con.id, 'con')}
                              className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 transition-opacity"
                              title="Delete point"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredCons.length === 0 && (
                      <p className="text-xs text-stone-500 italic py-2">No cons in this category.</p>
                    )}
                  </div>
                </div>

                {/* Inline Add Pro/Con Modal or Drawer for this Option */}
                {addingToOptionId === option.id && (
                  <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                      <span>Add Custom {newType === 'pro' ? 'Pro' : 'Con'} to {option.name}</span>
                      <button
                        type="button"
                        onClick={() => setAddingToOptionId(null)}
                        className="text-stone-400 hover:text-stone-200"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setNewType('pro')}
                        className={`flex-1 py-1 text-xs rounded font-medium ${
                          newType === 'pro' ? 'bg-emerald-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        Pro (+ Advantage)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewType('con')}
                        className={`flex-1 py-1 text-xs rounded font-medium ${
                          newType === 'con' ? 'bg-rose-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        Con (- Downside)
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title / Key Factor..."
                      value={newPoint}
                      onChange={(e) => setNewPoint(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Short explanation / impact notes..."
                      value={newDetail}
                      onChange={(e) => setNewDetail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex items-center justify-between">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                        className="bg-stone-900 border border-stone-700 rounded-lg px-2 py-1 text-xs text-stone-200"
                      >
                        <option value="General">General</option>
                        <option value="Financial">Financial</option>
                        <option value="Career & Growth">Career & Growth</option>
                        <option value="Well-being & Lifestyle">Well-being & Lifestyle</option>
                        <option value="Risk & Security">Risk & Security</option>
                      </select>
                      <div className="flex items-center space-x-2 text-xs text-stone-300">
                        <span>Weight:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((w) => (
                            <button
                              key={w}
                              type="button"
                              onClick={() => setNewWeight(w)}
                              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                                newWeight === w ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                              }`}
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddCustomItem(option.id)}
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors"
                    >
                      Save Point
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
