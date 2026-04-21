import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isLessonComplete } from '../utils/lessonProgress';

interface LearningState {
  completedLessons: number[];
  lessonProgress: Record<number, number>;
  bookmarks: string[];
  confusedCards: string[];
  lastVisitedLesson: number | null;
  quizAttempts: Record<number, number>;
  pronunciationAttempts: Record<number, number>;
  setLastVisitedLesson: (lessonId: number) => void;
  setCardProgress: (lessonId: number, progress: number) => void;
  addQuizAttempt: (lessonId: number) => void;
  addPronunciationAttempt: (lessonId: number) => void;
  evaluateLessonCompletion: (lessonId: number) => void;
}

function clampPercentage(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      lessonProgress: {},
      bookmarks: [],
      confusedCards: [],
      lastVisitedLesson: null,
      quizAttempts: {},
      pronunciationAttempts: {},
      setLastVisitedLesson: (lessonId) => set({ lastVisitedLesson: lessonId }),
      setCardProgress: (lessonId, progress) => {
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: clampPercentage(progress)
          }
        }));
        get().evaluateLessonCompletion(lessonId);
      },
      addQuizAttempt: (lessonId) => {
        set((state) => ({
          quizAttempts: {
            ...state.quizAttempts,
            [lessonId]: (state.quizAttempts[lessonId] ?? 0) + 1
          }
        }));
        get().evaluateLessonCompletion(lessonId);
      },
      addPronunciationAttempt: (lessonId) => {
        set((state) => ({
          pronunciationAttempts: {
            ...state.pronunciationAttempts,
            [lessonId]: (state.pronunciationAttempts[lessonId] ?? 0) + 1
          }
        }));
        get().evaluateLessonCompletion(lessonId);
      },
      evaluateLessonCompletion: (lessonId) => {
        const state = get();
        const isComplete = isLessonComplete({
          cardProgress: state.lessonProgress[lessonId] ?? 0,
          quizAttempts: state.quizAttempts[lessonId] ?? 0,
          pronunciationAttempts: state.pronunciationAttempts[lessonId] ?? 0
        });

        set((latestState) => {
          const alreadyComplete = latestState.completedLessons.includes(lessonId);
          if (isComplete && !alreadyComplete) {
            return { completedLessons: [...latestState.completedLessons, lessonId].sort((a, b) => a - b) };
          }

          if (!isComplete && alreadyComplete) {
            return {
              completedLessons: latestState.completedLessons.filter((completedLessonId) => completedLessonId !== lessonId)
            };
          }

          return {};
        });
      }
    }),
    {
      name: 'vietnamese-learning-state-v1'
    }
  )
);
