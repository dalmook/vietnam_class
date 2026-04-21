import rawLessons from '../content/vietnamese_a1_lessons_1_6_starter.json';
import { Lesson, LessonDataset, LessonDatasetMeta } from '../types/lesson';

const fallbackDataset: LessonDataset = {
  meta: {},
  lessons: []
};

function toText(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    const joined = value.filter((item): item is string => typeof item === 'string').join(' ');
    return joined || fallback;
  }

  return fallback;
}

function toSafeLesson(lesson: Record<string, unknown>, index: number): Lesson {
  const lessonId = typeof lesson.lessonId === 'number' ? lesson.lessonId : index + 1;

  return {
    lessonId,
    unitLabel: toText(lesson.unitLabel, `Lesson ${lessonId}`),
    titleKo: toText(lesson.titleKo, '제목 준비 중'),
    titleVi: typeof lesson.titleVi === 'string' ? lesson.titleVi : '',
    goals: Array.isArray(lesson.goals) ? lesson.goals.filter((goal): goal is string => typeof goal === 'string') : [],
    topicOverview: toText(lesson.topicOverview, '학습 개요 준비 중'),
    vocabCards: Array.isArray(lesson.vocabCards) ? lesson.vocabCards : [],
    sentenceCards: Array.isArray(lesson.sentenceCards) ? lesson.sentenceCards : [],
    dialogues: Array.isArray(lesson.dialogues) ? lesson.dialogues : [],
    quizSeeds: Array.isArray(lesson.quizSeeds) ? lesson.quizSeeds : [],
    pronunciationTargets: Array.isArray(lesson.pronunciationTargets)
      ? lesson.pronunciationTargets.filter((item): item is string => typeof item === 'string')
      : [],
    unlockCondition: toText(lesson.unlockCondition, '조건 없음')
  };
}

export function getLessonDataset(): LessonDataset {
  const unknownData = rawLessons as unknown;
  if (!unknownData || typeof unknownData !== 'object') {
    return fallbackDataset;
  }

  const data = unknownData as { meta?: unknown; lessons?: unknown };
  const meta = (data.meta && typeof data.meta === 'object' ? (data.meta as LessonDatasetMeta) : {}) ?? {};
  const lessons = Array.isArray(data.lessons)
    ? data.lessons
        .filter((lesson): lesson is Record<string, unknown> => typeof lesson === 'object' && lesson !== null)
        .map((lesson, index) => toSafeLesson(lesson, index))
    : [];

  return {
    meta,
    lessons
  };
}

export function getLessonById(lessonId: number): Lesson | undefined {
  return getLessonDataset().lessons.find((lesson) => lesson.lessonId === lessonId);
}
