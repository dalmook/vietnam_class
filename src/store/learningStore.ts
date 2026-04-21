import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearningState {
  completedLessons: number[];
  lessonProgress: Record<number, number>;
  bookmarks: string[];
  confusedCards: string[];
  lastVisitedLesson: number | null;
  setLastVisitedLesson: (lessonId: number) => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      completedLessons: [],
      lessonProgress: {},
      bookmarks: [],
      confusedCards: [],
      lastVisitedLesson: null,
      setLastVisitedLesson: (lessonId) => set({ lastVisitedLesson: lessonId })
    }),
    {
      name: 'vietnamese-learning-state-v1'
    }
  )
);
