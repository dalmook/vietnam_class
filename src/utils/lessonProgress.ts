import { Lesson } from '../types/lesson';

export function isLessonComplete(params: {
  cardProgress: number;
  quizAttempts: number;
  pronunciationAttempts: number;
}): boolean {
  const checks = [
    params.cardProgress >= 80,
    params.quizAttempts >= 1,
    params.pronunciationAttempts >= 1
  ];

  return checks.filter(Boolean).length >= 2;
}

export function getUnlockedLessonIds(lessons: Lesson[], completedLessons: number[]): Set<number> {
  const sortedLessonIds = lessons.map((lesson) => lesson.lessonId).sort((a, b) => a - b);
  const unlocked = new Set<number>();

  for (let index = 0; index < sortedLessonIds.length; index += 1) {
    const lessonId = sortedLessonIds[index];
    if (lessonId === undefined) {
      continue;
    }

    if (index === 0) {
      unlocked.add(lessonId);
      continue;
    }

    const previousLessonId = sortedLessonIds[index - 1];
    if (previousLessonId !== undefined && completedLessons.includes(previousLessonId)) {
      unlocked.add(lessonId);
    }
  }

  return unlocked;
}

export function isLessonLocked(
  lessonId: number,
  lessons: Lesson[],
  completedLessons: number[]
): boolean {
  const unlockedLessons = getUnlockedLessonIds(lessons, completedLessons);
  return !unlockedLessons.has(lessonId);
}
