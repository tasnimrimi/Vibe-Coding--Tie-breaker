export type CategoryType = 'Financial' | 'Career & Growth' | 'Well-being & Lifestyle' | 'Risk & Security' | 'General';

export interface ProConItem {
  id: string;
  point: string;
  detail: string;
  category: CategoryType;
  weight: number; // 1 to 5
}

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface OptionAnalysis {
  id: string;
  name: string;
  tagline: string;
  pros: ProConItem[];
  cons: ProConItem[];
  swot: SwotData;
}

export interface MatrixRow {
  criteria: string;
  category: string;
  importance: 'High' | 'Medium' | 'Low';
  ratings: {
    optionName: string;
    score: number; // 1 to 10
    notes: string;
  }[];
  verdictInsight: string;
}

export interface ThoughtExperiment {
  title: string;
  prompt: string;
  insight: string;
}

export interface TiebreakerVerdict {
  headline: string;
  recommendedOption: string;
  confidenceScore: number; // 0 - 100
  reasoning: string;
  conditionalRule: {
    choosePrimaryIf: string;
    chooseAlternativeIf: string;
  };
  blindSpots: string[];
  thoughtExperiments: ThoughtExperiment[];
}

export interface DecisionAnalysis {
  id: string;
  createdAt: string;
  title: string;
  context?: string;
  priority?: string;
  timeHorizon?: string;
  options: OptionAnalysis[];
  comparisonMatrix: MatrixRow[];
  tiebreakerVerdict: TiebreakerVerdict;
}

export interface DecisionRequest {
  title: string;
  context?: string;
  options: string[];
  priority?: string;
  timeHorizon?: string;
}
