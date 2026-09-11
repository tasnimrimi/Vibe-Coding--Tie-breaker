import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DecisionForm } from './components/DecisionForm';
import { DecisionDashboard } from './components/DecisionDashboard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ExportModal } from './components/ExportModal';
import { PRESET_DECISIONS } from './data/presetDecisions';
import { DecisionAnalysis, DecisionRequest } from './types';
import { AlertTriangle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'tiebreaker_saved_decisions_v1';

export default function App() {
  const [currentDecision, setCurrentDecision] = useState<DecisionAnalysis | null>(null);
  const [savedDecisions, setSavedDecisions] = useState<DecisionAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<DecisionRequest | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Load saved decisions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedDecisions(parsed);
          // Set the latest decision if available
          setCurrentDecision(parsed[0]);
          return;
        }
      }
      // If nothing saved, load the first rich preset as a welcoming demonstration
      setSavedDecisions(PRESET_DECISIONS);
      setCurrentDecision(PRESET_DECISIONS[0]);
    } catch (e) {
      console.warn('Could not read from localStorage', e);
      setSavedDecisions(PRESET_DECISIONS);
      setCurrentDecision(PRESET_DECISIONS[0]);
    }
  }, []);

  // Sync savedDecisions to localStorage
  const saveToStorage = (decisions: DecisionAnalysis[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  };

  const handleAnalyzeDecision = async (request: DecisionRequest) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLastRequest(request);

    try {
      const response = await fetch('/api/analyze-decision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze decision.');
      }

      setCurrentDecision(data);
      const updatedList = [data, ...savedDecisions.filter((d) => d.id !== data.id)];
      setSavedDecisions(updatedList);
      saveToStorage(updatedList);
    } catch (err: any) {
      console.error('API Error:', err);
      setErrorMessage(
        err.message ||
          'The analysis service is experiencing high temporary demand. You can retry in a moment or explore our presets.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDecision = (updated: DecisionAnalysis) => {
    setCurrentDecision(updated);
    const updatedList = savedDecisions.map((d) => (d.id === updated.id ? updated : d));
    setSavedDecisions(updatedList);
    saveToStorage(updatedList);
  };

  const handleLoadPreset = (preset: DecisionAnalysis) => {
    setCurrentDecision(preset);
    // Add to saved list if not present
    if (!savedDecisions.some((d) => d.id === preset.id)) {
      const updatedList = [preset, ...savedDecisions];
      setSavedDecisions(updatedList);
      saveToStorage(updatedList);
    }
  };

  const handleDeleteDecision = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedList = savedDecisions.filter((d) => d.id !== id);
    setSavedDecisions(updatedList);
    saveToStorage(updatedList);
    if (currentDecision?.id === id) {
      setCurrentDecision(updatedList[0] || null);
    }
  };

  const handleClearAllHistory = () => {
    setSavedDecisions([]);
    saveToStorage([]);
    setCurrentDecision(null);
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Header */}
      <Header
        currentDecision={currentDecision}
        historyCount={savedDecisions.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewDecision={() => setCurrentDecision(null)}
        onOpenExport={() => setIsExportOpen(true)}
        onLoadPreset={handleLoadPreset}
        presets={PRESET_DECISIONS}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Error Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Notice: </span>
                  <span>{errorMessage}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                {lastRequest && (
                  <button
                    onClick={() => handleAnalyzeDecision(lastRequest)}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors"
                  >
                    Retry Analysis
                  </button>
                )}
                <button
                  onClick={() => setErrorMessage(null)}
                  className="px-2.5 py-1.5 text-stone-400 hover:text-stone-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Switching */}
        {currentDecision ? (
          <DecisionDashboard
            decision={currentDecision}
            onUpdateDecision={handleUpdateDecision}
            onBackToForm={() => setCurrentDecision(null)}
            onOpenExport={() => setIsExportOpen(true)}
          />
        ) : (
          <DecisionForm
            onSubmit={handleAnalyzeDecision}
            isLoading={isLoading}
            onLoadPreset={handleLoadPreset}
            presets={PRESET_DECISIONS}
          />
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedDecisions={savedDecisions}
        onSelectDecision={(dec) => setCurrentDecision(dec)}
        onDeleteDecision={handleDeleteDecision}
        onClearAll={handleClearAllHistory}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        decision={currentDecision}
      />

      {/* Footer */}
      <footer className="border-t border-stone-800/60 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-stone-400">The Tiebreaker</span>
            <span>— Strategic Decision Intelligence</span>
          </div>
          <div className="text-stone-500">
            Pros & Cons • Side-by-Side Matrices • SWOT Frameworks
          </div>
        </div>
      </footer>
    </div>
  );
}
