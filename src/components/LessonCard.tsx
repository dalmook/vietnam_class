import { Link } from 'react-router-dom';
import { Lesson } from '../types/lesson';

interface LessonCardProps {
  lesson: Lesson;
  progress: number;
  isLocked: boolean;
}

export function LessonCard({ lesson, progress, isLocked }: LessonCardProps) {
  return (
    <Link
      to={`/lessons/${lesson.lessonId}`}
      className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-teal-700">{lesson.unitLabel}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
          {isLocked ? '잠금 예정' : '학습 가능'}
        </span>
      </div>
      <h2 className="text-lg font-bold">{lesson.titleKo}</h2>
      <p className="mt-1 text-sm text-slate-600">{lesson.topicOverview}</p>
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>진행률</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-primary-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Link>
  );
}
