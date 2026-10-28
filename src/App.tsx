import React, { useState, useEffect, useMemo } from 'react';
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Bookmark,
  FileImage,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shuffle,
} from 'lucide-react';
import {
  OptionKey,
  StatementKey,
  QuizMode,
  QuizScope,
  Part1UserAnswers,
  Part2UserAnswers,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  MultipleChoiceOption,
} from './types/quiz';
import { PART_1_QUESTIONS } from './data/part1Questions';
import { PART_2_QUESTIONS } from './data/part2Questions';
import { PhysicsDiagram } from './components/PhysicsDiagrams';
import { FormulaReferenceModal } from './components/FormulaReferenceModal';

const STORAGE_KEY = 'vat_li_nhiet_12_ch1_state_v3';
const DISPLAY_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(items: T[], seedKey: string): T[] {
  const arr = [...items];
  let seed = hashString(seedKey) || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

interface DisplayedOption {
  displayKey: OptionKey;
  originalKey: OptionKey;
  text: string;
}

function getDisplayedOptions(
  q: MultipleChoiceQuestion,
  isShuffled: boolean,
  shuffleSeed: number
): DisplayedOption[] {
  const ordered: MultipleChoiceOption[] = isShuffled
    ? seededShuffle(q.options, `${q.id}_opt_${shuffleSeed}`)
    : q.options;

  return ordered.map((opt, idx) => ({
    displayKey: DISPLAY_KEYS[idx] || opt.key,
    originalKey: opt.key,
    text: opt.text,
  }));
}

function calculatePart2QuestionPoints(
  q: TrueFalseQuestion,
  userStmtAnswers?: Partial<Record<StatementKey, boolean>>
): { correctCount: number; points: number; isFullyCorrect: boolean; isAnsweredAll: boolean } {
  if (!userStmtAnswers) {
    return { correctCount: 0, points: 0, isFullyCorrect: false, isAnsweredAll: false };
  }
  let correctCount = 0;
  let answeredCount = 0;
  for (const stmt of q.statements) {
    const ans = userStmtAnswers[stmt.key];
    if (ans !== undefined) {
      answeredCount++;
      if (ans === stmt.isTrue) {
        correctCount++;
      }
    }
  }
  const pointsMap: Record<number, number> = {
    0: 0,
    1: 0.1,
    2: 0.25,
    3: 0.5,
    4: 1.0,
  };
  return {
    correctCount,
    points: pointsMap[correctCount] ?? 0,
    isFullyCorrect: correctCount === 4,
    isAnsweredAll: answeredCount === 4,
  };
}

export default function App() {
  const [scope, setScope] = useState<QuizScope>('all');
  const [mode, setMode] = useState<QuizMode>('practice');
  const [view, setView] = useState<'quiz' | 'results'>('quiz');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Unified shuffle state (shuffles both questions and A/B/C/D options together)
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(101);

  const [part1Answers, setPart1Answers] = useState<Part1UserAnswers>({});
  const [part2Answers, setPart2Answers] = useState<Part2UserAnswers>({});
  const [revealedPart2Ids, setRevealedPart2Ids] = useState<Record<string, boolean>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [retryQuestionIds, setRetryQuestionIds] = useState<string[]>([]);

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [sourceImageModal, setSourceImageModal] = useState<{
    url: string;
    page: number;
    title: string;
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct' | 'unanswered'>('all');
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.part1Answers) setPart1Answers(parsed.part1Answers);
        if (parsed.part2Answers) setPart2Answers(parsed.part2Answers);
        if (parsed.flaggedIds) setFlaggedIds(parsed.flaggedIds);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.scope && parsed.scope !== 'retry') setScope(parsed.scope);
        if (typeof parsed.isShuffled === 'boolean') setIsShuffled(parsed.isShuffled);
        if (typeof parsed.shuffleSeed === 'number') setShuffleSeed(parsed.shuffleSeed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          part1Answers,
          part2Answers,
          flaggedIds,
          mode,
          scope: scope === 'retry' ? 'all' : scope,
          isShuffled,
          shuffleSeed,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [part1Answers, part2Answers, flaggedIds, mode, scope, isShuffled, shuffleSeed]);

  // Timer when in quiz view
  useEffect(() => {
    if (view !== 'quiz') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [view]);

  // Active question list based on scope and unified isShuffled setting
  const activeQuestions = useMemo(() => {
    let p1 = [...PART_1_QUESTIONS];
    let p2 = [...PART_2_QUESTIONS];

    if (isShuffled) {
      p1 = seededShuffle(p1, `p1_q_${shuffleSeed}`);
      p2 = seededShuffle(p2, `p2_q_${shuffleSeed}`);
    }

    if (scope === 'part1') return p1;
    if (scope === 'part2') return p2;
    if (scope === 'retry' && retryQuestionIds.length > 0) {
      const combined = [...p1, ...p2];
      return combined.filter((q) => retryQuestionIds.includes(q.id));
    }
    return [...p1, ...p2];
  }, [scope, retryQuestionIds, isShuffled, shuffleSeed]);

  const safeIndex = Math.min(currentIndex, Math.max(0, activeQuestions.length - 1));
  const currentQuestion = activeQuestions[safeIndex];

  // Map each question ID to its clean sequential display number within its part (1..N)
  const displayNumberMap = useMemo(() => {
    const map: Record<string, number> = {};
    let p1Counter = 0;
    let p2Counter = 0;
    for (const q of activeQuestions) {
      if (q.part === 1) {
        p1Counter++;
        map[q.id] = p1Counter;
      } else {
        p2Counter++;
        map[q.id] = p2Counter;
      }
    }
    return map;
  }, [activeQuestions]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view !== 'quiz' || isFormulaOpen || sourceImageModal) return;
      if (e.key === 'ArrowRight' && safeIndex < activeQuestions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && safeIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, isFormulaOpen, sourceImageModal, safeIndex, activeQuestions.length]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleSelectPart1Option = (qId: string, originalKey: OptionKey) => {
    if (view === 'results') return;
    setPart1Answers((prev) => ({
      ...prev,
      [qId]: originalKey,
    }));
  };

  const handleSelectPart2Statement = (qId: string, stmtKey: StatementKey, value: boolean) => {
    if (view === 'results') return;
    setPart2Answers((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [stmtKey]: value,
      },
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedIds((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleSwitchScope = (newScope: QuizScope) => {
    setScope(newScope);
    setCurrentIndex(0);
    setView('quiz');
  };

  const handleToggleShuffle = () => {
    if (!isShuffled) {
      setShuffleSeed(Math.floor(Math.random() * 900000) + 100000);
      setIsShuffled(true);
    } else {
      setIsShuffled(false);
    }
    setCurrentIndex(0);
  };

  const handleReshuffleNow = () => {
    setShuffleSeed(Math.floor(Math.random() * 900000) + 100000);
    setIsShuffled(true);
    setCurrentIndex(0);
  };

  const handleResetQuiz = () => {
    setPart1Answers({});
    setPart2Answers({});
    setRevealedPart2Ids({});
    setFlaggedIds({});
    setElapsedSeconds(0);
    setCurrentIndex(0);
    setView('quiz');
    setConfirmReset(false);
    if (isShuffled) {
      setShuffleSeed(Math.floor(Math.random() * 900000) + 100000);
    }
    if (scope === 'retry') {
      setScope('all');
    }
  };

  // Compute overall statistics across currently active scope
  const stats = useMemo(() => {
    const p1List = activeQuestions.filter((q): q is MultipleChoiceQuestion => q.part === 1);
    const p2List = activeQuestions.filter((q): q is TrueFalseQuestion => q.part === 2);

    let p1Answered = 0;
    let p1Correct = 0;
    const incorrectIds: string[] = [];

    for (const q of p1List) {
      const ans = part1Answers[q.id];
      if (ans !== undefined) {
        p1Answered++;
        if (ans === q.correctAnswer) {
          p1Correct++;
        } else {
          incorrectIds.push(q.id);
        }
      } else {
        incorrectIds.push(q.id);
      }
    }

    let p2QuestionsAnswered = 0;
    let p2QuestionsFullyCorrect = 0;
    let p2StatementsAnswered = 0;
    let p2StatementsCorrect = 0;
    let p2Points = 0;

    for (const q of p2List) {
      const ansObj = part2Answers[q.id];
      const ansKeys = ansObj ? Object.keys(ansObj) : [];
      if (ansKeys.length > 0) {
        p2QuestionsAnswered++;
        p2StatementsAnswered += ansKeys.length;
      }
      const res = calculatePart2QuestionPoints(q, ansObj);
      p2StatementsCorrect += res.correctCount;
      p2Points += res.points;
      if (res.isFullyCorrect) {
        p2QuestionsFullyCorrect++;
      } else {
        incorrectIds.push(q.id);
      }
    }

    const totalItems = p1List.length + p2List.length * 4;
    const totalCorrectItems = p1Correct + p2StatementsCorrect;
    const accuracyPercent = totalItems > 0 ? Math.round((totalCorrectItems / totalItems) * 1000) / 10 : 0;

    const maxRawPoints = p1List.length * 0.25 + p2List.length * 1.0;
    const earnedRawPoints = p1Correct * 0.25 + p2Points;
    const scale10Score = maxRawPoints > 0 ? Math.round((earnedRawPoints / maxRawPoints) * 1000) / 100 : 0;

    return {
      p1Total: p1List.length,
      p1Answered,
      p1Correct,
      p2Total: p2List.length,
      p2QuestionsAnswered,
      p2QuestionsFullyCorrect,
      p2TotalStatements: p2List.length * 4,
      p2StatementsAnswered,
      p2StatementsCorrect,
      p2Points: Math.round(p2Points * 100) / 100,
      totalQuestions: activeQuestions.length,
      totalAnsweredQuestions: p1Answered + p2QuestionsAnswered,
      totalItems,
      totalCorrectItems,
      accuracyPercent,
      earnedRawPoints: Math.round(earnedRawPoints * 100) / 100,
      maxRawPoints: Math.round(maxRawPoints * 100) / 100,
      scale10Score,
      incorrectIds,
    };
  }, [activeQuestions, part1Answers, part2Answers]);

  const handleStartRetryIncorrect = () => {
    if (stats.incorrectIds.length === 0) return;
    const idsToRetry = [...stats.incorrectIds];
    setPart1Answers((prev) => {
      const next = { ...prev };
      for (const id of idsToRetry) delete next[id];
      return next;
    });
    setPart2Answers((prev) => {
      const next = { ...prev };
      for (const id of idsToRetry) delete next[id];
      return next;
    });
    setRevealedPart2Ids((prev) => {
      const next = { ...prev };
      for (const id of idsToRetry) delete next[id];
      return next;
    });
    setRetryQuestionIds(idsToRetry);
    setScope('retry');
    setMode('practice');
    setCurrentIndex(0);
    setView('quiz');
  };

  const getQuestionStatus = (q: MultipleChoiceQuestion | TrueFalseQuestion) => {
    if (q.part === 1) {
      const ans = part1Answers[q.id];
      if (!ans) return 'unanswered';
      return ans === q.correctAnswer ? 'correct' : 'incorrect';
    } else {
      const ansObj = part2Answers[q.id];
      const count = ansObj ? Object.keys(ansObj).length : 0;
      if (count === 0) return 'unanswered';
      const { isFullyCorrect, isAnsweredAll } = calculatePart2QuestionPoints(q, ansObj);
      if (isFullyCorrect) return 'correct';
      if (isAnsweredAll || view === 'results' || revealedPart2Ids[q.id]) return 'incorrect';
      return 'partial';
    }
  };

  const filteredReviewQuestions = useMemo(() => {
    return activeQuestions.filter((q) => {
      const st = getQuestionStatus(q);
      if (reviewFilter === 'all') return true;
      if (reviewFilter === 'correct') return st === 'correct';
      if (reviewFilter === 'incorrect') return st === 'incorrect' || st === 'partial';
      if (reviewFilter === 'unanswered') return st === 'unanswered';
      return true;
    });
  }, [activeQuestions, reviewFilter, part1Answers, part2Answers, view]);

  // Displayed options for current Part 1 question
  const currentDisplayedOptions = useMemo(() => {
    if (!currentQuestion || currentQuestion.part !== 1) return [];
    return getDisplayedOptions(currentQuestion, isShuffled, shuffleSeed);
  }, [currentQuestion, isShuffled, shuffleSeed]);

  const currentDisplayNum = currentQuestion ? displayNumberMap[currentQuestion.id] ?? safeIndex + 1 : 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* TOP NAVIGATION BAR (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 border-b border-slate-200 bg-white/95 px-6 py-3.5 backdrop-blur-xs">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setView('quiz');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Vật Lí Nhiệt 12
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleSwitchScope('all')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'quiz' && scope === 'all' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Toàn bộ đề (88 câu)
          </button>
          <button
            onClick={() => handleSwitchScope('part1')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'quiz' && scope === 'part1' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Phần I (75 câu)
          </button>
          <button
            onClick={() => handleSwitchScope('part2')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'quiz' && scope === 'part2' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Phần II (13 câu Đúng/Sai)
          </button>
          <button
            onClick={() => setIsFormulaOpen(true)}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Công thức
          </button>
          <button
            onClick={() => setView('results')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              view === 'results' ? 'text-sky-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Kết quả
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {view === 'quiz' ? (
            <button
              onClick={() => setView('results')}
              className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Nộp bài & Xem điểm
            </button>
          ) : (
            <button
              onClick={() => setView('quiz')}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Quay lại làm bài
            </button>
          )}
        </div>
      </header>

      {/* WORKSPACE CONTROL BAR */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Scope Selector */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => handleSwitchScope('all')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  scope === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cả đề (88 câu)
              </button>
              <button
                onClick={() => handleSwitchScope('part1')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  scope === 'part1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Phần I: Trắc nghiệm (75)
              </button>
              <button
                onClick={() => handleSwitchScope('part2')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  scope === 'part2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Phần II: Đúng - Sai (13)
              </button>
              {scope === 'retry' && (
                <button
                  onClick={() => setView('quiz')}
                  className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white shadow-xs whitespace-nowrap shrink-0"
                >
                  Đang ôn lại câu sai ({activeQuestions.length} câu)
                </button>
              )}
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setMode('practice')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === 'practice'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chế độ Ôn tập (Giải thích ngay)
              </button>
              <button
                onClick={() => setMode('exam')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === 'exam'
                    ? 'bg-white text-sky-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chế độ Thi thử (Nộp bài mới chấm)
              </button>
            </div>
          </div>

          {/* Second control row: Unified Shuffle button & Utility actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleToggleShuffle}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isShuffled
                    ? 'border-sky-600 bg-sky-50 text-sky-800 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Shuffle className="h-3.5 w-3.5" />
                Tráo câu hỏi & đáp án A/B/C/D: {isShuffled ? 'Đang bật' : 'Tắt'}
              </button>

              {isShuffled && (
                <button
                  onClick={handleReshuffleNow}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Tráo lại lượt mới
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFormulaOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-sky-600" />
                Bảng công thức
              </button>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Làm mới
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleResetQuiz}
                    className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Xác nhận xóa
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {view === 'quiz' && currentQuestion ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            {/* LEFT ZONE: INTERACTIVE QUESTION STAGE (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                {/* Clean unboxed metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">
                      {currentQuestion.part === 1
                        ? 'Phần I: Trắc nghiệm 4 lựa chọn'
                        : 'Phần II: Trắc nghiệm Đúng - Sai'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">
                      Câu {currentDisplayNum}/
                      {currentQuestion.part === 1 ? stats.p1Total : stats.p2Total}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentQuestion.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSourceImageModal({
                          url: currentQuestion.sourceImage,
                          page: currentQuestion.sourcePage,
                          title:
                            currentQuestion.part === 1
                              ? `Phần I - Câu ${currentDisplayNum}`
                              : `Phần II - Câu ${currentDisplayNum}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileImage className="h-3.5 w-3.5 text-sky-600" />
                      Ảnh đề gốc
                    </button>

                    <button
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        flaggedIds[currentQuestion.id]
                          ? 'border-amber-300 bg-amber-50 text-amber-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {flaggedIds[currentQuestion.id] ? 'Đã đánh dấu' : 'Đánh dấu'}
                    </button>
                  </div>
                </div>

                {/* Question Title & Stem */}
                <div className="mt-5">
                  <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                    <span className="text-sky-700 mr-2">Câu {currentDisplayNum}:</span>
                    {currentQuestion.part === 1 ? currentQuestion.question : currentQuestion.stem}
                  </h1>

                  {/* Render SVG diagram or data table if question has one */}
                  {currentQuestion.diagram && <PhysicsDiagram type={currentQuestion.diagram} />}
                </div>

                {/* PART 1: 4 OPTIONS (A, B, C, D) */}
                {currentQuestion.part === 1 && (
                  <div className="mt-6 space-y-3">
                    {currentDisplayedOptions.map((opt) => {
                      const userSelected = part1Answers[currentQuestion.id] === opt.originalKey;
                      const isAnswered = part1Answers[currentQuestion.id] !== undefined;
                      const showFeedback = mode === 'practice' && isAnswered;
                      const isCorrectOption = opt.originalKey === currentQuestion.correctAnswer;

                      let containerStyle =
                        'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';
                      let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

                      if (showFeedback) {
                        if (isCorrectOption) {
                          containerStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950';
                          badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                        } else if (userSelected && !isCorrectOption) {
                          containerStyle = 'border-red-400 bg-red-50/60 text-red-950';
                          badgeStyle = 'bg-red-600 text-white border-red-600';
                        }
                      } else if (userSelected) {
                        containerStyle = 'border-sky-600 bg-sky-50/60 text-slate-900';
                        badgeStyle = 'bg-sky-600 text-white border-sky-600';
                      }

                      return (
                        <button
                          key={opt.originalKey}
                          onClick={() => handleSelectPart1Option(currentQuestion.id, opt.originalKey)}
                          className={`w-full flex items-start justify-between gap-4 rounded-xl border p-4 text-left transition-all cursor-pointer ${containerStyle}`}
                        >
                          <div className="flex items-start gap-3.5">
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-colors ${badgeStyle}`}
                            >
                              {opt.displayKey}
                            </span>
                            <span className="pt-0.5 text-base leading-relaxed">{opt.text}</span>
                          </div>

                          {showFeedback && isCorrectOption && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 whitespace-nowrap shrink-0 pt-1">
                              <Check className="h-4 w-4" />
                              ĐÚNG
                            </span>
                          )}
                          {showFeedback && userSelected && !isCorrectOption && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 whitespace-nowrap shrink-0 pt-1">
                              <X className="h-4 w-4" />
                              SAI
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* PART 2: 4 STATEMENTS (a, b, c, d) TRUE / FALSE */}
                {currentQuestion.part === 2 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span>Chọn Đúng hoặc Sai cho từng mệnh đề a), b), c), d) bên dưới:</span>
                      {mode === 'practice' && (
                        <button
                          onClick={() =>
                            setRevealedPart2Ids((prev) => ({
                              ...prev,
                              [currentQuestion.id]: !prev[currentQuestion.id],
                            }))
                          }
                          className="font-medium text-sky-700 hover:text-sky-800 underline underline-offset-4 cursor-pointer"
                        >
                          {revealedPart2Ids[currentQuestion.id]
                            ? 'Ẩn lời giải cả 4 ý'
                            : 'Xem ngay lời giải cả 4 ý'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.statements.map((stmt) => {
                        const userAns = part2Answers[currentQuestion.id]?.[stmt.key];
                        const isStmtRevealed =
                          mode === 'practice' && (userAns !== undefined || revealedPart2Ids[currentQuestion.id]);
                        const isStmtCorrect = userAns !== undefined && userAns === stmt.isTrue;

                        return (
                          <div
                            key={stmt.key}
                            className={`rounded-xl border p-4 transition-colors ${
                              isStmtRevealed
                                ? userAns === undefined
                                  ? 'border-slate-300 bg-slate-50/70'
                                  : isStmtCorrect
                                  ? 'border-emerald-400 bg-emerald-50/40'
                                  : 'border-red-300 bg-red-50/40'
                                : 'border-slate-200 bg-white'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-start gap-2.5 text-base leading-relaxed text-slate-900">
                                <span className="font-mono font-bold text-sky-800 shrink-0">
                                  {stmt.key})
                                </span>
                                <span>{stmt.text}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSelectPart2Statement(currentQuestion.id, stmt.key, true)
                                  }
                                  className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    userAns === true
                                      ? isStmtRevealed
                                        ? stmt.isTrue === true
                                          ? 'bg-emerald-600 border-emerald-600 text-white'
                                          : 'bg-red-600 border-red-600 text-white'
                                        : 'bg-sky-600 border-sky-600 text-white'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  Đúng
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSelectPart2Statement(currentQuestion.id, stmt.key, false)
                                  }
                                  className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    userAns === false
                                      ? isStmtRevealed
                                        ? stmt.isTrue === false
                                          ? 'bg-emerald-600 border-emerald-600 text-white'
                                          : 'bg-red-600 border-red-600 text-white'
                                        : 'bg-sky-600 border-sky-600 text-white'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  Sai
                                </button>
                              </div>
                            </div>

                            {isStmtRevealed && (
                              <div className="mt-3 border-t border-slate-200/80 pt-3 text-sm leading-relaxed text-slate-700">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span
                                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                                      userAns === undefined
                                        ? 'text-slate-700'
                                        : isStmtCorrect
                                        ? 'text-emerald-700'
                                        : 'text-red-600'
                                    }`}
                                  >
                                    {userAns === undefined ? (
                                      <>Đáp án chuẩn: {stmt.isTrue ? 'ĐÚNG' : 'SAI'}</>
                                    ) : isStmtCorrect ? (
                                      <>
                                        <Check className="h-3.5 w-3.5" /> Bạn chọn chính xác (Đáp án:{' '}
                                        {stmt.isTrue ? 'Đúng' : 'Sai'})
                                      </>
                                    ) : (
                                      <>
                                        <X className="h-3.5 w-3.5" /> Bạn chọn chưa đúng (Đáp án chuẩn:{' '}
                                        {stmt.isTrue ? 'Đúng' : 'Sai'})
                                      </>
                                    )}
                                  </span>
                                </div>
                                <p className="whitespace-pre-line text-slate-700">{stmt.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {mode === 'practice' && currentQuestion.summaryFormula && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-xs font-semibold text-slate-500">
                          Tóm tắt công thức & kết quả tính nhanh Câu {currentDisplayNum}:
                        </div>
                        <div className="mt-1 font-mono text-xs sm:text-sm font-medium text-sky-900">
                          {currentQuestion.summaryFormula}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PART 1 EXPLANATION PANEL (Shown immediately in Practice mode once answered) */}
                {currentQuestion.part === 1 &&
                  mode === 'practice' &&
                  part1Answers[currentQuestion.id] !== undefined &&
                  (() => {
                    const correctDisplayed = currentDisplayedOptions.find(
                      (o) => o.originalKey === currentQuestion.correctAnswer
                    );
                    const userDisplayed = currentDisplayedOptions.find(
                      (o) => o.originalKey === part1Answers[currentQuestion.id]
                    );
                    const correctLabel = correctDisplayed?.displayKey || currentQuestion.correctAnswer;
                    const userLabel = userDisplayed?.displayKey || part1Answers[currentQuestion.id];

                    return (
                      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/90 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2">
                            {part1Answers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                                <CheckCircle2 className="h-4 w-4" />
                                Chính xác! Đáp án đúng là {correctLabel}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                <XCircle className="h-4 w-4" />
                                Chưa chính xác (Bạn chọn {userLabel} · Đáp án đúng là {correctLabel})
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">Giải thích chi tiết</span>
                        </div>

                        {currentQuestion.formula && (
                          <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2 font-mono text-xs sm:text-sm text-sky-900">
                            Công thức: {currentQuestion.formula}
                          </div>
                        )}

                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    );
                  })()}

                {/* Prev / Next Navigation Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                  <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={safeIndex === 0}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Câu trước
                  </button>

                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    Câu {safeIndex + 1} / {activeQuestions.length}
                  </span>

                  {safeIndex < activeQuestions.length - 1 ? (
                    <button
                      onClick={() =>
                        setCurrentIndex((i) => Math.min(activeQuestions.length - 1, i + 1))
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Câu tiếp theo
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setView('results')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Hoàn thành & Xem điểm
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT ZONE: QUESTION MAP & LIVE PROGRESS (4 cols on desktop) */}
            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="font-display text-sm font-bold text-slate-900">
                    Tiến Độ & Bản Đồ Câu Hỏi
                  </h2>
                  <span className="font-mono text-xs font-medium text-slate-600 tabular-nums">
                    Thời gian: {formatTime(elapsedSeconds)}
                  </span>
                </div>

                {/* Live metrics */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
                    <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                      {stats.totalAnsweredQuestions}/{stats.totalQuestions}
                    </div>
                    <div className="text-[11px] text-slate-500">Đã làm</div>
                  </div>
                  {mode === 'practice' ? (
                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
                      <div className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                        {stats.accuracyPercent}%
                      </div>
                      <div className="text-[11px] text-slate-500">Tỷ lệ đúng</div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
                      <div className="font-mono text-base font-bold text-sky-700 tabular-nums">
                        {stats.totalQuestions - stats.totalAnsweredQuestions}
                      </div>
                      <div className="text-[11px] text-slate-500">Chưa làm</div>
                    </div>
                  )}
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
                    <div className="font-mono text-base font-bold text-amber-700 tabular-nums">
                      {Object.values(flaggedIds).filter(Boolean).length}
                    </div>
                    <div className="text-[11px] text-slate-500">Đánh dấu</div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                  {mode === 'practice' ? (
                    <>
                      <span>■ Xanh lá: Đúng</span>
                      <span>·</span>
                      <span>■ Đỏ: Sai</span>
                      <span>·</span>
                      <span>■ Viền xanh: Đang xem</span>
                    </>
                  ) : (
                    <>
                      <span>■ Xanh lam: Đã trả lời</span>
                      <span>·</span>
                      <span>■ Trắng: Chưa làm</span>
                    </>
                  )}
                </div>

                {/* Part I Grid */}
                {activeQuestions.some((q) => q.part === 1) && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Phần I: Trắc nghiệm 4 lựa chọn</span>
                      <span className="font-mono text-slate-500 tabular-nums">
                        {stats.p1Answered}/{stats.p1Total}
                      </span>
                    </div>
                    <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-7 gap-1.5 max-h-60 overflow-y-auto pr-1">
                      {activeQuestions.map((q, idx) => {
                        if (q.part !== 1) return null;
                        const isCurrent = idx === safeIndex;
                        const st = getQuestionStatus(q);
                        const isFlagged = flaggedIds[q.id];
                        const dispNum = displayNumberMap[q.id] ?? idx + 1;

                        let btnClass = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';
                        if (mode === 'practice') {
                          if (st === 'correct') {
                            btnClass = 'border-emerald-600 bg-emerald-600 text-white';
                          } else if (st === 'incorrect') {
                            btnClass = 'border-red-600 bg-red-600 text-white';
                          }
                        } else if (st !== 'unanswered') {
                          btnClass = 'border-sky-600 bg-sky-600 text-white';
                        }

                        if (isCurrent) {
                          btnClass += ' ring-2 ring-sky-600 ring-offset-1 font-bold';
                        } else if (isFlagged) {
                          btnClass += ' ring-2 ring-amber-500';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-8 rounded-md border font-mono text-xs transition-all tabular-nums cursor-pointer ${btnClass}`}
                          >
                            {dispNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Part II Grid */}
                {activeQuestions.some((q) => q.part === 2) && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Phần II: Trắc nghiệm Đúng - Sai</span>
                      <span className="font-mono text-slate-500 tabular-nums">
                        {stats.p2QuestionsAnswered}/{stats.p2Total}
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {activeQuestions.map((q, idx) => {
                        if (q.part !== 2) return null;
                        const isCurrent = idx === safeIndex;
                        const st = getQuestionStatus(q);
                        const isFlagged = flaggedIds[q.id];
                        const dispNum = displayNumberMap[q.id] ?? 1;

                        let btnClass = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';
                        if (mode === 'practice') {
                          if (st === 'correct') {
                            btnClass = 'border-emerald-600 bg-emerald-600 text-white';
                          } else if (st === 'incorrect') {
                            btnClass = 'border-red-600 bg-red-600 text-white';
                          } else if (st === 'partial') {
                            btnClass = 'border-amber-500 bg-amber-50 text-amber-900';
                          }
                        } else if (st !== 'unanswered') {
                          btnClass = 'border-sky-600 bg-sky-600 text-white';
                        }

                        if (isCurrent) {
                          btnClass += ' ring-2 ring-sky-600 ring-offset-1 font-bold';
                        } else if (isFlagged) {
                          btnClass += ' ring-2 ring-amber-500';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-8 rounded-md border font-mono text-xs transition-all tabular-nums cursor-pointer ${btnClass}`}
                          >
                            {dispNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setView('results')}
                  className="mt-5 w-full rounded-lg bg-sky-600 py-2.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors cursor-pointer"
                >
                  Nộp bài & Xem kết quả tổng kết
                </button>
              </div>
            </aside>
          </div>
        ) : (
          /* RESULTS & DETAILED REVIEW VIEW */
          <div className="space-y-6">
            {/* Summary Score Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Báo cáo kết quả ôn tập · Chương 1: Vật Lí Nhiệt
                  </div>
                  <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Kết Quả Bài Làm Cuối Cùng
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {stats.incorrectIds.length > 0 && (
                    <button
                      onClick={handleStartRetryIncorrect}
                      className="rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Làm lại {stats.incorrectIds.length} câu sai / chưa hoàn thành
                    </button>
                  )}
                  <button
                    onClick={handleResetQuiz}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Làm lại từ đầu
                  </button>
                </div>
              </div>

              {/* 4-column KPI strip */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="text-xs text-slate-500">Điểm quy đổi thang 10</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-sky-700 tabular-nums">
                    {stats.scale10Score.toFixed(2)}{' '}
                    <span className="text-base font-normal text-slate-500">/ 10</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-mono tabular-nums">
                    Điểm thô: {stats.earnedRawPoints} / {stats.maxRawPoints} điểm
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="text-xs text-slate-500">Tỷ lệ chính xác tổng thể</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-emerald-700 tabular-nums">
                    {stats.accuracyPercent}%
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-mono tabular-nums">
                    Đúng {stats.totalCorrectItems} / {stats.totalItems} ý toàn đề
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="text-xs text-slate-500">Phần I (Trắc nghiệm 4 lựa chọn)</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-slate-900 tabular-nums">
                    {stats.p1Correct}{' '}
                    <span className="text-base font-normal text-slate-500">/ {stats.p1Total} câu</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-mono tabular-nums">
                    Đã trả lời: {stats.p1Answered} câu
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="text-xs text-slate-500">Phần II (Trắc nghiệm Đúng - Sai)</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-slate-900 tabular-nums">
                    {stats.p2StatementsCorrect}{' '}
                    <span className="text-base font-normal text-slate-500">
                      / {stats.p2TotalStatements} ý
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-mono tabular-nums">
                    Đúng trọn vẹn 4/4 ý: {stats.p2QuestionsFullyCorrect}/{stats.p2Total} câu ({stats.p2Points}đ)
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Review Filter & Question List */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Chi Tiết Đáp Án & Giải Thích Từng Câu ({filteredReviewQuestions.length} câu)
                </h2>

                <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      reviewFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả ({activeQuestions.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('incorrect')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      reviewFilter === 'incorrect'
                        ? 'bg-white text-red-600 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Làm sai / Thiếu ý
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      reviewFilter === 'correct'
                        ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Làm đúng hoàn toàn
                  </button>
                  <button
                    onClick={() => setReviewFilter('unanswered')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      reviewFilter === 'unanswered'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chưa làm
                  </button>
                </div>
              </div>

              <div className="mt-6 divide-y divide-slate-200">
                {filteredReviewQuestions.map((q) => {
                  const st = getQuestionStatus(q);
                  const dispNum = displayNumberMap[q.id] ?? q.number;
                  const reviewOptions =
                    q.part === 1 ? getDisplayedOptions(q, isShuffled, shuffleSeed) : [];

                  return (
                    <div key={q.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {q.part === 1 ? `Phần I · Câu ${dispNum}` : `Phần II · Câu ${dispNum}`}
                          </span>
                          <span>·</span>
                          <span>{q.topic}</span>
                        </div>

                        <div>
                          {st === 'correct' && (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                              <CheckCircle2 className="h-4 w-4" />
                              ✓ ĐÚNG HOÀN TOÀN
                            </span>
                          )}
                          {(st === 'incorrect' || st === 'partial') && (
                            <span className="inline-flex items-center gap-1 font-bold text-red-600">
                              <XCircle className="h-4 w-4" />
                              ✕ CẦN XEM LẠI
                            </span>
                          )}
                          {st === 'unanswered' && (
                            <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                              <HelpCircle className="h-4 w-4" />
                              CHƯA TRẢ LỜI
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="mt-2 font-display text-base font-bold text-slate-900 whitespace-pre-line">
                        Câu {dispNum}: {q.part === 1 ? q.question : q.stem}
                      </h3>

                      {q.diagram && <PhysicsDiagram type={q.diagram} />}

                      {q.part === 1 ? (
                        <div className="mt-3 space-y-2">
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {reviewOptions.map((opt) => {
                              const isCorrect = opt.originalKey === q.correctAnswer;
                              const isUserPick = part1Answers[q.id] === opt.originalKey;
                              return (
                                <div
                                  key={opt.originalKey}
                                  className={`rounded-lg border px-3.5 py-2.5 text-sm ${
                                    isCorrect
                                      ? 'border-emerald-500 bg-emerald-50/70 font-medium text-emerald-950'
                                      : isUserPick
                                      ? 'border-red-400 bg-red-50/70 text-red-950'
                                      : 'border-slate-200 bg-white text-slate-700'
                                  }`}
                                >
                                  <span className="font-mono font-bold mr-2">{opt.displayKey}.</span>
                                  {opt.text}
                                  {isCorrect && (
                                    <span className="ml-2 text-xs font-bold text-emerald-700">
                                      (Đáp án đúng)
                                    </span>
                                  )}
                                  {isUserPick && !isCorrect && (
                                    <span className="ml-2 text-xs font-bold text-red-600">
                                      (Bạn chọn)
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                            {q.formula && (
                              <div className="mb-2 font-mono text-xs font-semibold text-sky-900">
                                Công thức: {q.formula}
                              </div>
                            )}
                            <div className="whitespace-pre-line leading-relaxed">
                              <strong className="text-slate-900">Giải thích: </strong>
                              {q.explanation}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 space-y-2.5">
                          {q.statements.map((stmt) => {
                            const userAns = part2Answers[q.id]?.[stmt.key];
                            const isStmtRight = userAns === stmt.isTrue;
                            return (
                              <div
                                key={stmt.key}
                                className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 text-sm"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="font-medium text-slate-900">
                                    <span className="font-mono font-bold text-sky-800 mr-1.5">
                                      {stmt.key})
                                    </span>
                                    {stmt.text}
                                  </div>
                                  <div className="font-mono text-xs shrink-0">
                                    <span className="font-bold text-slate-900">
                                      Đáp án: {stmt.isTrue ? 'Đúng' : 'Sai'}
                                    </span>
                                    <span className="mx-1.5 text-slate-400">·</span>
                                    {userAns === undefined ? (
                                      <span className="text-slate-500">Bạn chưa chọn</span>
                                    ) : isStmtRight ? (
                                      <span className="font-bold text-emerald-700">
                                        ✓ Bạn chọn {userAns ? 'Đúng' : 'Sai'}
                                      </span>
                                    ) : (
                                      <span className="font-bold text-red-600">
                                        ✕ Bạn chọn {userAns ? 'Đúng' : 'Sai'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="mt-2 text-slate-700 whitespace-pre-line leading-relaxed">
                                  {stmt.explanation}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FORMULA MODAL */}
      <FormulaReferenceModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />

      {/* ORIGINAL SCANNED PAGE MODAL */}
      {sourceImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-display text-base font-bold text-slate-900">
                Ảnh chụp tài liệu — {sourceImageModal.title}
              </h3>
              <button
                onClick={() => setSourceImageModal(null)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-center bg-slate-100 rounded-lg p-2">
              <img
                src={sourceImageModal.url}
                alt={sourceImageModal.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const currentSrc = e.currentTarget.getAttribute('src') || '';
                  if (!currentSrc.includes('public/assets/')) {
                    const fileName = currentSrc.split('/').pop();
                    if (fileName) {
                      e.currentTarget.src = `./public/assets/aistudio/${fileName}`;
                    }
                  }
                }}
                className="max-h-[75vh] w-auto rounded object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
