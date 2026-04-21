import rawLessons from '../content/vietnamese_a1_lessons_1_6_starter.json';
import { Lesson, LessonDataset } from '../types/lesson';

const fallbackDataset: LessonDataset = {
  meta: {},
  lessons: []
};

function toSafeLesson(lesson: Partial<Lesson>, index: number): Lesson {
  const lessonId = typeof lesson.lessonId === 'number' ? lesson.lessonId : index + 1;

  return {
    lessonId,
    unitLabel: lesson.unitLabel ?? `Lesson ${lessonId}`,
    titleKo: lesson.titleKo ?? '제목 준비 중',
    titleVi: lesson.titleVi ?? '',
    goals: Array.isArray(lesson.goals) ? lesson.goals : [],
    topicOverview: lesson.topicOverview ?? '학습 개요 준비 중',
    vocabCards: Array.isArray(lesson.vocabCards) ? lesson.vocabCards : [],
    sentenceCards: Array.isArray(lesson.sentenceCards) ? lesson.sentenceCards : [],
    dialogues: Array.isArray(lesson.dialogues) ? lesson.dialogues : [],
    quizSeeds: Array.isArray(lesson.quizSeeds) ? lesson.quizSeeds : [],
    pronunciationTargets: Array.isArray(lesson.pronunciationTargets)
      ? lesson.pronunciationTargets
      : [],
    unlockCondition: lesson.unlockCondition ?? '조건 없음'
  };
}

export function getLessonDataset(): LessonDataset {
  const data = rawLessons as Partial<LessonDataset>;
  const lessons = Array.isArray(data.lessons)
    ? data.lessons.map((lesson, index) => toSafeLesson(lesson, index))
    : [];

  return {
    meta: data.meta ?? fallbackDataset.meta,
    lessons
  };
}

export function getLessonById(lessonId: number): Lesson | undefined {
  return getLessonDataset().lessons.find((lesson) => lesson.lessonId === lessonId);
}
