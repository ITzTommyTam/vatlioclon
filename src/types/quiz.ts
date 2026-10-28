export type OptionKey = 'A' | 'B' | 'C' | 'D';
export type StatementKey = 'a' | 'b' | 'c' | 'd';

export type DiagramType =
  | 'q61_table'
  | 'q67_thermometer'
  | 'q72_phase_triangle'
  | 'q73_cooling_curve'
  | 'q74_molecular_states'
  | 'q75_melting_curve'
  | 'p2_q5_heating_curve';

export interface MultipleChoiceOption {
  key: OptionKey;
  text: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  part: 1;
  number: number;
  topic: string;
  question: string;
  diagram?: DiagramType;
  sourcePage: number;
  sourceImage: string;
  options: MultipleChoiceOption[];
  correctAnswer: OptionKey;
  formula?: string;
  explanation: string;
}

export interface TrueFalseStatement {
  key: StatementKey;
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  part: 2;
  number: number;
  topic: string;
  stem: string;
  diagram?: DiagramType;
  sourcePage: number;
  sourceImage: string;
  statements: TrueFalseStatement[];
  summaryFormula?: string;
}

export type QuizQuestion = MultipleChoiceQuestion | TrueFalseQuestion;

export type QuizMode = 'practice' | 'exam';
export type QuizScope = 'all' | 'part1' | 'part2' | 'retry';

export type Part1UserAnswers = Record<string, OptionKey>;
export type Part2UserAnswers = Record<string, Partial<Record<StatementKey, boolean>>>;
